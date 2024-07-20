import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ search, setSearch }) => {
  return (
    <nav className="Nav">
      <form className="SearchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="Search">Search Post : </label>
        <input
          className="Input"
          id="search"
          type="text"
          placeholder="Seach post.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
