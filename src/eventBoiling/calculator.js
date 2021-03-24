/**
 * Created by Derry on 2018/3/28.
 */
import React, { Component } from 'react';
import TemperatureInput from './temperatrueInput';
import BoilingVerdict from './boilingVerdict'

class Calculator extends Component {
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