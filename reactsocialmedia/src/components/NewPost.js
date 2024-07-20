import React from "react";

const NewPost = ({ onHanldeSubmit, title, setTitle, body, setBody }) => {
  return (
    <main className="NewPost">
      <form className="newPostForm" onSubmit={onHanldeSubmit}>
        <h2>New Post</h2>
        <label htmlFor="PostTitle">Title</label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label htmlFor="PostBody">Body</label>
        <textarea
          id="body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
