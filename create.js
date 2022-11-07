import {navbar}  from "./components/navbar.js";
let nav_bar= document.getElementById("navbar");
nav_bar.innerHTML= navbar();

//api key-  3c7868be23d708739afc0c088ce12166
//btn to get the data;

let create_btn= document.getElementById("create_btn");
create_btn.onclick= () => {
    createPost();
};
create_btn.disabled=true;
// event handler to delete post button
let delete_btn= document.getElementById("delete_btn");
delete_btn.onclick= () => {
    deletePost();
};




// add event Handler on input type file of image whose id=image

let inp_image= document.getElementById("image");
inp_image.onchange= () => {

    handleImage();
}


//creating image URL
let image_url;
const handleImage= async() => {

    // where image is stored initially?
    // who can access imag-  only me
    // the goal is it should be accessible to -  all
    // is internet accessible to all- yes
    // how everything is accessible on net -  URL
    // so we need a URL for Image
    // imgbb give the URL
    //provide the file, get back tourl
    let img= document.getElementById("image");
    // access the image data
    let actual_img= img.files[0];
    //console.log(actual_img);


    // Given in documentation
    let form= new FormData()

    form.append('image',actual_img);


    // lets make the post request

    let res= await fetch(`https://api.imgbb.com/1/upload?key=3c7868be23d708739afc0c088ce12166`,{
        
    method: 'POST',
    body:form,
    });

    let data= await res.json();
    image_url= data.data.display_url;
    console.log(data);
};


const createPost= async()=>{



    let id= document.getElementById("id").value;

    let caption= document.getElementById("caption").value;

    let send_this_data={
        id,
        caption,
        image_url,

    };
    //above data is accessible to whom?- all
    // it is supposed to accessible to everyone-  yes
    // where above data should go-  server (local server)
    // json-server package
    
    let res= await fetch(`http://localhost:3000/posts`,{

        method:'POST',
        body : JSON.stringify(send_this_data),
    
        headers:{
            'Content-Type': 'application/json',
    
        },
    });
    let data= await res.json();
    console.log(data);
    create_btn.disabled=false;
    
    
};

const deletePost= async ()=>{
     let delete_id= document.getElementById("delete_id").value;

     let res= await fetch(`http://localhost:3000/posts/${delete_id}`,{

    method:'DELETE',
    headers:{
        'Content-Type':'application/json',
    },

     });
     let data= await res.json();
     console.log(data);
};