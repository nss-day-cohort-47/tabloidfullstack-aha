import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "/api/category";

export const getAllCategories = () => {
    return fetch(`${_apiUrl}/`)
    .then((res) => res.json())
};

export const addCategory = (category) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new category.");
            }
        });
    });
};