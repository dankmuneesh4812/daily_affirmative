import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
const app = express();

// Sample array of quotes
const quotes = [
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The future belongs to those who believe in the beauty of their dreams.",
  // Add more quotes...
];

const tasks = [
    "Take a 10-minute walk outside",
    "Write down three things you're grateful for",
    "Drink a glass of water",
    "Do 10 jumping jacks",
    "Read a chapter from your favorite book",
    "Stretch for 5 minutes",
    "Call or text a friend to say hello",
    "Try a new recipe for a meal",
    "Write a short poem or journal entry",
    "Learn a new word and use it in a sentence",
    "Do a random act of kindness for someone",
    "Listen to a motivational podcast",
    "Take a photo of something that makes you smile",
    "Plan your goals for the week",
    "Learn a quick dance routine from a video",
    "Do a quick declutter of your workspace",
    "Try a new hobby for 15 minutes",
    "Express gratitude to someone in your life",
    "Spend 5 minutes meditating or deep breathing",
    "Write a letter to your future self",
  ];

// Middleware
app.use(cors());

// Endpoint to get a random quote
app.get('/api/quotes/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  res.json({ quote: randomQuote });
});

app.get('/api/tasks/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const randomTask = tasks[randomIndex];
    res.json({ task: randomTask });
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


mongoose.connect("mongodb+srv://BEE:BEE@cluster0.tewkza4.mongodb.net/Kotes?retryWrites=true&w=majority")
.then(()=> {
      console.log("Connted to database")
      app.listen(3000)
}
)
.catch((err)=> {
    console.log(err)
})