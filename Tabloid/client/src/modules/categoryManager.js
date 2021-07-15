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


export const deleteCategory = (categoryId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${categoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
    });
};



export const editCategory = (category) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${category.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        }).then(resp => {
            if (resp.ok) {
                return;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new category.");
            }
        });
    });
};

export const getCategoryById = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                 throw new Error("An unknown error occurred while trying to get category.");
            }
        });
    });
};
