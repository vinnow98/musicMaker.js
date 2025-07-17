import "./rawMusicData/rawMusicData"
import {mainMelodyLogic} from "./melodyLogic.js";
import {mainRhythmLogic} from "./rhythmLogic.js";
import "./assets/css/index.css";
import {splitToSyllables} from "./splitToSyllables.js"


var finalRhythmOutput = [];
var finalOutput = [];
var error = document.getElementById("errorMessage");

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector(".start-button").addEventListener("click",start)
})


async function start() {
  error.textContent = "";
  // binaryLine = [];
  finalRhythmOutput = [];
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

  mainMelodyLogic(splitWords.length);
  mainRhythmLogic();
  console.log("Rhythm:" + finalRhythmOutput);
  console.log("Melody:" + FinalMelodyOutput);
  combineMelodyAndRhythm();
  finalOutput = finalOutput.join("");
  console.log("final:" + finalOutput);
  convertBacktoHTML();
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


// const vf = new Vex.Flow.Factory({
//   renderer: {
//     elementId: "boo",
//     width: 1000,
//     height: 400,
//     background: "#fff",
//   },
// });

// const score = vf.EasyScore();
// const system = vf.System({ x: 10, y: 40, width: 400 }); // 👈 enough room

// // Measure 1
// system
//   .addStave({
//     voices: [
//       score.voice(
//         score
//           .notes("C#5/q, B4, B4")
//           .concat(score.beam(score.notes("A4/8, G#4/8", { stem: "down" })))
//       ),
//     ],
//   })
//   .addClef("treble")
//   .addTimeSignature("6/8");

// const system2 = vf.System({ x: 410, y: 40, width: 400 });
// // Measure 2 — goes to the right
// system2.addStave({
//   voices: [
//     score.voice(
//       score
//         .notes("C5/q, B4, A4")
//         .concat(score.beam(score.notes("G#4/8, F#4/8", { stem: "down" })))
//     ),
//   ],
// });

// vf.draw();