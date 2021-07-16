import React, { useState, useEffect, createContext, useContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  const [userProfiles, setUserProfiles] = useState([])

  const getAllUserProfiles = () => {

    return getToken().then((token) =>
    
    fetch(`${apiUrl}`, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`}})
    .then(res => res.json())
    .then(setUserProfiles))
  }

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);



  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        console.log("testing", resp)
        return resp.json()}));
  };

  const getUserProfileById = (userProfileId) => {
    return getToken().then((token) =>
    fetch(`${apiUrl}/getById/${userProfileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json()))
  }



  return (
    <UserProfileContext.Provider value={{ userProfiles, isLoggedIn, login, logout, register, getToken, getUserProfile, getAllUserProfiles, getUserProfileById}}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserProfileContext.Provider>
  );
}