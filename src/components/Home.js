import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BMSSidebar from './BMSSidebar';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Home() {
  const navigate = new useNavigate();
  const [items, setItems] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [genreName, setGenreName] = useState("");
  const [movieModal, setMovieModal] = useState();
  const [show, setShow] = useState(false);
  const isLogin = localStorage.getItem("login");
  // const [searchItem,setSearchItem] = useState([]);
  const [favouriteMovie ,setFavoriteMovie] = useState([]);
  
  const handleClose = () => {
    setShow(false);
  }
  const bookTicket =(item)=>{
    if(!isLogin){
      navigate('/login');
    }
     const price = document.querySelector('#ticketPrice').innerText;
     console.log(price);
     navigate('/bookticket',{ state : {name:item.title,price:price}});
  }
  const saveToFavorites=(item) =>{
    if(!isLogin){
        alert("you are not logged in");
        navigate("/login")
    }

    const favouriteMovieList = JSON.parse(localStorage.getItem('favoriteMovieList')) || [];
    console.log("ITem:",item,favouriteMovieList); 
    setFavoriteMovie([...favouriteMovieList,item]);
    console.log(favouriteMovie);
    localStorage.setItem('favoriteMovieList',JSON.stringify(favouriteMovie));
    console.log("Mvoe",favouriteMovie);
  }
  const getRandomNumber= (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const handleShow = (modalInfo) => 
  { 
    console.log(modalInfo);
    setMovieModal(modalInfo);
    setShow(true);
  }

  
  const imgUri = "https://image.tmdb.org/t/p/original/";
  const pull_data = (data) => {
    //  console.log("Items: " , items);
     setGenreId(data.id);
     setGenreName(data.name);
  }
  
  useEffect(() => {
    const nowPlayUri =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=5734bda21a5245b75d2933c869017937&language=en-US&page=1";
    // API Call : GET Data
    fetch(nowPlayUri)
      .then((res) => res.json())
      .then(
        (result) => {
            // console.log(result.results);
          setItems(result.results);
          //   console.log(items);
        },
        (error) => {
          console.log(error);
        }
      );

  }, []);


   
    
    
  return (
        <div className='app-container' style={{position :  'absolute'}}>
        <BMSSidebar func={pull_data}/>
       <Container className='mt-4'>
        <h1>Now Playing </h1>
        {(genreName!=="") ? <span>{genreName}</span> : " "}
        
       <Row style={{ padding : '0.2rem' }} >

       {(genreId === "") ? items.map((item) => (
          <Col xl={2} lg={3} md={4} sm={5} key={item.id} className="mb-1"  onClick={() => handleShow(item)}>
          <Card style={{ height: '20rem' , overflow : 'hidden'  }}>
   <Card.Body style={{ padding: '0' }} >
     <Card.Img variant="top" src={imgUri + item.poster_path} />
     <Card.Title style={{ padding: '2px' ,fontSize : '17px'}}>{item.title}</Card.Title>
     <Card.Text className='d-flex justify-content-between' style={{ padding: '2px'}}>
        <span className='uppercase'>{item.original_language
}</span><span>{item.vote_average}</span>
     </Card.Text>
   </Card.Body>
 </Card>
       </Col>
        )) : items.filter(item => item.genre_ids.includes(genreId)).map(filterItem => (
          <Col xl={2} lg={3} md={4} sm={5} key={filterItem.id} className="mb-1" onClick={() => handleShow(filterItem)}>
          <Card style={{ height: '20rem' , overflow : 'hidden'  }}>
   <Card.Body style={{ padding: '0' }} >
     <Card.Img variant="top" src={imgUri + filterItem.poster_path} />
     <Card.Title style={{ padding: '2px' ,fontSize : '17px'}}>{filterItem.title}</Card.Title>
     <Card.Text className='d-flex justify-content-between' style={{ padding: '2px'}}>
        <span className='uppercase'>{filterItem.original_language
}</span><span>{filterItem.vote_average}</span>
     </Card.Text>
   </Card.Body>
 </Card>
       </Col>
        )) 
        }
       </Row>
     </Container>
      { (movieModal) ? 
     <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton />
        <Modal.Body className='modalBody'><div><Image src={imgUri + movieModal.poster_path} width={200} height={200} thumbnail /></div><div className='modelData'><ul className='no-bullets'>
          <li><h4>{movieModal.title}</h4></li>
          <li><h4><i class="fa-solid fa-star "></i>{movieModal.vote_average}/10</h4></li>
          <li className='uppercase'>{movieModal.original_language}</li>
          <li>{movieModal.overview}</li>
          <li>Rs.<p id="ticketPrice">{getRandomNumber(100,300)}</p></li>
          </ul></div></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() =>bookTicket(movieModal)} >
            Book Ticket
           
          </Button>
            {(favouriteMovie.includes(movieModal)) ?
          <Button variant="primary" onClick={() =>saveToFavorites(movieModal)}>
            +Wishlist
          </Button>
            : <Button variant="primary" onClick={() =>saveToFavorites(movieModal)}>
            +Wishlist
          </Button>}  
        </Modal.Footer>  
      </Modal> : ""
}
    </div>
    
  )
}
// {movieModal.overview.slice(0, 40)}...