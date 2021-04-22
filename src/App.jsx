import Dropdown from './components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope, faVolumeUp, faHistory, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import { Suspense, useEffect, useState } from 'react';

import { getUser } from './utils/data';


function App() {

  const [state, setState] = useState({});

  useEffect(async () => {
    const user = await getUser();
    setState({...state, username: user.name, avatarUrl: user.avatar});
  }, []);

  const { t, i18n } = useTranslation();

  const changeLanguage = event => {
    const languages = {
      English: "en",
      Français: "fr",
    };
    i18n.changeLanguage(languages[event.target.innerText]);
  };

  const logout = () => {
    window.location.hash = "";
    setState({});
  }

  return (
    <>
      <header className="app-header">
        <div className="logo">
          <h1>
            <img src="inverted-logo.png" alt="logo"/>
            <span className="menu-text">Spotify Lyrics</span>
          </h1>
        </div>
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
              <a href="/">
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
      </header>
      <main className="app-main">
        <section className="profile">
          {!state.username ? 
            <a href="/.netlify/functions/login" className="login">{ t('login.button') }</a>
            :
            <Dropdown options={[t('user.logout')]} optionHandler={logout}>
              <>
                <img src={state.avatarUrl} alt="avatar" className="avatar"/>
                <span className="user text">
                  {state.username}
                </span>
              </>
            </Dropdown>
          }
        </section>
        {false ? (
        <section className="song">
          <header className="song-header">
            <img src="https://i.scdn.co/image/ab67616d0000b27395313a5eee00d9bdf37883e2" alt="cover" className="cover"/>
            <section className="song-info">
              <h2>Tie Your Mother Down - Remastered 2011</h2>
              <h5>Queen</h5>
              <p>A Day At The Races (Deluxe Remastered Version)</p>
            </section>
          </header>
          <section className="song-main">
            <p>
              <span>Get your party gown and get your pigtail down<br /></span>
              <span>And get your heart beatin' baby<br /></span>
              <span>Got my timin' right I got my act all tight<br /></span>
              <span><br /></span>
              <span>It's gotta be tonight<br /></span>
              <span>My little school babe<br /></span>
              <span>Your momma says you don't<br /></span>
              <span>And your daddy says you won't<br /></span>
              <span>And I'm boilin' up inside<br /></span>
              <span>Ain't no way I'm gonna lose out this time<br /></span>
              <span><br /></span>
              <span>Tie your mother down<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Lock your daddy out of doors<br /></span>
              <span>I don't need him nosin' around<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Give me all your love tonight<br /></span>
              <span><br /></span>
              <span>'You're such a dirty louse go get outa my house'<br /></span>
              <span>That's all I ever get from your family ties<br /></span>
              <span>In fact I don't think I ever heard<br /></span>
              <span>A single little civil word from those guys<br /></span>
              <span>I don't give a light<br /></span>
              <span>I'm gonna make out all right<br /></span>
              <span>I've got a sweetheart hand<br /></span>
              <span>To put a stop to all that<br /></span>
              <span>Snipin' and grousin'<br /></span>
              <span><br /></span>            
              <span>Tie your mother down<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Take your little brother swimmin'<br /></span>
              <span>With a brick that's all right<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Or you ain't no friend of mine<br /></span>
              <span><br /></span>            
              <span>Your momma and your daddy<br /></span>
              <span>Gonna plague me till I die<br /></span>
              <span>I can't understand it<br /></span>
              <span>'Cause I'm a peace lovin' guy<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Get that big big big big big big<br /></span>
              <span>Daddy out the door<br /></span>
              <span>Tie your mother down yeah<br /></span>
              <span>Tie your mother down<br /></span>
              <span>Give me all your love tonight<br /></span>
              <span>All your love tonight<br /></span>
            </p>
          </section>
          </section>
          ) : (
            <section className="disclaimer">
              <h2>{ t('disclaimer.header') }</h2>
              <p>
                { t('disclaimer.p1') }
              </p>
              <p>
                { t('disclaimer.p2') }
              </p>
              <p>
                  { t('disclaimer.p3') }
              </p>
            </section>
          )}
      </main>
    </>
  );
}

function Loader() {
  return (
    <>
      <header className="app-header">
      <div href="/" className="logo">
         <h1>
           <img src="inverted-logo.png" alt="logo"/>
           <span className="menu-text">Spotify Lyrics</span>
         </h1>
       </div>
      </header>
      <main className="app-main">
        <section className="loading">
          <FontAwesomeIcon icon={faSpinner} pulse />
        </section>
      </main>
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  )
}
