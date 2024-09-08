
  /* create function return it to close model to close form */

const Model = ({closemodel,children}) => {
  
  
  return (

      <div className="parentmodel">  <form style={{backgroundColor: "whiteSmoke"}} className="model" action="">
        
        <style>{`
    
    .model{
  display: flex;
  width:400px ;
  height: 300px;
  border-radius: 12px;
  position: fixed;
  align-items: center;
    justify-content: center;
    overflow-y:scroll;
    animation: animationmodel 0.8s ;
    overflow-Y: scroll;
  }
  
  @keyframes animationmodel{
    0% {scale: 0;transform: translateY(-100vh);}

    100% {scale: 1; transform: translateY(0);}
    }
  .parentmodel{
    
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.46);
    z-index: 6;
    .close .fa-xmark{
      position: absolute;
      color: #222;
      right: 15px;
      top: 20px;
      
    } 
      
    .close .fa-xmark:hover{
      transform: rotate(90deg);
      transition: .3s;
      color: orange;
      
    }
  
    }
    `
  }
  
  </style>
  
        <div className="close"><i onClick={(e) => {
          e.preventDefault()
          closemodel()
        }}  className="fa-solid fa-xmark"></i></div>
        {children}
        
        
        </form>
        </div>
        
  );
}

export default Model;

