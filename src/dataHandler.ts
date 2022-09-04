interface data {
  rows: datum[];
  currentSelected: number;
}

interface datum {
  text: string;
}

function getData(keys: data) {
  //@ts-ignore
  return browser.storage.local.get(keys);
}

function setData(data: data) {
  //@ts-ignore
  return browser.storage.local.set(data);
}

export { getData, setData, data, datum };
