import { fromEvent, timer, of, throwError } from "rxjs";
import {
  tap,
  map,
  takeUntil,
  skipUntil,
  finalize,
  takeWhile,
  mergeMap,
} from "rxjs/operators";

const input = document.getElementById("input");
const targetScreen = document.querySelector(".target");
const finishProcesses = () => {
  input.value = "";
  input.disabled = true;
  targetScreen.textContent = "";
};

const obs = fromEvent(input, "keyup").pipe(
  map((e) => e.target.value),
  mergeMap((e) => {
    if (e === "error") return throwError(new Error("error"));
    return of(e);
  }),
  takeWhile((e) => !(e === "complete"), false),
  takeUntil(timer(30000))
);

obs.subscribe({
  next(e) {
    targetScreen.textContent = e.split("").reverse().join("");
  },
  complete() {
    finishProcesses();
    console.log("completado.");
  },
  error(error) {
    finishProcesses();
    console.error(error);
  },
});
