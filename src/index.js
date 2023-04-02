import { debounce } from 'lodash';

import './sass/index.scss';
import { initialize } from './js/init';
import { moveHeader } from './js/key-scroll';
import { setSearchOptions, getSearchOptions } from './js/on-action';
import { searchData, onSpaceStroke, onArrowStroke } from './js/on-action';

// Initialize Project
export const imageApiService = initialize();
export const { searchOptions, refs } = imageApiService;

// Set Search Options
addEventListener('load', getSearchOptions, { once: true });
refs.optionForm.addEventListener('input', setSearchOptions);

// Search Data // Create Gallery
refs.searchForm.addEventListener('submit', searchData);

// Scroll by ArrowKeysStroke
addEventListener('keydown', onArrowStroke);

// Move Header on Scroll
onscroll = debounce(e => moveHeader(), 100);

// Load More on SpaceStroke
addEventListener('keydown', onSpaceStroke);
