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

/**
 * This function assumes that the labels are in the form of a string, followed by a number or some small variations. `${string} ${number}`
 * @param str The category of the label, such as Size, Feature, or Role
 * @returns A RegExp that searches for the
 */
function composeRegex(str: string) {
  const regex = new RegExp(`.*${str}:.*?(\\d+\\.?[\\d]*).*`);
  return regex;
}

export { combineClasses, composeRegex, debounce, onKey };
