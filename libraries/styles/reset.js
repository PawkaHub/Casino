// Libraries
import { offWhite, slate } from 'libraries/styles/colors';

/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
const Reset = {
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video': {
    margin: '0px',
    padding: '0px',
    border: '0px',
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
  },

  /* HTML5 display-role reset for older browsers */
  'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': {
    display: 'block',
  },
  body: {
    lineHeight: '1',
  },
  'ol, ul': {
    listStyle: 'none',
  },
  'blockquote, q': {
    quotes: 'none',
  },
  'blockquote:before, blockquote:after, q:before, q:after': {
    content: '',
    content: 'none',
  },
  table: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
  },

  /* App Styles */
  '*': {
    webkitUserDrag: 'none',
    boxSizing: 'border-box',
    '-webkit-tap-highlight-color': 'transparent',
    ':focus': {
      outline: 'none',
    },
  },
  'html, body': {
    width: '100%',
    margin: '0px',
    padding: '0px',
    textAlign: 'center',
    backgroundColor: offWhite(),
    color: slate(),
  },
  html: {
    height: '100%',
  },
  body: {
    minHeight: '100%',
    height: 'auto',
    position: 'relative',
    lineHeight: '1.4',
    fontSize: '16px',
    fontFamily: 'Hind, Helvetica, Arial, sans-serif',
  },
  'textarea, input, select': {
    appearance: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    ':focus': {
      outline: 'none',
    },
  },
  'input::-webkit-search-cancel-button': {
    display: 'none',
  },
  select: {
    border: 'none',
  },
  a: {
    textDecoration: 'none',
  },
}

export default Reset;
