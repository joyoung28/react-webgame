import React, { Component } from 'react';

class ResponseCheckClass extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요'
      });
      this.timeout = setTimeout(() =>{
        this.setState({
          state: 'now',
          message: '지금 클릭',
        })
        this.startTime = new Date();
      }, Math.floor(Math.random()* 1000) +2000); //2~3초 랜덤
    } else if (state === 'ready') { //성급하게 클릭
      clearTimeout(this.timeout); //timeout 초기화
      this.setState({
        state: 'waiting',
        message: '성급하셨군요',
      });
    } else if (state === 'now') { //반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
      return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a+ c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
        </>
  };

  render() {
    const { state, message} = this.state;
    return(
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
        >
          { message }
        </div> 
        {/* reduce는 빈배열일 때는 값을 구할수 없어 오류가 나므로
         빈배열일 때 안보이게 한다. */}
         {this.renderAverage()}
      </>
    );
  }
}


export default ResponseCheckClass;