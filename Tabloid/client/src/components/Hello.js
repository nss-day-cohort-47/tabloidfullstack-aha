import {React, useContext} from "react";
import { UserProfileContext } from '../modules/postUserProfileManager.js';
import thing from "./TABLOIDBOLD.jpg"
import "./Hello.css";

export default function Hello() {
  const {currentUserId} = useContext(UserProfileContext);

  console.log(currentUserId)
  return (
    <div>
    <img src={thing}  className="centerme" alt="user img"/>
    
    </div>
  );
}

