const ascii = 256;

let encode = string => {
  let dict = {};
  let out = [];
  let [phrase, ...data] = string;
  let code = ascii;

  let lookup = phrase => phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0);
  let emit = phrase => out.push(lookup(phrase));

  data.forEach(char => {
    if (dict[phrase + char] != null) {
      phrase += char;
    } else {
      emit(phrase);
      dict[phrase + char] = code;
      code++;
      phrase = char;
    }
  });
  emit(phrase);
  return out.map(s => String.fromCharCode(s)).join("");
};

let decode = string => {
  let dict = {};
  let [currChar, ...data] = string;
  let oldPhrase = currChar;
  let code = ascii;

  let lookup = char => {
    let code = char.charCodeAt(0);
    return code < ascii ?
      char
    :
      (dict[code] || oldPhrase + currChar)
  };

  return currChar + data.map(char => {
    let phrase = lookup(char);
    currChar = phrase.charAt(0);
    dict[code] = oldPhrase + currChar;
    code++;
    oldPhrase = phrase;
    return phrase;
  }).join("");
};

module.exports = { encode, decode };