import Feed from "../components/Feed/Feed";


export default function Home(props) {
  const {user} = props;

  return (
    <Feed  user={user}/>
    );
}

