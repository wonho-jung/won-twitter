import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
function Navigation({ userObj }) {
  return (
    <div>
      <nav>
        <ul className="navigation__Ul">
          <li>
            <Link to="/" className="nav__Link_Icon">
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                className="nav__Twitter"
              />
              <span className="nav__link">Home</span>
            </Link>
          </li>
          <li>
            <Link className="nav__Link_Icon" to="/profile">
              <FontAwesomeIcon
                className="nav__faUser"
                icon={faUser}
                size="2x"
              />
              <span className="nav__link">
                {userObj.displayName
                  ? `${userObj.displayName}'s Profile`
                  : "Profile"}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
