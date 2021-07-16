import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "/api/subscription";

export const getSubscriptionStatus = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get subsctiption.");
            }
        });
    });
};

export const addSubscription = (id) => {

    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error("An unknown error occurred while trying to save a new subscription.");
                }
            });
        });
    };

export const deleteSubscription = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
    });
};