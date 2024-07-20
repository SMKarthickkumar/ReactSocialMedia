import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import Footer from "./components/Footer";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My first post",
      body: "1 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      id: 2,
      title: "My second post",
      body: "2 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      id: 3,
      title: "My third post",
      body: "3 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      id: 4,
      title: "My fourth post",
      body: "4 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

  const onHanldeSubmit = (e) => {
    console.log("handle new post");
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = { id, title: title, body: body };
    setPosts([...posts, newPost]);
    setTitle("");
    setBody("");
  };

  const onHandleDelete = (id) => {
    console.log("handle delete");
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
    navigate("/");
  };

  return (
    <div className="App">
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-post">New Post</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/new-post" element={<NewPost />}></Route>
        <Route path="/post" element={<PostPage />}></Route>
      </Routes> */}

      <Header title="React Social App" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post">
          <Route
            index
            element={
              <NewPost
                onHanldeSubmit={onHanldeSubmit}
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} onHandleDelete={onHandleDelete} />}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
