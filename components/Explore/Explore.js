import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utilsClient/baseUrl";
import cookie from "js-cookie";
import styles from "../../styles/Explore.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfileStats,
  followUser,
  unFollowUser,
} from "../../redux/slices/profileSlice";

function Explore({ user }) {
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const profileData = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileStats(user.username));
  }, []);

  function isAlreadyFollowed(userId) {
    return (
      profileData.profile.following &&
      profileData.profile.following.filter((item) => item === userId).length > 0
    );
  }

  const handleChange = async (e) => {
    const { value } = e.target;
    setText(value);
    if (value) {
      try {
        const token = cookie.get("token");
        const res = await axios.get(`${baseUrl}/api/search/${value}`, {
          headers: { Authorization: token },
        });
        setResults(res.data);
      } catch (error) {
        console.log("Error Searching");
      }
    }
  };

  console.log(profileData, "progi");
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Explore</span>
      </div>
      <div className={styles.body}>
        <input value={text} onChange={handleChange} />
      </div>
      {results.map((profile) => (
        <>
          <p>{profile.name}</p>
          {isAlreadyFollowed(profile._id) ? (
            <button
              onClick={() => {
                dispatch(unFollowUser(profile._id));
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(followUser(profile._id));
              }}
            >
              Follow
            </button>
          )}
        </>
      ))}
    </div>
  );
}

export default Explore;
