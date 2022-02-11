import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, set, get} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";
   // read data in 
  // update the form values

  // submit event
  // pull data from the values
  // create object
  //sent the object to firestore
document.querySelector("#movieImage").addEventListener("change", onImageSelected);

function onImageSelected(e) {
  let file = e.target.files[0];
  
  document.querySelector(".display img").src = URL.createObjectURL(file);
  }

const movieForm = document.forms['movieForm'] // top level access so all function have acess to form
const key = sessionStorage.getItem('key')
let existingMovie; 

async function pageInit(){

  const movieRef = databaseRef(db, `movies/${key}`) //path to the data and ref to it
  const movieSnapShot = await get(movieRef) // need await to get the data 

    //formatter for the form
    if(movieSnapShot.exists()){
      existingMovie = movieSnapShot.val()
      setFieldValues(existingMovie)
    }
    
    movieForm.addEventListener('submit', onUpdateMovie)

 
}

function onUpdateMovie(e){
  e.preventDefault();
  updateMovieData();
}

function setFieldValues({genre, image, movie, price, rating}) {
  // this is how we get the field values using movie form and its elments
  movieForm.elements['movieName'].value = movie
  movieForm.elements['priceName'].value = price
  movieForm.elements['genreName'].value = genre
  movieForm.elements['ratingName'].value = rating
  document.querySelector('#uploadImage img').src = image
}

async function updateMovieData(){

  const movie = movieForm.elements['movieName'].value.trim()
  const price = movieForm.elements['priceName'].value.trim()
  const genre = movieForm.elements['genreName'].value.trim()
  const rating = movieForm.elements['ratingName'].value.trim()
  
  const sku = existingMovie.sku //MVHR${itemRef.key}

  let urlPath = existingMovie.image
  let storagePath = existingMovie.storagePath //declare both for outside of scope..

    if(movieForm.elements['movieImage'].files.length !==0){
      const file = movieForm.elements['movieImage'].files[0]
      // format teh storage for the new image 
      // images/key/file.name storage path
      const imageRef = storageRef(storage, `images/${sku}`) // this is just the path not the image
      // uploading file to the storage bucket
      const uploadResult = await uploadBytes(imageRef, file);
      // url to the image stored in storage bucket
      urlPath =  await getDownloadURL(imageRef) // image path
      // path on the storage bucket to the image
      storagePath = uploadResult.metadata.fullPath;
    }

    const dataRef =  databaseRef( db, `movies/${key}`) //we want to write to movies/key..
    set(dataRef,{
      //pass all the values...
      key,
      sku,
      image:urlPath,
      storagePath,
      movie,
      price,
      genre,
      rating
    })
}
pageInit()