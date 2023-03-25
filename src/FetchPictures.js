'use strict'
export class Api {
    static BASE_URL = 'https://pixabay.com/api';
    static API_KEY = '32926626-9f8218f21c9ddc7b36f942801';
    constructor() {
        this.page = 1;
        this.query = null;

    }

    fetchPhotosbyQuery() {
        const searchParams = new URLSearchParams({
            q: this.query,
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
        }
        );
    }
}


