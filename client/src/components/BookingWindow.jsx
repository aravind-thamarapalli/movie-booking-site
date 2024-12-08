import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiTicket } from "react-icons/gi";
import axios from "axios";

const BookingWindow = () => {
    const cursor = useRef();

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            cursor.current.style.left = x + "px";
            cursor.current.style.top = y + "px";
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const data = useLocation();
    const item = data.state.item;

    let date = new Date();
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dateArray = [];
    for (let i = 0; i < 7; i++) {
        let newDate = new Date();
        newDate.setDate(date.getDate() + i);
        dateArray.push(newDate.getDate() + " " + weekDays[newDate.getDay()]);
    }

    const numRows = 11;
    const numSeatsPerRow = 15;
    const generateSeats = () =>
        Array.from({ length: numRows }, () =>
            Array.from({ length: numSeatsPerRow }, () => ({ status: 'available' }))
        );

    const [seats, setSeats] = useState(generateSeats());
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookDate, setBookDate] = useState('');
    const [bookTime, setBookTime] = useState('');
    const [bookTab, setBookTab] = useState(false);

    function seatRemover(selectedSeats, rowIndex, seatIndex) {
        const newIndex = selectedSeats.findIndex(seat => seat.row === rowLabels[rowIndex] && seat.seat === seatIndex + 1);
        selectedSeats.splice(newIndex, 1);
    }

    function handleSeatClick(rowIndex, seatIndex) {
        const newSeats = [...seats];
        const seat = newSeats[rowIndex][seatIndex];

        if (seat.status === 'available') {
            seat.status = 'selected';
            setSelectedSeats([...selectedSeats, { row: rowLabels[rowIndex], seat: seatIndex + 1, status: seat.status }]);
        } else if (seat.status === 'selected') {
            seat.status = 'available';
            seatRemover(selectedSeats, rowIndex, seatIndex);
        }

        setSeats(newSeats);
    }

    const handleBookTime = (e) => {
        setBookTime(e.target.innerText);
    };

    const handleBookDate = (date) => {
        setBookDate(date);
    };

    const rowLabels = Array.from({ length: numRows }, (_, i) => String.fromCharCode(65 + i));
    const columnLabels = Array.from({ length: numSeatsPerRow }, (_, i) => i + 1);


const handlePayment = async () => {
  if (!bookDate || !bookTime || selectedSeats.length === 0) {
    alert(
      "Please select a date, time, and seats before proceeding with payment."
    );
    return;
  }

  const bookingDetails = {
    movie: item.title,
    date: bookDate,
    time: bookTime,
    seats: selectedSeats.map((seat) => `${seat.row}${seat.seat}`),
    totalCost: selectedSeats.length * 145, // Assuming a ticket price of 145
    paymentMethod: document.getElementById("pay-type").value, // Get payment method
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/api/bookings",
      bookingDetails
    );

    if (response.status === 200) {
      alert(`Payment successful! Booking confirmed for ${item.title}.`);
      setSelectedSeats([]);
      setBookDate("");
      setBookTime("");
      setBookTab(false);
      setSeats(
        seats.map((row) => row.map((seat) => ({ status: "available" })))
      );
    } else {
      alert("Payment or booking failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during payment or booking:", error);
    alert("Something went wrong. Please try again later.");
  }
};

    return (
      <div>
        <div className="ticket-cursor" ref={cursor}>
          <GiTicket />
        </div>

        <div className="booking-panel-bg">
          <img src={item.bg} alt="" />
        </div>
        <div className="booking-panel">
          <div className="booking-availability-panel">
            <div className="booking-panel-header">
              <div className="booking-availability">
                <h2 className="booking-movie-title">{item.title}</h2>
                <p className="booking-movie-release-date">
                  released on {item.releasedate}
                </p>
              </div>
              <div className="booking-panel-exit">
                <Link to="/">
                  <button className="booking-panel-exit-btn">X</button>
                </Link>
              </div>
            </div>
            <div className="booking-panel-main">
              <div className="booking-panel-left">
                <div className="booking-date">
                  <div className="date-item">
                    {dateArray.map((date, index) => (
                      <div key={index}>
                        <input type="radio" name="date" id={`date-${index}`} />
                        <label
                          className={`date-item-label ${
                            bookDate === date ? "selected" : ""
                          }`}
                          htmlFor={`date-${index}`}
                          onClick={handleBookDate}
                        >
                          {date}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="booking-time">
                  <div className="time-item">
                    {[
                      "10:00 AM",
                      "1:00 PM",
                      "4:00 PM",
                      "7:00 PM",
                      "10:00 PM",
                    ].map((time, index) => (
                      <div key={index}>
                        <input type="radio" name="time" id={`time-${index}`} />
                        <label
                          className={`time-item-label ${
                            bookTime === time ? "selected" : ""
                          }`}
                          htmlFor={`time-${index}`}
                          onClick={handleBookTime}
                        >
                          {time}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="booking-details">
                  <div className="booking-details-ticket">
                    <p>
                      Seats:{" "}
                      <span>
                        {selectedSeats
                          .map((seat) => seat.row + seat.seat)
                          .join("  ")}
                      </span>
                    </p>
                  </div>
                  <div className="booking-details-cost">
                    <p>
                      Price: <span>{selectedSeats.length * 145} Rs</span>
                    </p>
                  </div>
                  <button
                    className="book-ticket-btn"
                    onClick={() => setBookTab(true)}
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
              <div className="ticket-booking-panel">
                <div className="screen">
                  <p>Screen</p>
                </div>

                <div className="seat-selection">
                  <div className="seat-columns">
                    {columnLabels.map((label, index) => (
                      <div key={index} className="seat-column-label">
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="seat-rows">
                    {seats.map((row, rowIndex) => (
                      <div key={rowIndex} className="seat-row">
                        <div className="seat-row-label">
                          {rowLabels[rowIndex]}
                        </div>
                        {row.map((seat, seatIndex) => (
                          <div
                            key={seatIndex}
                            className={`seat ${seat.status}`}
                            onClick={() => handleSeatClick(rowIndex, seatIndex)}
                          ></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="seat-legend">
                  <div className="legend-item available">Available</div>
                  <div className="legend-item booked">Booked</div>
                  <div className="legend-item selected">Selected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {bookTab && (
          <div className="booktab-main">
            <div className="booktab-header">
              <div className="booktab-header-title">Booking Details</div>
              <div
                className="booktab-header-close"
                onClick={() => {
                  setBookTab(false);
                }}
              >
                X
              </div>
            </div>
            <div className="booktab-body">
              <div className="booktab-details">
                <div className="booktab-booking-details">
                  <div className="booktab-movie-title">Movie Name : {item.title}</div>
                  <div className="booktab-booking-time">Show Time : {bookTime}</div>
                  <div className="booktab-booking-date">
                    Show Date : {bookDate.target.innerText}
                  </div>
                  <div className="booktab-seats">
                    <div className="booktab-seats-count">
                      {selectedSeats.length} Seats
                    </div>
                    <div className="booktab-booking-seats">
                      {selectedSeats
                        .map((seat) => seat.row + seat.seat)
                        .join("  ")}
                    </div>
                  </div>
                  <div className="booktab-paytype">
                    <select name="pay-type" id="pay-type">
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                      <option value="upi">UPI</option>
                    </select>
                    <button className="booktab-btn" onClick={handlePayment}>Pay</button>
                  </div>
                </div>
                <div className="booktab-booking-photo">
                  <img src={item.bg} alt="" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default BookingWindow;
