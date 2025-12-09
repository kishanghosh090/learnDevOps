import { useEffect, useState } from "react";

import "./App.css";
//http://5.223.78.185:5174/
function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://5.223.78.185:4000/api/message")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1>welcome to chai code frontend</h1>
      <h3>data {message}</h3>
    </>
  );
}

export default App;
