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

const startString = `
# use # for header
### Put in your markdown in the left box and it gets rendered in HTML on the other side

1. list item 1
1. list item 2
1. list item 3

*Did you know you can even put in images?*

![Kitten](http://placekitten.com/g/200/300 "A cute kitten")

[Link to my github if you want to see my other projects](www.github.com/soletscode)
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  area: {
    fontSize: "1rem",
    width: "100%",
    height: "88vh",
    outline: "none",
    overflowY: "scroll",
    padding: "1rem",
  },
}));

function App() {
  //hook records the changes that I make
  const [myHtml, setMyHtml] = useState({
    __html: converter.makeHtml(startString),
  });
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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <textarea className={classes.area} onChange={userInput}>
              {startString}
            </textarea>
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
