import React, { useState } from 'react';
import '../styles/Dropdown.css';

function Dropdown(props) {

  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-parent">
      <button onClick={() => setOpen(!open)} className="dropdown-label">{props.children}</button>
      <div className="dropdown-menu" style={{display: open ? "block" : "none"} }>
        {props.options.map(option => (
          <div key={option} className="dropdown-option">
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown;