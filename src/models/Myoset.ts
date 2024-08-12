import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation } from '@nozbe/watermelondb/decorators'
import Set from './Set';

export default class Myoset extends Model {
  static table = 'myosets'
  static associations = {
    sets: { type: 'has_many' as const, foreignKey: 'myoset_id'},
  }  

  // @field('myoset_id') myosetId : number;

  @children('sets') sets : Query<Set>;
}