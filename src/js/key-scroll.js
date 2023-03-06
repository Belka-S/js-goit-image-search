export function createKeyScroll(element, keyEvent) {
  const gapHeight = element.firstChild.lastElementChild.clientHeight;
  const imgHeight = element.firstChild.clientHeight;
  const imgOnScroll = 2;

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
        top: element.clientHeight,
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
