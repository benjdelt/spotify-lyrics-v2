import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Error.css';

function Error({error}) {
  return (
    <section className="error">
      <p>
        <FontAwesomeIcon icon={faExclamationCircle} />
        <span>&nbsp;{error}</span>
      </p>
    </section>
  );
}

export default Error;
