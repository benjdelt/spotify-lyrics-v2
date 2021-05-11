import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import '../styles/Dropdown.css';

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

  const optionHandler = event => {
    event.preventDefault();
    props.optionHandler(event);
    setOpen(false);
  };

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
      <button onClick={handleClick} className="dropdown-label">
        {props.children} &nbsp;
        <FontAwesomeIcon icon={open ? openIcon : closedIcon} />
      </button>
      {/* {open && */}
      <div className="dropdown-menu" style={styles} ref={wrapperRef}>
        {props.options.map(option => (
          <div key={option} className="dropdown-option" onClick={optionHandler}>
            <span className="dropdown-option-text">{option}</span>
          </div>
        ))}
      </div>
      {/* } */}
    </div>
  )
}

export default Dropdown;