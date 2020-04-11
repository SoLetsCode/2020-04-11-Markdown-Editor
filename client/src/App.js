import React, { useState } from "react";

//React components
import AppBar from "./components/AppBar";

//styling and material-ui
import "./App.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

//JSShowdown converter variables
import showdown from "showdown";
const converter = new showdown.Converter();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  area: {
    fontSize: "1rem",
    width: "100%",
    height: "90vh",
    outline: "none",
  },
}));

function App() {
  //hook records the changes that I make
  const [myHtml, setMyHtml] = useState();
  //set classes constant for material-ui
  const classes = useStyles();

  const userInput = (event) => {
    const html = converter.makeHtml(event.target.value);

    //converter.makeHtml returns a string and we have to convert it into jsx for react to understand. The method I found requires me to dangerously set innerHtml and the documentation says I have to pass in the string like below.
    setMyHtml({ __html: html });
  };

  return (
    <div className="App">
      <AppBar />
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <textarea className={classes.area} onChange={userInput}></textarea>
          </Grid>
          <Grid item xs={6}>
            <div
              className={classes.area}
              dangerouslySetInnerHTML={myHtml}
            ></div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
