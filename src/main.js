import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/fetch.js';
import createsStringOfPageElements from './js/template-page.js';

const galleryRef = document.querySelector('.gallery');
const moreButtonRef = document.querySelector('.more');
const formRef = document.querySelector('.form');
const loaderRef = document.querySelector('.loader');

formRef.addEventListener('submit', loadsFirstPageOfGallery);
moreButtonRef.addEventListener('click', loadsOtherGalleryPages);

loaderRef.hidden = true;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let searchValue = '';
let page = 0;

function loadsFirstPageOfGallery(e) {
  e.preventDefault();
  if (e.currentTarget.elements.query.value.trim() === '') {
    iziToast.error({
      position: 'topRight',
      messageColor: 'brown',
      message: 'Enter anything in the search field!',
      timeout: 3000,
    });
    return;
  }

  searchValue = e.currentTarget.elements.query.value;
  page = 1;
  moreButtonRef.disabled = false;
  moreButtonRef.textContent = 'More';
  moreButtonRef.hidden = true;
  loaderRef.hidden = false;

  fetchImages(page, searchValue).then(r => {
    galleryRef.innerHTML = '';
    if (r.hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        messageColor: 'brown',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        timeout: 3000,
      });
      loaderRef.hidden = true;
      return;
    }

    galleryRef.innerHTML = '';
    page += 1;

    galleryRef.insertAdjacentHTML(
      'beforeend',
      createsStringOfPageElements(r.hits)
    );

    lightbox.refresh();

    if (r.hits.length === 40) moreButtonRef.hidden = false;
    if (moreButtonRef.hidden === false || r.hits.length < 40)
      loaderRef.hidden = true;
  });
  formRef.reset();
}

function loadsOtherGalleryPages(e) {
  e.preventDefault();

  moreButtonRef.hidden = true;
  loaderRef.hidden = false;

  fetchImages(page, searchValue).then(r => {
    page += 1;

    galleryRef.insertAdjacentHTML(
      'beforeend',
      createsStringOfPageElements(r.hits)
    );

    lightbox.refresh();

    if (r.hits.length === 40) moreButtonRef.hidden = false;
    if (moreButtonRef.hidden === false) loaderRef.hidden = true;
    if (r.hits.length < 40) {
      moreButtonRef.hidden = false;
      moreButtonRef.disabled = true;
      loaderRef.hidden = true;

      moreButtonRef.textContent = 'Images are over';
    }
  });
}
