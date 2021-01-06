import { Migration } from '@mikro-orm/migrations';

export class Migration20210104121903 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "email_verified" bool not null default false, "is_deleted" bool not null default false, "access_token" varchar(255) null, "refresh_token" varchar(255) null, "last_login" timestamptz(0) null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}
