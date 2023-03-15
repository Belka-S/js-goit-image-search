import { imageApiService, searchOptions, refs } from './api-service';
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
  imageApiService.normalData = [];
  imageApiService.page = 0;

  createGallery();
}

export function createGallery() {
  startNotifyLoading();

  imageApiService
    .fetchImages()
    .then(renderGalleryMarkup)
    .then(renderLoadMoreBtn)
    .then(refreshSimpleLightbox)
    .then(loadMoreOnScroll)
    .catch(removeLoadMoreBtn)
    .finally(endNotifyLoading);
}

export function setSearchOptions(e) {
  switch (e.target.id) {
    case 'safe':
      searchOptions.safeSearch = e.target.checked;
      break;

    case 'type':
      searchOptions.type = e.target.value;
      e.target
        .querySelector(`[value='${e.target.value}']`)
        .setAttribute('checked', true);
      break;

    case 'orientation':
      searchOptions.orientation = e.target.value;
      e.target
        .querySelector(`[value='${e.target.value}']`)
        .setAttribute('checked', true);
      break;

    case 'loading':
      searchOptions.perPage = e.target.value;
      e.target
        .querySelector(`[value='${e.target.value}']`)
        .setAttribute('checked', true);
      break;
  }
  localStorage.setItem('search-options', JSON.stringify(searchOptions));
}

export function getSearchOptions(e) {
  if (localStorage.getItem('search-options')) {
    refs.optionForm.type.value = searchOptions.type;
    refs.optionForm.orientation.value = searchOptions.orientation;
    refs.optionForm.loading.value = searchOptions.perPage;
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
