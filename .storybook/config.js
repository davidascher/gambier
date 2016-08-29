import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/add.story');
  // require as many stories as you need.
}

configure(loadStories, module);

