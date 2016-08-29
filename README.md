## Sending Feedback

We are always open to [your feedback](https://github.com/davidascher/gambier/issues).

## Ferry Schedule

The ferry schedule is brittle, because it is currently parsed by a human, who has to read the horrible
schedule pages that BC Ferries posts.  It would be nice to switch to an automated method ([issue](https://github.com/davidascher/gambier/issues/12)).

## Dev notes

This is a webapp built using React and Firebase.

The skeleton is using [create-react-app](https://github.com/facebookincubator/create-react-app), with some modifications to allow serving of things like the apple icon.

It is trying to be a progressive web app, using `sw-precache`.

The firebase setup is fairly straightforward, with a datastructure that looks like:


