import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Login.module.css";
import { Input,Loader } from "semantic-ui-react";
import { loginUser } from "../utilsClient/authUser";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { username, password } = user;

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignin() {
    loginUser(user, setError, setLoading);
  }

  return (
    <div className={styles["login--container"]}>
      <div className={styles["login--card"]}>
        <div className={styles["cardHeader"]}>
          <Image src="/icon.png" alt="icon image" height={30} width={60} />
          <h1 className={styles["cardHeaderText"]}>Matrix</h1>
        </div>
        <div className={styles["inputs"]}>
          <Input
            size="large"
            placeholder="User Name"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <Input
            size="large"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error}
        <button onClick={handleSignin} className={styles["loginBtn"]}>
          {loading ? <Loader active inline="centered" /> : "Sign In"}
        </button>
        <div className={styles["loginLinks"]}>
          <span className={styles["elink"]}>Forgot password</span>
          <Link href="/signup">
            <span className={styles["elink"]}>Sign up on Matrix</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
