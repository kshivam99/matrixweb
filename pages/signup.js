import styles from "../styles/Signup.module.css";
import Link from "next/link";
import { Input, Image, Loader } from "semantic-ui-react";
import { useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import uploadPic from "../utilsClient/uploadPicToCloudinary";
import {registerUser} from "../utilsClient/authUser";

const tooltipData = `When you register,
<br />
you agree to the terms of service 
<br />
and the Privacy Policy, 
<br />
including the use of cookies.
<br />
When you set your privacy options 
<br />
 accordingly, others can find 
 <br />
 you by email or phone number.`;

function Signup() {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    profilePicUrl: "",
  });
  const [profilePic, setProfilePic] = useState();
  const { name, username, password, profilePicUrl } = user;

  function uploadProfilePic() {
    ref.current.click();
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "media") {
      if (files[0] !== null) {
        setProfilePic(URL.createObjectURL(files[0]));
        setUser((prev) => ({ ...prev, profilePicUrl: files[0] }));
      }
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSignup() {
    if (user.profilePicUrl) {
      let tempProfilePicUrl = uploadPic(user.profilePicUrl);
      setUser((prev) => ({ ...prev, profilePicUrl: tempProfilePicUrl }));
    }
    registerUser(user, setError, setLoading);
  }

  return (
    <div className={styles["signUpContainer"]}>
      <div className={styles["card"]}>
        <div className={styles["signupHeader"]}>
          <span>Create your account</span>
        </div>
        {profilePic ? (
          <Image
            src={profilePic}
            alt="profile pic"
            onClick={uploadProfilePic}
            className={styles["profile--pic"]}
          />
        ) : (
          <Image
            src="/profile.png"
            alt="profile pic"
            onClick={uploadProfilePic}
            className={styles["profile--pic"]}
          />
        )}
        <div className={styles["inputs"]}>
          <Input
            size="large"
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <Input
            size="large"
            placeholder="Name"
            type="text"
            name="name"
            value={name}
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
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={ref}
          name="media"
          onChange={handleChange}
        />
        <button onClick={handleSignup} className={styles["signupBtn"]}>
          {loading?<Loader active inline='centered' />:"Sign Up"}
        </button>
        
        <p
          className={styles["terms"]}
          data-tip={tooltipData}
          style={{ textAlign: "left" }}
        >
          Terms & Conditions
        </p>
        <ReactTooltip multiline backgroundColor="#222222" />
      </div>
    </div>
  );
}

export default Signup;
