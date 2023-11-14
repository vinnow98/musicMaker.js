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


function mainRhythmLogic() {
  while (binaryLine.length > 0) {
    if (binaryLine[0] == 0) {
      forZeros();
    } else if ((binaryLine[0] = 1)) {
      forOnes();
    }
  }
}





function forZeros() {
  //check for 0. if one 0, it will be 3 or 6. if two 0, it will be 2,3 or 5,6.
  //check for 1. if previous is 3, it has to be 4. if previoous is 6, it has to be 1. remaining 1s will be randomly assigned 1 or 4.
  // the same numbers (1s or 0s) will go in here temporarily.
  sameNumSlice = [];
  for (var i = 0; i < binaryLine.length; i++) {
    if (binaryLine[0] == 0) {
      binaryLine.splice(0, 1);
      sameNumSlice.push(0);
    }
  }
  if (sameNumSlice.length == 1) {
    var options = [3, 6];
    finalRhythmOutput.push(options[Math.floor(Math.random() * options.length)]);
    sameNumSlice = [];
  } else if (sameNumSlice.length == 2) {
    var options = [
      [2, 3],
      [5, 6],
    ];
    finalRhythmOutput = finalRhythmOutput.concat(
      options[Math.floor(Math.random() * options.length)]
    );
    sameNumSlice = [];
  }
}

function forOnes() {
  //check for 0. if one 0, it will be 3 or 6. if two 0, it will be 2,3 or 5,6.
  //check for 1. if previous is 3, it has to be 4. if previoous is 6, it has to be 1. remaining 1s will be randomly assigned 1 or 4.
  // the same numbers (1s or 0s) will go in here temporarily.
  if (finalRhythmOutput[finalRhythmOutput.length - 1] == 3) {
    finalRhythmOutput.push(4);
    binaryLine.shift();
  } else if (finalRhythmOutput[finalRhythmOutput.length - 1] == 6) {
    finalRhythmOutput.push(1);
    binaryLine.shift();
  }
  sameNumSlice = [];
  for (var i = 0; i < binaryLine.length; i++) {
    if (binaryLine[0] == 1) {
      binaryLine.splice(0, 1);
      sameNumSlice.push(1);
    } else {
      break;
    }
  }
  for (var i = 0; i < sameNumSlice.length; i++) {
    var options = [1, 1, 4];
    finalRhythmOutput.push(options[Math.floor(Math.random() * options.length)]);
  }
  sameNumSlice = [];
}
