import { Migration } from '@mikro-orm/migrations'

export class Migration20210220195842 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "event" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null);')
    this.addSql('alter table "event" add constraint "event_pkey" primary key ("id");')
  }

}
