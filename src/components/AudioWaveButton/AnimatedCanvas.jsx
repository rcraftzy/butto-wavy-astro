import React from "react";
import { Power2, Power3, TweenMax } from "gsap";

class AnimatedCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.audioRef = React.createRef();
    this.state = {
      opt: {
        width: 0,
        height: 0,
        midY: 0,
        points: 80,
        stretch: 10,
        sinHeight: 0,
        speed: -0.35,
        strokeColor: "black",
        strokeWidth: 2,
        power: true,
      },
      time: 0,
    };
  }

  componentDidMount() {
    const c = this.canvasRef.current;
    const { opt } = this.state;
    const ctx = c.getContext("2d");

    opt.width = c.offsetWidth;
    opt.height = c.offsetHeight;
    opt.midY = c.offsetHeight / 2;

    c.width = opt.width * 2;
    c.height = opt.height * 2;
    c.style.width = `${opt.width}px`;
    c.style.height = `${opt.height}px`;

    ctx.scale(2, 2);
    ctx.strokeStyle = opt.strokeColor;
    ctx.lineWidth = opt.strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    this.animate();
  }

  animate = () => {
    const { opt, time } = this.state;
    const c = this.canvasRef.current;
    const ctx = c.getContext("2d");

    window.requestAnimationFrame(this.animate);
    ctx.clearRect(0, 0, opt.width, opt.height);
    this.setState((prevState) => ({ time: prevState.time + 1 }));

    ctx.beginPath();
    let increment = 0;

    for (let i = 0; i <= opt.points; i++) {
      if (i < opt.points / 2) {
        increment += 0.1;
      } else {
        increment += -0.1;
      }

      const x = (opt.width / opt.points) * i;
      const y = opt.midY +
        (Math.sin((time * opt.speed) + (i / opt.stretch)) * opt.sinHeight) *
          increment;
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  };

  handleCanvasClick = () => {
    const { opt } = this.state;
    const newPower = !opt.power;
    const audio = this.audioRef.current;

    this.setState(
      (prevState) => ({
        opt: { ...prevState.opt, power: newPower },
      }),
      () => {
        const { opt } = this.state;

        if (opt.power) {
          TweenMax.to(opt, 1, {
            sinHeight: 0,
            stretch: 10,
            ease: Power3.easeOut,
            onUpdate: () => this.forceUpdate(), // Force re-render during the animation
          });
          audio.pause();
        } else {
          TweenMax.to(opt, 1.4, {
            sinHeight: 4,
            stretch: 5.57,
            ease: Power2.easeInOut,
            onUpdate: () => this.forceUpdate(), // Force re-render during the animation
          });
          audio.play();
        }
      },
    );

    console.log(this.state.opt.power);
  };

  render() {
    return (
      <div>
        <div className="button">
          <canvas
            ref={this.canvasRef}
            onClick={this.handleCanvasClick}
            style={{ padding: "12px", margin: "0px" }}
          />
          <div className="circle" />
        </div>
        <audio ref={this.audioRef}>
          <source
            src="/Cartoon.mp3"
            type="audio/mp3"
          />
        </audio>
      </div>
    );
  }
}

export default AnimatedCanvas;
