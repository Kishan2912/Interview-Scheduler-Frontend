import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "./all.css";

export default function Interviewupdate() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [participant, setParticipant] = useState();
  const [id, setid] = useState(null);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const options1 = [];
  for (let i = 0; i < users.length; i++) {
    options1.push({ label: users[i].full_name, value: users[i].id });
  }

  const handleOnchange = (val) => {
    const arr = val.split(",").map((element) => {
      return Number(element);
    });
    console.log(arr);
    console.log(val);
    setParticipant(arr);
  };

  let ID;
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      ID = location.state.ids;
      setid(ID);
    }
  }, []);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const Users = await axios.get("http://127.0.0.1:8000/manageusers/");
        console.log(Users.data);
        setUsers(Users.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const Users = await axios.get(
          `http://127.0.0.1:8000/manageInterviews/${ID}/`
        );
        console.log(Users.data);
        setParticipant(Users.data.participants);
        setStartTime(Users.data.startTime);
        setEndTime(Users.data.endTime);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  // Update interview 
  const InterviewUpdateSubmit = () => {
    fetch(`http://127.0.0.1:8000/manageInterviews/${id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startTime: startTime,
        endTime: endTime,
        participants: participant,
      }),
    })
      .then((response) => {
        if (response.status == 200) {
          navigate("/");
          alert("Interview Updated!");
        }
        else{
          alert("Please recheck the data entered for scheduling the interview.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="headings">
        <h1>update Your Interview</h1>
      </div>

      <div className="currParti">
        <h4>Current Participants Id: {participant}</h4>
      </div>
      <div className="schHead">
        <div className="schMulti">
          <MultiSelect
            onChange={handleOnchange}
            options={options1}
            placeHolder="Participants"
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Time"
              renderInput={(params) => <TextField {...params} />}
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End Time"
              renderInput={(params) => <TextField {...params} />}
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <div>
          <button className="scheButoon" onClick={InterviewUpdateSubmit}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}
