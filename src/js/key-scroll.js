import { refs } from './api-service';
import { createGallery } from './on-action';
import { modal } from './modal';

// Scroll by ArrowKeys
export function scrollPage(el, keyEvent) {
  const gapHeight = el.firstElementChild.lastElementChild.clientHeight;
  const imgHeight = el.firstElementChild.clientHeight;
  const imgOnScroll = 2.0058;

  switch (keyEvent.code) {
    case 'ArrowRight':
      window.scrollBy({
        top: (imgHeight + gapHeight) * imgOnScroll,
        behavior: 'smooth',
      });
      break;

    case 'ArrowLeft':
      window.scrollBy({
        top: -(imgHeight + gapHeight) * imgOnScroll,
        behavior: 'smooth',
      });
      break;

    case 'ArrowDown':
      window.scrollBy({
        top: el.clientHeight,
        behavior: 'smooth',
      });
      break;

    case 'ArrowUp':
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      break;
  }
}

// Move Header on Scroll
let prevPosition = window.pageYOffset;

export function moveHeader() {
  const currentPosition = window.pageYOffset;

  currentPosition > prevPosition
    ? refs.controlsEl.classList.add('hidden-up')
    : refs.controlsEl.classList.remove('hidden-up');

  prevPosition = currentPosition;
}

// Load More on Space
export function loadMoreOnSpase(keyEvent) {
  if (keyEvent.code === 'Space' && !modal.isOpen) {
    keyEvent.preventDefault();
    createGallery();
  }
}

// Endless Scrolling
export const io = new IntersectionObserver(
  entries => {
    refs.optionForm.loading.value === '162' &&
      entries[0].isIntersecting &&
      createGallery();
  },
  { rootMargin: `${window.innerHeight}px` }
);

export const loadMoreOnScroll = () =>
  io.observe(refs.galleryDiv.lastElementChild);
