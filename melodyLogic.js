var FinalMelodyOutput = [];

firstNote();
firstHalf(finalRhythmOutput.length);
secondHalf(finalRhythmOutput.length);
console.log("melody:" + FinalMelodyOutput);
function firstNote() {
  var firstNoteSlice = [];
  for (key in melody) {
    firstNoteSlice.push(melody[key][0]);
  }
  var randomIndex = Math.floor(Math.random() * firstNoteSlice.length);
  var note = firstNoteSlice[randomIndex];
  FinalMelodyOutput.push(note);
}

function firstHalf(notes) {
  //notes-2 to minus off the first note and last note. Divide by two to get the first half.
  for (let i = 0; i < Math.ceil((notes - 2) / 2); i++) {
    //references the last note in the final melody to make the next choice.
    var lastNote = FinalMelodyOutput[FinalMelodyOutput.length - 1];
    //the possible options baed on the last note.
    var possibleNoteOptions = [];

    for (key in melody) {
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
    var note = possibleNoteOptions[randomIndex];
    FinalMelodyOutput.push(note);
  }
}

function endNote() {
  var lastNoteSlice = [];
  for (key in melody) {
    //push all the last notes in the dict
    lastNoteSlice.push(melody[key][melody[key].length - 1]);
  }
  var randomIndex = Math.floor(Math.random() * lastNoteSlice.length);

  return lastNoteSlice[randomIndex];
}

function secondHalf(notes) {
  //   var l = lastNote();
  var noteSlice = [endNote()];
  //notes-2 to minus off the first note and last note. Divide by two to get the second half.
  for (let i = 0; i < Math.floor((notes - 2) / 2); i++) {
    //references the last note in the noteSlice to make the next choice.
    var lastNote = noteSlice[0];
    //the possible options baed on the last note.
    var possibleNoteOptions = [];

    for (key in melody) {
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
  FinalMelodyOutput = FinalMelodyOutput.concat(noteSlice);
}
