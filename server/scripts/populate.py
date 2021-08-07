# Assumptions: each club has its own events. Many-to-many not supported
# yet. See example clubs.yml file for example input. db.ini file must be
# in same directory

from configparser import ConfigParser
from datetime import datetime
from os import path
from enum import Enum

import uuid
import psycopg2
import yaml
from marshmallow import Schema, fields, validate

filepath = "clubs.yml"
tag_entities = {}


class Tags(str, Enum):
    community = "Community"
    tech = "Tech"
    creative = "Creative"
    active = "Active"
    volunteering = "Volunteering"
    gaming = "Gaming"
    career = "Career"
    engineering = "Engineering"
    science = "Science"
    environment = "Environment"
    arts = "Arts"
    math = "Math"
    health = "Health"


class EventSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str(required=True, validate=validate.Length(min=1))
    url = fields.Url()
    banner_image = fields.Url(required=True, validate=validate.Length(min=1))
    start_time = fields.DateTime(required=True)
    end_time = fields.DateTime(required=True)
    facebook = fields.Url()
    twitter = fields.Url()
    instagram = fields.Url()
    tags = fields.List(fields.Str(
        validate=validate.OneOf([tag.value for tag in Tags])))


class ClubSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str(required=True, validate=validate.Length(min=1))
    size = fields.Int(required=True, validate=validate.Range(min=1))
    banner_image = fields.Url(required=True, validate=validate.Length(min=1))
    icon_image = fields.Url(required=True, validate=validate.Length(min=1))
    facebook = fields.Url()
    twitter = fields.Url()
    instagram = fields.Url()
    website = fields.Url()
    events = fields.List(fields.Nested(EventSchema))
    tags = fields.List(fields.Str(
        validate=validate.OneOf([tag.value for tag in Tags])))


def insert_tags():
    tag_args = []
    for tag in Tags:
        _id = str(uuid.uuid4())
        tag_entities[tag.value] = _id
        tag_args.append((_id, datetime.now(), datetime.now(), tag.value))
    with conn.cursor() as cursor:
        cursor.execute("INSERT INTO tag VALUES" + ",".join(cursor.mogrify(
            "(%s,%s,%s,%s)", x).decode("utf-8")
            for x in tag_args))
        conn.commit()
    print("Tags Inserted")


def read_clubs(filepath):
    with open(filepath) as file:
        club_dicts = yaml.load(file, Loader=yaml.FullLoader)
    for club_dict in club_dicts:
        club = ClubSchema().load(club_dict)
        yield club



def insert_clubs():
    club_values = []
    event_values = []
    club_events_values = []
    tag_events_values = []
    tag_clubs_values = []

    for club in read_clubs(filepath):
        club["id"] = str(uuid.uuid4())
        club_values.append((club.get("id"), datetime.now(), datetime.now(), club.get("name"),
                            club.get("description"), club.get("size"), club.get(
                                "banner_image"), club.get("icon_image"),
                            club.get("facebook"), club.get("twitter"), club.get("instagram"), club.get("website")))
        for event in club.get("events", []):
            event["id"] = str(uuid.uuid4())
            event_values.append((event.get("id"), datetime.now(), datetime.now(), event.get("name"), event.get("description"),
                                 event.get("url"), event.get("banner_image"),
                                 event.get("start_time"), event.get(
                                     "end_time"),
                                 event.get("facebook"), event.get("twitter"), event.get("instagram")))
            club_events_values.append((club.get("id"), event.get("id")))
            for tag in event.get("tags", []):
                tag_events_values.append(
                    (tag_entities.get(tag), event.get("id")))
        for tag in club.get("tags", []):
            tag_clubs_values.append((tag_entities.get(tag), club.get("id")))
    with conn.cursor() as cursor:
        cursor.execute("INSERT INTO club VALUES " + ",".join(cursor.mogrify(
            "(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", x).decode("utf-8")
            for x in club_values))
        cursor.execute("INSERT INTO event VALUES " + ",".join(cursor.mogrify(
            "(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", x).decode("utf-8")
            for x in event_values))
        cursor.execute("INSERT INTO club_events VALUES" + ",".join(cursor.mogrify(
            "(%s,%s)", x).decode("utf-8")
            for x in club_events_values))
        cursor.execute("INSERT INTO tag_events VALUES" + ",".join(cursor.mogrify(
            "(%s,%s)", x).decode("utf-8")
            for x in tag_events_values))
        cursor.execute("INSERT INTO tag_clubs VALUES" + ",".join(cursor.mogrify(
            "(%s,%s)", x).decode("utf-8")
            for x in tag_clubs_values))
        conn.commit()
    print("Clubs Inserted")


def connect():
    conn = None
    print("Connecting to PostgreSQL server...")

    parser = ConfigParser()
    with open("db.ini") as f:
        parser.read_file(f)

    keys = parser["postgresql"]
    try:
        conn = psycopg2.connect(
            host=keys.get("host"),
            database=keys.get("database"),
            user=keys.get("user"),
            password=keys.get("password"))
        print("Connection Successful")
        cursor = conn.cursor()
        cursor.execute("SELECT version()")
        print(cursor.fetchone())
        return conn
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        if conn is not None:
            conn.close()
            print("Connection Closed")


conn = connect()

if conn is None:
    exit()

insert_tags()
insert_clubs()

conn.close()
print("Connection Closed")
