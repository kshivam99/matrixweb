import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import Router from "next/router";
import cookie from "js-cookie";


export const registerUser = async (user, tempProfilePicUrl, setError, setLoading) => {

  try {
    setLoading(true);
    const res = await axios.post(`${baseUrl}/api/auth/register`, {...user, profilePicUrl: tempProfilePicUrl});
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false);
};

export const loginUser = async (user, setError, setLoading) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseUrl}/api/auth/login`, user);
    setToken(res.data);
    console.log(res);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    console.log("erroa aaya kya", errorMsg);
  }
  setLoading(false);
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

const setToken = token => {
  cookie.set("token", token);
  Router.push("/");
};

export const logoutUser = email => {
  cookie.set("userEmail", email);
  cookie.remove("token");
  Router.push("/login");
  Router.reload();
};
