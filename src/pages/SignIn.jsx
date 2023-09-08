// SignIn.js

import React, { useState } from "react";
import { auth } from "../config/firebase"; // Import your Firebase auth instance
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import PopupMessage from '../pages/PopupMessage';
import { useUser } from "../userContext"; // Import the useUser hook
import { db } from "../config/firebase";
import { doc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore/lite';

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState('');
  const { setUser } = useUser(); // Access the setUser function from the context


  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User successfully signed in
      const user = userCredential.user;
      const uid = user.uid;
      // Set the user's UID in the context
      getDocumentIdByUuid(uid).then((value)=> {
        setUser({ value });
        setMsg('Log in successfully!');
      setTimeout(function () {
        // After 3 seconds, go back in history
        history.push("/home");
      }, 3000);
      })
    } catch (error) {
      // Handle sign-in error
      console.error("Error signing in:", error);
    }
  };

  const getDocumentIdByUuid = async (uuid) => {
    try {
      const usersCollection = collection(db, "users"); // Replace "users" with your collection name
      const q = query(usersCollection, where("uuid", "==", uuid)); // Query to match documents where "uuid" field equals the provided UUID
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.size === 0) {
        console.log("No documents found with the provided UUID.");
        return null; // No matching document found
      }
  
      // Assuming there is only one document with the given UUID, you can access its ID like this:
      const documentId = querySnapshot.docs[0].id;
      return documentId;
    } catch (error) {
      console.error("Error getting document ID:", error);
      return null;
    }
  };
  

  // Define a JavaScript object with CSS styles for the input element
  const inputStyle = {
    padding: "10px",              // Add padding for spacing inside the input
    border: "1px solid #ccc",     // Add a border with a light gray color
    borderRadius: "5px",          // Add rounded corners
    fontSize: "16px",             // Set the font size
    backgroundColor: "#f4f4f4",  // Set the background color
    color: "#333",
    marginLeft: "10px",
    width: "70%"
  };

  return (
    <div className="app">
      <div className="container" style={{ textAlign: "center" }}>
        <br></br>
        <h3>Log in</h3>
        <form onSubmit={handleSignIn}>
          <div>
            <input
              type="email"
              style={inputStyle}
              value={email}
              placeholder="Email or username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div><br></br>
          <div>
            <input
              type="password"
              style={inputStyle}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <PopupMessage message={msg} />
          <br></br>
          <button type="submit" style={{ margin: "auto", display: "block", width: "78%", backgroundColor: "red", color: "white" }}>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
