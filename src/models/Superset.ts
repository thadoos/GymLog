import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation } from '@nozbe/watermelondb/decorators'
import Set from './Set';
import Dropset from './Dropset';
import Myoset from './Myoset';

export default class Superset extends Model {
  static table = 'supersets'
  static associations = {
    sets: { type: 'has_many' as const, foreignKey: 'superset_id'},
    myosets: { type: 'has_many' as const, foreignKey: 'myoset_id'},
    dropsets: { type: 'has_many' as const, foreignKey: 'dropset_id'},
  }  

  // @field('superset_id') supersetId : number;

  @children('sets') sets : Query<Set>;
  @children('dropsets') dropsets : Query<Dropset>;
  @children('myosets') myosets : Query<Myoset>;
}