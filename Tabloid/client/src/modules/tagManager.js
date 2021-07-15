import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "/api/tag";

export const getAllTags = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get tags.");
            }
        });
    });
};

export const addTag = (tag) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new tag.");
            }
        });
    });
};

export const deleteTag = (tagId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${tagId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
    });
};

export const editTag = (tag) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${tag.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        }).then(resp => {
            if (resp.ok) {
                return;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new tag.");
            }
        });
    });
};

export const getTagById = (id) => {
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
                throw new Error("An unknown error occurred while trying to get quotes.");
            }
        });
    });
};

export const getAllPostTags = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/posttag/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get tags.");
            }
        });
    });
};

export const getTagsNotonPost = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/tagsnotonpost/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get tags.");
            }
        });
    });
};

export const deletePostTag = (tagId, postId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/deleteposttag?id=${tagId}&postid=${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
    });
};

export const addPostTag = (tagId, postId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/addposttag?tagid=${tagId}&postid=${postId}`, {
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
                throw new Error("An unknown error occurred while trying to save a new tag.");
            }
        });
    });
};
