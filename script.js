const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isInitialload = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// Unsplash API
const count = 30;
const apiKey = 'kP3b2QVvjUCeXa5RxfZSC1GkCFwY1cTbg1xrXi6W4J8';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        isInitialload = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attribute on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }

}

// Create Elements for links and photos, addd to DOM

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });
        // Event listener, check when each is finished loading 
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from nsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    }catch (error){
        // Catch Error here
    }
}

// Check to see if scrolling near bottom of page, Load More photos 
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isInitialload){
        isInitialload = false;
        getPhotos();
    }
})
// On Load
getPhotos();
