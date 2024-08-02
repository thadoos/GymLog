import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useAppSettingStore } from '../../../store/appSettings';
import Colors from '../../../constants/Colors';
import { useRouter } from 'expo-router';

import { useWorkoutStore } from '../../../store/workoutState';


export default function FinishWorkoutModal(){
  const colorTheme = useAppSettingStore(state => state.theme);
  const router = useRouter();

  const workoutTitle = useWorkoutStore(state=>state.workoutName);
  const setWorkoutName = useWorkoutStore(state=>state.setWorkoutName);

  const workoutDescription = useWorkoutStore(state=>state.workoutDescription);
  const setWorkoutDescription = useWorkoutStore(state=>state.setWorkoutDescription);

  return(
    <View style={{flex: 1, backgroundColor: Colors[colorTheme].background}}>
      <View style = {[styles.container]}>
        <View style={styles.rowContainer}>
          <Text style={[styles.label, {color: Colors[colorTheme].text}]}>Title:</Text>
          <TextInput 
            style={[styles.textEntry, {color: Colors[colorTheme].text, borderColor: Colors[colorTheme].textInputBorder}]}
            placeholder='Enter Title'
            placeholderTextColor={Colors[colorTheme].text}
            value={workoutTitle}
            onChangeText={(text) => setWorkoutName(text)}
          />

        </View>
        <View style={styles.rowContainer}>
          <Text style={[styles.label, {color: Colors[colorTheme].text}]}>Description:</Text>
          <TextInput 
            multiline
            style={[styles.textEntry, {color: Colors[colorTheme].text, borderColor: Colors[colorTheme].textInputBorder,flexGrow: 1,}]}
            placeholder='Enter Title'
            placeholderTextColor={Colors[colorTheme].text}
            value={workoutDescription}
            onChangeText={(text) => setWorkoutDescription(text)}
          />

        </View>
      </View>
    </View>


  );
}



const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  rowContainer:{
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // borderWidth: 1,
  },
  label:{
    width: '35%',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 10,
    alignSelf: 'center',

    // borderWidth: 1,
  },
  textEntry:{
    fontSize: 18,
    fontWeight: '400',
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius:10,

  },
})