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
import EditPost from "./components/EditPost";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const [editTitle, seteditTitle] = useState("");
  const [editBody, seteditBody] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await api.get("/posts");
        setPosts(result.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        } else {
          console.log(err.message);
        }
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

  const onHanldeSubmit = async (e) => {
    console.log("handle new post");
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    try {
      const newPost = { id, title: title, body: body };
      const response = await api.post("/posts", newPost);
      setPosts([...posts, response.data]);
      setTitle("");
      setBody("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
      } else {
        console.log(err.message);
      }
    }
  };

  const onHandleDelete = async (id) => {
    try {
      console.log("handle delete");
      await api.delete(`/posts/${id}`);
      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
      } else {
        console.log(err.message);
      }
    }
  };

  const onHanldeEdit = async (id) => {
    const updatepost = { id, title: editTitle, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatepost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      seteditBody("");
      seteditTitle("");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
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

        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              onHanldeEdit={onHanldeEdit}
              editTitle={editTitle}
              seteditTitle={seteditTitle}
              editBody={editBody}
              seteditBody={seteditBody}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
