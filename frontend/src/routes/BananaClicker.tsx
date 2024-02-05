import { useState } from "react";
import banana from "/src/assets/banana.svg";
import classes from "../styling/BananaClicker.module.css";

function BananaClicker() {
  const [count, setCount] = useState(0);
  
  function click() {
    setCount((count) => count + 1);
    console.log("CLICKED");
  }

  return (
    <>
      <button className={classes.BButton}><img 
        src={banana} 
        alt="banana"
        width="200px" 
        onClick={(e) => {
          e.preventDefault();
          click();
        }} /></button>
      <p>banana is {count}</p>
    </>
  );
}

export default BananaClicker;
