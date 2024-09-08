import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firepase/confing";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import "./signin.css"
import Model from "../../shared.js/model";
import ReactLoading from "react-loading";

const Signin = () => {
  const {  i18n } = useTranslation();


  const close = () => {
    setclosethis(false)
  }
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
const [resetpassword, setresetpassword] = useState("");
const [emailresent, setemailresent] = useState(false);
  const navigate = useNavigate();
  const [haserror, sethaserror] =useState(false)
  const [firebaseerror, setfirebaseerror] = useState("");
  const [closethis, setclosethis] = useState(false);
  const [showloading, setshowloading] = useState(false);

  
  return (
    <>
      <Helmet>
        <title>signin-page</title>
      </Helmet>
      <Header />
      <main>
    {closethis&& <Model closemodel={close}> 
  
    <input onChange={(e) => {
  setresetpassword(e.target.value)
}} type="email" placeholder="E-mail:" required />

<button onClick={(e) => {
  e.preventDefault()

  setemailresent(true)
  sendPasswordResetEmail(auth, resetpassword)
.then(() => {
// Password reset email sent!
// ..
})
.catch((error) => {

// ..
});
}}>  {i18n.language ==="fr" && "resete passwordw"} {i18n.language ==="en" && "reset password"} {i18n.language ==="ar" && "اعادة تعيين كلمة السر"}</button>
          {emailresent  && (<p className="parag">{i18n.language ==="en" && "please check your email to reset your password"} {i18n.language ==="ar" && "من فضلك ابحث بريدك لا عادة تعيين كلمة السر"}{i18n.language ==="fr" && "pleasee check voues email to reset your password"}</p>)} 

    
    
    
    
    
    
    
    </Model> }
        <form action="">

          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="userName:"
            type="email"
            required
          />
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="password:"
            type="text"
            required
          />
          <button style={{justfiyContent:"center"}}
            onClick={async(e) => {
            e.preventDefault()
            setshowloading(true)
              await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                
                
                  navigate("/");

                })
                .catch((error) => {
                  const errorCode = error.code;
                  sethaserror(true)
                  switch (errorCode) {
                    case "auth/missing-email":
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
            }}
          >
            {showloading ?<div className="flex" style={{justifyContent:"center"}} > <ReactLoading  type={"spin"} color={"white"} height={'20px'} width={'20px'} /> </div>: "sign in"}
          </button>
          <p  >
          {i18n.language ==="en" && "  don't have account"}  {i18n.language ==="ar" && "اذا كنت لا تملك حساب"} {i18n.language ==="fr" && "nou have accountoe"}<Link to="/Signup">{i18n.language ==="en" && "sign-up"}{i18n.language ==="fr" && "signe-up"}{i18n.language ==="ar" && "سجل الدخول"}</Link>
          </p>
          <p className="show mtt" onClick={(e) => {
          e.preventDefault()
          setclosethis(true)
        }}>{i18n.language ==="en" && "forget password ?"} {i18n.language ==="fr" && "forgete passworde ?"} {i18n.language ==="ar" && "نسيت الباسورد"}</p>
        
          {haserror&&<h6 style ={{color:"red",marginTop:"20px"}}> {firebaseerror} </h6>}
        </form>

      </main>

      <Footer />
    </>
  );
};

export default Signin;
