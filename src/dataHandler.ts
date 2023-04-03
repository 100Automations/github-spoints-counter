interface localData {
  currentSelected?: string;
  theme?: string;
}

interface label {
  text: string;
}

function getLocalData(keys: localData) {
  return browser.storage.local.get(keys);
}

function setLocalData(data: localData) {
  return browser.storage.local.set(data);
}

function getPageData(callback: CallableFunction) {
  browser.runtime.onMessage.addListener((message) => {
    callback(JSON.parse(message.data));
  });
  let querying = browser.tabs.query({ currentWindow: true, active: true });
  querying.then((tabs: any) => {
    browser.tabs.sendMessage(tabs[0].id, {
      task: "getPageData",
    });
  });
}

export { getLocalData, setLocalData, getPageData, localData, label };
