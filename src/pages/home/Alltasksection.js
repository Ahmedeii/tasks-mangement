import React from "react";
import { useTranslation } from 'react-i18next';

import { db } from "../../firepase/confing";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";

const Alltasksection = ({ user }) => {
  const [selectvalue, setselectvalue] = useState("All tasks");
  const [initialdata, setinitialdata] = useState(
    query(collection(db, user.uid), orderBy("id", "asc"))
  );
  const [opacity, setopacity] = useState(false);
  const [value, loading, error] = useCollection(initialdata);
  const { t, i18n } = useTranslation();

  if (error) {
    return <h1>error</h1>;
  }
  if (loading) {
    return (
      <section>
        <ReactLoading
          type={"spin"}
          color={"white"}
          height={"77"}
          width={"77px"}
        />{" "}
      </section>
    );
  }
  if (value) {
    if (value.docs.length === 0) {
      return (
        <h1 style={{ color: "green" }}>
          {" "}
          congratulation you have completed your tasks 🧡
        </h1>
      );
    }
    return (
      //======== {  button and select filter tasks  }==========//
      <div >
        <section className="parentbtn " >
        {selectvalue === "All tasks" && (<div>
          <button
            style={{ opacity: opacity ? "1" : "0.3" }}
            onClick={() => {
              setinitialdata(
                query(collection(db, user.uid), orderBy("id", "desc"))
              );

              setopacity(true);
            }}
          >
            
            {i18n.language === "fr" && "Le plus récent"}
                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الأحدث أولاً"}
          </button>
          <button
            style={{ opacity: opacity ? "0.3" : "1" }}
            onClick={() => {
              setinitialdata(
                query(collection(db, user.uid)),
                orderBy("id", "asc")
              );
              setopacity(false);
            }}
          >
           {i18n.language === "en" && "Oldest first"}
                {i18n.language === "ar" && "الأقدم أولاً"}
                {i18n.language === "fr" && "Le plus ancien"}
          </button>
        </div>)}
          <select
          value={selectvalue}
            onChange={(e) => {
              if (e.target.value === "All tasks") {
                setinitialdata(
                  query(collection(db, user.uid), orderBy("id", "asc"))
                );
                setselectvalue("All tasks")
                setopacity(false)
              } else if (e.target.value === "completed") {
                setinitialdata(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", true)
                    
                  )
                
                );
                
                setselectvalue("completed")
              } else {
                setinitialdata(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", false)
                  )
                );
                setselectvalue("not completed")
              }
            }}
            id="sele"
          >
            <option value="All tasks">
              {i18n.language === "ar" && "جميع المهام"}
              {i18n.language === "en" && "All Tasks "}
              {i18n.language === "fr" && "Toutes les tâches"}</option>
            <option value="completed">
              {i18n.language === "ar" && "المهام المكتملة"}
              {i18n.language === "en" && "Completed Tasks"}
              {i18n.language === "fr" && "Tâches terminées"}</option>
            <option value="not completed">
              {i18n.language === "en" && "Not Completed Tasks"}
              {i18n.language === "ar" && "المهام غير المكتملة"}
              {i18n.language === "fr" && "Tâches non terminées"}</option>
          </select>
        </section>

        {/* get data of tasks from fire-store */}

        <section className="flex alltasks">
          {value.docs.map((item) => {
            return (
              <Link
                className="link"
                key={item.data().id}
                to={`edite/${item.data().id}`}
              >
                <section key={item} className="onetask">
                  <h2>{item.data().tittle}</h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}>{item}</li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>
                  <p className="time">
                    <Moment fromNow>{item.data().id}</Moment>
                  </p>
                </section>
              </Link>
            );
          })}
        </section>
      </div>
    );
  }
};

export default Alltasksection;
