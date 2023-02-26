import React from "react";
import { useState, useEffect, useRef , useCallback } from "react";
import "../styles/App.css";
import  {Link} from 'react-router-dom';

function BMSSidebar(props) {
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(268);

  const [items, setItems] = useState([]);
  // const [genreId,setGenreId]  = useState("");
  const genresUri = "https://api.themoviedb.org/3/genre/movie/list?api_key=5734bda21a5245b75d2933c869017937";
  
  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );
    const genreMovie = (id) =>  {
      props.func(id);

    };


            
          
   
    useEffect(() => {
    fetch(genresUri)
      .then((res) => res.json())
      .then(
        (result) => {
            // console.log(result.genres);
          setItems(result.genres);
        },
        (error) => {
          // console.log(error);
        }
      );

  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);
//   console.log(items);
  return (
    <div className="app-container">
      <div
        ref={sidebarRef}
        className="app-sidebar"
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()}
        >
        <div className="app-sidebar-content mt-4">
          <h1>Genre
          </h1>
           <div className="genre-list">
            <ul className="no-bullets">
          {items.map((item) => (
                <Link className="button-link" onClick={() => genreMovie(item)} key={item.id}><li className="name" >{item.name}</li></Link>
          ))}
          </ul>
          </div>
          </div> 
        <div className="app-sidebar-resizer" onMouseDown={startResizing} />
      </div>
      <div className="app-frame" />
    </div>
  );
}

export default BMSSidebar;
