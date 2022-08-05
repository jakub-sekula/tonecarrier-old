import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { isatty } from "tty";
import { validateToken } from "../../utils/wordpressApi";
const cookie = require("cookie");

const AuthContext = createContext({
  auth: {},
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
  setAuth: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
});

// not currently used
export const getUser = async (context) => {
  const token = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)["jwt"]
    : null;

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
  const [isAuthLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadUserFromCookies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`).catch(
          (err) => console.error("error: ", err)
        );

        const json = await res.json();

        if (res.status !== 200) {
          setAuthLoading(false);
          setAuth({
            status: "SIGNED_OUT",
            user: null,
          });
          //clear cookie if bad token
          return await logout();
        }

        if (!json.user) {
          setAuthLoading(false);
          setAuth({
            status: "SIGNED_OUT",
            user: null,
          });
          //clear cookie if bad token
          return await logout();
        }

        const { email: userEmail } = await getEmail();

        const { id, name, user } = json.user;
        setAuth({
          status: "SIGNED_IN",
          user: {
            id,
            name,
            user,
            email: userEmail,
          },
        });
        setAuthLoading(false);

        return;
      } catch (error) {
        console.log(
          "Error in function loadUserFromCookie (authcontext.js): ",
          error
        );
      }
    };
    if (isAuthLoading) {
      // console.log(`IsAuthLoading status: ${isAuthLoading}, loading user from cookies!`)
      loadUserFromCookies();
    }
    // console.log("loaded user from cookies");
  }, [isAuthLoading]);

  // log auth to console every time it's changed
  // useEffect(() => {
  //   console.log("auth status changed, new auth: ", auth);
  // }, [isAuthLoading]);

  const getEmail = async () => {
    const email = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email`, {
      method: "GET",
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Incorrect email or password entered.", error);
      });

    return email;
  };

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
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error("Incorrect email or password entered.", error);
      });

    if (loginResponse.token) {
      const userData = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/me`
      ).then((res) => res.json());

      const { id, name, user } = userData.user;

      // get email separately because it's not provided by default by the WP REST API
      const { email } = await getEmail();

      setAuth({
        status: "SIGNED_IN",
        user: {
          id: id || null,
          name: name || null,
          user: user || null,
          email: email || null,
        },
      });
    }

    return loginResponse;
  };
  const register = async (email, password, firstName, lastName) => {
    const registerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          email: email || "",
          username: email.split("@")[0] || "",
          password: password || "",
          first_name: firstName,
          last_name: lastName,
        }),
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error in register function in authcontext: ", error);
      });

    const { id, name, user } = registerResponse.user;

    setAuth({
      status: "SIGNED_IN",
      user: {
        id: id,
        name: name,
        user: user,
        email: email,
      },
    });
    return registerResponse;
  };
  const logout = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
      .then((res) => res.json())
      .then(() => {
        setAuth({ status: "SIGNED_OUT", user: null });
        // router.reload(router.pathname);
      })
      .catch((error) => {
        console.error("Error in logout function in authcontext: ", error);
      });
  };

  // set an extra user variable for convenience (for now)
  const user = auth.user;

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        getEmail,
        register,
        logout,
        isAuthLoading,
        setAuthLoading,
        user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
