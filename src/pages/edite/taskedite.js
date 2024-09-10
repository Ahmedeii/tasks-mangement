import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firepase/confing";
import Moment from "react-moment";
import { useState } from "react";

const Taskedite = ({ user, stringid, checkbox, icondelete, removeall }) => {
  const [addnewtask, setaddnewtask] = useState(false);
  const [inputvalue, setinputvalue] = useState("");
  const [value] = useDocument(doc(db, user.uid, stringid));
  
  

  if (value) {
    return (
      <section className="data-edite mtt">
        <div className="head-data-edite">
          <p>
            {" "}
            created:<Moment fromNow>{value.data().id}</Moment>
          </p>
          <div className="check">
            <input
              onChange={async (e) => {
                checkbox(e);
              }}
              checked={value.data().completed}
              id="time"
              type="checkbox"
            />
            <label htmlFor="time">completed</label>
          </div>
        </div>
        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="cardtask  center">
                <p>{item}</p>
                <i
                  onClick={(e) => {
                    icondelete(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>
        {addnewtask && (
          <form style={{flexDirection:"row"}} className="add-new-task flex">
            <input
              onChange={(e) => {
                setinputvalue(e.target.value);
              }}
              value={inputvalue}
              className="add-task"
              type="text"
            />

            <button
              className="add"
              onClick={async (e) => {
                e.preventDefault()
                setinputvalue("");
                await updateDoc(doc(db, user.uid, stringid), {
                  details: arrayUnion(inputvalue),
                });
              
              }}
              
            >
              {" "}
              add
            </button>
            <button
              onClick={() => {
                setaddnewtask(false);
              }}
              className="cancel"
            >
              cancel
            </button>
          </form>
        )}
        <div className="center mtt">
          <button
            onClick={() => {
              setaddnewtask(true);
            }}
            className="addmore "
          >
            add more +
          </button>
          <div>
            <button
              onClick={() => {
                removeall();
              <h1> congratulation</h1>
              }}
              className="delete mtt"
            >
              delete tasks
            </button>
          </div>
        </div>
      </section>
    );
  }
};

export default Taskedite;
