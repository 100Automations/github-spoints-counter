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

export { combineClasses, debounce, onKey };
