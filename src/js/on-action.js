import { imageApiService, searchOptions, refs } from '../index';
import { renderGalleryMarkup } from './markup';
import { renderLoadMoreBtn, removeLoadMoreBtn } from './markup';
import { modal, refreshSimpleLightbox } from './modal';
import { loadMoreOnSpase, loadMoreOnScroll, scrollPage } from './key-scroll';
import { startNotifyLoading, endNotifyLoading } from './notify';

// Get Saved Search Options
export function getSearchOptions(e) {
  const { type, orientation, loading } = refs.optionForm;

  if (localStorage.getItem('search-options')) {
    type.value = searchOptions.type;
    orientation.value = searchOptions.orientation;
    loading.value = searchOptions.perPage;
  }
}

// Set Search Options
export function setSearchOptions(e) {
  switch (e.target.id) {
    case 'safe':
      searchOptions.safeSearch = e.target.checked;
      // ./templates/controls.hbs -->  {{#if safeSearch}}  <input type='checkbox' id='safe' checked /> {{/if}}
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

// Search Data
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

// Create Gallery
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

// Scroll by ArrowKeysStroke
export function onArrowStroke(e) {
  if (e.code.includes('Arrow') && !modal.isOpen) {
    e.preventDefault();
    scrollPage(refs.galleryDiv, e);
  }
}

// Load More on SpaceStroke
export function onSpaceStroke(e) {
  if (e.code === 'Space') {
    e.preventDefault();
    loadMoreOnSpase(e);
  }
}
