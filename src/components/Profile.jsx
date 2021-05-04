import { useTranslation } from 'react-i18next';
import Dropdown from './Dropdown';
import '../styles/Profile.css';

function Profile({user, logout}) {

  const { t } = useTranslation();
  console.log(user)
  return (
    <section className="profile">
      {user.name ?
          <Dropdown options={[t('user.logout')]} optionHandler={logout}>
            <>
              <img src={user.avatarUrl} alt="avatar" className="avatar"/>
              <span className="user text">
                {user.name}
              </span>
            </>
          </Dropdown>
        :
          <a href="/.netlify/functions/login" className="login">{ t('login.button') }</a>
      }
    </section>
  );
}

export default Profile;
