import { debounce } from 'lodash';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Create SimpleLightbox
export let modal = new SimpleLightbox(
  `.gallery a`, // photoApiService.refs.galleryDiv.className = gallery;
  {
    captionSelector: 'span',
    captionType: 'text',
    captionDelay: 250,
    scrollZoom: false,
    close: false,
  },
  addEventListener('wheel', debounce(onWheel, 100))
);

function onWheel(e) {
  if (!modal.isOpen) {
    return;
  }
  e.deltaY > 0 ? modal.next() : modal.prev();
}

export function refreshSimpleLightbox() {
  modal.refresh();
}
