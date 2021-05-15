import React, { useState, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAllPosts, getAllUsers } from "../features/appReducer";
import { connect } from "react-redux";
import "../App.scss";
import DefaultProfile from "../images/avatar.png";
import "./search.scss";

function Searcher() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

const initState = {
  searchName: "",
};

const Searchup = () => {
  const [{ searchName }, setState] = useState(initState);

  const clearState = () => {
    setState({ ...initState });
  };

  const resetSearch = (e) => {
    e.preventDefault();
    Searcher().then(clearState);
  };
};

function clearText(e) {
  e.preventDefault();
  // console.log(this.email.value, this.password.value);

  // clearing the values
  this.searchName.value = "";
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  filterContent(users, searchTerm) {
    const result = users.filter((user) => user.name.includes(searchTerm));
    this.setState({ users: result });
  }
  handleTextSearch = async (event) => {
    try {
      const searchTerm = event.target.value.toLowerCase();
      const apiUrl = `${process.env.REACT_APP_API_URL}/user/search/${searchTerm}`;
      const allUsers = await axios.get(apiUrl);

      if (allUsers && allUsers.data) {
        this.setState({
          users: allUsers.data,
        });
        event.preventDefault();
        return false;
      }
    } catch (error) {
      console.error("Search Error", error);
      return error;
    }
  };

  renderUsers = (users) => {
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

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <table class="table">{this.renderUsers(users)}</table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
