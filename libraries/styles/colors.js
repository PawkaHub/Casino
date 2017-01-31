const toRgba = (hex, a = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r},${g},${b},${a})`;
}

export const brand = (opacity) => {
  return toRgba('#2980b9', opacity);;
};

export const white = (opacity) => {
  return toRgba('#ffffff', opacity);
};

export const offWhite = (opacity) => {
  return toRgba('#f3f3f3', opacity)
};

export const black = (opacity) => {
  return toRgba('#000000', opacity);
};

export const red = (opacity) => {
  return toRgba('#f27472', opacity);
};

export const midnight = (opacity) => {
  return toRgba('#272c3d', opacity);
};

export const slate = (opacity) => {
  return toRgba('#35373d', opacity);
};

export const platinum = (opacity) => {
  return toRgba('#f0f2f2', opacity);
};

export const orange = (opacity) => {
  return toRgba('#e04b3b', opacity);
};

export const lightOrange = (opacity) => {
  return toRgba('#fea378', opacity);
};

export const blue = (opacity) => {
  return toRgba('#06aaac', opacity);
};

export const lightBlue = (opacity) => {
  return toRgba('#61d7c1', opacity);
};

export const gradient = (start, end, angle = 0) => {
  return `linear-gradient(${angle}deg,${start},${end})`;
};
