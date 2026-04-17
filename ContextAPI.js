import React, { useState, createContext, useContext } from "react";

// ✅ Create Context
const CounterContext = createContext();

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(0);

  return (
    <CounterContext.Provider
      value={{ count, step, increment, decrement, reset, setStep }}
    >
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1>Counter App (Single File)</h1>
        <Display />
      </div>
    </CounterContext.Provider>
  );
}

// ✅ Display Component
function Display() {
  const { count, step } = useContext(CounterContext);

  return (
    <div>
      <h2>Count: {count}</h2>
      <h3>Current Step: {step}</h3>
      <Controls />
    </div>
  );
}

// ✅ Controls Component
function Controls() {
  const { increment, decrement, reset, setStep } =
    useContext(CounterContext);

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={increment}>Increment ➕</button>
      <button onClick={decrement}>Decrement ➖</button>

      <br /><br />

      <button onClick={reset}>Reset 🔄</button>

      <br /><br />

      <button onClick={() => setStep(1)}>Step +1</button>
      <button onClick={() => setStep(5)}>Step +5</button>
    </div>
  );
}

export default App;
