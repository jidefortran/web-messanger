import React, { useEffect } from "react";
import "./Preview.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

const Preview = () => {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cameraImage) {
      history.replace("/post/create");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight"></div>

      <img src="{cameraImage}" alt="pic" />
    </div>
  );
};

export default Preview;
