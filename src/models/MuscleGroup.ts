import { Model, Query, Relation } from "@nozbe/watermelondb";
import { text, children, field, writer } from "@nozbe/watermelondb/decorators";
import Muscle from "./Muscle";
import ExerciseMuscleGroup from "./ExerciseMuscleGroup";

export default class MuscleGroup extends Model {
  static table = "muscle_groups";
  static associations = {
    muscles: { type: "has_many" as const, foreignKey: "muscle_group_id" },
    exercise_muscle_groups: {
      type: "has_many" as const,
      foreignKey: "muscle_group_id",
    },
  };
  @text("name") name!: string;
  // @field('is_primary') isPrimary : boolean;

  // @relation('muscles', 'muscle_id') muscles : Relation<Muscle>;
  @children("muscles") muscles?: Query<Muscle>;
  @children("exercise_muscle_groups")
  exerciseMuscleGroups?: Query<ExerciseMuscleGroup>;
}
