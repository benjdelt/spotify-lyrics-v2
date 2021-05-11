import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Error.css';

function Error({errorType}) {

  const { t } = useTranslation();

  return (
    <section className="error">
      <p>
        <FontAwesomeIcon icon={faExclamationCircle} />
        <span>&nbsp;{t(`error.${errorType}`)}</span>
      </p>
    </section>
  );
}

export default Error;
