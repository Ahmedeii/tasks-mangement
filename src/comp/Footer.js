import React from "react";
import { useTranslation } from 'react-i18next';

import    './Footer.css';
const Footer = () => {
  const { i18n } = useTranslation();
if (i18n.language ==="ar") {
  
  return (
    <div className="myfooter">
          <footer dir="auto" className="ali   ">
      تم التصميم والبرمجة بواسطة احمد عبد النبي
          <span>🧡</span>
            
          </footer>
    </div>
      );
    
}
if (i18n.language ==="en") {
  
  return (
    <div className="myfooter">
          <footer className="ali   ">
          Designed and developed by Courses4Arab.com<span>🧡</span>
          </footer>
    </div>
      );
    
}
if (i18n.language ==="fr") {
  
  return (
    <div className="myfooter">
          <footer className="ali   ">
          Conçu et développé par Courses4Arab.com<span>🧡</span>
          </footer>
    </div>
      );
    
}
}
  
// { === "ar" && "ن     "}
// {i18n.language === "en" && ""}
// {i18n.language === "fr" && "  "}

export default Footer;
