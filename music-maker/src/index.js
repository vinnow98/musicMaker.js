import "./rawMusicData/rawMusicData";
import "./assets/css/index.css";
import { splitToSyllables } from "./splitToSyllables.js";
import { mainMelodyLogic } from "./melodyLogic.js";
import { mainRhythmLogic } from "./rhythmLogic.js";
import { vexify } from "./vex.js";

var finalOutput = [];
var error = document.getElementById("errorMessage");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".start-button").addEventListener("click", start);
});

async function start() {
  error.textContent = "";
  finalOutput = [];

  var inputValue = document.getElementById("inputText").value;
  const splitWords = await splitToSyllables(inputValue);
  if (splitWords.length < 2) {
    return;
  }
  const melodyOutput = mainMelodyLogic(splitWords.length);
  const rhythmOutput = mainRhythmLogic(splitWords);
  vexify(melodyOutput, rhythmOutput, splitWords);
}