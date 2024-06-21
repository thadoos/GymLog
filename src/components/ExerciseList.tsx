import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { FlashList } from "@shopify/flash-list";
import exercises from '../../assets/exercises.json'
import Colors from '../constants/Colors'

interface ExerciseDetailProps {
  keyword: string,
  description: string,
}

interface ExerciseListProps {
  details: Array<{ keyword: string; description: string }>;
}

function ExerciseDetail({ keyword, description }: ExerciseDetailProps) {
  return (<View style={[styles.exerciseDetailBlock, { flexDirection: keyword === "Notes" ? 'column' : 'row',flexWrap: keyword ==="Notes" ? 'wrap' : 'nowrap' }]}>
    <Text style={styles.exerciseDetailsKeyword}>
      {keyword}:
    </Text>
    <Text style={[styles.exerciseDetailsDesc]}>
      {description}
    </Text>
  </View>);
}

export default function ExerciseList({ details }: ExerciseListProps) {
  let colorScheme = useColorScheme();
  return (
    <View style={styles.container}>

      <FlashList
        showsVerticalScrollIndicator={false}
        data={exercises}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.exerciseBlock, { backgroundColor: Colors[colorScheme ?? 'light'].exerciseBlockBackground}]}>
            <Image style={styles.exerciseImage} source={require('../../assets/exerciseIcons/benchPress.png')} />
            <View style={styles.detailsBlock}>
              <Text style={styles.exerciseName}>
                {item.name}
              </Text>

              {details.map(({ keyword, description }) => {
                return <ExerciseDetail key={keyword} keyword={keyword} description={item[description as keyof typeof item]} />
              })}
            </View>


          </TouchableOpacity>
        )}
        estimatedItemSize={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    // paddingTop: 20,

  },


  exerciseBlock: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    // flexGrow: 1,
    paddingRight: 10,
  },
  exerciseImage: {
    width: 85,
    height: 85,
    marginRight: 25,
    padding: 5,
    borderRadius: 15,

  },
  detailsBlock: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '800',

  },

  exerciseDetailBlock: {
    width: '100%',
    flexWrap: 'wrap',
  },

  exerciseDetailsKeyword: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 3,
    marginRight: 5,
  },

  exerciseDetailsDesc: {
    width: '100%',
    fontSize: 14,
    fontWeight: '300',
    marginTop: 3,
  },
})