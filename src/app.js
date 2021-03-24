import React, { Component } from "react";
import TemperatrueInput from "./eventBoiling/temperatrueInput";
import BoilingVerdict from "./eventBoiling/boilingVerdict";

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return <>
      <TemperatrueInput scale="c"/>
      <TemperatrueInput scale="f"/>
      {/* <BoilingVerdict /> */}
    </>
  }
}
export default App;