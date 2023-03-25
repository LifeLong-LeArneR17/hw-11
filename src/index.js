import { Api } from "./FetchPictures";
import { createGalleryCards } from "./gallery";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const unsplashApi = new Api();
const searchFormEl = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const searchBtn = document.querySelector('button');

const onSearchFormSubmit = event => {
    event.preventDefault();
    searchBtn.disabled = true;
    unsplashApi.query = event.target.elements.searchQuery.value;
    unsplashApi.page = 1;

    unsplashApi.fetchPhotosbyQuery().then(data => {
        if (data.hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            event.target.reset();
            loadMoreBtnEl.classList.add('is-hidden');
            galleryList.innerHTML = '';
            return;
        }

        if (data.totalHits === 1) {
            galleryList.innerHTML = createGalleryCards(data.hits);
            loadMoreBtnEl.classList.add('is-hidden');
            return;
        }

        if (data.total === data.totalHits) {
            galleryList.innerHTML = createGalleryCards(data.hits);
            loadMoreBtnEl.classList.add('is-hidden');
            Notify.failure("We're sorry, but you've reached the end of search results.");
            return;
        }

        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        galleryList.innerHTML = createGalleryCards(data.hits);
        loadMoreBtnEl.classList.remove('is-hidden');
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        searchBtn.disabled = false
    })
}

const onLoadMoreBtnClick = event => {
    unsplashApi.page += 1;
    unsplashApi.fetchPhotosbyQuery().then(data => {
        galleryList.insertAdjacentHTML('beforeend', createGalleryCards(data.hits))
    }).catch(error => {
        console.log(error);
    })
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);









