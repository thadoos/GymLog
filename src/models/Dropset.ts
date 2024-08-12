import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation } from '@nozbe/watermelondb/decorators'
import Set from './Set';

export default class Dropset extends Model {
  static table = 'dropsets'
  static associations = {
    sets: { type: 'has_many' as const, foreignKey: 'dropset_id'},
  }  

  // @field('dropset_id') dropsetId : number;

  @children('sets') sets : Query<Set>;
}