import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/styles';


const StyledTextField = styled(TextField)({
  '& label': {
    color: 'white'
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInputBase-input': {
    color: 'white'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

export default function StockSearch() {
  const [ keyword, setKeyword ] = useState("");
  const [ stockInfo, setStockInfo ] = useState({});

  function handleKeywordChange(event) {
    const { value } = event.target;

    setKeyword(value);

    if (value.length > 2) {
      handleSearch(value);
    }
  }

  async function handleSearch(keyword) {
    try {
      axios.Cancel('stockSearch');
      const result = await axios({
        method: 'get',
        url: `http://localhost:50973/api/FinnHub/getStockDetails?symbol=${keyword}`,
        requestId: 'stockSearch'
      })
      setStockInfo(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="contentContainer">
      <StyledTextField
        label="Search"
        sx={{ width: "100%", color: "white" }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon color="primary"/></InputAdornment>,
        }}
        value={keyword}
        onChange={handleKeywordChange}
      />
      <div>
        Current price: {stockInfo.c || ""}
      </div>
      <div>
        Change: {stockInfo.d || ""}
      </div>
    </div>
  );
};