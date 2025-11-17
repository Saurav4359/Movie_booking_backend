const e = require("express");
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const data = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
  const userId = data.users.length + 1;
  data.users.push({
    id: userId,
    username: username,
    password: password,
    email: email,
    bookings: [],
  });
  fs.writeFileSync("data.txt", JSON.stringify(data,null,2));
  res.status(201).json({
    message: "User created Successfully",
    userId: userId,
  });
});

app.get("/movies", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
  res.status(200).send(data.movies);
});
app.get("/movies/:movieId", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
  const movieId = req.params.movieId;
  if (movieId > data.movies.length)
    res.status(404).json({ message: "Movie not found" });
  res.send(data.movies[movieId - 1]);
});
app.get("/movies/:movieId/shows", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
  const movieId = req.params.movieId;
  res.status(200).send(data.movies[movieId - 1].shows);
});



app.post("/bookings/:userId", (req, res) => {
  const userId = req.params.userId;
  const movieId = req.body.movieId;
  const showId = req.body.showId;
  const seats = parseInt(req.body.seats);
  const data = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
  const show=(data.movies[movieId-1].shows.find((p)=> p.showId==showId));
  let totalSeats=false;
   let total_seats_price=0;
  if(seats<=show.availableSeats) {
    totalSeats=true;
    total_seats_price= (show.pricePerSeat)*seats;
  }
if(!totalSeats)
   return res.json({ "message": "Not enough seats available" });

  const bookingID = Math.floor(Math.random()*(2000-1000 +1)+1000);
 const d=new Date();
 const bookingDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  data.users[userId - 1].bookings.push({
    bookingID: bookingID,
    movieId: movieId,
    showId: showId,
    seats: seats,
    totalAmount:total_seats_price,
    status : "Confirmed",
    BookingDate :bookingDate
  });
  fs.writeFileSync("data.txt",JSON.stringify(data,null,2));
   return res.status(201).json({
  message: "Booking successful",
  bookingId: bookingID,
  movieTitle: data.movies[movieId-1].title,
  showTime: show.time,
  seats: seats,
  totalAmount: total_seats_price,

});
});


app.get("/bookings/:userId", (req, res) => {
  const userId = req.params.userId;
  const data = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
  res.status(200).json(data.users[userId - 1].bookings);
});
app.get("/bookings/:userId/:bookingId", (req, res) => {
  const userId = req.params.userId;
  const bookingId = parseInt(req.params.bookingId);
  const data = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
  const bookings=data.users[userId-1].bookings.find((b)=> b.bookingID===bookingId)
  if(bookings===undefined)
    return res.status(401).json({ "message": "Booking not found" });

  return res.json(bookings);
});
app.put("/bookings/:userId/:bookingId", (req, res) => {});
app.delete("/bookings/:userId/:bookingId", (req, res) => {});

app.get("/summary/:userId", (req, res) => {});
app.listen(3001);
