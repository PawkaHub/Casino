export const capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export const hasSubstring = (string = '', substrings = []) => {
  return substrings.reduce((memo, substring) => {
    let result = memo;
    if (string.indexOf(substring) >= 0) { result = substring; }
    return result;
  }, undefined);
}

export const alphanumeric = (string) => {
  if (!string) return;
  return string.replace(/[^0-9a-z ]/gi, '');
};
