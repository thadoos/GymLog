import { Model, Query, Relation } from "@nozbe/watermelondb";
import { text, readonly, children, field, date } from "@nozbe/watermelondb/decorators";
import Workout from "./Workout";
import Exercise from "./Exercise";

export default class User extends Model{
  static table = 'users'
  static associations = {
    workouts : { type: 'has_many' as const, foreignKey: 'user_id' },
    exercises : { type: 'has_many' as const, foreignKey: 'user_id' },
  }

  @text('username') username : string;
  @text('theme') theme : 'light' | 'dark';

  @children('workouts') workouts : Query<Workout>;
  @children('exercises') exercises : Query<Exercise>;
}
