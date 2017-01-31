// NPM
import { StateNavigator, HTML5HistoryManager } from 'navigation';

// Project
import States from 'project/shared/states';

const configStateNav = (stateNavigator) => {
  stateNavigator.configure(States, new HTML5HistoryManager());
  return stateNavigator;
}

export { configStateNav };
