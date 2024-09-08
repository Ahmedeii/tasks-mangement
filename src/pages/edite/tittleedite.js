import { useDocument } from "react-firebase-hooks/firestore";
 import { doc} from "firebase/firestore";
import { db } from '../../firepase/confing';
import ReactLoading from "react-loading";
import { useRef } from "react";

const Tittleedite = ({user,stringid,tittleinput}) => {
  const focus = useRef()
 const [value, loading, error] = useDocument(doc(db, user.uid, stringid));
 if(error){
  <h2>{error.message}</h2>
 }
if(loading){
  <main><ReactLoading type={"spin"} color={"white"} height={'20px'} width={'20px'} /></main>
}
if(value){
  return (
    <section className='headeredite'>
    <input onChange={(e) => {
      tittleinput(e)
    }}  defaultValue={value.data().tittle} className='inputheader center' type="text" ref={focus} /> <i onClick={() => focus.current.focus()}
className="fa-solid fa-pen-to-square"></i>
{(value.data().completed) && (  <style>{`  .inputheader{
    text-decoration: line-through wavy #454545;`
  
    }</style>)
}
  

  </section>
  );
}
}

export default Tittleedite;
