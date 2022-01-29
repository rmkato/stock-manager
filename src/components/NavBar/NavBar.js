import React, { useState } from 'react';
import './NavBar.css';
import { Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import { styled } from '@mui/styles';


export default function NavBar() {
  const history = useHistory();
  const [ tabSelection, setTabSelection ] = useState("portfolio");
  
  function handleChange(event, newValue) {
    setTabSelection(newValue);
  };

  function navigateTo(path) {
    history.push(path);
  }

  return (
    <Box sx={{ marginTop: "2rem", borderBottom: 1, borderColor: 'divider', width: '100%'}}>
      <Tabs 
        centered
        indicatorColor="secondary"
        value={tabSelection} 
        onChange={handleChange}
      >
        <Tab  
          label="Portfolio" 
          className="tabLink"
          value="portfolio" 
          onClick={() => navigateTo("/portfolio")}
        />
        <Tab 
          label="Stock Search" 
          className="tabLink"
          value="stocksearch" 
          onClick={() => navigateTo("/stocksearch")}
        />
        <Tab 
          label="News" 
          className="tabLink"
          value="news" 
          onClick={() => navigateTo("/news")}
        />
      </Tabs>
    </Box>
  );
}