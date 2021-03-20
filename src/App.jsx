import Dropdown from './components/Dropdown';

function App() {

  return (
    <>
      <header className="app-header">
        <a href="#" className="logo">
          <h1>
            <img src="inverted-logo.png" alt="logo"/>
            <span className="text">Spotify Lyrics</span>
          </h1>
        </a>
        <nav>
          <ul>
            <li>
              <Dropdown options={["English", "Français"]}><span className="text">Language</span></Dropdown>
            </li>
            <li>
              <button><span className="text">Currently Playing</span></button>
            </li>
            <li>
              <button><span className="text">Track History</span></button>
            </li>
            <li>
              <a href="#"><span className="text">See on Github</span></a>
            </li>
          </ul>          
        </nav>
      </header>
      <main className="app-main">
        <section className="profile">
          {false ? 
            <a href="#" className="login">Login to Spotify</a>
            :
            <Dropdown options={["Logout"]}>
              <>
              <img src="https://picsum.photos/200" alt="avatar" className="avatar"/>
              <span className="user text">
                Benjamin Deltenre
              </span>
              </>
            </Dropdown>
          }
        </section>
        {true ? (
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
              <h2>Please log in to continue</h2>
              <p>
                Click on the "Login to Spotify" button in the lower-left corner to connect to your Spotify account,
                then click "Okay" to grant authorization to this app.
              </p>
              <p>
                This app shows the lyrics of the track currently playing on your Spotify account. The left-side menu
                allows you to also see the lyrics for your recently played tracks or to go back to your currently playing
                track.
              </p>
              <p>
                Although cookies are used to keep track of your Spotify account, no information is collected or saved.
              </p>
            </section>
          )}
      </main>
    </>
  );
}

export default App;
