import { Migration } from '@mikro-orm/migrations';

export class Migration20210123215506 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "club" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null);');
    this.addSql('alter table "club" add constraint "club_pkey" primary key ("id");');
  }

}
