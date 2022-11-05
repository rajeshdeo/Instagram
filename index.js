import {navbar}  from "./components/navbar.js";

import {append} from "./scripts/append.js"


let nav_bar= document.getElementById("navbar");
nav_bar.innerHTML= navbar();


//append need two things
// data

let posts_div= document.getElementById("posts");

const getData= async()=>{

    let res= await fetch(`http://localhost:3000/posts`);

    let data= await res.json();

    console.log(data);
    append(data,posts_div);
}

getData();