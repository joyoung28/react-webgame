const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '조영은',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
  };

  onChange = (e) => {

  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  render(){
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
