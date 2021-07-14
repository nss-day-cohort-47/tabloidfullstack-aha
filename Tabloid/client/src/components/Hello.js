import {React, useContext} from "react";
import { UserProfileContext } from '../modules/UserProfileManager.js';
export default function Hello() {
  const {currentUserId} = useContext(UserProfileContext);

  console.log(currentUserId)
  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>hello</span>
  );
}