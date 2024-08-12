import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation } from '@nozbe/watermelondb/decorators'
import Muscle from './Muscle';

export default class MuscleGroup extends Model {
  static table = 'muscle_groups'
  static associations = {
    muscles: { type: 'has_many' as const, foreignKey: 'muscle_group_id'},
    exercise_muscle_groups: { type: 'has_many' as const, foreignKey: 'muscle_group_id' },
  }
  // @field('muscle_group_id') muscleGroupId : number;
  @text('muscle_group_name') muscleGroupName : string;

  @relation('muscles', 'muscle_id') muscles : Relation<Muscle>;
}