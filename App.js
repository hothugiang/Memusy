import React from "react";
import { useState } from "react";
import MainContainer from "./scr/MainContainer";
import UserContext from "./scr/contexts/UserContext";

export default function App() {
  const [ username, setUsername ] = useState("");
  const [ userId, setUserId ] = useState("");
  const [ email, setEmail ] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId, email, setEmail }}>
      <MainContainer />
    </UserContext.Provider>
  );
}
