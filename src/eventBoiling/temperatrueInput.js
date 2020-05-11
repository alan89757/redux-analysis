import React, { Component } from 'react';
import { tempCHANGE, tempCHANGEAsync } from "../redux/index.redux";
import { connect } from 'react-redux';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const celsius = this.props.scale === 'f' ? tryConvert(e.target.value, toCelsius) : e.target.value;
    this.props.scale === 'f'?
        this.props.tempCHANGE({scale: this.props.scale, celsius: celsius}) :
        this.props.tempCHANGEAsync({scale: this.props.scale, celsius: celsius});
    // this.props.tempCHANGE({scale: this.props.scale, celsius: celsius});
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
        <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={temperature}
                   onChange={this.handleChange} />
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
  if (ownProps.scale !== state.scale){
      let tempObj = {temperature : ""}
      ownProps.scale === "c" ? tempObj = {
          temperature: state.celsius
      } : tempObj = {
          temperature: tryConvert(state.celsius, toFahrenheit)
      };
      return tempObj
  }
}

const actionCreater = { tempCHANGE, tempCHANGEAsync };

TemperatureInput = connect(mapStateToProps, actionCreater)(TemperatureInput);

export default TemperatureInput;