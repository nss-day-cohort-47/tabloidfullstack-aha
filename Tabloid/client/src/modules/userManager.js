import { getToken } from "./authManager";
const _apiUrl = "/api/userprofile";


  export const GetAllUsers = () => {
    return getToken().then((token) => {
      return fetch(_apiUrl + '/GetAll', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An unknown error occurred while trying to get quotes.");
        }
      });
    });
  }
  export const DeleteUser = (id) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    });
  }
  export const getUserById = (id) => {
    return getToken().then((token) => {
      return fetch(_apiUrl + `/GetUser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An unknown error occurred while trying to get quotes.");
        }
      });
    });
  }
  export const editUser= () => {
    return getToken().then((token) => {
      return fetch(_apiUrl + '/GetAll', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An unknown error occurred while trying to get quotes.");
        }
      });
    });
  }
  

