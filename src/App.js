import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: "App on Default State 🕊",
      currentEvent: "---"
    };
    this.update = this.update.bind(this);
  }

  /**
   * Update the state
   * @param {*} evt
   */
  update(evt) {
    this.setState({ txt: evt.target.value, currentEvent: evt.type });
  }

  render() {
    return (
      <div>
        <Widget update={this.update.bind(this)} />
        <Widget update={this.update.bind(this)} />
        <h1>{this.state.txt}</h1>
        <Title text={this.state.txt} />
        <Button>
          I <Heart /> React
        </Button>
        <h1 className="currentEvent">{this.state.currentEvent}</h1>
        <textarea
          onKeyPress={this.update}
          onCopy={this.update}
          onCut={this.update}
          onPaste={this.update}
          onDoubleClick={this.update}
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
const Widget = (props) => <input type="text" onChange={props.update}></input>;

/**
 * Create button component
 */
const Button = (props) => <button>{props.children}</button>;

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
