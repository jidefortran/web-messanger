import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
      recaptcha: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  recaptchaHandler = (e) => {
    this.setState({ error: "" });
    let userDay = e.target.value.toLowerCase();
    let dayCount;

    if (userDay === "sunday") {
      dayCount = 0;
    } else if (userDay === "monday") {
      dayCount = 1;
    } else if (userDay === "tuesday") {
      dayCount = 2;
    } else if (userDay === "wednesday") {
      dayCount = 3;
    } else if (userDay === "thursday") {
      dayCount = 4;
    } else if (userDay === "friday") {
      dayCount = 5;
    } else if (userDay === "saturday") {
      dayCount = 6;
    }

    if (dayCount === new Date().getDay()) {
      this.setState({ recaptcha: true });
      return true;
    } else {
      this.setState({
        recaptcha: false,
      });
      return false;
    }
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };
    // console.log(user);
    if (this.state.recaptcha) {
      signup(user).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else
          this.setState({
            error: "",
            name: "",
            email: "",
            password: "",
            open: true,
          });
      });
    } else {
      this.setState({
        error: "What day is today? Please write a correct answer!",
      });
    }
  };

  signupForm = (name, email, password, recaptcha) => (
    <form>
      <div className="form-group">
        <TextField
          id="standard-basic"
          label="Name"
          className="form-control"
          onChange={this.handleChange("name")}
          value={name}
        />
      </div>
      <div className="form-group">
        <TextField
          id="standard-basic"
          label="Email"
          className="form-control"
          onChange={this.handleChange("email")}
          type="email"
          value={email}
        />
      </div>
      <div className="form-group">
        <TextField
          id="standard-basic"
          label="Password"
          className="form-control"
          onChange={this.handleChange("password")}
          type="password"
          value={password}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          {recaptcha ? "Thanks. You got it!" : "What day is today?"}
        </label>

        <TextField
          id="standard-basic"
          onChange={this.recaptchaHandler}
          className="form-control"
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Submit
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, open, recaptcha } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 page_title">Signup</h2>

        <hr />
        <SocialLogin />

        <hr />
        <br />

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New account is successfully created. Please{" "}
          <Link to="/signin">Sign In</Link>.
        </div>

        {this.signupForm(name, email, password, recaptcha)}
      </div>
    );
  }
}

export default Signup;
