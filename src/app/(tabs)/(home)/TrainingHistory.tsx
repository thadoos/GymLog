import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import Colors from "../../../constants/Colors";
import { useAppSettingStore } from "../../../store/appSettings";
import { useRouter } from "expo-router";

interface TextBlockProps {
  keyword: string;
  text: string;
}
const TextBlock = ({ keyword, text }: TextBlockProps) => {
  const colorTheme = useAppSettingStore((state) => state.theme);
  return (
    <View style={[styles.textBlock, {}]}>
      <Text style={[styles.keywordText, { color: Colors[colorTheme].text }]}>
        {keyword}:
      </Text>
      <Text
        style={[styles.descriptionText, { color: Colors[colorTheme].text }]}
      >
        {text}
      </Text>
    </View>
  );
};

const getDuration = (timeDiff: number): string => {
  let stringDuration = "";
  let hour = Math.floor(timeDiff / 100 / 60 / 60);
  if (hour > 0) {
    timeDiff -= hour * 60 * 60 * 100;
    stringDuration = hour + " hours ";
  }
  let mins = Math.floor(timeDiff / 100 / 60);
  stringDuration = mins + " mins";

  return stringDuration;
};

const TrainingHistory = () => {
  const colorTheme = useAppSettingStore((state) => state.theme);
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: Colors[colorTheme].background,
      }}
    >
      <View style={styles.container}>
        {/* <FlatList
            style={styles.workoutFlatList}
            data={workoutList} // ! Need to add the workoutList implementation
            showsVerticalScrollIndicator={false}
            keyExtractor={(workoutLog)=>workoutLog._id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity 
              style={[styles.workoutBlock, {backgroundColor: Colors[colorTheme].exerciseBlockBackground}]}
              onPress={()=>{
                router.push(`(home)/${item._id.toHexString()}`)
                // router.push(`(home)/${item.workoutName}`)
              }}
              >
                <Text style={[styles.workoutName, {color: Colors[colorTheme].text}]}>{item.workoutName}</Text>
                <TextBlock keyword="Date of Workout" text={item.timeStart.toUTCString()}/>
                

              </TouchableOpacity>

            )}
          /> */}
      </View>
    </View>
  );
};

export default TrainingHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    flexDirection: "column",
  },
  workoutFlatList: {
    alignSelf: "center",
    width: "100%",
  },
  workoutBlock: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },

  textBlock: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  keywordText: {
    fontSize: 14,
    fontWeight: "700",
    marginRight: 7,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "300",
  },
});
