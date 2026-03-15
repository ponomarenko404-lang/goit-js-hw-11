
import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, hideLoader, showLoader } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./css/loader.css";

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    const query = event.target.elements["search-text"].value.trim();
    if (query === "") {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please enter a search term before submitting.',
            position: 'topRight',
            timeout: 3000, 
            pauseOnHover: true, 
        });
        return;
    }
    console.log(query);

    clearGallery();
    showLoader();

    getImagesByQuery(query)
        .then(response => {
            hideLoader();
            const images = response.data.hits;
            if (images.length === 0) {
                iziToast.error({
                    title: 'Sorry!',
                    message: 'There are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }
            console.log(images);
            
            createGallery(images);
        })

        .catch(error => {
            hideLoader();
            console.log(error);
        iziToast.error({
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
    position: 'topRight',
  });
        });
};

