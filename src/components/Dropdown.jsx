import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import '../styles/Dropdown.css';

function Dropdown(props) {

  const [open, setOpen] = useState(false);

  const closedIcon = props.up ? faCaretUp : faCaretDown;
  const openIcon = props.up ? faCaretDown : faCaretUp;

  const styles = props.up ? {
    // display: open ? "block" : "none",
    visibility: open ? "visible" : "hidden",
    position: "relative",
    bottom: "6.5em",
  } : {
    visibility: open ? "visible" : "hidden",
    // display: open ? "block" : "none",
  };

  return (
    <div className="dropdown-parent">
      <button onClick={() => setOpen(!open)} className="dropdown-label">
        {props.children} &nbsp;
        <FontAwesomeIcon icon={open ? openIcon : closedIcon} />
      </button>
      <div className="dropdown-menu" style={styles}>
        {props.options.map(option => (
          <div key={option} className="dropdown-option">
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown;