import { Model, Query, Relation } from "@nozbe/watermelondb";
import { text, readonly, children, field, date } from "@nozbe/watermelondb/decorators";
import Workout from "./Workout";

export default class User extends Model{
  static name = 'users'
  static associations = {
    workouts : { type: 'has_many' as const, foreignKey: 'user_id' },
  }

  @text('username') username : string;

  @children('workouts') workouts : Query<Workout>;
}