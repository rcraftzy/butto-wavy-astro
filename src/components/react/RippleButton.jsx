import { useRef, useState } from "react";
import styles from "./RippleButton.module.css";

const RippleButton = () => {
  const [isActive, setIsActive] = useState(false);
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
    isActive ? audioRef.current.pause() : audioRef.current.play();
    setIsActive(!isActive);
  };

  return (
    <div>
      <div
        ref={buttonRef}
        onMouseOver={handleMouseOver}
        className={`${styles.button}`}
        onClick={handleClick}
      >
        {isActive
          ? (
            <div className={"wavy wavy-transition"}>
              <Wavy />
            </div>
          )
          : (
            <div className="wavy-none">
              <Underline />
            </div>
          )}
        <div className={`${styles.circle}`}></div>
      </div>
      <audio ref={audioRef}>
        <source
          src="/Cartoon.mp3"
          type="audio/mp3"
        />
        Tu navegador no soporta la etiqueta de audio.
      </audio>
    </div>
  );
};
export default RippleButton;

export const Wavy = () => (
  <svg
    width="306"
    height="20"
    viewBox="0 0 406 36"
    fill="none"
  >
    <path
      d="M3 18C9.66667 -2 16.3333 -2 23 18C29.6667 38 36.3333 38 43 18C49.6667 -2 56.3333 -2 63 18C69.6667 38 76.3333 38 83 18C89.6667 -2 96.3333 -2 103 18C109.667 38 116.333 38 123 18C129.667 -2 136.333 -2 143 18C149.667 38 156.333 38 163 18C169.667 -2 176.333 -2 183 18C189.667 38 196.333 38 203 18C209.667 -2 216.333 -2 223 18C229.667 38 236.333 38 243 18C249.667 -2 256.333 -2 263 18C269.667 38 276.333 38 283 18C289.667 -2 296.333 -2 303 18C309.667 38 316.333 38 323 18C329.667 -2 336.333 -2 343 18C349.667 38 356.333 38 363 18C369.667 -2 376.333 -2 383 18C389.667 38 396.333 38 403 18"
      stroke="black"
    />
  </svg>
);
export const Underline = () => (
  <svg
    width="30"
    height="20"
    viewBox="0 -9.5 21 21"
  >
    <path d="M0 2h21V0H0z" stroke="#000" />
  </svg>
);
