/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getAllPosts, getAllUsers } from "../features/appReducer";
import "../App.scss";
import { createBrowserHistory } from "history";
import { signout, isAuthenticated } from "../auth";
import logo from "../images/poetree_logo.png";

const history = createBrowserHistory();
const isActive = (history, path) => {
  // if (history.location.pathname === path) return { color: "#ff9900" };
  //  else return { color: "#2c2e30" };
};

const Menu = ({ history }) => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const handlePostSearch = async (event) => {
    try {
      const searchTerm = event.target.value.toLowerCase();
      const postsApiUrl = `${process.env.REACT_APP_API_URL}/posts/search/${searchTerm}`;
      const usersApiUrl = `${process.env.REACT_APP_API_URL}/user/search/${searchTerm}`;

      if (searchTerm && searchTerm.length > 2) {
        const allUsers = await axios.get(usersApiUrl);
        const allPosts = await axios.get(postsApiUrl);
        const [postsData, usersData] = await axios.all([allPosts, allUsers]);
        dispatch(getAllPosts(postsData));
        dispatch(getAllUsers(usersData));
        history.push({
          pathname: "/search",
          search: `?query=${searchTerm}`,
        });
        // if (allPosts && allPosts.data) {
        //   this.setState({
        //     posts: allPosts.data,
        //   });
        // }
      }
    } catch (error) {
      console.error("Post Search Error", error);
      return error;
    }
  };

  return (
    <>
      <nav className="navigation-menu">
        <div className="logo-holder">
          <label
            className="hamburger-icon"
            aria-label="Open navigation menu"
            for="menu-toggle"
          >
            &#9776;
          </label>
          <Link
            className={
              history.location.pathname === "/"
                ? "active nav-link"
                : "not-active nav-link"
            }
            to="/"
          >
            <img className="logo" src={logo} />
          </Link>
        </div>

        <div className="navContainer">
          <input type="checkbox" id="menu-toggle" />
          <ul className="main-navigation">
            <li className="nav-item">
              <Link
                className={
                  history.location.pathname === "/users"
                    ? "active "
                    : "not-active"
                }
                to="/users"
              >
                <span className="nav-link"> Users </span>
              </Link>
            </li>
            <div className="lblDrops">
              <li className="nav-item  dropdown">
                <span className="nav-link "> Dash </span>

                <div className="dropdown-content">
                  <ul className="nav__submenus">
                    {isAuthenticated() && (
                      <li className="sub-item">
                        <Link
                          to={`/post/create`}
                          style={isActive(history, `/post/create`)}
                          className="nav-link"
                        >
                          Create Post
                        </Link>
                      </li>
                    )}
                    {isAuthenticated() && (
                      <React.Fragment>
                        <li className="sub-item">
                          <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(
                              history,
                              `/user/${isAuthenticated().user._id}`
                            )}
                            className="nav-link"
                          >
                            {`${isAuthenticated().user.name}'s profile `}
                          </Link>
                        </li>
                      </React.Fragment>
                    )}
                  </ul>
                </div>
              </li>
            </div>
            <li className="nav-item">
              <Link to={`/findpeople`} style={isActive(history, `/findpeople`)}>
                {" "}
                <span className="nav-link"> Find People </span>
              </Link>
            </li>
            {!isAuthenticated() && (
              <React.Fragment>
                <li className="nav-item">
                  <Link
                    className=""
                    style={isActive(history, "/signin")}
                    to="/signin"
                  >
                    <span className="nav-link"> Sign in </span>
                  </Link>
                </li>
                <li>
                  <Link style={isActive(history, "/signup")} to="/signup">
                    <span className="nav-link"> Sign Up </span>
                  </Link>
                </li>
              </React.Fragment>
            )}
            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
              <li>
                <Link
                  to={`/admin`}
                  style={isActive(history, `/admin`)}
                  className=""
                >
                  <span className="nav-link"> Admin </span>
                </Link>
              </li>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <Link>
                  <span
                    className="nav-link"
                    style={
                      (isActive(history, `/signout`), { cursor: "pointer" })
                    }
                    onClick={() => signout(() => history.push("/"))}
                  >
                    Sign Out
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="form__group field">
        <div className="backHome">
          <Link
            className={
              history.location.pathname === "/"
                ? "active nav-link"
                : "not-active nav-link"
            }
            to="/"
          >
            {" "}
            Back
          </Link>
        </div>
        <div className="backHomeDiv">
          <input
            type="input"
            className="form__field"
            placeholder="Search Users or Posts "
            onChange={handlePostSearch}
            ref={searchInput}
          />
          <span>
            {" "}
            <i
              className="fa fa-times fas-find"
              onClick={(event) => {
                searchInput.current.value = "";
              }}
            ></i>
          </span>
          <label for="name" class="form__label"></label>
        </div>
      </div>
    </>
  );
};

<React.Fragment></React.Fragment>;

export default withRouter(Menu);
