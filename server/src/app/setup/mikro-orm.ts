import * as types from '../types'
import { MikroORM as ORM, AbstractNamingStrategy, NamingStrategy, Options } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import path from 'path'

class CustomNamingStrategy extends AbstractNamingStrategy implements NamingStrategy {
  classToTableName(entityName: string) {
    return this.underscore(this.normalize(entityName))
  }
  joinColumnName(propertyName: string) {
    return this.underscore(propertyName) + '_' + this.referenceColumnName()
  }
  joinKeyColumnName(entityName: string, referencedColumnName: string) {
    return (
      this.classToTableName(entityName) + '_' + (referencedColumnName || this.referenceColumnName())
    )
  }
  joinTableName(sourceEntity: string, _targetEntity: string, propertyName: string) {
    return this.classToTableName(sourceEntity) + '_' + this.classToTableName(propertyName)
  }
  propertyToColumnName(propertyName: string) {
    return this.underscore(propertyName)
  }
  referenceColumnName() {
    return 'id'
  }
  normalize(name: string) {
    return name.replace('Entity', '')
  }
  underscore(name: string) {
    return name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
  }
}

const clientUrl = process.env.DATABASE_URL
// Heroku's postgres service self-signs SSL certificates (whatever that means),
// and in production, the dyno complains with Error: self signed certificate.
// This is probably the underlying PG driver complaining, so the temporary
// workaround is to allow unauthorized SSL certificates, per below.
// TODO: look into risk factors: https://stackoverflow.com/a/63914477/6113956
const sslOptions = { rejectUnauthorized: false }
const isDatabaseLocal = process.env.IS_DATABASE_LOCAL === 'true'
const isDatabaseSSL = isDatabaseLocal ? false : sslOptions

// TODO: import connection-related properties from root .env
const baseOptions: Options = {
  // debug: process.env.NODE_ENV !== 'production',
  clientUrl,
  driver: PostgreSqlDriver,
  driverOptions: {
    connection: {
      ssl: isDatabaseSSL,
    },
  },
  debug: true,
  highlighter: new SqlHighlighter(),
  entities: ['**/*.entity.js'],
  entitiesTs: ['**/*.entity.ts'], // path to your TS entities (source), relative to `baseDir`
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    disableForeignKeys: false,
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  namingStrategy: CustomNamingStrategy,
  type: 'postgresql',
}

export const MikroORM = async (options: Options = {}): Promise<types.MikroORM> => {
  return await ORM.init({ ...baseOptions, ...options })
}
