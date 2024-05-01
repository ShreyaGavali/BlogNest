import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
  <footer>
    <hr></hr>
    <div className="f-info">
        <div className="f-info-socials">
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-square-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
        </div>
        <div className="f-info-brand">&copy; BlogNest Private Limited</div>
        <div className="f-info-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
        </div>
    </div>
  </footer>
  )
}

export default Footer
