import { VexFlow, Factory, Formatter, Annotation } from "vexflow";

export function vexify(melody, rhythm, lyrics) {
  console.log(melody);
  console.log(rhythm);
  const noteMap = {
    1: "C4",
    2: "D4",
    3: "E4",
    4: "F4",
    5: "G4",
    6: "A4",
    7: "B4",
  };

  const container = document.getElementById("boo");
  container.innerHTML = "";
  const vf = new Factory({
    renderer: { elementId: "boo", width: 10000, height: 2000 },
  });

  const score = vf.EasyScore();
  const noteStrings = melody.map((mel) => `${noteMap[mel] || "C4"}/8`);
  console.log(noteStrings);

  const barWidth = 400;

  const system = vf.System({
    x: 10,
    y: 10,
    width: barWidth,
  });

  //loop here
  let input = "";
  const rest = "B4/8/r";
  let currentRhythmCount = 0;
  let currentBarCount = 1;
  let currentNoteCount = 0;

  while (noteStrings[currentNoteCount]) {
    for (let i = 0; i < 6; i++) {
      let currentRhythmNumber = rhythm[currentRhythmCount];
      if (currentBarCount == currentRhythmNumber) {
        input += noteStrings[currentNoteCount] + ",";
        currentRhythmCount++;
        currentNoteCount++;
      } else {
        input += rest + ",";
      }
      currentBarCount++;
    }
    input = input.replace(/,$/, "");
    console.log(input);
    currentBarCount = 1;

    const barNotes = score.notes(input);

    // Add lyrics to the actual notes in this bar
    barNotes.forEach((note, i) => {
      if (!note.isRest()) {
        const lyric = new Annotation(lyrics.shift() || "");
        lyric.setFont("Arial", 10).setVerticalJustification(3);
        note.addModifier(lyric);
      }
    });

    system
      .addStave({
        voices: [score.voice(barNotes, { time: "6/8" })],
      })
      .addClef("treble")
      .addTimeSignature("6/8");
    input = "";
  }
  const notes = score.notes(noteStrings.join(", "), { stem: "up" });
  notes.forEach((note, i) => {
    const lyric = new Annotation(lyrics[i]);
    lyric.setFont("Arial", 10).setVerticalJustification(3);
    note.addModifier(lyric);
  });
  vf.draw();
}

// Semibreve	Whole Note	"w"
// Minim	Half Note	"h"
// Crotchet	Quarter Note	"q"
// Quaver	Eighth Note	"8"
// Semiquaver	Sixteenth Note	"16"
// Demisemiquaver	Thirty-second Note	"32"
// Hemidemisemiquaver	Sixty-fourth Note	"64"

// for a later update
// function lastNote(lastNoteNumber) {
//   switch (lastNoteNumber) {
//     case 1:
//       return "hd";
//     case 2:
//       return "q";
//     case 3:
//       return "8";
//     case 4:
//       return "qd";
//     case 5:
//       return "q";
//     case 6:
//       return "8";
//   }
// }
