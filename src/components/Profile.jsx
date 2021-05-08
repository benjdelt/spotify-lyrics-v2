import { useTranslation } from 'react-i18next';
import Dropdown from './Dropdown';
import Loader from './Loader';
import '../styles/Profile.css';

function Profile({user, loading, logout}) {

  const { t } = useTranslation();

  return (
    <section className="profile">
      {loading ? (
        <Loader />  
      ) : (
        user.name ? (
          <Dropdown options={[t('user.logout')]} optionHandler={logout}>
            <>
              <img src={user.avatarUrl} alt="avatar" className="avatar"/>
              <span className="user text">
                {user.name}
              </span>
            </>
          </Dropdown>
        ) : (
          <a href="/.netlify/functions/login" className="login">{ t('login.button') }</a>
      ))}
    </section>
  );
}

export default Profile;
