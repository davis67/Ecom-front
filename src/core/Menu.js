import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import { itemTotal } from "./cartHelper";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#ff9900"
    };
  } else {
    return {
      color: "#ffff"
    };
  }
};
/**
 * we access history by using the props.
 * lets distructure props.history to {history}
 */
const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            shop
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            Cart
            <sub>
              <small className="cart-badge">{itemTotal()}</small>
            </sub>
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </Fragment>
        )}
        <li className="nav-item">
          <span
            className="nav-link"
            style={{
              cursor: "pointer",
              color: "#FFFFFF"
            }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
