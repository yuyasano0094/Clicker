import "./App.css";
import React, { useState, useEffect } from "react";
import { db } from "./firebase/firebase";
import { onValue, ref, set } from "firebase/database";
import FloatingSheepLeft from "./components/FloatingSheepLeft";
import FloatingSheepRight from "./components/FloatingSheepRight";
function App() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [grow, setGrow] = useState(0);
  const [showSheep, setShowSheep] = useState([]);
  const [showModel, setShowModel] = useState(0);
  useEffect(() => {
    const starCountRef = ref(db, "count");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setTotalCount(data);
    });
  }, []);
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const handleClick = () => {
    // Increment the count and update the state
    const randomNumber = getRandomInt(2);
    setShowSheep([...showSheep, randomNumber]);
    setGrow(1);
    const newCount = count + 1;
    const newTotalCount = totalCount + 1;
    setCount(newCount);
    set(ref(db), {
      count: newTotalCount,
    });
    // Update the count in Firebase
  };
  const openCredits = () => {
    setShowModel(1);
  };
  const closeModel = () => {
    setShowModel(0);
  };
  return (
    <div className="App">
      <div className="appWrapper">
        <div className="clickCounter">
          <span>
            <h3 className="countHeading">
              {totalCount.toLocaleString() + " cm"}
            </h3>
          </span>
        </div>
        <div className="clickButton">
          <button className="btn" onClick={handleClick}>
            Water the Fungus
          </button>
        </div>
      </div>
      <div className="mushroomBackground"></div>
      <div
        onAnimationEnd={() => setGrow(0)}
        grow={grow}
        className="mushroomHost"
      ></div>
      <div className="sheepHolder">
        {showSheep.map((sheep, index) =>
          sheep === 1 ? (
            <FloatingSheepLeft delay={2000} key={index} />
          ) : (
            <FloatingSheepRight delay={2000} key={index} />
          )
        )}
      </div>

      {showModel === 1 ? (
        <div onClick={closeModel} className="creditWrapper">
          <div className="creditModel">
            <h2>Credits</h2>
            <p className="impomu">
              Idea Inspired by <a href="https://impomu.com/">impomu.com</a>
              {" (tysm!! <3)"}
            </p>
            <p>
              Created by <a href="https://twitter.com/KamiWW15">Kami </a>
            </p>
            <p>
              Art by <a href="https://twitter.com/KamiWW15"> Kami </a>
            </p>
            <p>
              Developed by{" "}
              <a href="https://www.linkedin.com/in/hongjian-huang/?locale=en_US">
                {" "}
                Hongjian Huang{" "}
              </a>
            </p>
            <p>
              Sounds by{" "}
              <a href="https://www.nijisanji.jp/en/talents/l/fulgur-ovid">
                Fulgur Ovid
              </a>
            </p>
            <p>
              Fulgur Portrait by{" "}
              <a href="https://www.nijisanji.jp/en/talents/l/fulgur-ovid">
                Nijisanji EN Official Art
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div />
      )}
      <div className="footer">
        <a href="https://www.youtube.com/@FulgurOvid"> Fulgur TY Channel |</a>
        <a href="https://twitter.com/Fulgur_Ovid"> Fulgur Twitter |</a>
        <a onClick={openCredits}> Credits</a>
      </div>
    </div>
  );
}

export default App;
