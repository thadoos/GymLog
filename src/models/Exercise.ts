import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation, immutableRelation } from '@nozbe/watermelondb/decorators'
import Equipment from './Equipment';
import ExerciseMuscle from './ExerciseMuscle';
import ExerciseMuscleGroup from './ExerciseMuscleGroup';
import Set from './Set';

export default class Exercise extends Model {
  static table = 'exercises'
  static associations = {
    exercise_muscle_groups : { type: 'has_many' as const, foreignKey: 'exercise_id'},
    exercise_muscles: { type: 'has_many' as const, foreignKey: 'exercise_id'},
    equipments: { type: 'belongs_to' as const, key: 'equipment_id' },
    sets: { type: 'has_many' as const, foreignKey: 'exercise_id' },
  }  

  // @field('exercise_id') exerciseId : number;
  @text('exercise_name') exerciseName : string;
  @field('is_two_side_weight') isTwoSideWeight : boolean;
  @text('note') notes : string;

  @relation('equipments', 'equipment_id') equipment : Relation<Equipment>;
  @children('exercise_muscles') exerciseMuscles : Query<ExerciseMuscle>;
  @children('exercise_muscle_groups') exerciseMuscleGroups : Query<ExerciseMuscleGroup>;
  @children('sets') sets : Query<Set>;

}