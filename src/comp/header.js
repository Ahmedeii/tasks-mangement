import { useTranslation } from 'react-i18next';
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import  '../theme.css';
import {useContext } from "react";
import ThemeContext from "../contextapp/context";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firepase/confing';
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  const {theme,changetheme} = useContext(ThemeContext);
  const { t, i18n } = useTranslation();


  return (
    <div className={`myheader`}>
      <header className="hide-when-mobile ali">
        <h1>
          <Link to="/" className="logoo">Tasks-Management</Link>
        </h1>
        {/* icon to change theme */}
        <i className="fa-solid fa-moon"onClick={()=>{
          changetheme(theme === "light" ? "dark":"light")}}></i>
          <i className="fa-solid fa-sun" onClick={()=>{
          changetheme(theme === "light" ? "dark":"light")}}></i>

        <ul className="flex">

              {/*====chang language ====*/}

              <li className=" main-list scale  "> 
              <ul className="list-lang">
                <li onClick={() => {
  i18n.changeLanguage("ar");
}}
 dir="auto">
                <p>العربيه</p>
                {i18n.language === "ar" &&<i  className="fa-solid fa-check"></i>}
                </li>
                <li onClick={() => {
  i18n.changeLanguage("en");
}}>
                  <p>English</p>
                  {i18n.language === "en" &&<i  className="fa-solid fa-check"></i>}

                </li>
                <li onClick={() => {
  i18n.changeLanguage("fr");
}}>
                  <p>French</p>
                  {i18n.language === "fr" &&<i  className="fa-solid fa-check"></i>}

                </li>
              </ul>
              {t("lang")}
              
              </li>
            {/*====  sign and profile and about ==== */}
          {user &&  
          <li onClick={() => {
            
            signOut(auth).then(() => {
              // Sign-out successful.
            }).catch((error) => {
              // An error happened.
            });
          }}className="main-list">
            <button className="main-link sign-out" >
              {t("signout")}
            </button>
            </li>}
          
      {!user &&  <li className="main-list">
            <NavLink className="main-link" to="/Signin">
              {t("signin")}
            </NavLink>
            </li>}
          {!user&&  <li className="main-list">
            <NavLink className="main-link" to="/Signup">
              {t("signup")}
            </NavLink>
            </li>}
            
            {user&&<li className="main-list">
            <NavLink className="main-link" to="/About">
              {t("support")}
            </NavLink>
            
          
          </li>}
          
          
          {user&&<li className="main-list">
            <NavLink className="main-link" to="/profile">
              {t("account")}
            </NavLink>
            </li>}
        </ul>
      </header>

    
    </div>
  );
};

export default Header;
