import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { validateToken } from "../../utils/wordpressApi";
const cookie = require("cookie");

const AuthContext = createContext({
  auth: {},
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
});

// not currently used
export const getUser = async (context) => {
  const token = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)["jwt"]
    : null

  if (!token) return { status: "SIGNED_OUT", user: null };

  const validate = await validateToken(token);

  if (validate.statusCode === 200) {
    return { status: "SIGNED_IN", user: validate.data };
  } else {
    return { status: "SIGNED_OUT", user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ status: "SIGNED_OUT", user: null });
  const [isLoading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const loadUserFromCookies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`)
          .then((res) => res.json())
          .catch((err) => console.error("error: ", err));

        if (!res.user) {
          setLoading(false);
          return;
        }
        const { id, name, user } = res.user;

        setAuth({
          status: "SIGNED_IN",
          user: {
            id,
            name,
            user,
          },
        });
        setLoading(false);

        return;
      } catch (error) {
        console.log("Error in function loadUserFromCookie (authcontext.js): ", error);
      }
    };
    loadUserFromCookies();
  }, []);

  const login = async (username, password) => {
    const loginResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    ).catch((error) => {
      console.error("Incorrect email or password entered.", error);
    });

    return loginResponse;
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
      .then(() => {
        setAuth({ status: "SIGNED_OUT", user: null });
        router.reload(router.pathname)
      })
      .catch((error) => {
        console.error("Error in logout function in authcontext: ", error);
      });
  };

  // set an extra user variable for convenience (for now)
  const user = auth.user

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, register, logout, isLoading, user, isAuthenticated:!!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
