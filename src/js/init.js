import { renderControlsMarkup } from './markup';
import { ImageApiService } from './api-service';

export function initialize() {
  const localStorageValue = localStorage.getItem('search-options');
  const options = localStorageValue ? JSON.parse(localStorageValue) : {};

  renderControlsMarkup(options);
  return new ImageApiService(options);
}
