import React, { Component } from 'react';
import TemperatureInput from './temperatrueInput';
import BoilingVerdict from './boilingVerdict'

class Calculator extends Component {
  constructor(props) {
      super(props);
  }
  render() {
      return (
          <div>
              <TemperatureInput
                  scale="c"
              />
              <TemperatureInput
                  scale="f"
              />
              <BoilingVerdict
                  />
          </div>
      );
  }
}
export default Calculator