// Libraries
import { black } from 'libraries/styles/colors';

export const cover = (img, color = black()) => {
  return {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    backgroundColor: color,
  }
}
