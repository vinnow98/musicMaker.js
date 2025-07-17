import "./rawMusicData/rawMusicData";
import "./assets/css/index.css";
import { splitToSyllables } from "./splitToSyllables.js";

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

  console.log(splitWords);
  console.log(splitWords.length);
  //   lyrics = "The La zy dog Jump O ver the Quick Brown Fox";
  //   lyrics = "The Lazy dog Jump Over the Quick Brown Fox";
  // convertToBinary(lyrics);
  // if (!binaryChecker()) {
  //   return;
  // }
  // console.log(splitWords)
  // console.log(splitWords.length)

  const melodyOutput = mainMelodyLogic(splitWords.length);
  const rhythmOutput = mainRhythmLogic(splitWords);
  // console.log("Rhythm:" + rhythmOutput);
  // console.log("Melody:" + melodyOutput);
  // combineMelodyAndRhythm();
  // finalOutput = finalOutput.join("");
  // console.log("final:" + finalOutput);
  // convertBacktoHTML();
}

function convertBacktoHTML() {
  var outputContainer = document.getElementById("output");
  outputContainer.innerHTML = ""; // Clear the output container
  var melodyContainer = document.createElement("div");
  var syllableContainer = document.createElement("div");
  melodyContainer.id = "melodyContainer";
  syllableContainer.id = "syllableContainer";
  outputContainer.appendChild(melodyContainer);
  outputContainer.appendChild(syllableContainer);

  var lyricCounter = 0;
  var pipeCounter = 0;

  for (var i = 0; i < finalOutput.length; i++) {
    var newNote = document.createElement("div");
    var syllable = document.createElement("div");
    newNote.textContent = finalOutput[i];
    newNote.classList.add("note");
    melodyContainer.appendChild(newNote);

    if (finalOutput[i] != "." && finalOutput[i] != "|") {
      syllable.textContent = lyrics[lyricCounter];
      syllable.classList.add("syllable");
      newNote.appendChild(syllable);
      lyricCounter += 1;
    } else if (finalOutput[i] == "|") {
      pipeCounter += 1;
      if (pipeCounter % 2 === 0) {
        // Add a larger separator after every 3 "|"
        var separator = document.createElement("div");
        separator.classList.add("separator");
        melodyContainer.appendChild(separator);
      }
    }
  }
}

function combineMelodyAndRhythm() {
  var counter = 1;
  for (var j = 0; j < FinalMelodyOutput.length; j + 0) {
    for (var i = 0; i < 6; i++) {
      var rhythmCounter = finalRhythmOutput[j];
      if (counter == rhythmCounter) {
        finalOutput.push(FinalMelodyOutput[j]);
        j += 1;
      } else {
        finalOutput.push(".");
      }
      counter += 1;
      if (counter > 6) {
        counter = 1;
        finalOutput.push("|");
      }
    }
  }
}
