import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import '../styles/Dropdown.css';

function Dropdown(props) {

  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-parent">
      <button onClick={() => setOpen(!open)} className="dropdown-label">
        {props.children} &nbsp;
        <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
      </button>
      <div className="dropdown-menu" style={{display: open ? "block" : "none"} }>
        {props.options.map(option => (
          <div key={option} className="dropdown-option">
            <span className="menu-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown;