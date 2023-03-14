import { debounce } from 'lodash';

import './sass/index.scss';
import { refs } from './js/api-service';
import { moveHeader } from './js/key-scroll';
import { setLoadLimit, getLoadLimit } from './js/on-action';
import { searchData, onSpaceStroke, onArrowStroke } from './js/on-action';

// Set Loadind Limit
addEventListener('load', getLoadLimit, { once: true });
refs.optionForm.addEventListener('input', setLoadLimit);

// Search Data // Create Gallery
refs.searchForm.addEventListener('submit', searchData);

// Scroll by ArrowKeys
addEventListener('keydown', onArrowStroke);

// Move Header on Scroll
onscroll = debounce(e => moveHeader(), 100);

// Load More on Space
addEventListener('keydown', onSpaceStroke);
