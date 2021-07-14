import firebase from "firebase/app";
import "firebase/auth";
// import { getToken } from "./authManager";

const _apiUrl = "/api/category";

export const getAllCategories = () => {
    return fetch(`${_apiUrl}/`)
    .then((res) => res.json())
};