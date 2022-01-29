import React, { useEffect, useState } from 'react';
import { Typography, Box, Input, Button } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie/es6';


export default function UserLogin(props) {
  const cookies = new Cookies();
  const [ credentials, setCredentials ] = useState({
    username: "",
    password: ""
  });
  const [ loggingIn, setLoggingIn ] = useState(false);
  const [ creatingUserProfile, setCreatingUserProfile ] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  async function handleLogin() {
    setLoggingIn(true);

    try {
      const result = await axios.get(`http://localhost:50973/api/FinnHub/handleLogin?username=${credentials.username}&password=${credentials.password}`);
      if (result.status === 200 && result.data) {
        props.handleLogin(credentials.username, result.data);
      }
      
    } catch (err) {
      console.log("err: ", err);
      // Show error message

      setLoggingIn(false);
    }
  }

  async function handleProfileCreation() {
    setCreatingUserProfile(true);

    try {
      const result = await axios.post(`http://localhost:50973/api/FinnHub/getStockDetails?`);
    } catch (err) {
      // Show error message
    } finally {
      setCreatingUserProfile(false);
    }
  }

  return (
    <div className="contentContainer">
      <Box
        sx={{
          backgroundColor: "white",
          color: "black",
          width: "280px",
          minHeight: "230px",
          margin: "auto",
          padding: "10px",
          paddingTop: "30px",
          textAlign: "center"
        }}
      >
        <Typography 
          variant="h6"
          color="secondary"
        >
          Log In
        </Typography>
        <Input
          sx={{
            display: "block",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "20px",
            marginBottom: "20px"
          }}
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <Input
          sx={{
            display: "block",
            marginLeft: "5%",
            marginRight: "5%"
          }}
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <div 
          style={{
            marginTop: "30px",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <Button 
            variant="outlined"
            color="secondary"
            sx={{
              width: "45%",
              marginRight: "10%"
            }}
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Button 
            variant="outlined"
            color="secondary"
            sx={{
              width: "45%"
            }}
            onClick={handleProfileCreation}
          >
            Create
          </Button>
        </div>
      </Box>
    </div>
  );
}