// NPM
import { StateNavigator, HTML5HistoryManager } from 'navigation';

// Project
import States from 'project/shared/states';

const configStateNav = (stateNavigator) => {
  stateNavigator.configure(States, new HTML5HistoryManager());
  return stateNavigator;
}

// State Navigator
const stateNav = (url, callback) => {
  // Generate activeUrl and activeCallback to pass to stateNavigator arguments based on how the function has been invocated by the caller
  const activeCallback = callback ? callback : url;
  const activeUrl = (url && callback) ? url : undefined;

  // console.log('Check', activeCallback, activeUrl);

  // Create a new state navigator
  const stateNavigator = new StateNavigator();
  configStateNav(stateNavigator);

  // Apply active callback and active url to state navigator
  if (activeCallback) { stateNavigator.onNavigate(activeCallback); }

  // Don't pass an url to the stateNavigator if none was passed to the function, this is to prevent an error from being thrown by the stateNavigator.
  if (activeUrl) {
    stateNavigator.start(activeUrl);
  } else {
    stateNavigator.start();
  }

  return stateNavigator;
}

export { stateNav, configStateNav };
