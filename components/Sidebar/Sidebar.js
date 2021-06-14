import styles from "../../styles/Sidebar.module.css";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

function Sidebar({ user }) {
  const location = useRouter().pathname;

  return (
    <div className={styles.sidebar}>
      <Link href="/" passHref>
        <SidebarItem
          text="Home"
          name="home"
          active={location === "/"}
          new={false}
        />
      </Link>
      <Link href="/explore" passHref>
        <SidebarItem
          text="Explore"
          name="hashtag"
          active={location === "/explore"}
          new={false}
        />
      </Link>
      <Link href="/notifications" passHref>
        <SidebarItem
          text="Notifications"
          name="bell"
          active={location === "/notifications"}
          new = {user.unreadNotification}
        />
      </Link>

      <Link href="/messages" passHref>
        <SidebarItem
          text="Messages"
          name="envelope"
          active={location === "/messages"}
          new={user.unreadMessage}
        />
      </Link>
      <Link href={`/${user.username}`} passHref>
        <SidebarItem
          text="Profile"
          name="user"
          active={location === "/Profile"}
          new={false}
        />
      </Link>
      <div className={styles.echoButton}>
        <span>Echo</span>
      </div>
      <div className={styles.profileCard}>
        <div className="profileCardImage">
          {user && 
            <img
              src={user.profilePicUrl}
              alt="profile"
              width={50}
              height={50}
            />
          }
        </div>
        <div className={styles.profileCardNameCol}>
          <div className={styles.profileCardNameColName}>
            <span>{user.name}</span>
          </div>
          <div className={styles.profileCardNameColuserName}>
            <span>{`@${user.username}`}</span>
          </div>
        </div>
        <Icon name="log out" size='large'/>
      </div>
    </div>
  );
}

export default Sidebar;
