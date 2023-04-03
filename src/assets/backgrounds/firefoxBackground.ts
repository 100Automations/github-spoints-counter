browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  if (temporary) return; // skip during development});
  switch (reason) {
    case "install":
      {
        await browser.tabs.create({
          url: "https://100automations.github.io/github-story-points-calculator/",
        });
      }
      break;
  }
});
