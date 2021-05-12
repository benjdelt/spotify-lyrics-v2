import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope, faVolumeUp, faHistory } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Dropdown, DropdownMenuItem } from './Dropdown';
import TrackHistoryDrawer from './TrackHistoryDrawer';
import '../styles/Nav.css';


function Nav({ setToCurrentlyPlaying, trackHistory }) {

  const { t, i18n } = useTranslation();

  function LanguageLabel() {
    return (
      <span>
        <FontAwesomeIcon icon={faGlobeEurope} />&nbsp;
        <span className="menu-text">{ t('nav.language') }</span>
      </span>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <button onClick={setToCurrentlyPlaying} >
            <FontAwesomeIcon icon={faVolumeUp} />&nbsp;
            <span className="menu-text">{ t('nav.currentlyPlaying') }</span>
          </button>
        </li>
        <li>
          <TrackHistoryDrawer options={trackHistory} >
            <FontAwesomeIcon icon={faHistory} />&nbsp;
            <span className="menu-text">{ t('nav.trackHistory') }</span>
          </TrackHistoryDrawer>
        </li>
        <li>
          <a href="https://github.com/benjdelt/spotify-lyrics-v2" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />&nbsp;
            <span className="menu-text">{ t('nav.seeOnGithub') }</span>
          </a>
        </li>
        <li className="language">
          <Dropdown up={true} label={<LanguageLabel />} >
              <DropdownMenuItem key={1} handleClick={() => i18n.changeLanguage("en")} >English</DropdownMenuItem>
              <DropdownMenuItem key={2} handleClick={() => i18n.changeLanguage("fr")} >Français</DropdownMenuItem>
          </Dropdown>
        </li>
      </ul>          
    </nav>
  )
}

export default Nav;
