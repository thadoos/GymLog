import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    // We'll add tableSchemas here later
    tableSchema({
      name: "muscle_groups",
      columns: [
        { name: "muscle_group_name", type: 'string' },
        { name: 'is_primary', type: 'boolean' },
      ]
    }),

    tableSchema({
      name: "muscles",
      columns: [
        // { name: "muscle_id", type: 'number', isIndexed: true },
        { name: "muscle_name", type: 'string' },
        { name: "muscle_group_id", type: 'string', isIndexed: true },
        { name: 'is_primary', type: 'boolean' },
      ]
    }),

    tableSchema({
      name: 'exercises',
      columns: [
        { name: 'exercise_id', type: 'number', isIndexed: true },
        { name: 'exercise_name', type: 'string' },
        { name: 'is_two_side_weight', type: 'boolean', isIndexed: true },
        { name: 'note', type: 'string'},
      ]
    }),

    tableSchema({
      name: 'equipments',
      columns: [
        { name: 'equipment_id', type: 'number', isIndexed: true},
        { name: 'equipment_name', type: 'string'},
      ]
    }),
    
    tableSchema({
      name: 'sets',
      columns: [
        { name: 'set_id', type: 'number' },
        { name: 'reps', type: 'number' },
        { name: 'weight', type: 'number' }, 
        { name: 'created_at', type: 'number' },
      ]
    }),

    tableSchema({
      name: 'dropsets',
      columns: [
        { name: 'dropset_id', type: 'number', isIndexed: true }, 
      ]
    }),

    tableSchema({
      name: 'myosets',
      columns: [
        { name: 'myoset_id', type: 'number', isIndexed: true }, 
      ]
    }),

    tableSchema({
      name: 'supersets',
      columns: [
        { name: 'superset_id', type: 'number', isIndexed: true }, 
      ]
    }),

    tableSchema({
      name: 'workout_exercises',
      columns: [
        { name: 'workout_exercise_id', type: 'number', isIndexed: true }, 
        { name: 'workout_exercise_id', type: 'number', isIndexed: true }, 
      ]
    }),

    tableSchema({
      name: 'workouts',
      columns: [
        // { name: 'workout_id', type: 'number', isIndexed: true }, 
        { name: 'workout_name', type: 'string' },
        { name: 'workout_description', type: 'string' },
        { name: 'started_at', type: 'number', isIndexed: true},
        { name: 'duration', type: 'number'},
        { name: 'created_at', type: 'number' },

        { name: 'user_id', type: 'string', isIndexed: true },
      ]
    }),

    tableSchema({
      name: 'users',
      columns: [
        { name: 'username', type: 'string' },
      ]
    })
    
  ]
})