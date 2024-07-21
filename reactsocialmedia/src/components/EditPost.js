import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditPost = ({
  posts,
  onHanldeEdit,
  editTitle,
  seteditTitle,
  editBody,
  seteditBody,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  useEffect(() => {
    if (post) {
      seteditTitle(post.title);
      seteditBody(post.body);
    }
  }, [post, seteditBody, seteditTitle]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h1>Edit Post</h1>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="PostTitle">Title</label>
            <input
              id="PostTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => seteditTitle(e.target.value)}
            ></input>
            <label htmlFor="PostBody">Body</label>
            <input
              id="PostBody"
              type="text"
              required
              value={editBody}
              onChange={(e) => seteditBody(e.target.value)}
            ></input>
            <button type="submit" onClick={() => onHanldeEdit(post.id)}>
              Edit Post
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <p> Post is Not Found...</p>
          <Link to="/">Visti out Home Page</Link>
        </>
      )}
    </main>
  );
};

export default EditPost;
