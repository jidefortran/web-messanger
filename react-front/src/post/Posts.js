import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { list } from "./apiPost";
import { getAllPosts, getAllUsers } from "../features/appReducer";
import DefaultPost from "../images/mountain.jpg";
import { Link } from "react-router-dom";
import "../App.scss";
import "../core/searches.scss";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1,
    };
  }

  loadPosts = (page) => {
    list(page)
      .then((data) => {
        if (!data) {
          console.log("NO POSTS FOUND. MIGHT BE MONGO ERROR");
        } else if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ posts: data });
        }
      })
      .catch((error) => {
        console.error("loadPosts", error);
      });
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  handlePostSearch = async (event) => {
    try {
      const searchTerm = event.target.value.toLowerCase();
      const apiUrl = `${process.env.REACT_APP_API_URL}/posts/search/${searchTerm}`;
      if (searchTerm && searchTerm.length > 2) {
        const allPosts = await axios.get(apiUrl);
        if (allPosts && allPosts.data) {
          this.setState({
            posts: allPosts.data,
          });
        }
      } else if (!searchTerm) {
        this.loadPosts(this.state.page);
      }
    } catch (error) {
      console.error("Post Search Error", error);
      return error;
    }
  };

  renderPosts = (posts) => {
    return (
      <>
        <div className="row cardo" style={{ width: "100%" }}>
          {posts.map((post, i) => {
            const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
            const posterName = post.postedBy ? post.postedBy.name : " Unknown";

            return (
              <div className="card "  key={i}>

                 <Link
                    to={`/post/${post._id}`}
                    className=" card-hover"
                  >
                <div className="card-view">
                  <div className="card-header">
                    <div className="image-container">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                        alt={post.title}
                        onError={(i) => (i.target.src = `${DefaultPost}`)}
                        className="card-image"
                        // style={{  width: "auto" }}
                      />
                    </div>
                  </div>
                  <div className="card-content">
                    <h2 className="card-title">{post.title}</h2>
                    <p className="card-text">{post.body.substring(0, 50)}</p>
                    <br />
                    <div className="card-info">
                      <div className="poetName">
                        <span>
                          {" "}
                          <Link to={`${posterId}`}>{posterName} </Link>{" "}
                        </span>
                      </div>
                      <div className="poetName">
                        <span> {new Date(post.created).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
               
                   
                 
                </div>
                 </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  render() {
    const { posts, page } = this.state;
    const { allPosts } = this.props;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 page_title">
          {!posts.length ? "loading..." : " Poemsfeed"}
        </h2>
        {this.renderPosts(posts)}

        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous ({this.state.page - 1})
          </button>
        ) : (
          ""
        )}

        {posts.length ? (
          <button
            className="btn btn-raised btn-success mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { allPosts, allUsers } = state.app;
  return { allPosts, allUsers };
}
const mapDispatchToProps = {
  getAllPosts,
  getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
