import { Model, Query } from "@nozbe/watermelondb";
import { children, text } from "@nozbe/watermelondb/decorators";
import Exercise from "./Exercise";

export default class TypeModel extends Model {
  static table = "types";
  static associations = {
    exercises: { type: "has_many" as const, foreignKey: "type_id" },
  };

  @text("name") name: string;
  @children("exercises") exercises: Query<Exercise>;
}
