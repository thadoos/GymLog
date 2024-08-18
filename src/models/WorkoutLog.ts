import { ObjectSchema, BSON, Realm } from "realm";
import { Exercise } from "../store/oldInterfaces";

export class WorkoutLog extends Realm.Object<WorkoutLog> {
  _id: BSON.ObjectId = new BSON.ObjectId(); 
  workoutName!: string;
  workoutDescription!: string;
  timeStart: Date = new Date();
  timeEnd: Date = new Date();
  workoutDuration!: number;
  workoutExercises!: Exercise[];
  // workoutExercises!: Realm.List<Exercise>;
  static primaryKey = '_id';

}
// export const WorkoutLogSchema: ObjectSchema = {
//   name: 'WorkoutLog',
//   properties: {
//     _id: 'objectId',
//     workoutName: 'string',
//     workoutDescription: 'string',
//     timeStart: 'date',
//     timeEnd: 'date',
//     workoutDuration: 'int',
//     workoutExercises: 'Exercise[]'
//     // {
//     //   type: 'linkingObjects',
//     //   objectType:
//     // },
//   },
//   primaryKey: '_id',
// };

// export class ExerciseObject extends Realm.Object<ExerciseObject>{
//   _id: BSON.ObjectId = new BSON.ObjectId();
//   sets: WorkoutBasicSetObject[] = [];
//   restStartTime: Date = new Date();
//   restEndTime: Date = new Date();
//   restDuration: number = 0; 
// }

// export const ExerciseSchema: ObjectSchema = {
//   name: 'ExerciseSchema',
//   properties:{
//     _id:'objectId',
//     sets: 'WorkoutBasicSet[]',
//     restStartTime: 'date',
//     restEndTime: 'date',
//     restDuration: 'number',
//   },
//   primaryKey:'_id',
// }

// export class WorkoutBasicSetObject extends Realm.Object<WorkoutBasicSetObject>{
//   _id: BSON.ObjectId = new BSON.ObjectId();
//   reps: number = 0;
//   weight: number = 0;
//   done: boolean = false;
// }
// export const WorkoutBasicSetSchema: ObjectSchema = {
//   name: 'WorkoutBasicSetSchema',
//   properties:{
//     _id:'objectId',
//     reps: 'int',
//     weight: 'int',
//     done: 'bool'
//   }
// }
