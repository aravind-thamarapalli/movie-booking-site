import React from "react";
import { useEffect, useRef } from "react";
import { GiTicket } from "react-icons/gi";

const AddUpcomingMovie = () => {
  const cursor = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.current.style.left = x + "px";
      cursor.current.style.top = y + "px";
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
              <h2>Add New Movie</h2>
            </div>
            <div className="add-upcoming-movies-tab">
              <div className="dashboard-upcoming-movies-tab-block-img">
                <img src="https://www.fillmurray.com/640/360" alt="movie" />
              </div>
              <div className="dashboard-upcoming-movies-tab-block-content">
                <div>
                  <label htmlFor="title">ENTER MOVIE TITLE</label>
                  <input type="text" name="title" id="title" />
                </div>
                <div>
                  <label htmlFor="director">ENTER DIRECTOR NAME</label>
                  <input type="text" name="director" id="director" />
                </div>
                <div>
                  <label htmlFor="pos-image">ENTER POSTER URL</label>
                  <input type="text" name="pos-image" id="pos-image" />
                </div>
                <div>
                  <label htmlFor="bg-image">ENTER COVER BG URL</label>
                  <input type="text" name="bg-image" id="bg-image" />
                </div>
                <div>
                  <label htmlFor="genre">ENTER MOVIE GENRE</label>
                  <input type="text" name="genre" id="genre" />
                </div>
                <div>
                  <label htmlFor="duration">ENTER MOVIE DURATION</label>
                  <input type="number" name="duration" id="duration" />
                </div>
                <div>
                  <label htmlFor="rel-date">ENTER RELEASE DATE</label>
                  <input type="date" name="rel-date" id="rel-date" />
                </div>
                <div>
                  <label htmlFor="lang">ENTER MOVIE LANGUAGE</label>
                  <input type="text" name="lang" id="lang" />
                </div>
                <div>
                  <label htmlFor="cinema">ENTER THEATER NAME</label>
                  <input type="text" name="cinema" id="cinema" />
                </div>
                <button className="add-upcoming-movies-tab-btn">Add Movie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpcomingMovie;
