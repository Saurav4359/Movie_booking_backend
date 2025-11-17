const e = require("express");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
app.use(express.json());
const readData = () => {
  const data = fs.readFileSync("p.txt", "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("p.txt", JSON.stringify(data, null, 2), "utf-8");
};
let Booking_ID = 1001;
let User_ID = 1;
app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  let email_validation = email.includes("@gmail.com");
  let data = readData();
  if (!username) {
    return res.status(400).json({ msg: " username must be present !" });
  } else if (!password) {
    return res.status(400).json({ msg: "password must be present !" });
  } else if (!email) {
    return res.status(400).json({ msg: "email must be present !" });
  } else {
    if (!email_validation) {
      return res.send("incorrect email");
    }
    if (data.users.some((u) => u.username === username)) {
      res.status(400).json({ message: "Username already exists" });
    }
    if (data.users.some((u) => u.email === email)) {
      res.status(400).json({ message: "Email already exists" });
    }

    let user = {
      id: User_ID,
      username,
      password,
      email,
      bookings: [],
    };

    data.users.push(user);
    User_ID++;
    writeData(data);
    res.status(201).json({
      message: "User created successfully .",
      userId: User_ID - 1,
    });
  }
});

app.get("/movies", (req, res) => {
  const data = readData();
  res.status(200).json(data.movies);
});

app.get("/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  if (isNaN(movieId)) {
    res.status(400).json({ message: "invalid Movie ID" });
  }
  let data = readData();
  let movies_check = data.movies.find((u) => u.id === movieId);
  if (!movies_check) {
    return res.status(400).json({ message: "Movie not found" });
  }
  res.status(200).json(movies_check);
});

app.get("/movies/:movieId/shows", (req, res) => {
  const movieId = req.params.movieId;
  if (isNaN(movieId)) {
    res.status(400).json({ message: "invalid Movie ID" });
  }
  let data = readData();
  let movies_check = data.movies.find((u) => u.id === movieIdId);
  if (!movies_check) {
    return res.status(400).json({ message: "Movie not found" });
  }
  res.status(200).json(movies_check.shows);
});

app.post("/bookings/:userId", (req, res) => {
  const userId = req.params.userId;
    const {movieId,showId,seats}=req.body;
  if (isNaN(userId)) {
    res.status(400).json({message :"Invalid User Id"});
  }
 
  if(!movieId ||!showId ||!seats) {
    res.status(400).json({message :"movieId are required"});
  }

  if(typeof seats !='number'|| seats <=0){
    res.status(400).json({message :"Invalid User Id"});
  }

});
app.listen(3000, () => {
  console.log(`Server running on Port ${port} `);
});
