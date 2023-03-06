import axios from 'axios';
import { notifyFoundNothing, notifySearchSucces } from './notify';

export class ImageApiService {
  static BASE_URL = 'https://pixabay.com/api';
  static API_KEY = '34106733-e100dcdc1add944a5aa3c5584';
  static SAEARCH_PARAMETERS = {
    type: ['all', 'photo', 'illustration', 'vector'],
    orientation: ['all', 'horizontal', 'vertical'],
    safesearch: [true, false],
    per_page: [3, 200],
  };

  #refs;

  constructor({
    type = 'all',
    orientation = 'all',
    safesearch = false,
    perPage = 39,
    formSelector = '#search-form',
    inputName = 'searchQuery',
    divSelector = '.gallery',
  }) {
    this.#refs = {
      searchForm: document.querySelector(`${formSelector}`),
      inputEl: document.querySelector(`${formSelector}`)[inputName],
      galleryDiv: document.querySelector(`${divSelector}`),
      loadMoreBtn: null,
    };
    this.page = 0;
    this.normalData = [];
    this.searchOptions = { type, orientation, safesearch, perPage };
  }

  async fetchImages() {
    const url = ImageApiService.BASE_URL;
    const key = ImageApiService.API_KEY;
    const { type, orientation, safesearch, perPage } = this.searchOptions;
    const searchQuery = this.refs.inputEl.value.trim().split(/\s+/).join('+');

    this.page += 1;

    try {
      // const response = await fetch(
      const response = await axios.get(
        `${url}/?key=${key}&q=${searchQuery}` +
          `&image_type=${type}&orientation=${orientation}&safesearch=${safesearch}` +
          `&page=${this.page}&per_page=${perPage}`
      );
      // const data = await response.json();
      const data = await response.data;
      if (!data.hits.length) {
        notifyFoundNothing();
      } else {
        this.page === 1 && notifySearchSucces(data.totalHits);
        this.normalizeData(data);
        return this.normalData;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  normalizeData(data) {
    data.hits.map(hit => {
      this.normalData.push({
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
        likes: hit.likes,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
      });
    });
  }

  set refs(newRefs) {
    this.#refs = newRefs;
  }
  get refs() {
    return this.#refs;
  }
}
