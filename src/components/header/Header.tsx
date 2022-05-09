import React, { useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

import { IPublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

function isCurrent(pathname: string, link: string) {
  return matchPath({ path: link }, pathname) !== null;
}

function signOutClickHandler(instance: IPublicClientApplication) {
  instance.logout({});
}

function Header() {
  const { instance } = useMsal();
  const [opened, setOpened] = useState(false);
  const location = useLocation();

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 me-4 text-dark text-decoration-none">
            <img src="/logo.png" alt="logo" className="logo" />
          </Link>

          <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link
                to="/"
                className={`nav-link px-2 link-secondary ${isCurrent(location.pathname, '/') ? 'active' : ''}`}
              >
                Servers
              </Link>
            </li>
          </ul>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" />

          <div className="dropdown text-end">
            <a
              href="#"
              className={`d-block link-dark text-decoration-none dropdown-toggle ${opened ? 'show' : ''}`}
              id="dropdownUser1"
              onClick={() => setOpened(!opened)}
            >
              <img src="https://github.com/mdo.png" alt="mdo" className="rounded-circle" width="32" height="32" />
            </a>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <ul
              className={`dropdown-menu text-small ${opened ? 'show' : ''}`}
              aria-labelledby="dropdownUser1"
              onClick={() => setOpened(false)}
            >
              <li>
                <Link
                  to="/project/create"
                  className={`dropdown-item ${isCurrent(location.pathname, '/project/create') ? 'active' : ''}`}
                >
                  New server
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => signOutClickHandler(instance)}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
