import React from 'react';

export default class MyFooter extends React.Component {
  render () {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>Gambier Exchange</strong> by <a href="http://ascher.ca">David Ascher</a>. The source code is licensed&nbsp;
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
              is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
              <a className="icon" href="https://github.com/davidascher/gambier">
                <i className="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
