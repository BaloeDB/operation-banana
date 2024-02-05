import { useState } from 'react'
import classes from './styling/App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button className={classes.BanaanButton} onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App
