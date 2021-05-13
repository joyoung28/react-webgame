import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random()* 1000) +2000); //2~3초 랜덤
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');   
    } else if (state === 'ready') { //성급하게 클릭
      clearTimeout(timeout.current); //timeout 초기화
      setState('waiting');
      setMessage('성급하셨군요');
    } else if (state === 'now') { //반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
        </>
  };
  

  return (
    <>
    <div
      id="screen"
      className={state}
      onClick={onClickScreen}
    >
      { message }
    </div> 
    {/* reduce는 빈배열일 때는 값을 구할수 없어 오류가 나므로
     빈배열일 때 안보이게 한다. */}
     {renderAverage()}
  </>
  );
}

export default ResponseCheck;