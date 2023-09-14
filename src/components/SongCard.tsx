import React, { useState } from "react";
import axios from "axios";
import { TournametSubmitions } from "../App";

interface SongCardProps extends TournametSubmitions {
  deleteHandler: (songTitle: string) => void;
  editSong: (key:string, songTitle: string) => void;
}

const SongCard: React.FC<SongCardProps> = (props: SongCardProps) => {

  const [editButtonState, setEditButtonState] = useState<boolean>(false);
  const [editInputValue, setEditInputValue] = useState<string>(props.songTitle);


  const changeEditButtonState = () => {
    let notEditButtonState = !editButtonState;
    setEditButtonState(notEditButtonState);
  };


  return (
    <li key={props.songTitle}>
      {!editButtonState && (
        <>
          <h3>{props.songTitle}</h3>
          <a>{props.songUrl}</a>
          <button
            onClick={() => {
              props.deleteHandler(props.songTitle);
            }}
          >
            Delete
          </button>
          <button onClick={changeEditButtonState}>Edit</button>
        </>
      )}
      {editButtonState && (
        <>
          <input type="text" value={editInputValue} onChange={(e) => {setEditInputValue(e.target.value)}}/>
          <a>{props.songUrl}</a>
          <button onClick={changeEditButtonState}>Cancel</button>
          <button onClick={()=> {props.editSong(props.songTitle,editInputValue)}}>Submit</button>
        </>
      )}
    </li>
  );
};

export default SongCard;
