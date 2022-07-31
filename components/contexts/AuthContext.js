import React, { createContext } from "react";
import { validateToken } from "../../utils/wordpressApi";
const cookie = require("cookie");

const AuthContext = createContext();

export const getUser = async (context) => {
  const token = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)["jwt"]
    : "";

  if (!token) return { status: "SIGNED_OUT", user: null };

  const validate = await validateToken(token);

  if (validate.statusCode === 200) {
    return { status: "SIGNED_IN", user: validate.data };
  } else {
    return { status: "SIGNED_OUT", user: null };
  }
};

export const AuthProvider = (props) => {
  const auth = props.myAuth || { status: "SIGNED_OUT", user: null };

  const login = async (username, password) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).catch((error) => {
      console.error("Incorrect email or password entered.", error);
    });
  };

  const register = async (email, password, firstName, lastName) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        email: email || "",
        username: email.split("@")[0] || "",
        password: password || "",
        first_name: firstName,
        last_name: lastName,
      }),
    }).catch((error) => {
      console.error("Error in register function in authcontext: ", error);
    });
  };
  const logout = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => {
        console.error("Error in logout function in authcontext: ", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, register, logout }}
      {...props}
    />
  );
};
export const useAuth = () => {
  return React.useContext(AuthContext);
};
export const AuthConsumer = AuthContext.Consumer;
