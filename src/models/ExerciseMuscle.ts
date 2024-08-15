import { immutableRelation } from "@nozbe/watermelondb/decorators";
import { Model, Relation } from "@nozbe/watermelondb";
import Muscle from "./Muscle";
import Exercise from "./Exercise";

export default class ExerciseMuscle extends Model {
  static table = 'exercise_muscles'
  static associations = {
    exercises : { type: 'belongs_to' as const, key: 'exercise_id' },
    muscles : { type: 'belongs_to' as const, key: 'muscle_id' },
  }
  @immutableRelation('exercises', 'exercise_id') exercise : Relation<Exercise>;
  @immutableRelation('muscles', 'muscle_id') muscle : Relation<Muscle>;
}