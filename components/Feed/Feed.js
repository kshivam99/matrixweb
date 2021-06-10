import Echobox from "./Echobox";
import { useState, useEffect } from "react";
import baseUrl from "../../utilsClient/baseUrl";
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
        
        // try {
        //   const res = await axios.get(`${baseUrl}/api/posts`, {
        //     headers: { Authorization: cookie.get("token") },
        //     params: { pageNumber }
        //   });
    
        //   if (res.data.length === 0) setHasMore(false);
    
        //   setPosts(prev => [...prev, ...res.data]);
        //   setPageNumber(prev => prev + 1);
        // } catch (error) {
        //   alert("Error fetching Posts");
        // }
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
