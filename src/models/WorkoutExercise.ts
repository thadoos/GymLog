import { Query, Model, Relation } from "@nozbe/watermelondb";
import { children, relation } from "@nozbe/watermelondb/decorators";
import Workout from "./Workout";
import Set from "./Set";
import Superset from "./Superset";
import Dropset from "./Dropset";
import Myoset from "./Myoset";

export default class WorkoutExercise extends Model {
  static table = 'workout_exercises'
  static associations = {
    workouts : { type: 'belongs_to' as const, key: 'workout_id' },
    // supersets : { type: 'has_many' as const, foreignKey: 'workout_exercise_id' },
    sets: { type: 'has_many' as const, foreignKey: 'workout_exercise_id' },
    // dropsets: { type: 'has_many' as const, foreignKey: 'workout_exercise_id' },
    // myosets: { type: 'has_many' as const, foreignKey: 'workout_exercise_id' },
  }

  @relation('workouts', 'workout_id') workout : Relation<Workout>;
  @children('sets') sets : Query<Set>;
  // @children('supersets') supersets : Query<Superset>;
  // @children('dropsets') dropsets : Query<Dropset>;
  // @children('myosets') myosets : Query<Myoset>;
}