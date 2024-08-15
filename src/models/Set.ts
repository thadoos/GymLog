import { Model, Query, Relation } from '@nozbe/watermelondb'
import { readonly, text, children, field, relation, date } from '@nozbe/watermelondb/decorators'
import Superset from './Superset';
import Dropset from './Dropset';
import Myoset from './Myoset';

export default class Set extends Model {
  static table = 'sets'
  static associations = {
    supersets: { type: 'belongs_to' as const, key: 'superset_id'},
    myosets: { type: 'belongs_to' as const, key: 'myoset_id'},
    dropsets: { type: 'belongs_to' as const, key: 'dropset_id'},
    exercises: { type: 'belongs_to' as const, key: 'exercise_id' },
  }  

  // @field('set_id') setId : number;
  @field('reps') reps : number;
  @field('weight') weight : number;
  @field('set_number') setNumber : number;
  // @readonly @date('created_at') createdAt : Date;

  @relation('supersets', 'superset_id') superset : Relation<Superset>;
  @relation('dropsets', 'dropset_id') myoset : Relation<Dropset>;
  @relation('myosets', 'myoset_id') dropset : Relation<Myoset>;
}