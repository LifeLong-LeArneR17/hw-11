'use strict'
export class Api {
    static BASE_URL = 'https://pixabay.com/api';
    static API_KEY = '32926626-9f8218f21c9ddc7b36f942801';
    constructor() {
        this.page = 1;

    }
    fetchPhotosbyQuery() {
        const searchParams = new URLSearchParams({
            q:'cat',
            page: this.page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 20,
     })
     return fetch(`${Api.BASE_URL}?key=32926626-9f8218f21c9ddc7b36f942801&${searchParams}`).then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    }
}

const api = new Api();
api.fetchPhotosbyQuery().then(data => {
    console.log(data);
});


