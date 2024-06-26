import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { FlashList } from "@shopify/flash-list";
import exercises from '../../assets/exercises.json'
import Colors from '../constants/Colors'
import { useAppSettingStore } from '../store/appSettings';

interface ExerciseDetail {
  id: string,
  imageName: string,
  type: string,
  primaryGeneralMuscleGroup: string,
  secondaryGeneralMuscleGroup: string,
  primarySpecificMuscleGroup: Array<string>,
  secondarySpecificMuscleGroup: Array<string>,
  equipment: string,
  notes: string,
}

type ExerciseDetailOptions = "id" | "imageName" |"type" |"primaryGeneralMuscleGroup" |"secondaryGeneralMuscleGroup" |"primarySpecificMuscleGroup" |"secondarySpecificMuscleGroup" |"equipment" |"notes";

interface ExerciseDetailProps {
  keyword: string,
  description: ExerciseDetailOptions,
  item: ExerciseDetail,
}

interface ExerciseListProps {
  details: Array<{ keyword: string; description: ExerciseDetailOptions }>;
}

function ExerciseDetailLine({ keyword, description, item }: ExerciseDetailProps) {
  let colorTheme = useAppSettingStore(state=>state.theme);
  // TODO Change the styling to be based on a prop rather than based on the keyword used
  return (<View style={[styles.exerciseDetailBlock, { flexDirection: keyword === "Notes" ? 'column' : 'row', flexWrap: keyword ==="Notes" ? 'wrap' : 'nowrap' }]}>
    <Text style={[styles.exerciseDetailsKeyword, {color: Colors[colorTheme].text}]}>
      {keyword}:
    </Text>
    <Text style={[styles.exerciseDetailsDesc, {color: Colors[colorTheme].text}]}>
      {/* {typeof description === "string" ? description : description.map(item => {item})} */}
      {
        typeof item[description] === "string"
          ? item[description]
          : JSON.stringify(item[description])
          

      }
    </Text>
  </View>);
}

export default function ExerciseList({ details }: ExerciseListProps) {
  let colorTheme = useAppSettingStore(state=>state.theme);
  return (
    <View style={styles.container}>

      {/* Can replace FlatList with FlashList - Just need to include the estimatedItemSize */}
      <FlatList
        // estimatedItemSize={2}
        showsVerticalScrollIndicator={false}
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity key = {item.id} style={[styles.exerciseBlock, { backgroundColor: Colors[colorTheme].exerciseBlockBackground}]}>
            <Image style={styles.exerciseImage} source={require('../../assets/exerciseIcons/benchPress.png')} />
            <View style={styles.detailsBlock}>
              <Text style={[styles.exerciseName, {color: Colors[colorTheme].text}]}>
                {item.name}
              </Text>

              {details.map(({ keyword, description }) => {
                return <ExerciseDetailLine key = {description} keyword={keyword} description={description} item = {item}/>
                // return <ExerciseDetailLine keyword={keyword} description={item[description as keyof typeof item]} />
              })}
            </View>


          </TouchableOpacity>
        )}
        
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