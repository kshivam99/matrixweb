import { useRouter } from "next/router";
import Profile from "../components/Profile/Profile";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utilsClient/baseUrl";



export default function ProfilePage({user}) {
    const router = useRouter();
    const { username } = router.query;
    return (
        <Profile username={username} user={user}/>
        );
}

// export async function getServerSideProps(ctx) {
//     const { token } = parseCookies(ctx);
    
//     const res = await axios.get(`${baseUrl}/api/profile/posts/${ctx.query.username}`, {
//       headers: { Authorization: token }
//     });
//     return {
//       props: { posts: res.data },
//     };
//   }
  