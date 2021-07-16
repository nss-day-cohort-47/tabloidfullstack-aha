import firebase from "firebase/app";

export const getCurrentUser = () => {
  let userId = '';
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userId = user.uid
    }
  })
  return userId;
} 