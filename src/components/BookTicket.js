import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import { useEffect  } from 'react';
import Container from 'react-bootstrap/esm/Container';
import '../styles/BookTicket.css';
import { useLocation , useNavigate} from 'react-router-dom';

export default function BookTicket()  {
  const navigate = new useNavigate();
     const location = useLocation();
     const name =  location.state.name;
     const price = location.state.price;
     const isLogin = localStorage.getItem("login");
     
    const seatList  =[] ;
  
    function searchListInput (){
        const selectedSeatList = document.querySelector(".selectedSeatList");
        const text = document.querySelector(".text");
        selectedSeatList.innerHTML = `Seat No : ${seatList}`;
        const total = seatList.length * price ;
        text.innerHTML =`Rs.` + total  + ` of ` + seatList.length +  ` seats`;
    }
        const handleClick=()=>{
          if(seatList.length > 0){
          navigate('/payment',{state:{name :name, price:price , seat : seatList.length}});
          }else{
            alert("Select a seat to proceed")
          }
        }
        useEffect(()=>{
          if(!isLogin){
            navigate('/login');
          }
        const seatSection = document.querySelector(".seats");
        for(let i = 0 ; i < 5 ; i++){
            const row = document.createElement("div");
            row.classList.add("row");
            for(let j = 0 ; j < 8 ; j++){
                const id = i+""+j;
                const col = document.createElement("div");
                col.classList.add("seat");
                if(Math.random() < 0.5){
                    col.classList.add("occupied");
                }
                col.setAttribute("id",id);
                col.addEventListener("click",(e)=>{
                    // console.log(e.target.id);
                    if (
                        e.target.classList.contains("seat") &&
                        !e.target.classList.contains("occupied")
                      ) {

                        e.target.classList.toggle("selected");
                        
                        if(!seatList.includes(e.target.id)){
                            seatList.push(e.target.id);
                        }else{
                            seatList.pop(e.target.id);
                        }

                }
                searchListInput();
            })
            row.append(col);
        }
        seatSection.append(row);
    }
    
},[])
    
   

  return (
    <Container className='LoginRegisterBox bg-color' >
        <Container className='theater-contanier'>
        <div className="movie-container">
      <h2>Movie : {name}</h2>     
    </div>
    <div>
    <ul className="showcase">
      <li>
        <div className="seat"></div>
        <small>Available</small>
      </li>
      <li>
        <div className="seat selected"></div>
        <small>Selected</small>
      </li>
      <li>
        <div className="seat occupied"></div>
        <small>Occupied</small>
      </li>
    </ul>
    </div>
    <div className="theater-contanier2">
      <div className="screen"></div>
      <div className="seats">

     
    </div>
    </div>
   <h5 className='selectedSeatList'>

   </h5>
    <h5 className="text">
      
    </h5>
    <Button onClick={handleClick}>Pay to proceed</Button>
    </Container>
    </Container>
  )
}


