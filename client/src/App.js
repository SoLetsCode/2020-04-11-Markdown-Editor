import React, { useState } from "react";

//React components
import AppBar from "./components/AppBar";

//styling and material-ui
import "./App.css";
import Grid from "@material-ui/core/Grid";

//JSShowdown converter variables
import showdown from "showdown";
const converter = new showdown.Converter();

function App() {
  //hook records the changes that I make
  const [myHtml, setMyHtml] = useState();

  const userInput = (event) => {
    const html = converter.makeHtml(event.target.value);

    //converter.makeHtml returns a string and we have to convert it into jsx for react to understand. The method I found requires me to dangerously set innerHtml and the documentation says I have to pass in the string like below.
    setMyHtml({ __html: html });
  };

  return (
    <div className="App">
      <AppBar />
      <Grid container soacung={3}>
        <Grid item xs={6}>
          <textarea className="data__area" onChange={userInput}></textarea>
        </Grid>
        <Grid item xs={6}>
          <div className="data__area" dangerouslySetInnerHTML={myHtml}></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
