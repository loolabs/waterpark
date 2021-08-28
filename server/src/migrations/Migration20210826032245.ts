import { Migration } from '@mikro-orm/migrations';

export class Migration20210826032245 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "place" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null, "address" text not null, "url" text null, "on_campus" bool not null, "banner_image" text not null, "icon_image" text not null);');
    this.addSql('alter table "place" add constraint "place_pkey" primary key ("id");');

    this.addSql('create table "study_spot" ("place_id" varchar(255) not null);');
    this.addSql('alter table "study_spot" add constraint "study_spot_pkey" primary key ("place_id");');

    this.addSql('create table "washroom" ("place_id" varchar(255) not null);');
    this.addSql('alter table "washroom" add constraint "washroom_pkey" primary key ("place_id");');

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

    // the following line has been edited to escape the apostrophe in "Master's" by replacing it with a double apostrophe ''
    this.addSql('create table "review" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "place_id" varchar(255) not null, "comment" text null, "avatar_image" text not null, "faculty" text check ("faculty" in (\'Mathematics\', \'Engineering\', \'Arts\', \'Health\', \'Science\', \'Environment\', \'Non-Waterloo\')) not null, "status" text check ("status" in (\'First-Year Student\', \'Second-Year Student\', \'Third-Year Student\', \'Fourth-Year Student\', \'Fifth-Year Student\', \'Sixth-Year+ Student\', \'Master\'\'s Student\', \'PhD Student\', \'Faculty Member\', \'Reviewer\')) not null, "affordability_rating" int4 null, "atmosphere_rating" int4 null, "cleanliness_rating" int4 null, "management_rating" int4 null);');
    this.addSql('alter table "review" add constraint "review_pkey" primary key ("id");');

    this.addSql('alter table "study_spot" add constraint "study_spot_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "washroom" add constraint "washroom_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "housing" add constraint "housing_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "legacy_tag_events" add constraint "legacy_tag_events_legacy_tag_id_foreign" foreign key ("legacy_tag_id") references "legacy_tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "legacy_tag_events" add constraint "legacy_tag_events_event_id_foreign" foreign key ("event_id") references "event" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "legacy_tag_clubs" add constraint "legacy_tag_clubs_legacy_tag_id_foreign" foreign key ("legacy_tag_id") references "legacy_tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "legacy_tag_clubs" add constraint "legacy_tag_clubs_club_id_foreign" foreign key ("club_id") references "club" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "tag_places" add constraint "tag_places_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "tag_places" add constraint "tag_places_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "review" add constraint "review_place_id_foreign" foreign key ("place_id") references "place" ("id") on update cascade;');

    this.addSql('drop table if exists "tag_clubs" cascade;');

    this.addSql('drop table if exists "tag_events" cascade;');
  }

}
