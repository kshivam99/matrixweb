import { useRouter } from "next/router";
import axios from "axios";

function Product({ data }) {
  const router = useRouter();

  const { id } = router.query;
  console.log(data, "data is here");
  return (
    <div>
      {`This is Product ${id}`}
      {data.map((item) => (
        <p>{item.question}</p>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get("https://quizzard99.herokuapp.com/quizzes");

  return {
    props: { data: res.data },
  };
}

export async function getStaticPaths() {
  // const res = await axios.get("https://quizzard99.herokuapp.com/quizzes");

  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false
  };
}

export default Product;
