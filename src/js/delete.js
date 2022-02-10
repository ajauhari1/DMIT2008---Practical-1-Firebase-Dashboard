import {ref as databaseRef, set, get} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

function pageInit(){
    const key = sessionStorage.getItem('key');
  // console.log("Delete Page")
  // console.log(key)
    const path = `movies/${key}`
    console.log(path)
    path.remove()
    // remove the data  remove()
  }
  
  
  pageInit()