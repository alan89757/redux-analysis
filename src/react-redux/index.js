import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "../myredux/index";

// 包裹根组件
export class Provider extends Component {
  static childContextTypes={
    store: PropTypes.object
  }
  getChildContext() {
    return { store: this.props.store };
  }
  render() {
    return this.props.children;
  }
}

export const connect = (mapStateToProps=state=>state, mapDispatchToProps={})=> OldComponent => {
  return class NewComponent extends Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context);
      this.state = {
        props: this.props
      }
    }
    componentDidMount() {
      const store = this.context.store;
      store.subscribe(()=> this.update());
      this.update();
    }
    update() {
      const store = this.context.store;
      const stateProps = mapStateToProps(store.getState()); // 拿到了最新状态
      // console.log(store, stateProps);
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch); // 组装成dispatch(tempCHANGE(参数))
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
    render() {
      return <OldComponent {...this.state.props}/>
    }
  }
}
