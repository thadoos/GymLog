import { ObjectSchema, BSON, Realm } from "realm";
import { Exercise } from "../store/interfaces";

export class WorkoutLog extends Realm.Object<WorkoutLog> {
  _id: BSON.ObjectId = new BSON.ObjectId(); 
  workoutName!: string;
  workoutDescription!: string;
  timeStart: Date = new Date();
  timeEnd: Date = new Date();
  workoutDuration!: number;
  workoutExercises!: Exercise[];
  // static schema: ObjectSchema = {
  //   name: 'WorkoutLog',
  //   properties: {
  //     _id: 'objectId',
  //     workoutName: 'string',
  //     workoutDescription: 'string',
  //     timeStart: 'date',
  //     timeEnd: 'date',
  //     workoutDuration: 'nubmer',
  //     workoutExercises: 'Exercise[]',
  //   },
  //   primaryKey: '_id',
  // };




  static primaryKey = '_id';

}
  // _id: BSON.ObjectId = new BSON.ObjectId();
  // workoutName!: string;
  // workoutDescription!: string;
  // timeStart!: Date;
  // timeEnd!: Date;
  // workoutDuration!: number;
  // workoutExercises!: Exercise[];
  // timeStart: Date = new Date;
  // timeEnd: Date = new Date;
  // workoutDuration: number = 0;
  // workoutExercises!: Exercise[];