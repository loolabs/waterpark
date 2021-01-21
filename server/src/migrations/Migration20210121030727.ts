import { Migration } from '@mikro-orm/migrations';

export class Migration20210121030727 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "club" drop column "access_token";');
    this.addSql('alter table "club" drop column "refresh_token";');
    this.addSql('alter table "club" drop column "last_login";');
  }

}
