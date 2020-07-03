import React from "react";
import Post from "../../../components/Post/Post";
import axios from "axios";
import "./Posts.css";
import { Link } from "react-router-dom";

class Posts extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Ivo",
          };
        });
        this.setState({ posts: updatedPosts });
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
        //this.setState({ error: true });
      });
  }

  clickPostHandler = (id) => {
    this.setState({ selectedId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Link to={"/" + post.id} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.clickPostHandler(post.id)}
            />
          </Link>
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
