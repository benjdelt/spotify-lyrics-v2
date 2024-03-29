import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope, faVolumeUp, faHistory } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Dropdown, DropdownMenuItem } from './Dropdown';
import { TrackHistoryDrawer, DrawerMenuItem } from './TrackHistoryDrawer';
import Loader from './Loader';
import '../styles/Nav.css';


function Nav({
  loggedIn,
  setToCurrentlyPlaying,
  trackHistory,
  setToHistoryTrack,
  loadingHistory
}) {

  const { t, i18n } = useTranslation();

  function HistoryLabel() {
    return (
      <>
        <FontAwesomeIcon icon={faHistory} />&nbsp;
        <span className="menu-text">{ t('nav.trackHistory') }</span>
      </>
    )
  }

  function LanguageLabel() {
    return (
      <>
        <FontAwesomeIcon icon={faGlobeEurope} />&nbsp;
        <span className="menu-text">{ t('nav.language') }</span>
      </>
    );
  }

  return (
    <nav>
      <ul>
        {loggedIn &&
          <> 
            <li>
              <button onClick={setToCurrentlyPlaying} title="curently-playing">
                <FontAwesomeIcon icon={faVolumeUp} />&nbsp;
                <span className="menu-text">{ t('nav.currentlyPlaying') }</span>
              </button>
            </li>
            <li className="nav-track-history" >
              <TrackHistoryDrawer options={trackHistory} label={<HistoryLabel />} >
                {loadingHistory ? (
                  <Loader />
                ) : (
                  trackHistory.map((track, ind) => (
                    <DrawerMenuItem key={ind} handleClick={() => setToHistoryTrack(track)}>
                      <img src={track.coverUrl} alt="mini-cover"/> 
                      &nbsp;{track.artist} - {track.title}
                    </DrawerMenuItem>
                  ))
                )}
              </TrackHistoryDrawer>
            </li>
          </>
        }
        <li>
          <a href="https://github.com/benjdelt/spotify-lyrics-v2" target="_blank" rel="noopener noreferrer" title="Github">
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
