import '../styles/globals.css'
import "semantic-ui-css/semantic.min.css";
import App from 'next/app'
import { parseCookies, destroyCookie } from "nookies";
import baseUrl from "../utilsClient/baseUrl";
import { redirectUser } from "../utilsClient/authUser";
import axios from "axios";

function MyApp({ Component, pageProps}) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    const { Component, ctx } = appContext;
    const { token } = parseCookies(ctx);
    const { pageProps } = appProps;

    const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/[username]" ||
    ctx.pathname === "/notifications" ||
    ctx.pathname === "/post/[postId]" ||
    ctx.pathname === "/messages" ||
    ctx.pathname === "/search";

    if (!token) {
      destroyCookie(ctx, "token");
      protectedRoutes && redirectUser(ctx, "/landing");
    }
    else {
      try {
        const res = await axios.get(`${baseUrl}/auth`, {
          headers: { 'Authorization': token }
        });
        const { user, userFollowStats } = res.data;
        if (true) !protectedRoutes && redirectUser(ctx, "/");
        pageProps.user = user;
        pageProps.userFollowStats = userFollowStats;
      } catch (error) {
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/landing");
      }
    }
    return { ...appProps }
  } 
export default MyApp
