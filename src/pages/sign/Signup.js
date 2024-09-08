import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Link} from "react-router-dom";
import { Helmet  } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { auth } from "../../firepase/confing";
import { createUserWithEmailAndPassword,updateProfile,sendEmailVerification  } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from "../../comp/loading";
import ReactLoading from "react-loading";



const Signup = () => {
  const navigate = useNavigate();
  const [user, loading,] = useAuthState(auth);
  const {  i18n } = useTranslation();

  const [showloading, setshowloading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const  [username,setusername] = useState("")
  const [haserror, sethaserror] =useState(false)
  const [firebaseerror, setfirebaseerror] = useState("");
  if(loading){
  return(
    <>
  <Loading/>
  </>
  )
  }
  if(user){
    if(!user.emailVerified){
    return(
      <>
      <Header />

<main>
<p className="parag">{i18n.language ==="en" && "We send you an email to verify your Account"}{i18n.language ==="fr" && "We send you an email to verify your Accountee"}{i18n.language ==="ar" && "لقد تم ارسال  بريد لتاكيد حسابك"}</p>
<button className="delete">{i18n.language ==="en" && "Send again"} {i18n.language ==="fr" && "Sende againe"} {i18n.language ==="ar" && "اعادة الارسال"}</button>
</main>
<Footer />


</>
    )
    }
  }

  if(!user&&!loading){
  
    return (
      <>
      <Helmet>
        <title>signup-page</title>
      </Helmet>
        <Header />

        <main>
          
       <form action="">
      
        <p style={{marginBottom:"20px"}}>{i18n.language ==="en" && "create new acount  here"}{i18n.language ==="fr" && "create new acountee  here"}{i18n.language ==="ar" && "انشاء حساب جديد "}</p>
        <input onChange={(e) => {
            setusername(e.target.value)
          }} placeholder="userName:" type="text" required/>
          <input onChange={(e) => {
            setemail(e.target.value)
          }} placeholder="email:" type="text" required/>
          <input onChange={(e) => {
            setpassword(e.target.value)
          }} placeholder="password:" type="text" required/>
          <button onClick={async(e) => {
            
            (e).preventDefault()
            setshowloading(true)
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

              // Signed up 
              
            
              updateProfile(auth.currentUser, {
                displayName: username
              }).then(() => {
                // Profile updated!
                // ...
                sendEmailVerification(auth.currentUser)
              
            .then(() => {
              // Email verification sent!
              // ...
              navigate("/")
            
  });
              }).catch((error) => {
                // An error occurred
                // ...
              });
              
              // ...
            
            })
      
            
            .catch((error) => {

              const errorCode = error.code;
              // ..
              sethaserror(true)
              
             switch (errorCode) {
              case "auth/admin-restricted-operation":
                setfirebaseerror("you didn't write any thing")
                break
                case "auth/invalid-email" :
                  setfirebaseerror("write email correct way")
                  break;
                case 'auth/missing-password' :
                  setfirebaseerror("write password ")
                  break;
                case 'auth/invalid-login-credentials' :
                  setfirebaseerror("write email or password correct ")
                  break;
                  case 'auth/too-many-requests' :
                  setfirebaseerror("please try later ")
                  break;
                default:
                  setfirebaseerror(errorCode)
    
                  break;
              } 
              
            });
            setshowloading(false)
          }
          }>
         
         {showloading ?  <div className="flex" style={{justifyContent:"center"}} >  
          <ReactLoading type={"spin"} color={"white"} height={'20px'} width={'20px'} />
         </div > : "sign up"}</button>
            
          
          <p className="mt">  {i18n.language ==="en" && "   if you have acount"}  {i18n.language ==="ar" && "اذا كان لديك حساب"} {i18n.language ==="fr" &&" if  have accounto"}<Link to="/Signin">{i18n.language ==="en" && "sign-in"}{i18n.language ==="fr" && "signe-inee"}{i18n.language ==="ar" && "سجل الدخول"}</Link></p>
          {haserror&&<h6  style ={{color:"red" , marginTop:"20px"}}> {firebaseerror} </h6>}
  
        </form>
  
      </main>
        
        <Footer />
      </>
    );
  }
};

export default Signup;
