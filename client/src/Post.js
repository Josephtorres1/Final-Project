import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {};

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="DolanPettit"
          src="/static/images/avatar/1.jpg"
        ></Avatar>
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt=""></img>
      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => {
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>;
        })}
      </div>

      <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
      </form>
      <button
        disabled={!comment}
        className="post__button"
        type="submit"
        onClick={postComment}
      >
        Post
      </button>
    </div>
  );
}

export default Post;