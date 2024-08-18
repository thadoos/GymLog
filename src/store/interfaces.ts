export namespace ZustandWorkoutModel {
  export interface Workout {
    workout_name: string,
    workout_description: string,
    started_at: Date,
    duration: number,
  }

  export interface Set {
    // NOTE: prev_set_id and next_set_id should not be necessary as I will just store these in an array
    reps: number,
    weight: number,
    note: string,
    set_type: 'dropset' | 'myoset' | null,
    exercise_id: string,
  }
}
