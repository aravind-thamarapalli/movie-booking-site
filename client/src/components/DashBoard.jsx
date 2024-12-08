import React from 'react'
import { useEffect, useRef } from 'react';
import { GiTicket } from "react-icons/gi";
import RawData from '../RawData_Movies.json';
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const DashBoard = () => {

    const cursor = useRef();

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;
            cursor.current.style.left = x + "px";
            cursor.current.style.top = y + "px";
        });
    }, []);

    const navigate = useNavigate();

    const ActiveMovieData = RawData.filter((item) => item.status === 'active');
    const UpcomingMoviesData = RawData.filter((item) => item.status === 'upcoming');

    return (
      <>
        <div className="ticket-cursor" ref={cursor}>
          <GiTicket />
        </div>
        <div className="dashboard-bg"></div>
        <div className="dashboard">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
          </div>
          <div className="dashboard-main">
            <div className="dashboard-blocks">
              <div className="dashboard-block-header">
                <h2>Active Movies</h2>
                <button onClick={() => navigate('/AddActiveMovie')}>
                  <FaCirclePlus />
                </button>
              </div>
              <div className="dashboard-active-movies-tab">
                {ActiveMovieData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="dashboard-active-movies-tab-block"
                    >
                      <div className="dashboard-active-movies-tab-block-img">
                        <img src={item.image} alt="movie" />
                      </div>
                      <button className="dashboard-active-movies-tab-btn">
                        View Details
                      </button>
                      <div className="dashboard-active-movies-tab-block-content">
                        <h2>{item.title}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="dashboard-blocks">
              <div className="dashboard-block-header">
                <h2>Upcoming Movies</h2>
                <button onClick={() => {navigate('/AddUpcomingMovie')}}>
                  <FaCirclePlus />
                </button>
              </div>
              <div className="dashboard-active-movies-tab">
                {UpcomingMoviesData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="dashboard-active-movies-tab-block"
                    >
                      <div className="dashboard-active-movies-tab-block-img">
                        <img src={item.image} alt="movie" />
                      </div>
                      <button className="dashboard-active-movies-tab-btn">
                        View Details
                      </button>
                      <div className="dashboard-active-movies-tab-block-content">
                        <h2>{item.title}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="dashboard-blocks">CITIES</div>
            <div className="dashboard-blocks">PROFILE</div>
          </div>
        </div>
      </>
    );
}

export default DashBoard
