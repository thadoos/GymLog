import { field, immutableRelation } from "@nozbe/watermelondb/decorators";
import { Model, Relation } from "@nozbe/watermelondb";
import MuscleGroup from "./MuscleGroup";
import Exercise from "./Exercise";

export default class ExerciseMuscleGroup extends Model {
  static table = "exercise_muscle_groups";
  static associations = {
    exercises: { type: "belongs_to" as const, key: "exercise_id" },
    muscle_groups: { type: "belongs_to" as const, key: "muscle_group_id" },
  };

  @field("isPrimary") isPrimary: boolean;
  @immutableRelation("exercises", "exercise_id") exercise: Relation<Exercise>;
  @immutableRelation("muscle_groups", "muscle_group_id")
  muscleGroup: Relation<MuscleGroup>;
}

