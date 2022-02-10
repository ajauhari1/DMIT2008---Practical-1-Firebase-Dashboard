import {ref as dataRef, get, set, update} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {movieRental} from './templates/movieRental' //change this to mmovieRental


async function pageInit(){
    const rentalRef = dataRef(db, 'movies/'); //'rentals/' is Firebase change this in firebaase...
    const rentalSnapShot = await get(rentalRef)
    const data = rentalSnapShot.val();
    // ES Modules For The Render Function
    // API Data Data Structure
    // {{}, {}, {}, {}}
    // Arrays of Objects...
    // Object.keys(obj)   Object.enteries(obj) Object.values(obj)
    // object['prop']
     Object.values(data).map(rental=>{
          const card = movieRental(rental) 
          document.body.append(card)
          
     })
}

pageInit()

