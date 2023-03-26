import { Api } from "./FetchPictures";
import { createGalleryCards } from "./gallery";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const unsplashApi = new Api();
const searchFormEl = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const searchBtn = document.querySelector('button');
const targetEl = document.querySelector('.target-element')

const observer = new IntersectionObserver(async entries => {
    if (!entries[0].isIntersecting) {
        return;
    }
    try {
        unsplashApi.page += 1;
        const { data } = await unsplashApi.fetchPhotosbyQuery();
        galleryList.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
        if (data.totalHits === data.total) {
            Notify.failure("We're sorry, but you've reached the end of search results.");
            searchBtn.disabled = false;
        }

    } catch (error) {
        console.log(error);
    }
},

    {
        root: null,
        rootMargin: '0px 0px 400px 0px',
        threshold: 1.0,
    }
);

const onSearchFormSubmit = async event => {
    event.preventDefault();
    searchBtn.disabled = true;
    unsplashApi.query = event.target.elements.searchQuery.value;
    unsplashApi.page = 1;

    try {
        const { data } = await unsplashApi.fetchPhotosbyQuery();
        if (data.hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            event.target.reset();
            loadMoreBtnEl.classList.add('is-hidden');
            galleryList.innerHTML = '';
            searchBtn.disabled = false;
            return;
        }

        if (data.totalHits === 1) {
            galleryList.innerHTML = createGalleryCards(data.hits);
            loadMoreBtnEl.classList.add('is-hidden');
            return;
        }

        // if (data.total === data.totalHits) {
        //     galleryList.innerHTML = createGalleryCards(data.hits);
        //     loadMoreBtnEl.classList.add('is-hidden');
        //     Notify.failure("We're sorry, but you've reached the end of search results.");
        //     return;
        // }

        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        galleryList.innerHTML = createGalleryCards(data.hits);
        observer.observe(targetEl);
    } catch (error) {
        console.log(error);
    }
    searchBtn.disabled = false
}

const onLoadMoreBtnClick = async event => {
    try {
        unsplashApi.page += 1;
        const { data } = await unsplashApi.fetchPhotosbyQuery();
        galleryList.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
        if (data.totalHits === unsplashApi.page) {
            Notify.failure("We're sorry, but you've reached the end of search results.");
            searchBtn.disabled = false;
        }

    } catch (error) {
        console.log(error);
    }
}


searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);





