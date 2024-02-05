import { useState } from "react";
import banana from "/src/assets/banana.svg"

function BananaClicker() {
  const [count, setCount] = useState(0);
  
  function click() {
    setCount((count) => count + 1);
    console.log("CLICKED");
  }

  return (
    <>
      <button><img src={banana} alt="banana" onClick={(e) => {
        e.preventDefault();
        click();
      }} /></button>
      <p>
        banana is {count}
      </p>
    </>
  );
}

export default BananaClicker;
