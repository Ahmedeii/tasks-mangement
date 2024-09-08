
import { useTranslation } from 'react-i18next';

import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet  } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firepase/confing';
 import { useEffect } from 'react';
 import { useNavigate } from "react-router-dom";
import Loading from '../comp/loading';
const ABOUT = () => {
  const navigate = useNavigate();
  const {  i18n } = useTranslation();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!user&&!loading) {
      navigate("/signin")
    }
  },)
  if(loading){
    
    <Loading/>
  
  }
  if(user){
    if(user.emailVerified){
      return (
        <>
            <Helmet>
            <title>ABOUT Page</title>
            <meta name="description" content="HTMLLLLLLLLLLLLLLLL" />
          </Helmet>
        <Header />
        <main> {i18n.language ==="en" && "if you want anything can go to ##"} {i18n.language ==="fr" && "if you wante anythinge can go to ##"}   {i18n.language ==="ar" && "اذا كنت تريد اي مساعدة يمكنك الذهاب الي "}</main>
        <Footer />
      </>
      );
    }
  }
  if(user){
    if(!user.emailVerified){
      return(
navigate("/")
      )
    }
  }
}

export default ABOUT;
