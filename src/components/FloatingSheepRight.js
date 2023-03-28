import React, { useState, useEffect, useRef } from "react";
import sheepRight from "../image/sheep-right.png";

function FloatingSheepRight(props) {
  const [visible, setVisible] = useState(true);
  const randomHeight = Math.floor(Math.random() * 60);
  const randomWidth = Math.floor(Math.random() * 25) + 50;
  const SheepStyles = useRef({
    position: "absolute",
    top: `${randomHeight}vh`,
    left: `${randomWidth}vw`,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, props.delay);
    return () => clearTimeout(timer);
  }, [props.delay]);
  return visible ? (
    <img
      className="sheepRight"
      src={sheepRight}
      style={SheepStyles.current}
      alt="sheepRight"
    ></img>
  ) : (
    <div />
  );
}

export default FloatingSheepRight;
