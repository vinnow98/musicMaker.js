import {melody} from "./rawMusicData/rawMusicData";
// import "./assets/css/index.css";

export function mainMelodyLogic(noOfNotes) {
  var firstHalfNotes = firstHalf(noOfNotes);
  var secondHalfNotes = secondHalf(noOfNotes);
  var finalMelodyOutput = firstHalfNotes.concat(secondHalfNotes);
  return finalMelodyOutput
}

function firstNote() {
  var firstNoteSlice = [];

  for (var key in melody) {
    firstNoteSlice.push(melody[key][0]);
  }
  var randomIndex = Math.floor(Math.random() * firstNoteSlice.length);

  return firstNoteSlice[randomIndex];
}

function firstHalf(notes) {
  var firstHalfSlice = [];
  firstHalfSlice.push(firstNote());

  //notes-2 to minus off the first note and last note. Divide by two to get the first half.
  for (let i = 0; i < Math.ceil((notes - 2) / 2); i++) {
    //references the last note to make the next choice.
    var lastNote = firstHalfSlice[firstHalfSlice.length - 1];
    //the possible options based on the last note.
    var possibleNoteOptions = [];

    for (var key in melody) {
      for (var j = 0; j < melody[key].length - 1; j++) {
        if (melody[key][j] == lastNote) {
          if (melody[key][j + 1] == undefined) {
            continue;
          } else {
            possibleNoteOptions.push(melody[key][j + 1]);
          }
        }
      }
    }
    var randomIndex = Math.floor(Math.random() * possibleNoteOptions.length);
    firstHalfSlice.push(possibleNoteOptions[randomIndex]);
  }
  return firstHalfSlice;
}

function endNote() {
  var lastNoteSlice = [];
  for (var key in melody) {
    //push all the last notes in the dict
    lastNoteSlice.push(melody[key][melody[key].length - 1]);
  }
  var randomIndex = Math.floor(Math.random() * lastNoteSlice.length);

  return lastNoteSlice[randomIndex];
}

function secondHalf(notes) {
  var noteSlice = [endNote()];
  //notes-2 to minus off the first note and last note. Divide by two to get the second half.
  for (let i = 0; i < Math.floor((notes - 2) / 2); i++) {
    //references the last note in the noteSlice to make the next choice.
    var lastNote = noteSlice[0];
    //the possible options baed on the last note.
    var possibleNoteOptions = [];

    for (var key in melody) {
      for (var j = 0; j < melody[key].length - 1; j++) {
        if (melody[key][j] == lastNote) {
          if (melody[key][j - 1] == undefined) {
            continue;
          } else {
            possibleNoteOptions.push(melody[key][j - 1]);
          }
        }
      }
    }
    var randomIndex = Math.floor(Math.random() * possibleNoteOptions.length);
    var note = possibleNoteOptions[randomIndex];
    noteSlice.unshift(note);
  }
  return noteSlice;
}
