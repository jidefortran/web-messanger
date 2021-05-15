import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import DefaultPost from "../images/mountain.jpg";
import "../App.scss";
import Webcam from "react-webcam";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Timer from "../core/Timer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const videoConstraints = {
  width: "auto",
  height: "auto",
  facingMode: "user",
};

const audioContstraints = {
  audio: true,
};

const WebcamCapture = ({
  webCamBlobCallBack,
  startCapture,
  stopCapture,
  isTimerRunning,
}) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const handleStartCaptureClick = React.useCallback(() => {
    debugger;
    setCapturing(true);
    startCapture();
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
        webCamBlobCallBack([data]);
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    debugger;
    if (
      mediaRecorderRef &&
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      stopCapture();
      webCamBlobCallBack(recordedChunks);
    }
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  React.useEffect(() => {
    console.log("USE EFFECT IS TIMER RUNNING", isTimerRunning);
    if (
      !isTimerRunning &&
      mediaRecorderRef &&
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      debugger;
      mediaRecorderRef.current.stop();
      setCapturing(false);
      stopCapture();
      webCamBlobCallBack(recordedChunks);
    }
  }, [isTimerRunning]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        width={videoConstraints.width}
        videoContstraints={videoConstraints}
        audioContstraints={audioContstraints}
      />
      <div className="webcam-buttom-container">
        <svg
          viewBox="0 0 512 512"
          fill="green"
          height="4em"
          width="4em"
          onClick={handleStartCaptureClick}
        >
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-56 296V168l144 88z" />
        </svg>

        {/* <button
          onClick={() => {
            handleStartCaptureClick();
            this.setTimerOn(true);
          }}
        >
          I'm a button


    
        </button> */}

        <svg
          viewBox="0 0 24 24"
          fill="red"
          height="4em"
          width="4em"
          onClick={handleStopCaptureClick}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM9 9v6h6V9H9z" />
        </svg>
      </div>
    </div>
  );
};
class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false,
      base64VideoData: "",
      recordState: null,
      showMenu: false,
      isTimerRunning: false,
    };
  }

  init = (postId) => {
    singlePost(postId).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data.postedBy._id,
          title: data.title,
          body: data.body,
          error: "",
        });
      }
    });
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const postId = this.props.match.params.postId;
      const token = isAuthenticated().token;
      this.postData.set("base64VideoData", this.state.base64VideoData);

      update(postId, token, this.postData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true,
          });
        }
      });
    }
  };

  _webCamBlobCallBack = (chunks) => {
    console.log("_webCamBlobCallBack", chunks);

    const webCamblob = new Blob(chunks, { type: "video/webm" });
    console.log("webCamblob", webCamblob);

    const webCamUrl = URL.createObjectURL(webCamblob);
    console.log("webCamUrl", webCamUrl);

    const reader = new FileReader();
    reader.readAsDataURL(webCamblob);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log("base64data", base64data);
      const sizeInMbs = (base64data.length * (3 / 4)) / (1000 * 1000);
      if (sizeInMbs > 10) {
        this.setState({ base64VideoData: "" });

        alert("too high");
      } else {
        this.setState({
          base64VideoData: base64data,
        });
      }
    };
  };
  cf;

  editPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <TextField
          id="standard-basic"
          label="Title"
          className="form-control"
          onChange={this.handleChange("title")}
          value={title}
        />
      </div>

      <div className="form-group">
        <TextField
          id="standard-basic"
          label="Body"
          className="form-control"
          onChange={this.handleChange("body")}
          value={body}
          multiline
          rowsMax={4}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Update Post
      </button>
    </form>
  );

  render() {
    const {
      id,
      title,
      body,
      redirectToProfile,
      error,
      showMenu,
      isTimerRunning,
      loading,
    } = this.state;
    const menuVis = this.state.showMenu ? "show" : "hide";
    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5 page_title">{title}</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="">
            <LinearProgress color="secondary" />
            <LinearProgress color="primary" />
          </div>
        ) : (
          ""
        )}
        <div className={`menu ${menuVis}`}>
          {this.state.showMenu && (
            <WebcamCapture
              webCamBlobCallBack={this._webCamBlobCallBack}
              startCapture={() => {
                debugger;
                this.setState({
                  isTimerRunning: true,
                });
              }}
              stopCapture={() => {
                debugger;
                this.setState({
                  isTimerRunning: false,
                });
              }}
              isTimerRunning={isTimerRunning}
            />
          )}
        </div>
        <Timer
          callBack={() => {
            debugger;
            this.setState({
              isTimerRunning: false,
            });
          }}
          isTimerRunning={isTimerRunning}
        />
        <div>
          <p className="l">OFF Camera</p>
          <div className="round">
            <input
              className="input-button"
              type="checkbox"
              id="onoff"
              name="onoff"
              onClick={this.toggleMenu}
            />
            <div className="back">
              <label className="but" htmlFor="onoff">
                <span className="on">0</span>
                <span className="off">I</span>
              </label>
            </div>
          </div>
          <p className="r">ON Camera</p>
        </div>

        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={`${
            process.env.REACT_APP_API_URL
          }/post/photo/${id}?${new Date().getTime()}`}
          onError={(i) => (i.target.src = `${DefaultPost}`)}
          alt={title}
        />

        {isAuthenticated().user.role === "admin" ||
          (isAuthenticated().user._id === id && this.editPostForm(title, body))}

        {this.editPostForm(title, body)}
      </div>
    );
  }
}

export default EditPost;
