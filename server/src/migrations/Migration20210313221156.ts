import { Migration } from '@mikro-orm/migrations';

export class Migration20210313221156 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tag" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');
    this.addSql('alter table "tag" add constraint "tag_pkey" primary key ("id");');

    this.addSql('create table "event" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null, "url" varchar(255) null, "start_time" timestamptz(0) not null, "end_time" timestamptz(0) not null, "facebook_link" varchar(255) null, "twitter_link" varchar(255) null, "instagram_link" varchar(255) null, "website_link" varchar(255) null, "background_image_url" varchar(255) null);');
    this.addSql('alter table "event" add constraint "event_pkey" primary key ("id");');

    this.addSql('create table "tag_events" ("tag_id" varchar(255) not null, "event_id" varchar(255) not null);');
    this.addSql('alter table "tag_events" add constraint "tag_events_pkey" primary key ("tag_id", "event_id");');

    this.addSql('create table "club" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null, "size" int4 not null, "background_image_url" varchar(255) null, "icon_url" varchar(255) null, "facebook_link" varchar(255) null, "twitter_link" varchar(255) null, "instagram_link" varchar(255) null, "website_link" varchar(255) null);');
    this.addSql('alter table "club" add constraint "club_pkey" primary key ("id");');

    this.addSql('create table "club_events" ("club_id" varchar(255) not null, "event_id" varchar(255) not null);');
    this.addSql('alter table "club_events" add constraint "club_events_pkey" primary key ("club_id", "event_id");');

    this.addSql('create table "tag_clubs" ("tag_id" varchar(255) not null, "club_id" varchar(255) not null);');
    this.addSql('alter table "tag_clubs" add constraint "tag_clubs_pkey" primary key ("tag_id", "club_id");');

    this.addSql('alter table "tag_events" add constraint "tag_events_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "tag_events" add constraint "tag_events_event_id_foreign" foreign key ("event_id") references "event" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "club_events" add constraint "club_events_club_id_foreign" foreign key ("club_id") references "club" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "club_events" add constraint "club_events_event_id_foreign" foreign key ("event_id") references "event" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "tag_clubs" add constraint "tag_clubs_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "tag_clubs" add constraint "tag_clubs_club_id_foreign" foreign key ("club_id") references "club" ("id") on update cascade on delete cascade;');
  }

}
