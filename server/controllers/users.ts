import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const users = [
  {
    email: "mohamednabil@gmail.com",
    password: "Pass@123",
  },
];

// Create a login route
export const loginUser: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((user) => user.email === email);

  // If the user is found, check the password
  if (user && user.password === password) {
    // The user is authenticated, so generate a JWT token
    const token = jwt.sign(
      { id: user.email },
      process.env.SECRET_KEY || "greatsecret123",
      {
        expiresIn: "1h",
      }
    );
    // Return the JWT token
    res.json(token);
  } else {
    // The user is not authenticated, so return an error
    res.status(401).json({ error: "Invalid email or password" });
  }
};

// Create a get users route
export const getUsers: RequestHandler = (req, res) => {
  // Return the users array
  res.json(users);
};
