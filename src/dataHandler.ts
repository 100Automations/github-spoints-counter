interface data {
  currentSelected: string;
}

interface datum {
  text: string;
}

function getLocalData(keys: data) {
  return browser.storage.local.get(keys);
}

function setLocalData(data: data) {
  return browser.storage.local.set(data);
}

function getPageData(callback: CallableFunction) {
  let querying = browser.tabs.query({ currentWindow: true, active: true });
  querying.then((tabs: any) => {
    browser.tabs.sendMessage(tabs[0].id, {
      task: "getLocalData",
    });
  });
  browser.runtime.onMessage.addListener((message) => {
    callback(JSON.parse(message.data));
  });
}

export { getLocalData, setLocalData, getPageData, data, datum };
