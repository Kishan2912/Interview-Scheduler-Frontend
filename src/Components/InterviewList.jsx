import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./all.css";

export default function InterviewList() {
  const [itrList, setItrList] = useState([]);
  const navigate = useNavigate();
  
  // Get all Interview as list
  useEffect(() => {
    async function getAllinterviews() {
      try {
        const interviews = await axios.get(
          "http://127.0.0.1:8000/manageInterviews/"
        );
        setItrList(interviews.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllinterviews();
  }, []);

  const interviewupdate = (itemid) => {
    navigate("/interviewupdate", {
      state: {
        ids: itemid,
      },
    });
  };

  const utc_to_ist = (utc) => {
    let date = new Date(utc);
    return `${date.getDate()}/${date.getMonth()}/${date.getYear()}, ${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <>
      <div className="interviewListheading">
        <h2> Scheduled Interview List</h2>
      </div>
      <div>
        <div className="interviewListhead">
          <div>Interview No.</div>
          <div>Start-Time</div>
          <div>End-Time</div>
          <div>Participants-id</div>
          <div>Edit Interview ?</div>
        </div>
        {itrList.map((item) => (
          <div key={item.id} className="interviewList">
            <div>{item.id}</div>
            <div>{utc_to_ist(item.startTime)}</div>
            <div>{utc_to_ist(item.endTime)}</div>
            <div>{item.participants[0]},{item.participants[1]}</div>
            <div>
              <button
                className="editButton"
                onClick={() => interviewupdate(item.id)}
              >
                Edit it
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
