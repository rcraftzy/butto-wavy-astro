import { useEffect, useRef, useState } from "react";
import styles from "./RippleButton.module.css";

const RippleButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(4);
  const [isTransitioning, setTransitioning] = useState(false);
  const audioRef = useRef();
  const buttonRef = useRef(null);

  const handleMouseOver = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left; // Posición x del mouse dentro del botón
    const y = e.clientY - rect.top; // Posición y del mouse dentro del botón

    button.style.setProperty("--mouse-x", `${x}px`);
    button.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleClick = () => {
    if (isActive) {
      audioRef.current.pause();
      // if (currentIndex === 0) {
      //   setTransitioning(false);
      // } else {
      //   setCurrentIndex(0);
      // }
      setTimeout(() => {
        setTransitioning(false);
      }, 500);
      setTransitioning(!isTransitioning);
    } else {
      audioRef.current.play();
      // if (currentIndex === TransitionStyle.length - 1) {
      // } else {
      // }
      setTimeout(() => {
        setTransitioning(false);
      }, 500);
      setTransitioning(!isTransitioning);
      // setCurrentIndex((prevIndex) => prevIndex - 1);
    }
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleAutomaticTransition = () => {
      if (!isActive) {
        return setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % TransitionStyle.length
        );
      }
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        return newIndex < 0 ? TransitionStyle.length - 1 : newIndex;
      });
    };
    let timeoutId;
    if (isTransitioning) {
      timeoutId = setTimeout(() => {
        handleAutomaticTransition();
      }, 100);
    }
    return () => clearTimeout(timeoutId);
  }, [currentIndex, isTransitioning]);

  return (
    <div>
      <div
        ref={buttonRef}
        onMouseOver={handleMouseOver}
        className={`${styles.button}`}
        onClick={handleClick}
      >
        <div className={"wavy wavy-transition"}>
          <Wavy d={TransitionStyle[currentIndex].d} />
        </div>
        <div className={`${styles.circle}`}></div>
      </div>
      <audio ref={audioRef}>
        <source
          src="/Cartoon.mp3"
          type="audio/mp3"
        />
      </audio>
    </div>
  );
};

export default RippleButton;

export const Wavy = ({ d }) => (
  <svg
    width="500"
    height="46"
    viewBox="0 0 406 36"
    fill="none"
  >
    <path
      d={d}
      stroke="black"
    />
  </svg>
);

const TransitionStyle = [
  {
    d: "M1 6C3 -0.666667 5 -0.666667 7 6C9 12.6667 11 12.6667 13 6C15 -0.666667 17 -0.666667 19 6C21 12.6667 23 12.6667 25 6C27 -0.666667 29 -0.666667 31 6C33 12.6667 35 12.6667 37 6C39 -0.666667 41 -0.666667 43 6C45 12.6667 47 12.6667 49 6C51 -0.666667 53 -0.666667 55 6C57 12.6667 59 12.6667 61 6",
  },
  {
    d: "M1 4.5C3 0.5 5 0.5 7 4.5C9 8.5 11 8.5 13 4.5C15 0.5 17 0.5 19 4.5C21 8.5 23 8.5 25 4.5C27 0.5 29 0.5 31 4.5C33 8.5 35 8.5 37 4.5C39 0.5 41 0.5 43 4.5C45 8.5 47 8.5 49 4.5C51 0.5 53 0.5 55 4.5C57 8.5 59 8.5 61 4.5",
  },
  {
    d: "M1 3.5C3 0.833333 5 0.833333 7 3.5C9 6.16667 11 6.16667 13 3.5C15 0.833333 17 0.833333 19 3.5C21 6.16667 23 6.16667 25 3.5C27 0.833333 29 0.833333 31 3.5C33 6.16667 35 6.16667 37 3.5C39 0.833333 41 0.833333 43 3.5C45 6.16667 47 6.16667 49 3.5C51 0.833333 53 0.833333 55 3.5C57 6.16667 59 6.16667 61 3.5",
  },
  {
    d: "M1 2C3 0.666667 5 0.666667 7 2C9 3.33333 11 3.33333 13 2C15 0.666667 17 0.666667 19 2C21 3.33333 23 3.33333 25 2C27 0.666667 29 0.666667 31 2C33 3.33333 35 3.33333 37 2C39 0.666667 41 0.666667 43 2C45 3.33333 47 3.33333 49 2C51 0.666667 53 0.666667 55 2C57 3.33333 59 3.33333 61 2",
  },
  {
    d: "M0 1C2 1 4 1 6 1C8 1 10 1 12 1C14 1 16 1 18 1C20 1 22 1 24 1C26 1 28 1 30 1C32 1 34 1 36 1C38 1 40 1 42 1C44 1 46 1 48 1C50 1 52 1 54 1C56 1 58 1 60 1",
  },
];
