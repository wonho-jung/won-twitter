import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "../fireabase";

function HomeForm({ userObj }) {
  const [Post, setPost] = useState("");
  const [fileStr, setFileStr] = useState("");
  const onSubmit = async (event) => {
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
  const onClearFile = () => {
    setFileStr(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={Post}
          onChange={onChange}
          type="text"
          placeholder="What's up?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Post" />
        {fileStr && (
          <div>
            <img src={fileStr} alt={fileStr} width="100px" height="100px" />
            <button onClick={onClearFile}>Remove</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default HomeForm;
