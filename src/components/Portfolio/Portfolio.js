import React, { useEffect, useState } from "react";
import './Portfolio.css';
import { Button, Table, TableHead, TableRow, TableBody, TableCell, Modal, Backdrop, Fade, Box, Typography, TextField, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import API from '../../util/API';


const useStyles = makeStyles({
  inputFields: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray"
    },
    "& .MuiOutlinedInput-input": {
      color: "gray"
    },
    "& .MuiInputLabel-outlined": {
      color: "gray"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black"
    },
    "&": {

    }
  }
})

function AddStockPopup(props) {
  const classes = useStyles();
  const [ holding, setHolding ] = useState({
    symbol: "",
    amount: "",
    purchasePrice: ""
  });
  const [ errors, setErrors ] = useState({
    symbolError: false,
    amountError: false,
    purchasePriceError: false
  });

  function validateForm() {
    if (!holding.symbol || !holding.amount || !holding.purchasePrice) {
      setErrors({
        symbolError: holding.symbol == false,
        amountError: holding.amount == false,
        purchasePriceError: holding.purchasePrice == false
      });
    } else {
      handleAddHolding();
    }
  };

  async function handleAddHolding() {
    try {
      const result = await API.post(`addHolding`, holding);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={props.show}
      onClose={props.hide}
      BackdropComponent={Backdrop}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          borderRadius: "5px",
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography variant="h5">Add Holdings</Typography>
        <TextField
          type="text"
          className={classes.inputFields}
          label="Symbol"
          variant="outlined"
          value={holding.symbol}
          onChange={(e) => setHolding({...holding, symbol: e.target.value})}
          error={errors.symbolError}
          helperText={errors.symbolError ? "Required field" : ""}
        />
        <TextField
          type="text"
          className={classes.inputFields}
          label="Amount"
          variant="outlined"
          value={holding.amount}
          onChange={(e) => setHolding({...holding, amount: e.target.value})}
          error={errors.amountError}
          helperText={errors.amountError ? "Required field" : ""}
        />
        <TextField
          type="text"
          className={classes.inputFields}
          label="Purchase Price"
          variant="outlined"
          value={holding.purchasePrice}
          onChange={(e) => setHolding({...holding, purchasePrice: e.target.value})}
          error={errors.purchasePriceError}
          helperText={errors.purchasePriceError ? "Required field" : ""}
        />

        <hr/>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={validateForm}>Add</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default function Portfolio() {
  const [ showAddStockPopup, setShowAddStockPopup ] = useState(false);

  return (
    <div className="portfolioContentContainer">
      <div>
        <Button
          variant="contained"
          onClick={() => setShowAddStockPopup(true)}
        >
          Add
        </Button>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Current Value</TableCell>
            <TableCell align="right">Gain</TableCell>
            <TableCell align="right">Purchase Price (#)</TableCell>
            <TableCell align="right">Total Gain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*
            rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">$100.00 (5)</TableCell>
                <TableCell align="right">$50</TableCell>
              </TableRow>
            ))
          */}
          <TableRow>
            <TableCell scope="row">AAPL</TableCell>
            <TableCell align="right">$200</TableCell>
            <TableCell align="right">+5%</TableCell>
            <TableCell align="right">$100.00 (5)</TableCell>
            <TableCell align="right">$50</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <AddStockPopup show={showAddStockPopup} hide={() => setShowAddStockPopup(false)} />
    </div>
  );
};