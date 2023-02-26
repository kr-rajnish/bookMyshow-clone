
import React ,{ useEffect } from "react";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'

const Favorites = () => {
    const navigate = new useNavigate();
    const [items,setItems] = useState([]);
    const isLogin = localStorage.getItem("login");
    const [movieModal, setMovieModal] = useState();
    const [show, setShow] = useState(false);
      
  const imgUri = "https://image.tmdb.org/t/p/original/";
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = (modalInfo) => 
  { 
    // console.log(modalInfo);
    setMovieModal(modalInfo);
    setShow(true);
  }
  const getRandomNumber= (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

    useEffect (()=>{
        if(!isLogin){
            alert("you are not logged in ");
            navigate('/login');
        }else{
          const favouriteMovie = JSON.parse(localStorage.getItem('favoriteMovieList')) || [];
          setItems(favouriteMovie);
          // console.log(favouriteMovie);;
        }
    },[])


  return (
    <div>
<Container className='mt-4'>  
<h1>Favorites</h1>
<Row style={{ padding : '0.2rem' }} >
{items.map((item) => (
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
       </Col> )) }
  </Row>
      </Container>
      { (movieModal) ? 
     <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton />
        <Modal.Body className='modalBody'><div><Image src={imgUri + movieModal.poster_path} width={200} height={200} thumbnail /></div><div className='modelData'><ul className='no-bullets'>
          <li><h4>{movieModal.title}</h4></li>
          <li><h4><i className="fa-solid fa-star "></i>{movieModal.vote_average}/10</h4></li>
          <li className='uppercase'>{movieModal.original_language}</li>
          <li>{movieModal.overview}</li>
          <li id="ticketPrice">Rs.{getRandomNumber(100,300)}</li>
          </ul></div></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Book Ticket
          </Button>
        </Modal.Footer>  
      </Modal> : ""
}
    </div>
  )
}

export default Favorites;
