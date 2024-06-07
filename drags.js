import { Observable } from "rxjs";
import "./style.css";

const container = document.getElementById("sprite-container");
const sprite = document.getElementById("sprite");

const spriteMouseDowns = Observable.fromEvent(sprite, "mousedown");
const containerMouseMoves = Observable.fromEvent(container, "mousemove");
const containerMouseUps = Observable.fromEvent(container, "mouseup");

const spriteMouseDrags = spriteMouseDowns.flatMap((mouseDown) =>
  containerMouseMoves
    .map((mouseMove) => ({
      pageX: mouseMove.pageX - mouseDown.layerX,
      pageY: mouseMove.pageY - mouseDown.layerY,
    }))
    .takeUntil(containerMouseUps)
);

export const subscribeDrags = () => spriteMouseDrags.forEach((drag) => {
  sprite.style.left = drag.pageX + "px";
  sprite.style.top = drag.pageY + "px";
  sprite.style.transform = `rotate(${
    (drag.pageX % 360) + (drag.pageY % 360)
  }deg)`;
});
