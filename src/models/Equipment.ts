import { Model, Query, Relation } from '@nozbe/watermelondb'
import { text, children, field, relation } from '@nozbe/watermelondb/decorators'
import Exercise from './Exercise';

export default class Equipment extends Model {
  static table = 'equipments'
  static associations = {
    exercises: { type: 'has_many' as const, foreignKey: 'equipment_id' },
  }  

  // @field('equipment_id') equipmentId : number;
  @text('equipment_name') equipmentName : string;

  @children('exercises') exercises : Query<Exercise>;
}