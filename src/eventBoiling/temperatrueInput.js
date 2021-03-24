
import React, { Component } from 'react';
import { connect } from "../react-redux/index";
import { tempChangeAction } from "../redux/index";

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends Component {
    constructor(props) {
      super(props);
      this.hanleChange = this.hanleChange.bind(this);
    }
    hanleChange(e) {
      let celsius;
      if(this.props.scale === "f") {
        celsius = tryConvert(e.target.value, toCelsius);
      } else {
        celsius = e.target.value;
      }
      // const celsius = this.props.scale === "f" ? tryConvert(e.target.value, toCelsius) : e.target.value;
      this.props.tempChangeAction({
        scale: this.props.scale, celsius: celsius
      });
    }
    render() {
        const scale = this.props.scale;
        const temperature = this.props.temperature;
        return (
          <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input 
            value={temperature}
            onChange={this.hanleChange}/>
          </fieldset>
        );
    }
}

// 华氏温度转摄氏温度
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

// 摄氏温度转华氏温度
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

// 温度的数字化操作。
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

const mapStateToProps = (state, ownProps) => {
  if(state && ownProps && ownProps.scale !== state.scale) {
    let tempObj = {temperature : ""}
      ownProps.scale === "c" ? tempObj = {
          temperature: state.celsius
      } : tempObj = {
          temperature: tryConvert(state.celsius, toFahrenheit)
      };
      return tempObj
  }
}

const actionCreater = { tempChangeAction };

//把state加到props
TemperatureInput = connect(mapStateToProps, actionCreater)(TemperatureInput);

export default TemperatureInput