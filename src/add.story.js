import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Add } from './add';
import { Posts } from './App';
import './App.css';
import 'classnames';
import './bulma.css';

storiesOf('Add', module)
  .add('add new post', () => (
    <Add />
  ))

storiesOf('Posts', module)
  .add('list of posts', () => (
    <Posts />
  ))
