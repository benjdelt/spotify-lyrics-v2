import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../styles/Loader.css';

function Loader() {
  return (
    <section className="loading">
      <FontAwesomeIcon icon={faSpinner} pulse />
    </section>
  )
}

export default Loader;
