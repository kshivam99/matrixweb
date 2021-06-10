
import { useState } from "react";
import styles from "../../styles/Feed.module.css";
import Post from "../Feed/Post";

function Profile({ postsData, user }) {
    const [posts, setPosts] = useState(postsData || []);

    // const fetchDataOnScroll = async () => {
        
    //     try {
    //       const res = await axios.get(`${baseUrl}/api/posts`, {
    //         headers: { Authorization: cookie.get("token") },
    //         params: { pageNumber }
    //       });
    
    //       if (res.data.length === 0) setHasMore(false);
    
    //       setPosts(prev => [...prev, ...res.data]);
    //       setPageNumber(prev => prev + 1);
    //     } catch (error) {
    //       alert("Error fetching Posts");
    //     }
    //   };
    
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{user.name}</span>
      </div>
    
        {posts.map((post) => (
          <Post post={post} user={user} setPosts={setPosts} />
        ))}
    </div>
  );
}

export default Profile;
