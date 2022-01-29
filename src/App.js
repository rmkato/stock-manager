import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie/es6';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar/NavBar';
import Portfolio from './components/Portfolio/Portfolio';
import StockSearch from './components/StockSearch/StockSearch';
import News from './components/News/News';
import UserLogin from './components/UserLogin/UserLogin';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#666666'
    }
  }
})

function App() {
  const cookies = new Cookies();
  const [ username, setUsername ] = useState("");
  const [ userId, setUserId ] = useState("");

  function handleLogin(user, id) {
    let expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    cookies.set("userId", id, {
      expires: expirationDate
    });

    setUsername(user);
    setUserId(id);
  }

  useEffect(() => {
    let id = cookies.get("userId");
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      let currentUrl = window.location.href;
      let page = currentUrl.split('/').pop();
      if (page === "login") {
        window.location.reload(false);
      }
    }
  }, [userId])

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="titleContainer">
          <Typography variant="h3">Stock Manager</Typography>
          <Typography variant="h6" className="subHeader">Powered by Finnhub</Typography>
          {
            username && 
            <Typography color="secondary" sx={{ float: "right", marginRight: "20px" }}>Signed in: {username}</Typography>
          }
        </div>
        <Router>
          {
            userId && 
            <NavBar />
          }
          <Switch>
            {
              userId ?
                <>
                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/stocksearch" component={StockSearch} />
                  <Route path="/news" component={News} />
                  <Route>
                    <Redirect to="/portfolio" />
                  </Route>
                </>
              : 
                <>
                  <Route path="/login">
                    <UserLogin handleLogin={handleLogin} />
                  </Route>
                  <Route>
                    <Redirect to="/login" />
                  </Route>
                </>
            }
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;