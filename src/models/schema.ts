import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    // We'll add tableSchemas here later
    tableSchema({
      name: "muscle_groups",
      columns: [
        { name: "muscle_group_id", type: 'number'},
        { name: "muscle_group_name", type: 'string'},
      ]
    }),

    tableSchema({
      name: "muscles",
      columns: [
        { name: "muscle_id", type: 'number'},
        { name: "muscle_name", type: 'string'},
      ]
    }),

    tableSchema({
      name: 'exercises',
      columns: [
        { name: 'exercise_id', type: 'number' },
        { name: 'exercise_name', type: 'string' },
        { name: 'is_two_side_weight', type: 'boolean'},
        { name: 'note', type: 'string'},
      ]
    }),

    tableSchema({
      name: 'equipments',
      columns: [
        { name: 'equipment_id', type: 'number'},
        { name: 'equipment_name', type: 'string'},
      ]
    }),
    
    tableSchema({
      name: 'sets',
      columns: [
        { name: 'set_id', type: 'number' },
        { name: 'reps', type: 'number' },
        { name: 'weight', type: 'number' }, 
      ]
    }),

    tableSchema({
      name: 'dropsets',
      columns: [
        { name: 'dropset_id', type: 'number' }, 
      ]
    }),

    tableSchema({
      name: 'myosets',
      columns: [
        { name: 'myoset_id', type: 'number' }, 
      ]
    }),

    tableSchema({
      name: 'supersets',
      columns: [
        { name: 'superset_id', type: 'number' }, 
      ]
    }),

    tableSchema({
      name: 'workout_exercises',
      columns: [
        { name: 'workout_exercise_id', type: 'number' }, 
      ]
    }),
  ]
})