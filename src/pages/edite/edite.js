import React from "react";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import "./edite.css";
import Tittleedite from "./tittleedite";
import Taskedite from "./taskedite";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import ReactLoading from "react-loading";

import { auth } from "../../firepase/confing";
import Loading from "../../comp/loading";
import { useParams } from "react-router-dom";
import { doc, updateDoc,arrayRemove,deleteDoc} from "firebase/firestore";
import { db } from "../../firepase/confing";
import {  useNavigate } from 'react-router-dom';



const Edite = () => {
  const [appear, setappear] = useState(true);
  const [user, loading, error] = useAuthState(auth);
  let { stringid } = useParams();
  const navigate = useNavigate();

  const removeall = async () => {
    setappear(false)
    


    await deleteDoc(doc(db, user.uid, stringid));

    navigate("/", {replace:true})
    
          }
  // function tittle
  const tittleinput = async (e) => {
    await updateDoc(doc(db, user.uid, stringid), {
      tittle: e.target.value,
    });
    
  };
  // function checkbox
  const checkbox = async(e) => {
    if (e.target.checked)  {
          
      await updateDoc(doc(db, user.uid, stringid), {
      completed: true,
  
  }) 

                } else{
                
                  await updateDoc(doc(db, user.uid, stringid), {
                    completed: false,
                })
              }
  }

  // function icondelete
  const icondelete= async(item) => {
     
    await updateDoc(doc(db, user.uid, stringid), {
      details: arrayRemove(item),
    });
      } 
  if (error) {
    return <h2>error404</h2>;
  }
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return (
      <>
        <Header />
     {appear ? ( <div className="parentedite mtt center">
          <Tittleedite
            user={user}
            stringid={stringid}
            tittleinput={tittleinput}
          />
          
          <Taskedite user={user} stringid={stringid} checkbox={checkbox} icondelete={icondelete} removeall={removeall}/>
          
        </div>):(<ReactLoading type={"spin"} color={"white"} height={'20px'} width={'20px'} /> )   } 
        <Footer />
      
      </>
    );
  }
};

export default Edite;
