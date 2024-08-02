import "./App.css";
import Mynav from "./Navbar_tmp.js";

function Notice1() {
  let navItem = ["ABOUT", "PROJECT", "NOTICE", "CONTACT US", "LOG IN"];

  return (
    <>
      <Mynav></Mynav>
      <div className="container">
        <div className="sub-container">
          <h1 style={{ marginBottom: "50px" }}>Notice</h1>
          <div className="writing">
            <h4>CMM 공지</h4>
            <p>2024.05.20 by 강현우</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notice1;
