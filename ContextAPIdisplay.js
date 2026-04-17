import React from "react";
import Controls from "./Controls";

function Display({ count, increment, decrement }) {
  return (
    <div>
      <h2>Count: {count}</h2>
      <Controls increment={increment} decrement={decrement} />
    </div>
  );
}

export default Display;
