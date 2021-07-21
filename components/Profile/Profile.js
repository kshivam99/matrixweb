import { useState, useEffect } from "react";
import styles from "../../styles/Feed.module.css";
import Post from "./Post";
import Cover from "./Cover";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchProfileStats } from "../../redux/slices/profileSlice";
import Image from "next/image";


function Profile({ username, user }) {
  const profileData = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(username));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{username}</span>
      </div>
      <Cover username={username} />
      <hr style={{marginTop:"2rem", border: "1px solid #ffffff1a"}}/>
      {!profileData.posts.length && <div style={{display:"flex", justifyContent:"center", marginTop:"4rem"}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Image src="/nopost.svg" alt="No posts available" width={300} height={300}/>
        <h4>Nothing to show here</h4>
        </div>
      </div>
      }
      {profileData.posts.map((post) => (
        <Post postId={post._id} user={user} />
      ))}
      <div style={{ height: "4rem" }}></div>
    </div>
  );
}

export default Profile;
