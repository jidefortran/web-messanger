import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";
import DefaultPost from "../images/mountain.jpg";

const MenuSearch = (props) => {
  const { allPosts, allUsers } = useSelector((state) => ({
    allPosts: state.app.allPosts,
    allUsers: state.app.allUsers,
  }));
  useEffect(() => {
    return () => {};
  }, []);

  const renderUsers = (users) => {
    return (
      <tbody>
        {users.map((user, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>
          

              <div className="card col-12 card__size searchUserCard">
                <div className="card-body">
                  <div className="user-single-card">
                    <img
                      style={{
                        height: "150px",
                        width: "auto",
                        borderRadius: "50%",
                      }}
                      className="img-thumbnail yy"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                      onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      alt={user.name}
                    />
                  </div>

                  <div className="user-single-card user-single-card__left">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <Link
                      to={`/user/${user._id}`}
                      className="btn btn-raised btn-primary btn-sm"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </td>
            

          
          </tr>
        ))}
      </tbody>
    );
  };
  const renderPosts = (posts) => {
    return (
      <>
        <div className="row" style={{ width: "100%" }}>
          {posts.map((post, i) => {
            const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
            const posterName = post.postedBy ? post.postedBy.name : " Unknown";

            return (
              <div className="card " key={i}>
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
                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-outline-success btn-rounded button-outline"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="container">
      {!!allPosts.length && (
        <>
          <h2 className="mt-5 mb-5 page_title">Searched Feeds</h2>
          {renderPosts(allPosts)}
        </>
      )}
      {!!allUsers.length && (
        <>
          <h1>Searched Users</h1>
          <table class="table">{renderUsers(allUsers)}</table>
        </>
      )}
    </div>
  );
};

export default withRouter(MenuSearch);
