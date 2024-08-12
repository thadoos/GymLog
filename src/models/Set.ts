import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation } from '@nozbe/watermelondb/decorators'
import Superset from './Superset';

export default class Set extends Model {
  static table = 'sets'
  static associations = {
    supersets: { type: 'belongs_to' as const, key: 'superset_id'},
    myosets: { type: 'belongs_to' as const, key: 'myoset_id'},
    dropsets: { type: 'belongs_to' as const, key: 'dropset_id'},
  }  

  // @field('set_id') setId : number;
  @field('reps') reps : number;
  @field('weight') weight : number;

  @relation('supersets', 'superset_id') supersets : Relation<Superset>;
}