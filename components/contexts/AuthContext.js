import { createContext } from "react";
import router from "next/router";

const AuthContext = createContext();
const cookie = require("cookie");

export const getUser = async (context) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, {
    headers: new Headers({ Cookie: context.req.headers.cookie }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.statusCode === 200) {
        return { status: "SIGNED_IN", user: json.data };
      } else {
        return { status: "SIGNED_OUT", user: null };
      }
    })
    .catch((error) => {
      return { status: "SIGNED_OUT", user: null };
    });
};

export const AuthProvider = (props) => {
  const auth = props.myAuth || { status: "SIGNED_OUT", user: null };
  const login = async (username, password) => {
    // Use any auth service methods here
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(() => {
        router.push("/");
        console.log("user signed in");
      })
      .catch((error) => {
        console.error("Incorrect email or password entered.");
      });
  };
  const register = async (email, password, firstName, lastName) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        email: email || "",
        username: email.split("@")[0] || "",
        password: password || "",
        first_name: firstName,
        last_name: lastName,
      }),
    })
      .then(() => {
        router.push("/");
        console.log("user signed in");
      })
      .catch((error) => {
        console.error("Incorrect email or password entered.");
      });
  };
  const logout = async () => {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(() => {
        router.push("/");
        console.log("user logged out");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <AuthContext.Provider
      value={{ auth, logout, register, login }}
      {...props}
    />
  );
};
export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
