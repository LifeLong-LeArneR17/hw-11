import { Api } from "./FetchPictures";


const unsplashApi = new Api();

const searchFormEl = document.querySelector('#search-form');


const onSearchFormSubmit = event => {
    event.preventDefault();
    unsplashApi.query = event.target.elements.searchQuery.value;


    unsplashApi.fetchPhotosbyQuery().then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    })
     
}






searchFormEl.addEventListener('submit', onSearchFormSubmit);










