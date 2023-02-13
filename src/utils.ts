function combineClasses(...args: any[]) {
  return args.filter((x) => typeof x === "string").join(" ");
}

function debounce(func: Function, timer = 500) {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, timer);
  };
}

function onKey(fn: (e: KeyboardEvent) => any, ...keyValues: string[]) {
  return (e: KeyboardEvent) => {
    if (keyValues.includes(e.key)) {
      e.preventDefault();
      fn(e);
    }
  };
}

function extractValueFromElements(
  elements: NodeList | HTMLCollection,
  itemRegex: RegExp
) {
  for (const element of elements) {
    const text = element.textContent;
    const result = text.match(itemRegex);
    if (result) {
      return parseFloat(result[1]);
    }
  }
  return null;
}

function extractValueFromStrings(strings: string[], itemRegex: RegExp) {
  for (const str of strings) {
    const result = str.match(itemRegex);
    if (result) {
      return parseFloat(result[1]);
    }
  }
  return null;
}

/**
 * This function assumes that the labels are in the form of a string, followed by a number or some small variations. `${string} ${number}`
 * @param str The category of the label, such as Size, Feature, or Role
 * @returns A RegExp that searches for the
 */
function composeRegex(str: string) {
  const regex = new RegExp(`${str}:?.*?(\\d+\\.?[\\d]*).*`, "i");
  return regex;
}

export {
  combineClasses,
  composeRegex,
  debounce,
  extractValueFromElements,
  extractValueFromStrings,
  onKey,
};
