import Link from 'next/link'
import { BsChat } from "react-icons/bs"
import { BsSearch } from "react-icons/bs"
import { IoPeople } from "react-icons/io5"
import Image from 'next/image'
import styles from "../styles/Landing.module.css";

function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.logo}>
          <Image src="/icon.png" alt="matrix icon" width={300} height={300}/>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              <BsSearch className={styles.indexIcon} /> Follow what interests you.
            </span>
          </div>
          <div>
            <span>
              <IoPeople className={styles.indexIcon} />
              Hear what others are talking about.
            </span>
          </div>
          <div>
            <span>
              <BsChat className={styles.indexIcon} /> Join for conversation.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.col2}>
        <div className={styles["col2--body"]}>
          <span className={styles["header"]}>
            Matrix:   Social Media for Programmers
          </span>
          <span className={styles.join}>Join Matrix today.</span>
          <div className={styles.buttons}>
            <Link href="/signup">
              <button className={styles.signup}>Sign up</button>
            </Link>
            <Link href="/login">
              <button className={styles.login}>Log In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;