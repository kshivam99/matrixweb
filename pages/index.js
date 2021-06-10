import axios from "axios";
import baseUrl from "../utilsClient/baseUrl";
import { parseCookies } from "nookies";
import Feed from "../components/Feed/Feed";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/slices/postsSlice";


export default function Home(props) {
  const {user} = props;
  return (
    <Feed  user={user}/>
    );
}

// export async function getServerSideProps(ctx) {
//   const dispatch = useDispatch();
//   dispatch(fetchPosts(1));
//   // const { token } = parseCookies(ctx);
//   // const res = await axios.get(`${baseUrl}/api/posts`, {
//   //   headers: { Authorization: token },
//   //   params: { pageNumber: 1 },
//   // });
//   return {
//     props: {...props }
//   };
// }
