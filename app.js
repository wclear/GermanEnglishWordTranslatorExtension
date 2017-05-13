// The tab that is being used to show dict.leo.org
var focustab = null,
    searchURLBase = 'https://dict.leo.org/englisch-deutsch/';

// Create a context menu that shows up when there is a text selection and link it to leoDictSearchClick handler.
chrome.contextMenus.create({
  "title": "Search dict.leo.org",
  "contexts": ["selection"],
  "onclick": leoDictSearchClick
});

/**
 * Handles the user clicking on the 'Search dict.leo.org' context menu item.
 *
 * @param {Event} event
 */
function leoDictSearchClick(event) {

  // If are not already showing the Leo dictionary in a tab, let's create a new one and search there.
  if (focustab === null) {
    createLeoDictTab(event.selectionText);
  }
  else {

    // It looks like we already have a tab open, let's try and use that...
    chrome.tabs.get(focustab.id, function(retrievedTab) {
      if (retrievedTab) {

        // We found the existing tab, so let's use that to search for the selected text.
        chrome.tabs.update(retrievedTab.id, {
          url: searchURLBase + event.selectionText,
          active: false
        });
      }
      else {

        // We thought we had a tag open, but we could not retrieve it, so let's create a new tab and use that instead.
        createLeoDictTab(event.selectionText);
      }
    });
  }
}

/**
 * Creates a new tab pointing to dict.leo.org, searching for the given keyword.
 */
function createLeoDictTab(keyword) {
  chrome.tabs.create({
    url: searchURLBase + keyword,
    active: true
  }, function(newTab) {
    focustab = newTab;
  });
}