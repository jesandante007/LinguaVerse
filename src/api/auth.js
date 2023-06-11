import axios from "axios";

// save an user to database
export const saveUser = (user) => {
  const currentUser = {
    name: user.displayName,
    email: user.email,
    image: user?.photoURL
  };
  axios
    .put(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, currentUser)
    .then((data) => {
      console.log(data.data);
    });
};

export const getRole = async email => {
  const res = await axios(`${import.meta.env.VITE_API_URL}/users/role/${email}`)
  return res.data
}