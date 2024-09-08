
import { auth } from '../firepase/confing';
import { useAuthState } from 'react-firebase-hooks/auth';
import Moment from 'react-moment';
import { useTranslation } from 'react-i18next';

import { deleteUser } from "firebase/auth";
import Header from '../comp/header';
import Footer from '../comp/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../comp/loading';
const Profile = () => {
  const {  i18n } = useTranslation();

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
      if(!user && !loading){
        navigate("/")
      }
  });
  if(loading){
  
  <Loading/>
  
  }
  if(error){
    <h1>errorr........</h1>
  }

  if(user){
  
    if(user.emailVerified){
      return (
        <div>
          <Header/>
        
            <main >
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>

              <h6>{i18n.language ==="en" && "user name"}{i18n.language ==="fr" && "useree namee"}{i18n.language ==="ar" && "اسم المستخدم"}:  {user.displayName}</h6>
              <h6>{i18n.language ==="en" && "email"}{i18n.language ==="ar" && "الايميل"}{i18n.language ==="fr" && "emaile"}:  {user.email}</h6>
              <h6> {i18n.language ==="ar" && "اخر تسجيل"}{i18n.language ==="fr" && "laste signine"}{i18n.language ==="en" && "last signin"}: <Moment className='m' fromNow>{user.metadata.lastSignInTime}</Moment></h6>
              <h6>{i18n.language ==="ar" && "تم الانشاء منذ"} {i18n.language ==="fr" && "accounte created"} {i18n.language ==="en" && "account created"}: <Moment className='m' fromNow>{user.metadata.creationTime}</Moment></h6>
              <button  className='delete mt' onClick={() => {
                
deleteUser(user).then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});
              }}>{i18n.language ==="en" && "delete account"} {i18n.language ==="fr" && "delete accountee"}{i18n.language ==="ar" && "حذف الحساب"}</button>
            </div>
            </main>
          
          <Footer/>
        </div>
            );

    }
    if(!user.emailVerified){
      navigate("/")
    }
  }
  
  
  }

  

export default Profile;
