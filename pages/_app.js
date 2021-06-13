import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import App from "next/app";
import { parseCookies, destroyCookie } from "nookies";
import baseUrl from "../utilsClient/baseUrl";
import { redirectUser } from "../utilsClient/authUser";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Provider } from 'react-redux';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  return(
    <Layout {...pageProps}>
       <Provider store={store}>
        <Component {...pageProps} />
        </Provider>
   </Layout>
  )
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
    ctx.pathname === "/posts/[id]" ||
    ctx.pathname === "/messages" ||
    ctx.pathname === "/explore" ||
    ctx.pathname === "/404";

  if (!token) {
    destroyCookie(ctx, "token");
    protectedRoutes && redirectUser(ctx, "/landing");
  } else {
    try {
      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: token },
      });
      const { user, userFollowStats } = res.data;
      !protectedRoutes && redirectUser(ctx, "/");
      pageProps.user = user;
      pageProps.userFollowStats = userFollowStats;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/landing");
    }
  }
  return { ...appProps };
};
export default MyApp;
