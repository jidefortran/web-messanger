import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      open: "false",
      redirectToReferer: false,
      loading: false,
      recaptcha: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    // console.log(user);
    if (this.state.recaptcha) {
      signin(user).then((data) => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          // authenticate
          authenticate(data, () => {
            this.setState({ redirectToReferer: true });
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        error: "What day is today? Please write a correct answer!",
      });
    }
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
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    // console.log(user);
    if (this.state.recaptcha) {
      signin(user).then((data) => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          // authenticate
          authenticate(data, () => {
            this.setState({ redirectToReferer: true });
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        error: "What day is today? Please write a correct answer!",
      });
    }
  };

  signinForm = (email, password, recaptcha) => (
    <form>
      <div className="form-group">
        <TextField
          id="standard-basic"
          required
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
      <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>
        Submit
      </button>
    </form>
  );

  render() {
    const { email, password, error, redirectToReferer, loading, recaptcha } =
      this.state; //deconstruct
    if (redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 page_title">Sign in</h2>
        <hr />
        {/*<SocialLogin /> */}
        <hr />
        <div
          className="alert alert-danger"
          style={{ display: error ? " " : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="">
            <LinearProgress color="primary" />
            <LinearProgress color="secondary" />
          </div>
        ) : (
          ""
        )}
        {this.signinForm(email, password, recaptcha)}
        <p>
          <Link to="/forgot-password" className="text-danger">
            {" "}
            Forgot Password
          </Link>
        </p>
        ;
      </div>
    );
  }
}

export default Signin;
