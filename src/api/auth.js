import axios from "axios";

// save an user to database
export const saveUser = (user) => {
  const currentUser = {
    name: user.displayName,
    email: user.email,
  };
  axios
    .put(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, currentUser)
    .then((data) => {
      console.log(data.data);
    });
};

// make an user admin
export const makeAdmin = (email) => {
    const user = {
      role: 'admin'
    };
    axios
      .put(`${import.meta.env.VITE_API_URL}/users/${email}`, user)
      .then((data) => {
        console.log(data.data);
      });
  };
