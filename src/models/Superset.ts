import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation } from '@nozbe/watermelondb/decorators'
import Set from './Set';

export default class Superset extends Model {
  static table = 'supersets'
  static associations = {
    sets: { type: 'has_many' as const, foreignKey: 'superset_id'},
  }  

  // @field('superset_id') supersetId : number;

  @children('sets') sets : Query<Set>;
}