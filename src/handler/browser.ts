const getBrowser = () => {
  var browser_type: any;
  try {
    browser_type = browser;
  } catch {
    browser_type = chrome;
  }

  return browser_type;
};

export default getBrowser;
