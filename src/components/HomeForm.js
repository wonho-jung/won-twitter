import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "../fireabase";
import "./HomeForm.css";
function HomeForm({ userObj }) {
  const [Post, setPost] = useState("");
  const [fileStr, setFileStr] = useState("");
  const onSubmit = async (event) => {
    if (Post === "") {
      return;
    }
    event.preventDefault();
    let attacUrl = "";
    if (fileStr !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(fileStr, "data_url");
      attacUrl = await response.ref.getDownloadURL();
    }
    const PostObj = {
      text: Post,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attacUrl,
    };
    await dbService.collection("tweets").add(PostObj);
    setPost("");
    setFileStr("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setFileStr(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearFile = () => setFileStr("");
  return (
    <div>
      <form onSubmit={onSubmit} className="homeForm">
        <div className="homeForm__container">
          <input
            className="homeForm__input"
            value={Post}
            onChange={onChange}
            type="text"
            placeholder="What's up?"
            maxLength={120}
          />
          <input
            type="submit"
            value="&rarr;"
            className="homeForm__inputArrow"
          />
        </div>

        <label for="attach-file" className="homeform__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          className="homeForm__imgInput"
          type="file"
          id="attach-file"
          accept="image/*"
          onChange={onFileChange}
        />
        {fileStr && (
          <div className="homeForm__attachment">
            <img src={fileStr} alt={fileStr} className="homeForm__img" />
            <div className="homeForm__clear " onClick={onClearFile}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default HomeForm;
