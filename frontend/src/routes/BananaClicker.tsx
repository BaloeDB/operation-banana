import { useState } from "react";

function BananaClicker() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        banana is {count}
      </button>
    </>
  );
}

export default BananaClicker;
