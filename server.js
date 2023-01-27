const express = require("express");
const cors = require("cors");

const app = express();

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    console.log(`${req.body.email} has signed in!`);
    res.json("Success");
  } else {
    console.log("Login attempt failed");
    res.status(400).json("Fail");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  for (user of database.users) {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  }

  if (!found) {
    res.status(400).json("no user");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  for (user of database.users) {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  }
  if (!found) {
    res.status(400).json("no user");
  }
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
