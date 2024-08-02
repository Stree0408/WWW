import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styled from "styled-components";

function Detail(props) {
  // let [alert, setAlert] = useState(true);
  // let [count, setCount] = useState(0);

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });
  console.log(찾은상품);

  return (
    // <div className="container">
    //   {alert == true ? (
    //     <div className="alert alert-warning">2초이내 구매시 할인</div>
    //   ) : null}

    //   {setTimeout(() => {
    //     setAlert(false);
    //   }, 2000)}
    //   {console.log(alert)}

    //   {count}
    //   <button
    //     onClick={() => {
    //       setCount(count + 1);
    //     }}
    //   >
    //     button
    //   </button>

    // });

    <>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      {/* // </div> */}
    </>
  );
}

export default Detail;
