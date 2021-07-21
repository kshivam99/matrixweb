import Echobox from "./Echobox";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/Feed.module.css";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/slices/postsSlice";
import Image from "next/image";

function Feed({ user }) {
  const postsData = useSelector((state) => state.postsReducer);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(()=>{
      dispatch(fetchPosts(1));
    },1000)
  }, []);

  const fetchDataOnScroll = async () => {
    dispatch(fetchPosts(pageNumber));
    setPageNumber((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Home</span>
      </div>
      <Echobox user={user} />
      {!postsData.posts.length && <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Image src="/nopost.svg" alt="No posts available" width={300} height={300}/>
        <h4>No post found, Follow someone!</h4>
        </div>
      </div>
      }
      {postsData.posts.map((post) => (
        <Post postId={post._id} user={user} />
      ))}
      <div style={{ height: "4rem" }}></div>
    </div>
  );
}

export default Feed;
