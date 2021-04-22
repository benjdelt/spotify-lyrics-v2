function Layout(props) {
  return (
    <>
      <header className="app-header">
      <div className="logo">
        <h1>
          <img src="inverted-logo.png" alt="logo"/>
          <span className="menu-text">Spotify Lyrics</span>
        </h1>
      </div>
      {props.nav}
      </header>
      <main className="app-main">
        {props.children}
      </main>
    </>
  )
}

export default Layout;
