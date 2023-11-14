var binaryLine = [];
var finalRhythmOutput = [];
var FinalMelodyOutput = [];
var finalOutput = [];
var lyrics = [];
var error = document.getElementById("errorMessage");

function start() {
  error.textContent = "";
  binaryLine = [];
  finalRhythmOutput = [];
  FinalMelodyOutput = [];
  finalOutput = [];
  lyrics = [];

  lyrics = getWords();
  //   lyrics = "The La zy dog Jump O ver the Quick Brown Fox";
  convertToBinary(lyrics);
  if (!binaryChecker()) {
    return;
  }
  mainMelodyLogic(binaryLine.length);
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

function getWords() {
  var inputValue = document.getElementById("inputText").value;
  var array = inputValue.split(" ");
  return array;
}

function convertToBinary(line) {
  for (var i = 0; i < line.length; i++) {
    if (capital(line[i])) {
      binaryLine.push(1);
    } else {
      binaryLine.push(0);
    }
  }
}

function capital(word) {
  if (word.charAt(0) == word.charAt(0).toUpperCase()) {
    return true;
  }
}

function binaryChecker() {
  var zeroCounter = 0;
  for (var i = 0; i < binaryLine.length; i++) {
    if (binaryLine[i] == 0) {
      zeroCounter += 1;
    } else if (binaryLine[i] == 1) {
      zeroCounter = 0;
    }
    if (zeroCounter > 2) {
      error.textContent =
        "You cannot have more than 2 unimportant words in a row!";
      return false;
    }
  }
  if (binaryLine[binaryLine.length - 1] == 0) {
    error.textContent = "You cannot end with an unimportant word!";
    return false;
  }
  return true;
}
