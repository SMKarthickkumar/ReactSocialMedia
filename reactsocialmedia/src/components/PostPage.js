import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = ({ posts, onHandleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        <h1>PostPage</h1>
        {post && (
          <>
            <h1>{post.title}</h1>
            <p className="postbody">{post.body}</p>{" "}
            <button onClick={() => onHandleDelete(post.id)}>Delete</button>
          </>
        )}
        {!post && (
          <>
            <p>post not Found...</p>
            <p>
              <Link to="/">Visti our Home Page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
