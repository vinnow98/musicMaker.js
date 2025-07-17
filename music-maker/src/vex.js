import {VexFlow,Factory } from "vexflow";
import { mainMelodyLogic } from "./melodyLogic.js";
import { mainRhythmLogic } from "./rhythmLogic.js";


  const melodyOutput = mainMelodyLogic(splitWords.length);
  const rhythmOutput = mainRhythmLogic(splitWords);
  
const vf = new Factory({
  renderer: { elementId: "boo", width: 500, height: 200 },
});
const score = vf.EasyScore();
const system = vf.System();

system
  .addStave({
    voices: [
      score.voice(score.notes("C#5/q, B4, A4, G#4/8, F#4/8", { stem: "up" })),
    ],
  })
  .addClef("treble")
  .addTimeSignature("4/4");

vf.draw();
