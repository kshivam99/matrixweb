import React, { useState } from "react";
import { Comment, Icon } from "semantic-ui-react";
import calculateTime from "../../utilsClient/calculateTime";
import { useDispatch } from "react-redux";
import { deleteComment  } from "../../redux/slices/postsSlice";

function PostComments({ comment, user, postId }) {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src={comment.user.profilePicUrl} />
          <Comment.Content>
            <Comment.Author as="a" href={`/${comment.user.username}`} style={{color:"#fff"}}>
              {comment.user.name}
            </Comment.Author>
            <Comment.Metadata style={{color:"#fff"}}>{calculateTime(comment.date)}</Comment.Metadata>

            <Comment.Text style={{color:"#fff"}}>{comment.text}</Comment.Text>

            <Comment.Actions>
              <Comment.Action>
                {( comment.user._id === user._id) && (
                  <Icon
                    color="red"
                    name="trash"
                    onClick={() => {
                      dispatch(deleteComment({postId, commentId: comment._id}));
                    }}
                  />
                )}
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
}

export default PostComments;
