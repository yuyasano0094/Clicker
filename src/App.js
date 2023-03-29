import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { db } from "./firebase/firebase";
import { onValue, ref, set } from "firebase/database";
import FloatingSheepLeft from "./components/FloatingSheepLeft";
import FloatingSheepRight from "./components/FloatingSheepRight";
import mushroomHost from "./image/newMushroomHost.png";
import a1 from "./sounds/1.mp3";
import a2 from "./sounds/2.mp3";
import a3 from "./sounds/3.mp3";
import a4 from "./sounds/4.mp3";
import a5 from "./sounds/5.mp3";
import a6 from "./sounds/6.mp3";
import a7 from "./sounds/7.mp3";
import a8 from "./sounds/8.mp3";
import a9 from "./sounds/9.mp3";
import a10 from "./sounds/10.mp3";
import a11 from "./sounds/11.mp3";
import a12 from "./sounds/12.mp3";
import a13 from "./sounds/13.mp3";
import a14 from "./sounds/14.mp3";
import a15 from "./sounds/15.mp3";
function App() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [grow, setGrow] = useState(0);
  const [showSheep, setShowSheep] = useState([]);
  const [showModel, setShowModel] = useState(0);
  const [soundArray, setSoundArray] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "count");
    setSoundArray([
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
    ]);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setTotalCount(data);
    });
  }, []);
  const playSong = () => {
    const sound = soundArray[getRandomInt(soundArray.length)];
    const newAudio = new Audio(sound);
    if (newAudio) {
      newAudio.play();
    }
  };
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const handleClick = () => {
    // Increment the count and update the state
    if (totalCount > 0) {
      const randomNumber = getRandomInt(2);
      setShowSheep([...showSheep, randomNumber]);
      setGrow(1);
      playSong();
      const newCount = count + 1;
      const newTotalCount = totalCount + 1;
      setCount(newCount);
      set(ref(db), {
        count: newTotalCount,
      });
    } // Update the count in Firebase
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
      <div className="mushroomHost">
        <img
          grow={grow}
          onAnimationEnd={() => setGrow(0)}
          className="mushroomHostImg"
          src={mushroomHost}
          alt="mushroomHost"
        ></img>
      </div>
      <div className="sheepHolder">
        {showSheep.map((sheep, index) =>
          sheep === 1 ? (
            <FloatingSheepLeft delay={1000} key={index} />
          ) : (
            <FloatingSheepRight delay={1000} key={index} />
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
          </div>
        </div>
      ) : (
        <div />
      )}
      <div className="footer">
        <a href="https://www.youtube.com/@FulgurOvid"> Fulgur TY Channel |</a>
        <a href="https://twitter.com/Fulgur_Ovid"> Fulgur Twitter |</a>
        <a href="#/" onClick={openCredits}>
          {" "}
          Credits
        </a>
      </div>
    </div>
  );
}

export default App;
