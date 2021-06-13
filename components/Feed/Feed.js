import Echobox from "./Echobox";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/Feed.module.css";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/slices/postsSlice";


function Feed({ user }) {
    const postsData = useSelector((state) => state.postsReducer);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);

    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(fetchPosts(1));
    },[])

    const fetchDataOnScroll = async () => {
        
      };
    
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Home</span>
      </div>
      <Echobox user={user} />
       <InfiniteScroll
        hasMore={hasMore}
        next={fetchDataOnScroll}
        loader={<p>Loading...</p>}
        endMessage={<p>End of posts</p>}
        dataLength={postsData.posts.length}
      >
        {postsData.posts.map((post) => (
          <Post postId={post._id} user={user} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Feed;
