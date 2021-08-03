"use strict";
import { fromEvent, Observable } from "rxjs";
import { tap } from "rxjs/operators";

const input = document.getElementById("inp");
const targetScreen = document.querySelector(".target");
const finishProcesses = () => {
  input.value = "";
  input.disabled = true;
  targetScreen.textContent = "";
};

const observable = new Observable((subscriber) => {
  try {
    const emitter = fromEvent(input, "keyup").pipe(
      tap((e) => {
        const targetValue = e.target.value;
        if (targetValue === "error") subscriber.error("Error ingresado");
        if (targetValue === "complete") subscriber.complete();
      })
    );
    emitter.subscribe(subscriber);

    setTimeout(() => {
      subscriber.complete();
    }, 30000);
  } catch (error) {
    subscriber.error(error);
  }
});

observable.subscribe({
  next(e) {
    const currTargetAsArr = e.target.value.split("");
    targetScreen.textContent = currTargetAsArr.reverse().join("");
  },
  complete() {
    finishProcesses();
    console.log("completado.");
  },
  error(error) {
    console.error(error);
  },
});
