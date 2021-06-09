import React, { useState, useEffect, useRef, Children } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import '../styles/TrackHistoryDrawer.css';

function DrawerMenuItem(props) {
  const handleClick = () => {
    props.handleClick();
    props.openHandler();
  }

  return (
    <div key={props.key} className="drawer-option" onClick={handleClick} >
      <span className="drawer-option-text">{props.children}</span>
    </div>
  );
}


function TrackHistoryDrawer(props) {

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

  const closedIcon = faCaretRight;
  const openIcon = faCaretLeft;

  const styles = {
    display: open ? "block" : "none",
  };

  return (
    <div className="drawer-parent">
      <button onClick={handleClick} className="drawer-label" title="dropdown-arrow">
        {props.label} &nbsp;
        <span className="menu-text"><FontAwesomeIcon icon={open ? openIcon : closedIcon} /></span>
      </button>
      <div className="drawer-menu" style={styles} ref={wrapperRef}>
        {Children.map(props.children, child => React.cloneElement(child, { openHandler }))}
      </div>
    </div>
  )
}

export { TrackHistoryDrawer, DrawerMenuItem };
