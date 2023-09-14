import React, { useState, useEffect } from "react";
import axios from "axios";
import SongCard from "./SongCard";

export interface TournametSubmitions {
  songUrl: string;
  songTitle: string;
}

function SongSubmit() {

  const [songUrlInputState, setSongUrlInputState] = useState<string>("");
  const [songTitleInputState, setSongTitleInputState] = useState<string>("");
  const [submitionsArray, setSubmitionsArray] = useState<TournametSubmitions[]>([]);
  const [editState, setEditState] = useState()

  const submitSongHandler = async () => {
    console.log(songUrlInputState);
    try {
      const res = await axios.post("/postSong", {
        songUrl: songUrlInputState,
        songTitle: songTitleInputState,
      });
      setSubmitionsArray(res.data);
    } catch {
      console.log("there was an issue with axios");
    }
  };

  let getSongs = async () => {
    try {
      console.log("in getSongs function");
      const res = await axios.get("/getSongs");
      setSubmitionsArray(res.data);
    } catch {
      console.log("there was an issue with axios");
    }
  };

  const deleteHandler = async (songTitle: string) => {
    const res = await axios.delete(`/deleteSong/${songTitle}`);
    setSubmitionsArray(res.data);
  }

  useEffect(() => {
    console.log("in useEffect");

    getSongs();
  }, []);

  const editSong = async (key:string, songTitle: string) => {
    const res = await axios.put(`/editSong/${key}`, {songTitle: songTitle});
    setSubmitionsArray(res.data);
  }

  let mappedSubmitions = submitionsArray.map((submition:TournametSubmitions) => {
    return <SongCard key={submition.songTitle} songUrl={submition.songUrl} songTitle={submition.songTitle} deleteHandler={deleteHandler} editSong={editSong}/>
  });

  return (
    <div >
      <h1>Song Submission</h1>
      <div>
        <label>Add Song: </label>
        <input
          type="text"
          onChange={(e) => {
            setSongUrlInputState(e.target.value);
          }}
          value={songUrlInputState}
          placeholder="Sound Cloud URL"
        />
        <label>Song Title: </label>
        <input
          type="text"
          onChange={(e) => {
            setSongTitleInputState(e.target.value);
          }}
          value={songTitleInputState}
          placeholder="Song Title"
        />
        <button onClick={submitSongHandler}> Submit </button>
      </div>
      <ul>{mappedSubmitions}</ul>
    </div>
  );
}

export default SongSubmit;
