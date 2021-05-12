import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownMenuItem } from './Dropdown';
import Loader from './Loader';
import '../styles/Profile.css';

function Profile({user, loading, logout}) {

  const { t } = useTranslation();

  function UserLabel() {
    return (
      <>
        <img src={user.avatarUrl} alt="avatar" className="avatar"/>
        <span className="user text">
          {user.name}
        </span>
      </>
    );
  }

  return (
    <section className="profile">
      {loading ? (
        <Loader />  
      ) : (
        user.name ? (
          <Dropdown label={<UserLabel />}>
              <DropdownMenuItem key={1} handleClick={logout} >{t('user.logout')}</DropdownMenuItem>
          </Dropdown>
        ) : (
          <a href="/.netlify/functions/login" className="login">{ t('login.button') }</a>
      ))}
    </section>
  );
}

export default Profile;
