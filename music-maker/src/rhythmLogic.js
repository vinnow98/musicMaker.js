//Pending Style
//characteristics
//1.Type of beats
//2. Length of bars
//3. Time signature
//4.Type of key (favours which type?)
//grand: more straight down beats, longer bars, 3/4 or 4/4 favours major key
//hopeful/happy: more upbeats, average bar, favours a 6/8 beat, major key
//melancholy more down beats, average bars, 3/4 or 4/4, minor key
// Neutral (worship statements)random beats, average bars,random time, major/minor equal

//type Rhythm struct {
//	beats         []int
//	noOfBars      int
//	timeSignature int
//}

//func Characteristics(c int) {
//	switch c {
//	default:
//		Neutral()
//	}
//}

//func Neutral() int {
//	timeSignatureList := []int{3, 4, 6}
//	rand.Seed(time.Now().UnixNano())
//	timeSignature := timeSignatureList[rand.Intn(len(timeSignatureList))]
//	switch timeSignature {
//	case 3:
//		fmt.Println("Time Signature:3/4")
//	case 4:
//		fmt.Println("Time Signature:4/4")
//	case 6:
//		fmt.Println("Time Signature:6/8")
//	}
//	return timeSignature
//}

// Input the dummy data fromm the current psalms
//1:   {5, 1, 2, 2, 1, 1, 4, 3, 1, 1, 1},
//1:   {3,1,2}

// var FinalRhythmOutput []int
// var binaryLine []int

// mainRhythmLogic("the La zy Dog Jumps o Ver the Big Brown Dog");

//This is to convert the syllables into binary form, capital will be 1, non-capital will be 0
// import "./rawMusicData/rawMusicData";
// import "./melodyLogic.js";
// import "./assets/css/index.css";

//maybe look into prosody.js? which syllable to emphasiese.
import { removeStopwords} from "stopword";



export function mainRhythmLogic(syllableArray) {
  const customFilter = removeStopwords(syllableArray, ["ing", "er"]);

  const importantSyllables = removeStopwords(customFilter);

  console.log(importantSyllables);
  const binaryLine = [];
  for (let i = 0; i < syllableArray.length; i++) {
    const syllable = syllableArray[i];
    // const importantSyllable = importantSyllables[i]
    const isImportant = importantSyllables.includes(syllable);

    binaryLine.push(isImportant ? 1 : 0);
  }
  console.log(binaryLine);
  const normalizedInput = normalise(binaryLine);
  console.log(normalizedInput);
  const finalRhythmOutput = assignPositions(normalizedInput);
  console.log(finalRhythmOutput);
  return finalRhythmOutput;
}

function normalise(binaryLine) {
  let i = 0;

  while (i < binaryLine.length) {
    if (
      binaryLine[i] === 0 &&
      binaryLine[i + 1] === 0 &&
      binaryLine[i + 2] === 0
    ) {
      const flipIndex = i + Math.floor(Math.random() * 3);
      binaryLine[flipIndex] = 1;
      i += 3;
    } else {
      i++;
    }
  }

  return binaryLine;
}

function assignPositions(binaryLine) {
  const positions = [];
  let i = 0;

  while (i < binaryLine.length) {
    if (binaryLine[i] === 1) {
      const prev = positions[positions.length - 1];

      if (prev === 3) {
        positions.push(4);
      } else if (prev === 6) {
        positions.push(1);
      } else {
        positions.push(Math.random() < 0.5 ? 1 : 4);
      }

      i++;
    } else {
      // Count how many zeros in a row
      let zeroCount = 1;
      while (binaryLine[i + zeroCount] === 0) {
        zeroCount++;
      }

      if (zeroCount === 1) {
        positions.push(Math.random() < 0.5 ? 3 : 6);
        i++;
      } else if (zeroCount === 2) {
        const pair = Math.random() < 0.5 ? [2, 3] : [5, 6];
        positions.push(...pair);
        i += 2;
      } else {
        // If more than 2 zeros (shouldn’t happen if fixed), fill with 3s
        for (let j = 0; j < zeroCount; j++) {
          positions.push(3);
        }
        i += zeroCount;
      }
    }
  }

  return positions;
}
