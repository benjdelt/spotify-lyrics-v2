import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope, faVolumeUp, faHistory } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Dropdown from './Dropdown';


function Nav() {

  const { t, i18n } = useTranslation();

  const changeLanguage = event => {
    const languages = {
      English: "en",
      Français: "fr",
    };
    i18n.changeLanguage(languages[event.target.innerText]);
  };

  return (
    <nav>
      <ul>
        <li>
          <button>
            <FontAwesomeIcon icon={faVolumeUp} />&nbsp;
            <span className="menu-text">{ t('nav.currentlyPlaying') }</span>
          </button>
        </li>
        <li>
          <button>
            <FontAwesomeIcon icon={faHistory} />&nbsp;
            <span className="menu-text">{ t('nav.trackHistory') }</span>
          </button>
        </li>
        <li>
          <a href="https://github.com/benjdelt/spotify-lyrics-v2" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />&nbsp;
            <span className="menu-text">{ t('nav.seeOnGithub') }</span>
          </a>
        </li>
        <li className="language">
          <Dropdown options={["English", "Français"]} up={true} optionHandler={changeLanguage}>
            <FontAwesomeIcon icon={faGlobeEurope} />&nbsp;
            <span className="menu-text">{ t('nav.language') }</span>
          </Dropdown>
        </li>
      </ul>          
    </nav>
  )
}

export default Nav;
