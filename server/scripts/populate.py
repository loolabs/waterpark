import psycopg2
import yaml  # noqa
import uuid
import pprint
from datetime import datetime
from os import path
from configparser import ConfigParser

filepath = "clubs.yml"
pp = pprint.PrettyPrinter(indent=2)
club_non_nullable = ["name", "description",
                     "size", "banner_image", "icon_image"]
event_non_nullable = ["name", "description",
                      "banner_image", "start_time", "end_time"]
tags_enum = ["Community", "Tech", "Creative", "Active", "Volunteering", "Gaming",
             "Career", "Engineering", "Science", "Environment", "Arts", "Math", "Health"]
tag_entities = {}

# Assumptions: each club has its own events. Many-to-many not supported
# yet. See example clubs.yml file for example input. db.ini file must be
# in same directory

def insert_tags(): 
    conn = connect()
    try:
        with conn.cursor() as cursor:
            for tag in tags_enum:
                _id = str(uuid.uuid4())
                tag_entities[tag] = _id
                cursor.execute("INSERT INTO tag VALUES (%s,%s,%s,%s);",
                               (_id, datetime.now(), datetime.now(), tag))
        conn.commit()
        print("Tags Inserted")
    finally:
        conn.close()


def club_generator(clubs):
    for club in clubs:
        yield club


def read_clubs(filepath):
    with open(filepath) as file:
        clubList = yaml.load(file, Loader=yaml.FullLoader)
        for club in clubList:
            if not verify(club, club_non_nullable, "club"):
                return None
        return club_generator(clubList)


def verify(entity, fields, typeof):
    for field in fields:
        if entity.get(field) is None:
            name = "Untitled" if entity.get("name") is None else entity.get("name")
            print("Error:", typeof, name,
                  "is missing mandatory field", field)
            return False
        events = entity.get("events")
        if events is not None:
            for event in events:
                if not verify(event, event_non_nullable, "event"):
                    return False
        tags = entity.get("tags")
        if tags is not None:
            for tag in tags:
                if tag not in tags_enum:
                    print("Error:", typeof, entity.get(
                        "name"), "has illegal tag", tag)
                    return False
    return True


def insert_clubs():
    club_list = read_clubs(filepath)
    if club_list is None:
        print("Something failed; aborting...")
        return
    conn = connect()
    if conn is None:
        return
    insert_tags()
    try:
        while True:
            club = next(club_list)
            club["id"] = str(uuid.uuid4())
            # pp.pprint(club)
            with conn.cursor() as cursor:
                cursor.execute("INSERT INTO club VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);",
                               (club.get("id"), datetime.now(), datetime.now(), club.get("name"),
                                club.get("description"), club.get("size"), club.get(
                                    "banner_image"), club.get("icon_image"),
                                club.get("facebook"), club.get("twitter"), club.get("instagram"), club.get("website")))
                events = club.get("events")
                if (events is not None):
                    for event in events:
                        event["id"] = str(uuid.uuid4())
                        cursor.execute(
                            "INSERT INTO event VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);",
                            (event.get("id"), datetime.now(), datetime.now(), event.get("name"), event.get("description"),
                             event.get("url"), event.get("banner_image"),
                             event.get("start_time"), event.get("end_time"),
                             event.get("facebook"), event.get("twitter"), event.get("instagram")))
                        cursor.execute(
                            "INSERT INTO club_events VALUES (%s, %s);", (club.get("id"), event.get("id")))
                        tags = event.get("tags")
                        if tags is not None:
                            for tag in tags:
                                cursor.execute(
                                    "INSERT INTO tag_events VALUES (%s, %s);", (tag_entities.get(tag), event.get("id")))
                tags = club.get("tags")
                if tags is not None:
                    for tag in tags:
                        cursor.execute(
                            "INSERT INTO tag_clubs VALUES (%s, %s);", (tag_entities.get(tag), club.get("id")))
    except StopIteration:
        conn.commit()
        print("Clubs Inserted")
    finally:
        conn.close()
        print("Connection Closed")


def connect():
    conn = None
    print("Connecting to PostgreSQL server...")
    if not path.exists("db.ini"):
        print("Missing configuration file.")
        return None
    parser = ConfigParser()
    parser.read("db.ini")
    try:        
        conn = psycopg2.connect(
            host=parser["postgresql"].get("host"),
            database=parser["postgresql"].get("database"),
            user=parser["postgresql"].get("user"),
            password=parser["postgresql"].get("password"))
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


insert_clubs()
