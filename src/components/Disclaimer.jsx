import { useTranslation } from 'react-i18next';
import '../styles/Disclaimer.css';

function Disclaimer() {

  const { t } = useTranslation();

  return (
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
  );
}

export default Disclaimer;
