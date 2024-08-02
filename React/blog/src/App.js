/* eslint-disable*/
import "bootstrap/dist/css/bootstrap.min.css";
import Notice1 from "./notice.js";

import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let post = "강남 우동 맛집";
  let [글제목, 글제목변경] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬독학",
  ]);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState("");
  var value = 10;
  return (
    <div className="App">
      <Notice1></Notice1>
      <div className="black-nav">
        <h4>블로그임</h4>
      </div>

      <button
        onClick={() => {
          // 가나다순정렬 버튼
          let copy1 = [...글제목];
          copy1.sort();
          글제목변경(copy1);
        }}
      >
        가나다순정렬
      </button>

      <button
        onClick={() => {
          // 글수정 윗버튼
          let copy = [...글제목];
          copy[0] = "여자 코트 추천";
          글제목변경(copy);
        }}
      >
        글수정
      </button>

      {/* <div className='list'>
        <h4>{ 글제목[0] }<span onClick={ () => { 따봉변경( 따봉+1 ) }}>👍</span>  {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4 onClick={ () => { 
          setModal(!modal);
  
          }} >{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}

      {글제목.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(true);
                setTitle(i);
              }}
            >
              {글제목[i]}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i]++;
                  따봉변경(copy);
                }}
              >
                👍
              </span>{" "}
              {따봉[i]}
            </h4>

            <p>2월 17일 발행</p>
            <button
              onClick={() => {
                console.log(글제목);
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy);
                console.log(글제목);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      <input
        onChange={(e) => {
          입력값변경(e.target.value);
          console.log(입력값);
        }}
      ></input>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy.unshift(입력값);
          글제목변경(copy);

          let copy따봉 = [...따봉];
          copy따봉.unshift(0);
          따봉변경(copy따봉);
        }}
      >
        글발행
      </button>

      {modal == true ? (
        <Modal color={"yellow"} 글제목={글제목} title={title} />
      ) : null}
      <Countdown value={value}></Countdown>
    </div>
  );
}

function Countdown({ value }) {
  const [count, setCount] = useState(value); // 처음에 10주고 시작
  useEffect(() => {
    const handle = setTimeout(() => {
      if (count > 0) {
        setCount((count) => count - 1);
      }
    }, 1000);
  });
  return (
    <>
      <h1>Countdown {value} seconds</h1>
      <h2>Current count: {count}</h2>
    </>
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  );
}

export default App;
