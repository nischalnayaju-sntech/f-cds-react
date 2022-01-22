import React from "react";
import "./styles.css";
import ReactDom from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      a: "🕊",
      currentEvent: "---",
      counter: 0
    };
    this.updateEvent = this.updateEvent.bind(this);
  }

  /**
   * Update the state
   * @param {*} evt
   */
  update(evt) {
    this.setState({
      a: ReactDom.findDOMNode(this.a).value,
      b: this.refs.b.value
    });
  }

  updateCounter(evt) {
    this.setState({ counter: this.state.counter + 1 });
  }

  updateEvent(evt) {
    this.setState({ currentEvent: evt.type });
  }

  render() {
    return (
      <div>
        <Widget
          ref={(component) => (this.a = component)}
          update={this.update.bind(this)}
        />{" "}
        {this.state.a}
        <hr />
        <input
          ref="b"
          type="text"
          onChange={this.update.bind(this)}
        ></input>{" "}
        {this.state.b}
        <Title text={this.state.a} />
        <Button click={this.updateCounter.bind(this)}>
          I <Heart /> React
        </Button>{" "}
        <Heart /> : {this.state.counter}
        <h1 className="currentEvent">{this.state.currentEvent}</h1>
        <textarea
          onKeyPress={this.updateEvent}
          onCopy={this.updateEvent}
          onCut={this.updateEvent}
          onPaste={this.updateEvent}
          onDoubleClick={this.updateEvent}
          cols="100"
          rows="5"
        ></textarea>
      </div>
    );
  }
}

/**
 * Create a child component -> Stateless function component
 */

class Widget extends React.Component {
  render() {
    return <input type="text" onChange={this.props.update} />;
  }
}
/**
 * Create button component
 */
const Button = (props) => (
  <button onClick={props.click}>{props.children}</button>
);

class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>;
  }
}

const Title = (props) => <h1>Title : {props.text}</h1>;

Title.propTypes = {
  text(props, propName, component) {
    if (!(propName in props)) {
      return new Error(`missing ${propName}`);
    }
    if (props[propName].length < 6) {
      return new Error(`${propName} was too short`);
    }
  }
};
export default App;
