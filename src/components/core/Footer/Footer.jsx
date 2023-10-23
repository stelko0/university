import './Footer.scss';
export default function Footer() {
  let startProjectYear = 2022;
  let currentYear = new Date().getFullYear();
  return (
    <footer>
      <h1>Universty by <a href="www.instagram.com/stelko0u">stelko0u</a></h1>
      <p>All rights reserved © {startProjectYear} - {currentYear}</p>
    </footer>
  );
}