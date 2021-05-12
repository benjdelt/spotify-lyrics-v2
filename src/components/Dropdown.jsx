import React, { useState, useEffect, useRef, Children } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import '../styles/Dropdown.css';


function DropdownMenuItem(props) {

  const handleClick = () => {
    props.handleClick();
    props.openHandler();
  }

  return (
    <div key={props.key} className="dropdown-option" onClick={handleClick} >
      <span className="dropdown-option-text">{props.children}</span>
    </div>
  );
}

function Dropdown(props) {

  const wrapperRef = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [])

  const handleClick = event => {
    event.stopPropagation();
    setOpen(!open);
  };

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const openHandler = () => {
    setOpen(false);
  };

  const closedIcon = props.up ? faCaretUp : faCaretDown;
  const openIcon = props.up ? faCaretDown : faCaretUp;

  const styles = props.up ? {
    visibility: open ? "visible" : "hidden",
    position: "relative",
    bottom: "6.5em",
  } : {
    visibility: open ? "visible" : "hidden",
  };

  return (
    <div className="dropdown-parent">
      <button onClick={handleClick} className="dropdown-label">
        {props.label} &nbsp;
        <FontAwesomeIcon icon={open ? openIcon : closedIcon} />
      </button>
      <div className="dropdown-menu" style={styles} ref={wrapperRef}>
        {Children.map(props.children, child => React.cloneElement(child, { openHandler }))}
      </div>
    </div>
  )
}

export { Dropdown, DropdownMenuItem };
