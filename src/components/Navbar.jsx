import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppThemeEnum } from "../enums/AppThemeEnum";
export default function Navbar(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} fixed-top`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/filters">
                Explore 365 Days Forecast
              </Link>
            </li>
          </ul>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={props.handleModeChange}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
              style={{
                color: props.mode === AppThemeEnum.LIGHT ? "black" : "white",
              }}
            >
              Enable {props.mode === AppThemeEnum.LIGHT ? "Dark" : "Light"} Mode
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
Navbar.defaultProps = {
  title: "Forecastly",
};
Navbar.propTypes = {
  title: PropTypes.string,
};
