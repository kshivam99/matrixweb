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

