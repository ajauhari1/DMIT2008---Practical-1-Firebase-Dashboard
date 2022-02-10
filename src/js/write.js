import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

// reference to the forms and image
document.querySelector("#movieImage").addEventListener("change", onImageSelected);
document.forms["movieForm"].addEventListener("submit", onAddMovie); 


    function onAddMovie(e) {
        e.preventDefault();
        uploadNewMovie();
    }
  

   function onImageSelected(e) {
    //selected file
    // file objets   [fileObj, fileObj, fileObj]
    let file = e.target.files[0];
    console.log(file)
    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file); //display class
     
    }

    async function uploadNewMovie() {
        // form data
        const movie = document.querySelector('#movieName').value.trim();
        const price = document.querySelector('#priceName').value.trim();
        const genre = document.querySelector('#genreName').value.trim();
        const rating = document.querySelector('#ratingName').value.trim();
        const file = document.querySelector('#movieImage').files[0]
        
        // paths to the data to write
        const imageRef = storageRef( storage, `images/${file.name}`);
        const dataRef =  databaseRef( db, 'movies')

        // uploading file to the storage bucket
        const uploadResult = await uploadBytes(imageRef, file);
        // url to the image stored in storage bucket
        const urlPath =  await getDownloadURL(imageRef) // image path
        // path on the storage bucket to the image
        const storagePath = uploadResult.metadata.fullPath;

        // firebase unique key
        // push return a ref to the area with they key but no data is written 
        const itemRef = await push(dataRef)
        // ref.key
        set(itemRef,{
           key:itemRef.key,
           sku:`MVHR${itemRef.key}`,
           image:urlPath,
           movie,
           price,
           genre,
           rating
        })
        .then(()=>{
            alert("Added Movie Successfully!")
        })
    }
 