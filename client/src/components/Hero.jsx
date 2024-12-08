import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Slider from "react-slick";
import RawData from "../RawData_Movies.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Content from "./Content";
import Footer from "./Footer";
import { GiTicket } from "react-icons/gi";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "transparent",
        height: "50px",
        width: "50px",
        padding: "12.5px",
        margin: "50px",
        zIndex: "1",
      }}
      onClick={onClick}
    />
  );
}

const Hero = () => {
  const cursor = useRef();
  const [Dashboard, setDashboard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.current.style.left = x + "px";
      cursor.current.style.top = y + "px";
    });

    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    } else {
      setIsLoggedIn(false); // No token means user is not logged in
    }

    return () => {
      window.removeEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursor.current.style.left = x + "px";
        cursor.current.style.top = y + "px";
      });
    };
  }, []);

  const settings = {
    customPaging: function (RawData) {
      return (
        <div
          style={{
            width: "10px",
            height: "2px",
            backgroundColor: "lightblue",
            boxShadow: "0px 0px 10px 0px lightblue",
          }}
        ></div>
      );
    },
    dots: true,
    dotsClass: "slick-dots",
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.3) 60%, transparent 100%)",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  const navigate = useNavigate();

  const handleAccBar = () => {
    navigate("/signup");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Update state to show logout buttons
    navigate("/");
  };

  return (
    <>
      <div className="ticket-cursor" ref={cursor}>
        <GiTicket />
      </div>
      <section className="sec-nav">
        <div className="nav-main">
          <div className="nav-logo">
            <h2>SHOW-TIME</h2>
          </div>
          <div className="nav-btns">
            {!Dashboard && (
              <div className="nav-search">
                <BsSearch className="nav-search-icon" />
              </div>
            )}
            <div className="nav-options">
              {!Dashboard && <button>HOME</button>}
              {!Dashboard && <button>TRENDING NOW</button>}
              {!Dashboard && <button>YOUR BOOKINGS</button>}
            </div>
            {!isLoggedIn ? (
              // Display login/signup buttons if not logged in
              <div
                onClick={() => setDashboard(!Dashboard)}
                className="nav-acc-sett"
              >
                <CgProfile className="nav-acc-icon" />
              </div>
            ) : (
              // Display logout button if logged in
              <button onClick={handleLogout} className="nav-acc-sett">
                LOGOUT
              </button>
            )}
          </div>
          {Dashboard && (
            <div className="nav-acc-panel">
              <div
                className="nav-acc-panel-close"
                onClick={() => {
                  setDashboard(!Dashboard);
                }}
              >
                x
              </div>
              <div className="nav-acc-panel-main">
                {!isLoggedIn ? (
                  <>
                    <div className="nav-acc-panel-btns" onClick={handleAccBar}>
                      LOGIN
                    </div>
                  </>
                ) : (
                  <div className="nav-acc-panel-btns" onClick={handleDashboard}>
                    DASHBOARD
                  </div>
                )}
                <div className="nav-acc-panel-btns">HOME</div>
                <div className="nav-acc-panel-btns">TRENDING NOW</div>
                <div className="nav-acc-panel-btns">YOUR BOOKINGS</div>
                <div className="nav-acc-panel-btns">SETTINGS</div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section>
        <div>
          <Slider {...settings}>
            {RawData.map((item, index) => {
              return (
                <div className="caro-main" key={index}>
                  <div className="sec-1-bg">
                    <img src={item.bg} alt="bg" className="caro-bg" />
                  </div>
                  <div className="caro-content">
                    <h2 className="caro-title">{item.title}</h2>
                    <p className="caro-dir-name">
                      by <span>{item.director}</span>
                    </p>
                    <p className="caro-genre">{item.genre}</p>
                    <p className="caro-date">{item.releasedate}</p>
                    <p className="caro-dura">{item.duration} min</p>
                    <p className="caro-lang">{item.language}</p>
                    <p className="caro-cinema">
                      Released on <span>{item.cinema}</span>
                    </p>
                    <div className="caro-btns">
                      <button>WATCH TRAILER</button>
                      <button
                        onClick={() => {
                          navigate("/booking", { state: { item } });
                        }}
                      >
                        BOOK TICKETS
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
      <Content />
      <Footer />
    </>
  );
};

export default Hero;
