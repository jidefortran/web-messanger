import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Footer from "./core/Footer";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from "./admin/Admin";
import WebcamCapture from "./core/WebcamCapture";
import Preview from "./Preview";
import MenuSearch from './component/MenuSearch';
import Contact from './core/Contact';
import About from './core/About';
import TOS from './core/TOS';
import Privacy from './core/Privacy';
import Download from './core/Download';

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/preview">
        <Preview />
      </Route>
      <Route exact path="/search" component={MenuSearch} />
      <PrivateRoute exact path="/post/create" component={NewPost}>
        <NewPost />
      </PrivateRoute>
      <Route exact path="/post/:postId" component={SinglePost} />
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route
        exact
        path="/reset-password/:resetPasswordToken"
        component={ResetPassword}
      />
      <PrivateRoute exact path="/admin" component={Admin} />
      <Route exact path="/reset-password/:resetPasswordToken" />
      <Route exact path="/users" component={Users} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute exact path="/findpeople" component={FindPeople} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
    </Switch>

  </div>
  
);

export default MainRouter;
