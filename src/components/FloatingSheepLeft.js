import React, { useState, useEffect, useRef } from "react";
import sheepLeft from "../image/sheep-left.png";

function FloatingSheepLeft(props) {
  const [visible, setVisible] = useState(true);
  const randomHeight = Math.floor(Math.random() * 60);
  const randomWidth = Math.floor(Math.random() * 25);
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
      className="sheepLeft"
      src={sheepLeft}
      style={SheepStyles.current}
      alt="sheepLeft"
    ></img>
  ) : (
    <div />
  );
}

export default FloatingSheepLeft;
