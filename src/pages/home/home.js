/* eslint-disable no-undef */
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/loading";
import { Helmet } from "react-helmet-async";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firepase/confing';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import "./home.css"
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../firepase/confing";
import Modelhome from "./modal";
import Alltasksection from "./Alltasksection";
import Snackbar from "../../shared.js/snackbar";

const Home = () => {
  const [closethis, setclosethis] = useState(false);
  const [array, setarray] = useState([]);
  const [data, setdata] = useState("");
  const [tasktittle, settasktittle] = useState("");
  const [showloading, setshowloading] = useState(false);
  const [right, setright] = useState(true);
  const {  i18n } = useTranslation();


  // ====================
// function model
  // =======================
  
  const close = () => {
    setclosethis(false)
    settasktittle("")
    setarray([])
  }
  const submitbtn =async(e) =>{
    e.preventDefault()
    setshowloading(true)
  
    const newDate= new  Date().getTime()
    await setDoc(doc(db, user.uid, `${newDate}`), {
      tittle: tasktittle,
      details:array,
      id:newDate,
      completed:false,
    });  
    setshowloading(false)
  
    setarray([])
    settasktittle("")
    setclosethis(false)
    setright(false)
    setTimeout(() => {
      setright(true)
    }, 4000);
  }
  const addbtn =(e)=>{
    e.preventDefault()
    if (!array.includes(data)) {
      array.push(data)
      
    }
    setdata("")
  }
  const detailsbtn=(e)=>{
    setdata(e.target.value)
  }
  const titlebtn =(e)=>{
    settasktittle(e.target.value)
  }
  const [user, loading,] = useAuthState(auth);
  
  if(loading){
    return(
      <><Loading /></>
      
    )
    }
  
  if(!user){
  return(
    <div>
    <Header/>
    <main>
    {user &&<main>  {i18n.language ==="ar" && ":مرحبا"}    {i18n.language ==="en" && "welcome"} {i18n.language ==="fr" && "wlcomee"}{user.displayName} <span>🧡</span></main>}

      <p  style={{fontSize:"30px"}} className=" mainp pls ">    {i18n.language ==="en" && "please"}{i18n.language ==="fr" && "pleasee"}{i18n.language ==="ar" && "من فضلك"}{""} <Link to="Signin">    {i18n.language ==="en" && "sign-in"}
      {i18n.language ==="ar" &&"سجل الدخول" }
      {i18n.language ==="fr" && "signee-in"}
            </Link> {" "}    {i18n.language ==="en" && "and countineu..."}
            {i18n.language ==="ar" && "ثم استمر...." }
            {i18n.language ==="fr" && "and voeleoe"}
            </p>

      </main>
      <Footer/>
</div>
  )
  }

  
  if(user){
    if(!user.emailVerified){
      return(
        <>
        <Header />
  
  <main>
  <p className="mainp">   
 {i18n.language ==="en" && "We send you an email to verify your Account"}
  {i18n.language ==="ar" && "تم ارسال ايميل لتاكيد الحساب"}
  {i18n.language ==="fr" &&"We sende you an emailo to verifyo your Accounte" }
  
  </p>
  <button className="delete" onClick={() => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    })
  }}>     {i18n.language ==="en" && "Send again"}
      {i18n.language ==="ar" && "اعادة الارسال"}
      {i18n.language ==="fr" && "sendo againee"}
  
  </button>
  </main>
  <Footer />
  
  
  </>
      )
    }
    if(user.emailVerified){
      
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          
          <Header />
            <main>
            {closethis&&<Modelhome
            addbtn={addbtn}
            submitbtn={submitbtn}
            titlebtn={titlebtn}
            detailsbtn={detailsbtn}
            array={array}
            close={close}
            showloading={showloading}
            tasktittle={tasktittle}
            data={data}
            
            
            />} 
            <Snackbar right={right}/>
            
            
                <Alltasksection user={user} />
            
        
              <section>
                  <button className="mt addtask" onClick={() => {
                  
                      setclosethis(true)
                      
                  }}>
              
                  {i18n.language === "en" && "Add new task +"}
                {i18n.language === "ar" && " + أضف مهمة جديدة"}
                {i18n.language === "fr" && "Ajouter une nouvelle tâche  +"}
                
                  </button>
                </section>
            </main>
        
          <Footer />
        </>
      );
        }
  }
};

export default Home;
