import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, set, get} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";
   // read data in 
  // update the form values

  // submit event
  // pull data from the values
  // create object
  //sent the object to firestore
const movieForm = document.forms['movieForm'] // top level access so all function have acess to form

async function pageInit(){
  const key = sessionStorage.getItem('key')
  const rentalRef = databaseRef(db, `movies/${key}`) //path to the data and ref to it
  const rentalSnapShot = await get(rentalRef) // need await to get the data 

    //formatter for the form
    if(rentalSnapShot.exists()){
      setFieldValues(rentalSnapShot.val())
    }
    
    rentalForm.addEventListner('submit', onUpdateMovie)

 
}

function onUpdateMovie(e){
  e.preventDefault();
  
  updateMovieData
}

function setFieldValues({genre, image, movie, price}) {
  // this is how we get the field values using movie form and its elments
  movieForm.elements['movieName'].value = movie
  movieForm.elements['priceName'].value = price
  movieForm.elements['genreName'].value = genre
  document.querySelector('#uploadImage img').src = image
}

function updateMovieData(){

  const movie = movieForm.elements['movieName'].value.trim()
  const price = movieForm.elements['priceName'].value.trim()
  const genre = movieForm.elements['genreName'].value.trim()
  const file = movieForm.elements['movieImage'].files
    if(file.length !==0){
      // format teh storage for the new image 
      // images/key/file.name storage path
      const imageRef = storageRef(storage, `images/${file.name}`) // this is just the path not the image
    }

    const key = sessionStorage.getItem('key')
    const dataRef =  databaseRef( db, `movies/${key}`) //we want to write to movies/key..
    set(dataRef,{
      //pass the date..
      image:urlPath,
      movie,
      price,
      genre
    })
}
pageInit()