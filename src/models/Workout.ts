import { Model, Query, Relation } from "@nozbe/watermelondb";
import { relation, text, readonly, children, field, date } from "@nozbe/watermelondb/decorators";
import WorkoutExercise from "./WorkoutExercise";
import User from "./User";

export default class Workout extends Model{
  static table = 'workouts'
  static associations = {
    workout_exercises: { type: 'has_many' as const, foreignKey: 'workout_id' },
    users: { type: 'belongs_to' as const, key: 'user_id' },
  }
  @text('workout_name') workoutName : string;
  @text('workout_description') workoutDescription : string;
  @date('started_at') startedAt : Date;
  @field('duration') duration : number;
  @readonly @date('created_at') createdAt : Date;

  @relation('users', 'user_id') user : Relation<User>;
  @children('workout_exercises') workoutExercises : Query<WorkoutExercise>;
}