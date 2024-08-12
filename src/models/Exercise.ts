import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation, immutableRelation } from '@nozbe/watermelondb/decorators'
import Equipment from './Equipment';

export default class Exercise extends Model {
  static table = 'exercises'
  static associations = {
    exercise_muscle_groups : { type: 'has_many' as const, foreignKey: 'exercise_id'},
    exercise_muscles: { type: 'has_many' as const, foreignKey: 'exercise_id'},
    equipments: { type: 'belongs_to' as const, key: 'equipment_id' },
  }  

  // @field('exercise_id') exerciseId : number;
  @text('exercise_name') exerciseName : string;
  @field('is_two_side_weight') isTwoSideWeight : boolean;
  @text('note') notes : string;

  @relation('equipments', 'equipment_id') equipmentId : Relation<Equipment>;
}