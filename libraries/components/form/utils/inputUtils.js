export const restrictNumeric = (event) => {
  // Only allow numeric numbers when typing in an input
  const { which, metaKey, ctrlKey } = event;

  // Key event is for a browser shortcut
  if (metaKey || ctrlKey) return true;

  // If keycode is a space
  if (which === 32) return true;

  // If keycode is a special char (WebKit)
  if (which === 0) return true;

  // If char is a special char (Firefox)
  if (which < 33) return true;

  const input = String.fromCharCode(which);

  // Char is a number or a space
  if (!/[\d\s]/.test(input)) {
    event.preventDefault();
    return false;
  }

  return true;
};

export const restrictPhoneNumber = (event) => {
  // Only allow numeric numbers when typing in an input
  const { which, metaKey, ctrlKey } = event;

  // Key event is for a browser shortcut
  if (metaKey || ctrlKey) return true;

  // If keycode is a space
  if (which === 32) return true;

  // If keycode is a -
  if (which === 45) return true;

  // If keycode is a .
  if (which === 46) return true;

  // If keycode is a special char (WebKit)
  if (which === 0) return true;

  // If char is a special char (Firefox)
  if (which < 33) return true;

  const input = String.fromCharCode(which);

  // Char is a number or a space
  if (!/[\d\s]/.test(input)) {
    event.preventDefault();
    return false;
  }

  return true;
};

export const hasTextSelected = (target) => {
  // If some text is selected
  const { selectionStart, selectionEnd } = target;
  return (selectionStart !== null && selectionStart !== selectionEnd);
};

// The Luhn algorithm or Luhn formula, also known as the "modulus 10" or "mod 10" algorithm, is a simple checksum formula used to validate a variety of identification numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers in the US, and Canadian Social Insurance Numbers. It was created by IBM scientist Hans Peter Luhn and described in U.S. Patent No. 2,950,048, filed on January 6, 1954, and granted on August 23, 1960. https://en.wikipedia.org/wiki/Luhn_algorithm
export const luhnCheck = (number) => {
  let odd = true;
  let sum = 0;

  let digits = (number + '').split('').reverse();

  digits.forEach((digit) => {
    digit = parseInt(digit, 10);
    // console.log('10', digit);
    if ((odd = !odd)) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  });

  const result = sum % 10 === 0;
  return result;
};
