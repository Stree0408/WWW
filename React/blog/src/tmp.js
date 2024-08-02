import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";

function Mynav() {
  let navItem = ["ABOUT", "PROJECT", "NOTICE", "CONTACT US", "LOG IN"];

  return (
    <>
      <Navbar style={{ backgroundColor: "#1D2528" }} data-bs-theme="dark">
        <Container fluid style={{ marginLeft: "60px", marginRight: "60px" }}>
          <Navbar.Brand href="#home">
            <img
              src={process.env.PUBLIC_URL + "/CMM_LOGO.png"}
              alt="CMM Logo"
              width="80px"
            />
          </Navbar.Brand>
          {
            /* <Nav>
            <Nav.Link
              href="#ABOUT"
              style={{ paddingRight: "30px", fontSize: "20px" }}
            >
              ABOUT
            </Nav.Link>
            <Nav.Link
              href="#PROJECT"
              style={{ paddingRight: "30px", fontSize: "20px" }}
            >
              PROJECT
            </Nav.Link>
            <Nav.Link
              href="#NOTICE"
              style={{ paddingRight: "30px", fontSize: "20px" }}
            >
              NOTICE
            </Nav.Link>
            <Nav.Link
              href="#CONTACT US"
              style={{ paddingRight: "30px", fontSize: "20px" }}
            >
              CONTACT US
            </Nav.Link>
            <Nav.Link
              href="#LOG IN"
              style={{ paddingRight: "30px", fontSize: "20px" }}
            >
              LOG IN
            </Nav.Link>
          </Nav> */
            <Nav>
              {navItem.map(function (a) {
                return (
                  <Nav.Link
                    href={`#${a}`}
                    style={{
                      paddingRight: "30px",
                      fontSize: "20px",
                    }}
                  >
                    {`${a}`}
                  </Nav.Link>
                );
              })}
            </Nav>
          }
        </Container>
      </Navbar>
    </>
  );
}

export default Mynav;
