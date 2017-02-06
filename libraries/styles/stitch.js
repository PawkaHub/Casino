// Libraries
import { black, red, midnight, slate, platinum, orange, blue } from 'libraries/styles/colors';

export const stitch = (
  // Pattern Colors - Background
  bg = black(),

  // Pattern Colors - Cross Stitch
  color1 = red(0.5),
  color3 = slate(0.5),
  color5 = orange(0.5),

  // Pattern Transparent Colors - Cross Stitch
  transparentColor1 = midnight(0),
  transparentColor2 = platinum(0),
  transparentColor3 = blue(0),

  // Pattern Lengths
  length1 = '110px',
  length2 = '140px',
  length3 = '35px',
  length4 = '40px',
  length5 = '50px',
  length6 = '5px',
  length7 = '10px',
  length8 = '120px',
  length9 = '60px',
  length10 = '70px',
  length11 = '80px',
  length12 = '90px',
  length13 = '160px',

  // Pattern Angles
  angle1 = '45deg',
  angle2 = '135deg',
) => {

  return {
    backgroundColor: bg,
    backgroundImage: `
      repeating-linear-gradient(
        ${angle1},

        transparent ${length6},

        ${color1} ${length6},

        ${color1} ${length7},

        ${transparentColor1} ${length7},

        ${transparentColor1} ${length3},

        ${color3} ${length3},

        ${color3} ${length4},

        ${color1} ${length4},

        ${color1} ${length5},

        ${transparentColor2} ${length5},

        ${transparentColor2} ${length9},

        ${color3} ${length9},

        ${color3} ${length10},

        ${color5} ${length10},

        ${color5} ${length11},

        ${transparentColor3} ${length11},

        ${transparentColor3} ${length12},

        ${color3} ${length12},

        ${color3} ${length1},

        ${transparentColor1} ${length1},

        ${transparentColor1} ${length8},

        ${color1} ${length8},

        ${color1} ${length2}
      ),

      repeating-linear-gradient(
        ${angle2},

        transparent ${length6},

        ${color1} ${length6},

        ${color1} ${length7},

        ${transparentColor1} ${length7},

        ${transparentColor1} ${length3},

        ${color3} ${length3},

        ${color3} ${length4},

        ${color1} ${length4},

        ${color1} ${length5},

        ${transparentColor2} ${length5},

        ${transparentColor2} ${length9},

        ${color3} ${length9},

        ${color3} ${length10},

        ${color5} ${length10},

        ${color5} ${length11},

        ${transparentColor3} ${length11},

        ${transparentColor3} ${length12},

        ${color3} ${length12},

        ${color3} ${length1},

        ${transparentColor1} ${length1},

        ${transparentColor1} ${length2},

        ${color1} ${length2},

        ${color1} ${length13}
      )`,
  }
}
