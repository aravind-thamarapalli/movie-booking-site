import {React, useState} from 'react'
import Slider from 'react-slick';
import RawData from '../RawData_Movies.json'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Genres from '../Genres.json'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { GiTicket } from "react-icons/gi";

const Content = () => {

  const cursor = useRef();

  useEffect(() =>{
    window.addEventListener("mousemove", (e) =>{
      const x = e.clientX;
      const y = e.clientY;
      cursor.current.style.left = x + "px";
      cursor.current.style.top = y + "px";
    });
  }, []);

  const navigate = useNavigate();

  const [MovieGenre, setMovieGenre] = useState('');
  const [genreColor, setGenreColor] = useState('');
  const [genreTab, setGenreTab] = useState(false);
  const FilteredGenre = RawData.filter((item) => item.genre === MovieGenre);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5.75,
    speed: 500
  }

  const settings2 = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5.75,
    speed: 500
  }

  return (
    <div className='content-sec'>
                  <div className="ticket-cursor" ref={cursor}><GiTicket /></div>
      <section>
        <div className="trending-sec">
          <h1>TRENDING NOW</h1>
          <Slider {...settings}>
            {RawData.map((item) => {
              return (
                <div className='trend-caro' key={item.id}>
                  <img className='content-caro-img' src={item.image} alt={item.title} />
                  <button className="trending-book-btn" onClick={() => {navigate('/booking', {state: {item}})}}>BOOK NOW</button>
                </div>
              )
            })}
          </Slider>
        </div>
      </section>
      <section>
        <div className="genre-slide">
          <h1>GENRES</h1>
            {!genreTab &&<div className="genre-card">
            {Genres.map((item) => {
              return (
                <div className='genre-caro' key={item.id}>
                  <h2 className='genre-title'>{item.name}</h2>
                  <button onClick={() => {setMovieGenre(item.name), setGenreColor(item.color), setGenreTab(true)}}>CHECK MOVIES</button>
                </div>
              )
            })}
            </div>}
            {genreTab && <div className="genre-movies-tab" style={{  background:`linear-gradient(200deg,${genreColor}, rgb(46, 46, 46))`}}>
              <div className="genre-movie-header">
              <h1>{MovieGenre}</h1>
              <button className="genre-movie-exit-btn" onClick={() => setGenreTab(!genreTab)}>X</button>
              </div>
              <div className="genre-movies-book-tab">
              {FilteredGenre.map((item) => {
                return (
                  <div className='genre-movies' key={item.id} >
                    <button className="genre-book-btn" onClick={() => {navigate('/booking', {state: {item}})}}>BOOK NOW</button>
                    <img className='genre-movies-img' src={item.image} alt={item.title} />
                  </div>
              )})}
              </div>
            </div>}
        </div>
      </section>
      {/* <section>
        <div className="recommended-sec">
        <h1>RECOMMENDED FOR YOU</h1>
        </div>
      </section> */}
    </div>
  )
}

export default Content
