import {ref as databaseRef, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";



/*function pageInit(){
    const key = sessionStorage.getItem('key');
    const dataRef = databaseRef(db, `movies/${key}`) // ref to they single key
    remove(dataRef)
  // console.log("Delete Page")
  // console.log(key)
    // remove the data  remove()
  }
  */
  
  pageInit()

