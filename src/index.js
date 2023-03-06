import { Loading } from 'notiflix/build/notiflix-loading-aio';

import './sass/index.scss';
import { ImageApiService } from './js/api-service';
import createMarkup from './templates/gallery.hbs';
import { notifySearchEnd } from './js/notify';
import { modal, refreshSimpleLightbox } from './js/modal';
import { createKeyScroll } from './js/key-scroll';

// Create PhotoApiService
const photoApiService = new ImageApiService({
  type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

const { refs } = photoApiService;

// Create Gallery
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  photoApiService.normalData = [];
  photoApiService.page = 0;

  createGalleryPage();
}

// Fetch Data, Create
function createGalleryPage() {
  Loading.pulse();

  photoApiService
    .fetchImages()
    .then(renderGalleryMarkup)
    .then(createLoadMoreBtn)
    .then(refreshSimpleLightbox)
    .catch(removeLoadMoreBtn)
    .finally(Loading.remove);
}

// Render Gallery Markup
function renderGalleryMarkup(data) {
  const galleryMarkup = data.reduce((acc, el) => acc + createMarkup(el), '');
  refs.galleryDiv.innerHTML = galleryMarkup;
}

// Create LoadMore Button
function createLoadMoreBtn() {
  if (refs.loadMoreBtn) {
    return;
  }
  const btnMarkup = '<button type="button" class="more">Load more</button>';
  refs.galleryDiv.insertAdjacentHTML('afterend', btnMarkup);
  refs.loadMoreBtn = document.querySelector('button.more');
  refs.loadMoreBtn.addEventListener('click', createGalleryPage);
}

// Remove LoadMore Button
function removeLoadMoreBtn() {
  refs.loadMoreBtn.remove();
  refs.loadMoreBtn.removeEventListener('click', createGalleryPage);
  refs.loadMoreBtn = null;

  const { page, normalData, searchOptions } = photoApiService;
  normalData.length !== page * searchOptions.perPage && notifySearchEnd();
}

// Create Page Scrolling
addEventListener('keydown', scrollPage);

function scrollPage(e) {
  if (e.code.includes('Arrow') && !modal.isOpen) {
    e.preventDefault();
    createKeyScroll(refs.galleryDiv, e);
  }
}
