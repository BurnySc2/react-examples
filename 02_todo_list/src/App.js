import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }
  state = {
    list: [
      {
        id: new Date().getTime(),
        text: "Add an item",
      },
    ],
  };

  handleClickAddItem = (e) => {
    // Get text of inputfield
    let inputFieldText = this.inputField.current.value;
    // console.log(this.inputField.current)
    // console.log(inputFieldText)

    // If input field was empty, dont do anything
    if (inputFieldText === "") {
      return;
    }

    // Clear input field
    this.inputField.current.value = "";

    // Make copy of the list
    let myList = this.state.list;

    // Push new item
    myList.push({
      // Get time in milliseconds
      id: new Date().getTime(),
      text: inputFieldText,
    });

    // Update state
    this.setState({
      list: myList,
    });
  };

  handleClickRemoveItem = (e) => {
    // Dont seem to be able to retrieve the react `key` from the DOM
    // console.log(e.target.parentElement.attributes.key)

    /// Remove item from TODO list after it is marked as 'done'
    // console.log(e.target.parentElement.attributes.item_id.value)
    // console.log(e.target.attributes.item_id.value)
    let targetValue = e.target.attributes.item_id.value;
    // TODO Instead of filtering the whole list, get index of this component and then remove it
    let newList = this.state.list.filter((item) => {
      return targetValue != item.id;
    });

    // Update state
    this.setState({
      list: newList,
    });
  };

  render() {
    // This is run on every state change
    let my_todo_list = this.state.list.map((el) => {
      return (
        <div className="todoItem" key={el.id} item_id={el.id}>
          <div>{el.text}</div>
          <button item_id={el.id} onClick={this.handleClickRemoveItem}>
            Done
          </button>
        </div>
      );
    });

    // Return jsx of component
    return (
      <div className="App">
        <h1>My TODO list</h1>
        <input ref={this.inputField} placeholder="Add new TODO item"></input>
        <button onClick={this.handleClickAddItem}>Add item</button>
        <div>{my_todo_list}</div>
      </div>
    );
  }
}

export default App;
