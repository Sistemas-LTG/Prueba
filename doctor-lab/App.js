import React, { useEffect } from 'react';
import Navigation from "./app/navigations/Navigation";
import {LogBox} from 'react-native'
//import firebase from "firebase/app"
//import "firebase/auth"

LogBox.ignoreLogs(["Setting a timer",'Non-serializable values were found in the navigation state','Require cycles'])

export default function App() {

  
  return (
    <Navigation />    
  );
}
