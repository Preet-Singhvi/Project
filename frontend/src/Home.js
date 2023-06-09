/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Grid, Paper,TextField } from '@mui/material';
import axios from "axios";
import { toast } from "react-toastify";
import './Home.css'
export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;
    // console.log(token)
    // console.log("hi")
    // console.log(auth_token)
    axios
      .get("http://localhost:8000/users/", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log("response");
        setUser(response.data.result);
      })
      .catch((error) => {
        // console.log("hi12434")
        console.log(error);
      });
  }, []);

  const onClickHandler = (event) => {
    event.preventDefault();


    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");

    toast("See You !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  // const handleClick = () => {
  //   props.setPage('edit');
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 100);
  // }

  return (
    <div >
      <Grid>
                <Paper elevation={10} className="home">
                    <Grid align='center' className='header'>
                        <h3>View Profile</h3>
                    </Grid>
                        {/* <div className='image'>
                            <img src={user.profile} alt="Error" align='center'></img>
                        </div> */}
                    <TextField 
                        className='field' 
                        variant="outlined" 
                        value={user.firstname}
                        // label="FirstName"
                        disabled
                        fullWidth/>
                    <TextField 
                        className='field' 
                        variant="outlined"
                        // label="LastName"
                        value={user.lastname}
                        disabled
                        fullWidth/>
                    <TextField 
                        className='field' 
                        variant="outlined"
                        // label="Email"
                        value={user.email}
                        disabled
                        fullWidth/>
                    <TextField 
                        className='field' 
                        variant="outlined"
                        value={user.password}
                        disabled
                        // label="Password"
                        fullWidth/>
                    {/* <Button type='submit' 
                        color='primary' 
                        variant='contained' 
                        className='enter'
                        onClick={handleClick} 
                        fullWidth>
                            Edit Profile
                    </Button> */}
                    <Button type='submit' 
                        color='primary' 
                        variant='contained' 
                        className='enter' 
                        onClick={onClickHandler}
                        fullWidth>
                            LogOut
                    </Button>
                </Paper>
                
            </Grid>
    </div>
  );
}
