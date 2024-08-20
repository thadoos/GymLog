import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "muscles",
      columns: [
        { name: 'name', type: 'string' },
        { name: 'is_primary', type: 'boolean' },

        { name: "muscle_group_id", type: 'string', isIndexed: true },
      ]
    }),

    tableSchema({
      name: "muscle_groups",
      columns: [
        { name: 'name', type: 'string' },
        { name: 'is_primary', type: 'boolean' },
      ]
    }),

    tableSchema({
      name: 'exercise_muscles',
      columns: [
        { name: 'exercise_id', type: 'string', isIndexed: true },
        { name: 'muscle_id', type: 'string', isIndexed: true },
      ]
    }),

    tableSchema({
      name: 'exercise_muscle_groups',
      columns: [
        { name: 'exercise_id', type: 'string', isIndexed: true },
        { name: 'muscle_group_id', type: 'string', isIndexed: true },
      ]
    }),

    tableSchema({
      name: 'exercises',
      columns: [
        { name: 'exercise_name', type: 'string' },
        { name: 'is_two_side_weight', type: 'boolean', isIndexed: true },
        { name: 'note', type: 'string'},

        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'equipment_id', type: 'string', isIndexed: true },
      ]
    }),

    tableSchema({
      name: 'equipments',
      columns: [
        // { name: 'equipment_id', type: 'number', isIndexed: true},
        { name: 'equipment_name', type: 'string'},
      ]
    }),
    
    tableSchema({
      name: 'sets',
      columns: [
        // { name: 'set_id', type: 'number' },
        { name: 'reps', type: 'number' },
        { name: 'weight', type: 'number' }, 
        { name: 'note', type: 'string'},
        { name: 'set_type', type: 'string'},
        { name: 'prev_set_id', type: 'string'},
        { name: 'next_set_id', type: 'string'},

        { name: 'workout_exercise_id', type: 'string', isIndexed: true },
        { name: 'exercise_id', type: 'string', isIndexed: true },
      ]
    }),

    tableSchema({
      name: 'workout_exercises',
      columns: [
        { name: 'workout_id', type: 'string', isIndexed: true }, 
      ]
    }),

    tableSchema({
      name: 'workouts',
      columns: [
        { name: 'workout_name', type: 'string' },
        { name: 'workout_description', type: 'string' },
        { name: 'started_at', type: 'number', isIndexed: true},
        { name: 'duration', type: 'number'},

        { name: 'user_id', type: 'string', isIndexed: true },
      ]
    }),

    tableSchema({
      name: 'users',
      columns: [
        { name: 'username', type: 'string' },
        { name: 'theme', type: 'string' },
      ]
    })
    
    // tableSchema({
    //   name: 'supersets',
    //   columns: [
    //     { name: 'set_order', type: 'number' },
    //     // { name: 'superset_id', type: 'number', isIndexed: true }, 
    //   ]
    // }),

    // tableSchema({
    //   name: 'dropsets',
    //   columns: [
    //     { name: 'set_order', type: 'number' },
    //     // { name: 'dropset_id', type: 'number', isIndexed: true }, 
    //   ]
    // }),

    // tableSchema({
    //   name: 'myosets',
    //   columns: [
    //     { name: 'set_order', type: 'number' },
    //     // { name: 'myoset_id', type: 'number', isIndexed: true }, 
    //   ]
    // }),
  ]
})
