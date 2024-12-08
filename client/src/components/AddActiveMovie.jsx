import React from "react";
import { useEffect, useRef } from "react";
import { GiTicket } from "react-icons/gi";

const AddActiveMovie = () => {
  const cursor = useRef();

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.current.style.left = x + "px";
      cursor.current.style.top = y + "px";
    });
  }, []);

  return (
    <>
      <div className="ticket-cursor" ref={cursor}>
        <GiTicket />
      </div>
      <div className="dashboard-bg"></div>
      <div className="add">
        <div className="add-header">
          <h1>Dashboard</h1>
        </div>
        <div className="add-main">
          <div className="add-blocks">
            <div className="add-block-header">
              <h2>Add Active Movie</h2>
            </div>
            <div className="add-active-movies-tab">
              <div className="dashboard-active-movies-tab-block-img">
                <img src="https://www.fillmurray.com/640/360" alt="movie" />
              </div>
              <div className="dashboard-active-movies-tab-block-content">
                <div>
                  <input type="text" name="title" id="title" />
                  <label htmlFor="title">ENTER MOVIE TITLE</label>
                </div>
                <div>
                  <input type="text" name="director" id="director" />
                  <label htmlFor="director">ENTER DIRECTOR NAME</label>
                </div>
                <div>
                  <input type="text" name="pos-image" id="pos-image" />
                  <label htmlFor="pos-image">ENTER POSTER URL</label>
                </div>
                <div>
                  <input type="text" name="bg-image" id="bg-image" />
                  <label htmlFor="pos-image">ENTER COVER BG URL</label>
                </div>
                <div>
                  <input type="text" name="genre" id="genre" />
                  <label htmlFor="genre">ENTER MOVIE GENRE</label>
                </div>
                <div>
                  <input type="number" name="duration" id="duration" />
                  <label htmlFor="duration">ENTER MOVIE DURATION</label>
                </div>
                <div>
                  <input type="date" name="rel-date" id="rel-date" />
                  <label htmlFor="rel-date">ENTER RELEASE DATE</label>
                </div>
                <div>
                  <input type="text" name="lang" id="lang" />
                  <label htmlFor="lang">ENTER MOVIE LANGUAGE</label>
                </div>
                <div>
                  <input type="text" name="cinema" id="cinema" />
                  <label htmlFor="cinema">ENTER THEATER NAME</label>
                </div>
                <button className="add-active-movies-tab-btn">Add Movie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddActiveMovie;
