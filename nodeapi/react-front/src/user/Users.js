import React, { Component } from "react";
import { Link } from "react-router-dom";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.png";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = (users) => {};
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 page_title">Users</h2>
        <div className="row row__center">
          {users.map((user, i) => (
            <div className="card col-12 card__size" key={i}>
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
          ))}
        </div>
        ;
      </div>
    );
  }
}

export default Users;
