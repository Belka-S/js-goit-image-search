import { photoApiService, searchOptions, refs } from './api-service';
import { renderGalleryMarkup } from './markup';
import { renderLoadMoreBtn, removeLoadMoreBtn } from './markup';
import { modal, refreshSimpleLightbox } from './modal';
import { loadMoreOnSpase, loadMoreOnScroll, scrollPage } from './key-scroll';
import { startNotifyLoading, endNotifyLoading } from './notify';

export function searchData(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  photoApiService.normalData = [];
  photoApiService.page = 0;

  createGallery();
}

export function createGallery() {
  startNotifyLoading();

  photoApiService
    .fetchImages()
    .then(renderGalleryMarkup)
    .then(renderLoadMoreBtn)
    .then(refreshSimpleLightbox)
    .then(loadMoreOnScroll)
    .catch(removeLoadMoreBtn)
    .finally(endNotifyLoading)
    .finally(console.log(photoApiService)); // delete
}

export function setLoadLimit(e) {
  searchOptions.perPage = e.target.value;
  localStorage.setItem('perPage', e.target.value);
}

export function getLoadLimit(e) {
  if (localStorage.getItem('perPage')) {
    searchOptions.perPage = localStorage.getItem('perPage');

    refs.optionForm.querySelector('#load-options').value =
      localStorage.getItem('perPage');

    refs.optionForm
      .querySelector(`[value='${searchOptions.perPage}']`)
      .setAttribute('checked', true);
  }
}

export function onArrowStroke(e) {
  if (e.code.includes('Arrow') && !modal.isOpen) {
    e.preventDefault();
    scrollPage(refs.galleryDiv, e);
  }
}

export function onSpaceStroke(e) {
  if (e.code === 'Space') {
    e.preventDefault();
    loadMoreOnSpase(e);
  }
}
