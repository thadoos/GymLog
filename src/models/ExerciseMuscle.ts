import { field, immutableRelation, lazy } from "@nozbe/watermelondb/decorators";
import { Model, Q, Relation } from "@nozbe/watermelondb";
import Muscle from "./Muscle";
import Exercise from "./Exercise";

export default class ExerciseMuscle extends Model {
  static table = "exercise_muscles";
  static associations = {
    exercises: { type: "belongs_to" as const, key: "exercise_id" },
    muscles: { type: "belongs_to" as const, key: "muscle_id" },
  };

  @field("isPrimary") isPrimary: boolean;
  @immutableRelation("exercises", "exercise_id") exercise: Relation<Exercise>;
  @immutableRelation("muscles", "muscle_id") muscle: Relation<Muscle>;
}
