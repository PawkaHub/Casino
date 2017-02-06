// NPM
import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Libraries
import { white, midnight, black, red, orange } from 'libraries/styles/colors';
import { stitch } from 'libraries/styles/stitch';

@radium @observer
export default class Card extends Component {

  static propTypes = {
    rank: PropTypes.string,
    suit: PropTypes.string.isRequired,
    flipped: PropTypes.bool,
  };

  static defaultProps = {
    flipped: true,
  };

  // Suit Icons
  static hearts = String.fromCharCode(9829);
  static diamonds = String.fromCharCode(9830);
  static clubs = String.fromCharCode(9827);
  static spades = String.fromCharCode(9824);

  static style = {
    wrapper: {
      position: 'relative',
      height: '200px',
      width: '140px',
      margin: '10px',
      display: 'inline-block',
      color: midnight(0.8),
      perspective: '1000px',
    },
    flipped: {
      transform: 'rotateY(180deg)',
    },
    holder: {
      position: 'relative',
      transition: '0.6s',
      transformStyle: 'preserve-3d',
      height: 'inherit',
      boxShadow: `0px 0px 10px ${midnight(0.8)}`,
    },
    face: {
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      borderRadius: '4px',
    },
    back: {
      backgroundColor: white(),
      transform: 'rotateY(180deg)',
    },
    backInner: {
      backgroundColor: 'red',
      borderRadius: '4px',
      position: 'absolute',
      top: '2px',
      right: '2px',
      bottom: '2px',
      left: '2px',
    },
    front: {
      backgroundColor: white(),
      zIndex: '2',
      transform: 'rotateY(0deg)',
    },
    icon: {
      position: 'absolute',
    },
    topCorner: {
      top: '10px',
      left: '10px',
    },
    bottomCorner: {
      bottom: '10px',
      right: '10px',
      transform: 'rotate3d(0,0,1,180deg)',
    },
    redBg: {
      ...stitch(
        // BG
        orange(0.4),

        // Colors
        red(0.4),
        orange(0.5),
        orange(0.6),
      ),
    },
    redFont: {
      color: red(),
    },
    midnightBg: {
      ...stitch(
        // BG
        black(0.4),

        // Colors
        midnight(0.4),
        black(0.5),
        black(0.6),
      ),
    },
    midnightFont: {
      color: midnight(0.8),
    },
    rank: {
      marginTop: '-1px',
    },
    suit: {
      marginTop: '-12px',
      fontSize: '30px',
    },
  };

  render() {
    const { style, hearts, diamonds, clubs, spades } = Card;
    const { props } = this;
    const { rank, suit, flipped } = props;

    // Handle card icon and back colors
    let iconColor = style.redFont;
    let backColor = style.redBg;

    // Handle suit icons
    let suitIcon = 'Invalid Suit';

    // Handle rank text
    let rankText = null;
    if (rank && rank !== 'hidden') { rankText = rank.toUpperCase(); }


    // Handle if the card is face down
    const holderStyle = [style.holder];
    if (!flipped || rank === 'hidden') { holderStyle.push(style.flipped); }

    // Hearts Suit
    if (suit === 'h') { suitIcon = hearts; }

    // Diamonds Suit
    if (suit === 'd') { suitIcon = diamonds; }

    // Spades Suit
    if (suit === 's') { suitIcon = spades; }

    // Clubs Suit
    if (suit === 'c') { suitIcon = clubs; }

    // Handle Themes
    if (suit === 's' || suit === 'c') {
      iconColor = style.midnightFont;
      backColor = style.midnightBg;
    }

    // Card Face Styles
    const backFace = [style.face, style.back];
    const frontFace = [style.face, style.front];

    return (
      <div style={style.wrapper}>
        <div style={holderStyle}>

          {/* Back of Card Face */}
          <div style={backFace}>
            <div style={[style.backInner, backColor]}></div>
          </div>

          {/* Front of Card Face */}
          <div style={frontFace}>
            <div style={[style.icon, style.topCorner, iconColor]}>
              <div style={style.rank}>{rankText}</div>
              <div style={style.suit}>{suitIcon}</div>
            </div>

            <div style={[style.icon, style.bottomCorner, iconColor]}>
              <div style={style.rank}>{rankText}</div>
              <div style={style.suit}>{suitIcon}</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
