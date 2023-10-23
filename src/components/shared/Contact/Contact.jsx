import './Contact.scss';
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faSnapchat,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export default function Contact() {
  return (
    <div className="contactPage">
      <div className="contactPage__contacts">
        <a href="https://www.instagram.com/stelko0u">
          <div className="contactPage__contact">
            <FontAwesomeIcon
              className="contactPage__contactIcon"
              icon={faInstagram}
            />

            <span >
              <h1 className="contactPage__titleContact">Instagram</h1>
              <h3 className="contactPage__textContact">stelko0u</h3>
            </span>
          </div>
        </a>
        <a href="https://www.facebook.com/stelko0u">
          <div className="contactPage__contact">
            <FontAwesomeIcon
              className="contactPage__contactIcon"
              icon={faFacebook}
            />
            <span>
              <h1 className="contactPage__titleContact">Facebook</h1>
              <h3 className="contactPage__textContact">
                Стелиан Росенов Христов
              </h3>
            </span>
          </div>
        </a>
        <div className="contactPage__contact">
          <FontAwesomeIcon
            className="contactPage__contactIcon"
            icon={faDiscord}
          />
          <span>
            <h1 className="contactPage__titleContact">Discord</h1>
            <h3 className="contactPage__textContact">stelko0u#2899</h3>
          </span>
        </div>
        <div className="contactPage__contact">
          <FontAwesomeIcon
            className="contactPage__contactIcon"
            icon={faSnapchat}
          />
          <span>
            <h1 className="contactPage__titleContact">Snapchat</h1>
            <h3 className="contactPage__textContact">stelko0r</h3>
          </span>
        </div>
        <div className="contactPage__contact">
          <FontAwesomeIcon
            className="contactPage__contactIcon"
            icon={faEnvelope}
          />
          <span>
            <h1 className="contactPage__titleContact">Gmail</h1>
            <h3 className="contactPage__textContact">mtel19999@gmail.com</h3>
          </span>
        </div>
      </div>
    </div >
  );
}
