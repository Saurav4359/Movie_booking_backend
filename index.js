const express=require("express");
const fs=require("fs");
const app=express();

app.use(express.json());

app.post("/signup",(req,res)=> {
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;

    const data=JSON.parse(fs.readFileSync("data.txt","utf-8"));
         const userId=data.users.length +1;
            data.users.push({
    "id":  userId ,
    "username": username,
    "password": password,
     "email": email,
     "bookings": []
})
   fs.writeFileSync("data.txt",JSON.stringify(data));
res.status(201).json({
    message:"User created Successfully",
    userId : userId 
})
     
})

app.get("/movies",(req,res)=> {
     const data=JSON.parse(fs.readFileSync("data.txt","utf-8"));
     res.status(200).send(data.movies);
})
app.get("/movies/:movieId",(req,res)=> {
     const data=JSON.parse(fs.readFileSync("data.txt","utf-8"));
     const movieId=req.params.movieId;
     if(movieId>data.movies.length)
        res.status(404).json({ "message": "Movie not found" });
    res.send(data.movies[movieId -1]);
})
app.get("/movies/:movieId/shows",(req,res)=> {
     const data=JSON.parse(fs.readFileSync("data.txt","utf-8"));
     const movieId=req.params.movieId;
      res.status(200).send(data.movies[movieId -1].shows);
})

app.post("/bookings/:userId",(req,res)=> {
    const userId=req.params.userId;
    const movieId=req.body.movieId;
    const showId=req.body.showId;
    const seats=req.body.seats;
     const data=JSON.parse(fs.readFileSync("data.txt","utf-8"));
     const bookingID=getRandomInt(1001, 5000);
      data.user[userId-1].push({
        bookingID : bookingID,
        movieId:movieId,
        showId:showId,
        seats:seats,
        totalAmount: data.movies[movieId-1].shows[showId],
        
      })


})
app.get("/bookings/:userId",(req,res)=>{
    const userId=req.body.userId;
    const data=JSON.parse(fs.readFileSync("data.txt","utf-8"));
    res.status(200).send(data.users[userId-1].bookings);
     
})
app.get("/bookings/:userId/:bookingId",(req,res)=> {
    const userId=req.body.userId;
    const bookingId=req.body.bookingId;
    const data=JSON.parse(fs.readFileSync("data.txt","utf-8"));
    
})
app.put("/bookings/:userId/:bookingId",(req,res)=> {

})
app.delete("/bookings/:userId/:bookingId",(req,res)=> {

})













app.get("/summary/:userId",(req,res)=> {
    
})
app.listen(3001);