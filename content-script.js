const injectScriptFile = (file) => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(file);
  (document.head || document.documentElement).appendChild(script);
  script.onload = () => script.remove();
};

injectScriptFile("inject.js");
