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

export { combineClasses, debounce };
