import { useRef } from "react";
import "./App.css";

export default function App() {
  const inputRef = useRef();
  function focusOnInput() {
    inputRef.current.focus();
  }
  return (
    <div>
      Sign Up
      <input type="text" ref={inputRef} />
      <input type="text"  />
      <button onClick={focusOnInput}>Submit</button>
    </div>
  );
}
