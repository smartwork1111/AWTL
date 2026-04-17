import React, { useState } from "react";
import Display from "./Display";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Counter App (Prop Drilling)</h1>
      <Display 
        count={count} 
        increment={increment} 
        decrement={decrement} 
      />
    </div>
  );
}

export default App;
