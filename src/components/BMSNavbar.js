import React ,{ useEffect, useState }  from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  {Link, useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import BookMyShowSvg from '../images/BMSSvg';

function BMSNavbar() {
  let timer;
  const [items, setItems] = useState([]);
  const [final, setFinal] = useState([]);
  const [isLogin,setIsLogin] = useState(localStorage.getItem("login"));
  const [loginUser,setLoginUser] = useState("");
  const navigate = useNavigate();
  
  
  const nowPlayingUri =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=5734bda21a5245b75d2933c869017937&language=en-US&page=1";
  
  const imgUri = "https://image.tmdb.org/t/p/original/";
  
  useEffect(() => {
    if(isLogin){
      const user = localStorage.getItem("name");
      console.log(user);
      setLoginUser(user);
    }
    fetch(nowPlayingUri)
      .then((res) => res.json())
      .then(
        (result) => {
            // console.log(result);
          setItems(result.results);
          //   console.log(items);
        },
        (error) => {
          // console.log(error);
        }
      );
  }, []);
  const search = () => {
    const inputSearch = document.querySelector("#search-input").value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const searchResults = document.querySelector(".search-results");
      (inputSearch)
      if (inputSearch === "") {
        if (!searchResults.classList.contains("hidden")) {
          searchResults.classList.add("hidden");
        }
      } else {
        if (searchResults.classList.contains("hidden"))
          searchResults.classList.remove("hidden");
        const result = items
          .filter((item) =>
            item.title.toLowerCase().includes(inputSearch.toLowerCase())
          )
          .slice(0, 5);
          // console.log(result);
        setFinal(result);
      }
    }, 500);
  };
  const logout =() =>{
    console.log("logout")
    localStorage.removeItem("login");
    localStorage.removeItem('favoriteMovieList');
    setIsLogin(false);
    navigate('/');
  }
  const searchClick = () => {
    setFinal([]);
    document.querySelector(".search-box").value = "";
  };
  return (
    <div>
    <Navbar className='background-navbar navbar'  style={{color : 'white' }}         expand="lg"  fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">
       <BookMyShowSvg/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
             className="me-2"
              aria-label="Search"
              id="search-input"
              onChange={search}
            />
            <Button variant="outline-light" onClick={search}>Search</Button>
          </Form>
          <Nav
            className="my-2 my-lg-0"     
            navbarScroll
          >
            <Link to="/favorites" className='text-decore-none p-1'><i className="fa-regular fa-heart fa-2x"></i></Link>
            {(isLogin)  ?
            <NavDropdown title={loginUser} id="navbarScrollingDropdown">
              <NavDropdown.Item><Link className='text-decore-none' to="/bookedseat">Booked Seat</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown> : <Link href="/register">SignUp</Link>
} 
          </Nav>
        </Navbar.Collapse>
      </Container>
        </Navbar>
      <Container className="search-results hidden">
        {final.map((searchList) => (
          <div className="outerbox" key={searchList.id}>
            <Link className='text-decore-none' to="/" onClick={searchClick}>
            {/* {"/movie/" + searchList.id} */}
              <div className="search-dropdown-menu">
                <div className="search-dropdown-image">
                  <img
                    className="searchImages"
                    src={imgUri + searchList.poster_path}
                    alt={searchList.title}
                    />
                </div>
                <div className="search-dropdown-title">
                  <h6>{searchList.title}</h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Container>
      </div>
  );
}

export default BMSNavbar;