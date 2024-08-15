import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation, immutableRelation } from '@nozbe/watermelondb/decorators'
import Equipment from './Equipment';
import ExerciseMuscle from './ExerciseMuscle';
import ExerciseMuscleGroup from './ExerciseMuscleGroup';
import Set from './Set';
import User from './User';

export default class Exercise extends Model {
  static table = 'exercises'
  static associations = {
    exercise_muscle_groups : { type: 'has_many' as const, foreignKey: 'exercise_id'},
    exercise_muscles: { type: 'has_many' as const, foreignKey: 'exercise_id'},
    sets: { type: 'has_many' as const, foreignKey: 'exercise_id' },

    equipments: { type: 'belongs_to' as const, key: 'equipment_id' },
    users: { type: 'belongs_to' as const, key: 'user_id' },
  }  

  @text('exercise_name') exerciseName : string;
  @field('is_two_side_weight') isTwoSideWeight : boolean;
  @text('note') note : string;

  @children('exercise_muscles') exerciseMuscles : Query<ExerciseMuscle>;
  @children('exercise_muscle_groups') exerciseMuscleGroups : Query<ExerciseMuscleGroup>;
  @children('sets') sets : Query<Set>;

  @relation('equipments', 'equipment_id') equipment : Relation<Equipment>;
  @relation('users', 'user_id') user : Relation<User>;


}