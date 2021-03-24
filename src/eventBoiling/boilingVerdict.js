/**
 * Created by Derry on 2018/3/28.
 */

import React from 'react';
import { connect } from "react-redux";
import { tempChangeAction } from "../redux/index";

// const isboil = "not";
class BoilingVerdict extends React.Component {
    render() {
        return <p>The water { this.props.isboil } boil.</p>;
    }
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

const mapStateToProps = (state, ownProps)=> {
    if(state.celsius >=100) {
        return {isboil: "would"}
    } else {
        return {isboil: "not"}
    }
    
}

const actionCreater = { tempChangeAction };

BoilingVerdict = connect(mapStateToProps, actionCreater)(BoilingVerdict);

export default BoilingVerdict;