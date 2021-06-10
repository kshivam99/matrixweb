import Sidebar from "../Sidebar/Sidebar";
import styles from "../../styles/Home.module.css";

const Layout = ({ children, user }) => {
  return (
    <>
      {user ? (
        <div className={styles.home}>
          <Sidebar user={user}/>
          <div className={styles.homeBox}>{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
export default Layout;
