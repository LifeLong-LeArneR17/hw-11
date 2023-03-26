import '../src/sass/form.css';
import { Api } from './FetchPictures';
import { createGalleryCards } from './gallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const unsplashApi = new Api();
const searchFormEl = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const searchBtn = document.querySelector('button');
const targetEl = document.querySelector('.target-element');

const observer = new IntersectionObserver(
  async entries => {
    if (!entries[0].isIntersecting) {
      return;
    }
    try {
      const { data } = await unsplashApi.fetchPhotosbyQuery();
      if (data.totalHits === data.total) {
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
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
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
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

    if (data.total === data.totalHits) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      galleryList.innerHTML = createGalleryCards(data.hits);
      loadMoreBtnEl.classList.add('is-hidden');
      searchBtn.disabled = false;
      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    galleryList.innerHTML = createGalleryCards(data.hits);
    observer.observe(targetEl);
    loadMoreBtnEl.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
  searchBtn.disabled = false;

};

const onLoadMoreBtnClick = event => {
  unsplashApi.page += 1;

  unsplashApi
    .fetchPhotosbyQuery()
    .then(({ data }) => {
      galleryList.insertAdjacentHTML(
        'beforeend',
        createGalleryCards(data.hits)
      );
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      console.log(cardHeight);
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      if (data.totalHits === data.total) {
        loadMoreBtnEl.classList.add('is-hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
};


let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {
});

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
