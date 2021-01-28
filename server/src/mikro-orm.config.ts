import path from 'path'
import { AbstractNamingStrategy, NamingStrategy, Options } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
require('dotenv').config()

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

// TODO: import connection-related properties from root .env
const mikroORMConfig: Options = {
  // debug: process.env.NODE_ENV !== 'production',
  clientUrl,
  debug: true,
  highlighter: new SqlHighlighter(),
  entities: ['**/*.entity.js'],
  entitiesTs: ['**/*.entity.ts'], // path to your TS entities (source), relative to `baseDir`
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  namingStrategy: CustomNamingStrategy,
  type: 'postgresql',
}

export default mikroORMConfig
