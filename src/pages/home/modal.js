import React from 'react';
import ReactLoading from "react-loading";
import Model from "../../shared.js/model"
const Modelhome = ({titlebtn,detailsbtn,addbtn,array,submitbtn,close,showloading,tasktittle,data}) => {
  return (

<Model  closemodel={close}>
  <div className="model-content">            
    <input onChange={(e) => {
      titlebtn(e)
}} type="text" placeholder="Title task:" value={tasktittle} required />
<div>
  <input onChange={(e) => {
  detailsbtn(e)

  }} type="text" placeholder="details" value={data} required />
  <button onClick={(e) => {

addbtn(e)
  }} >add</button>
</div>
<ul className="ulhome" >
  {array.map((item) => (
    <li key={item}>{item}</li>
  )
    
  )}
</ul>

<button onClick={async (e) => {
  submitbtn(e)
} }style={{marginBottom:"8px"}}> {showloading ? <ReactLoading type={"spin"} color={"white"} height={'20px'} width={'20px'} /> : "submit"}</button>
              </div>
              
              
              
              </Model>
  );
}

export default Modelhome;
