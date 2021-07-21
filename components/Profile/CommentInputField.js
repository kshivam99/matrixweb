import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { postComment } from "../../redux/slices/postsSlice";
import { useDispatch } from "react-redux";

function CommentInputField({ postId }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  return (
    <Form
      reply
      onSubmit={async e => {
        e.preventDefault();
        setLoading(true);
        dispatch(postComment({postId, text}))
        setText("");
        setLoading(false);
      }}>
      <Form.Input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add Comment"
        action={{
          color: "#151515",
          icon: "edit",
          loading: loading,
          disabled: text === "" || loading
        }}
      />
    </Form>
  );
}

export default CommentInputField;
