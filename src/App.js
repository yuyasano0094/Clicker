import "./App.css";
import React, { useState, useEffect } from "react";
import { db } from "./firebase/firebase";
import { onValue, ref, set } from "firebase/database";
function App() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const starCountRef = ref(db, "count");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setTotalCount(data);
    });
  }, []);
  const handleClick = () => {
    // Increment the count and update the state
    const newCount = count + 1;
    const newTotalCount = totalCount + 1;
    setCount(newCount);
    set(ref(db), {
      count: newTotalCount,
    });
    // Update the count in Firebase
  };
  return (
    <div className="App">
      <div className="appWrapper">
        <div className="clickCounter">
          <span>
            <h3>{totalCount}</h3>
          </span>
        </div>
        <div className="clickButton">
          <button onClick={handleClick}>Click</button>
        </div>
        <div className="localCounter">
          <span>
            <h3>{count}</h3>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
