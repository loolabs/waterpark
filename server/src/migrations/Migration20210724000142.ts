import { Migration } from '@mikro-orm/migrations';

export class Migration20210724000142 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "place" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null, "address" text not null, "url" text null, "on_campus" bool not null, "banner_image" text not null, "icon_image" text not null);');
    this.addSql('alter table "place" add constraint "place_pkey" primary key ("id");');

    this.addSql('create table "study_spot" ("place_id" varchar(255) not null);');
    this.addSql('alter table "study_spot" add constraint "study_spot_pkey" primary key ("place_id");');

    this.addSql('create table "washroom" ("place_id" varchar(255) not null);');
    this.addSql('alter table "washroom" add constraint "washroom_pkey" primary key ("place_id");');

    this.addSql('create table "review" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "place_id" varchar(255) not null, "comment" text not null, "avatar_image" text not null, "faculty" int2 not null, "status" int2 not null);');
    this.addSql('alter table "review" add constraint "review_pkey" primary key ("id");');

    this.addSql('create table "housing_review" ("review_id" varchar(255) not null, "cleanliness_rating" int4 not null, "price_rating" int4 not null, "management_rating" int4 not null);');
    this.addSql('alter table "housing_review" add constraint "housing_review_pkey" primary key ("review_id");');

    this.addSql('create table "study_spot_review" ("review_id" varchar(255) not null, "cleanliness_rating" int4 not null, "noise_rating" int4 not null);');
    this.addSql('alter table "study_spot_review" add constraint "study_spot_review_pkey" primary key ("review_id");');

    this.addSql('create table "washroom_review" ("review_id" varchar(255) not null, "cleanliness_rating" int4 not null);');
    this.addSql('alter table "washroom_review" add constraint "washroom_review_pkey" primary key ("review_id");');

    this.addSql('create table "housing" ("place_id" varchar(255) not null);');
    this.addSql('alter table "housing" add constraint "housing_pkey" primary key ("place_id");');

    this.addSql('create table "legacy_tag" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');
    this.addSql('alter table "legacy_tag" add constraint "legacy_tag_pkey" primary key ("id");');

    this.addSql('create table "legacy_tag_events" ("legacy_tag_id" varchar(255) not null, "event_id" varchar(255) not null);');
    this.addSql('alter table "legacy_tag_events" add constraint "legacy_tag_events_pkey" primary key ("legacy_tag_id", "event_id");');

    this.addSql('create table "legacy_tag_clubs" ("legacy_tag_id" varchar(255) not null, "club_id" varchar(255) not null);');
    this.addSql('alter table "legacy_tag_clubs" add constraint "legacy_tag_clubs_pkey" primary key ("legacy_tag_id", "club_id");');

    this.addSql('create table "tag_places" ("tag_id" varchar(255) not null, "place_id" varchar(255) not null);');
    this.addSql('alter table "tag_places" add constraint "tag_places_pkey" primary key ("tag_id", "place_id");');

    this.addSql('alter table "study_spot" add constraint "study_spot_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "washroom" add constraint "washroom_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "review" add constraint "review_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade;');

    this.addSql('alter table "housing_review" add constraint "housing_review_review_id_foreign" foreign key ("review_id") references "review" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "study_spot_review" add constraint "study_spot_review_review_id_foreign" foreign key ("review_id") references "review" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "washroom_review" add constraint "washroom_review_review_id_foreign" foreign key ("review_id") references "review" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "housing" add constraint "housing_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "legacy_tag_events" add constraint "legacy_tag_events_legacy_tag_id_foreign" foreign key ("legacy_tag_id") references "legacy_tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "legacy_tag_events" add constraint "legacy_tag_events_event_id_foreign" foreign key ("event_id") references "event" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "legacy_tag_clubs" add constraint "legacy_tag_clubs_legacy_tag_id_foreign" foreign key ("legacy_tag_id") references "legacy_tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "legacy_tag_clubs" add constraint "legacy_tag_clubs_club_id_foreign" foreign key ("club_id") references "club" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "tag_places" add constraint "tag_places_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "tag_places" add constraint "tag_places_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "tag_clubs" cascade;');

    this.addSql('drop table if exists "tag_events" cascade;');
  }

}
