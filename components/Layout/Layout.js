import Sidebar from "../Sidebar/Sidebar";
import styles from "../../styles/Home.module.css";
import nprogress from "nprogress";
import Router from "next/router";
import HeadTags from "./HeadTags";

const Layout = ({ children, user }) => {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      {user ? (
        <div className={styles.home}>
          <Sidebar user={user} />
          <div className={styles.homeBox}>{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
export default Layout;
