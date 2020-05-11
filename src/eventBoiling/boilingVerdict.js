import React from 'react';
import { connect } from 'react-redux';

class BoilingVerdict extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return <p>The water { this.props.isboil } boil.</p>;
  }
}

const mapStateToProps = (state) => {
  let boilObj = {isboil : 'not'}
  state.celsius >= 100 ? boilObj = {
      isboil : 'would'
  } : boilObj = {
      isboil : 'not'
  };
  return boilObj
}

BoilingVerdict = connect(mapStateToProps)(BoilingVerdict);

export default BoilingVerdict