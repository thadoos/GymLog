import { PropsWithChildren } from "react";
import Realm from "realm";
import { RealmProvider } from "@realm/react";
import { WorkoutLog } from "../models/WorkoutLog";

export default function RealmWorkoutLogProvider({children}:PropsWithChildren){
  return(
    <RealmProvider schema={[WorkoutLog]}>{children}</RealmProvider>

  )
}