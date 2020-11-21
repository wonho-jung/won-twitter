import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { dbService, storageService } from "../fireabase";
import "./Tweet.css";
function Tweet({ tweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attacUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  return (
    <div className="tweet">
      {editing ? (
        <>
          <form className="tweet__form tweetEdit" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder={tweetObj.text}
              value={newTweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input className="formBtn" type="submit" value="Update Tweet" />
          </form>
          <span className="formBtn cancelBtn" onClick={toggleEditing}>
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attacUrl && (
            <img className="tweetImg" src={tweetObj.attacUrl} />
          )}
          {isOwner && (
            <div className="tweet__action">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
