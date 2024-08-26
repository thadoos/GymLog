import { Model, Query, Relation } from "@nozbe/watermelondb";
import {
  text,
  children,
  field,
  relation,
  writer,
} from "@nozbe/watermelondb/decorators";
import MuscleGroup from "./MuscleGroup";
import ExerciseMuscle from "./ExerciseMuscle";

export default class Muscle extends Model {
  static table = "muscles";
  static associations = {
    muscle_groups: { type: "belongs_to" as const, key: "muscle_group_id" },
    exercise_muscles: { type: "has_many" as const, foreignKey: "muscle_id" },
  };
  // @field('muscle_id') muscleId : number;
  @text("name") name!: string;
  // @field('is_primary') isPrimary : boolean;

  @relation("muscle_groups", "muscle_group_id")
  muscleGroup?: Relation<MuscleGroup>;
  @children("exercise_muscles") exerciseMuscles?: Query<ExerciseMuscle>;

  @writer async addMuscle(muscleName: string, muscleGroupId: string) {}
}
