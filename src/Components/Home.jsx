import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Alert } from 'react-alert'

import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import InterviewList from "./InterviewList";

import "./all.css";

export default function Home() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [participant, setParticipant] = useState();

  // get all users
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


  const handleOnchange = (val) => {
    const arr = val.split(",").map((element) => {
      return Number(element);
    });
    setParticipant(arr);
  };

  const options1 = [];
  for (let i = 0; i < users.length; i++) {
    options1.push({ label: users[i].full_name, value: users[i].id });
  }

  // Submit schedule interview
  const InterviewSubmit = () => {
    fetch("http://127.0.0.1:8000/manageInterviews/", {
      method: "POST",
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
        if (response.status == 201) {
          toast.success("Wow You have added an another Interview!");
          alert("Wow You have added an another Interview!");
        }
        else{
        alert("Please recheck the data entered for scheduling the interview.");
          console.log(response);
        }
      })
      .catch((error) => {
        console.error(error);
          // alert(error);
      });
  };



  return (
    <>
      <div className="headings">
        <h1>Interview Creation Portal</h1>
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
          <button className="scheButoon" onClick={InterviewSubmit}>
            Schedule Interview
          </button>
        </div>
      </div>
      <InterviewList />
    </>
  );
}
