import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import '../styles/TrackHistoryDrawer.css';

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

  const optionHandler = event => {
    event.preventDefault();
    props.optionHandler(event);
    setOpen(false);
  };

  const closedIcon = faCaretRight;
  const openIcon = faCaretLeft;

  const styles = {
    // visibility: open ? "visible" : "hidden",
    display: open ? "block" : "none",
  };

  return (
    <div className="drawer-parent">
      <button onClick={handleClick} className="drawer-label">
        {props.children} &nbsp;
        <span className="menu-text"><FontAwesomeIcon icon={open ? openIcon : closedIcon} /></span>
      </button>
      <div className="drawer-menu" style={styles} ref={wrapperRef}>
        {props.options.map(option => (
          <div key={option} className="drawer-option" onClick={optionHandler}>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrackHistoryDrawer;
