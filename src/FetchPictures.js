'use strict'
import axios from "axios";

export class Api {
    static BASE_URL = 'https://pixabay.com/api';
    static API_KEY = '32926626-9f8218f21c9ddc7b36f942801';
    constructor() {
        this.page = 1;
        this.query = null;

    }

    fetchPhotosbyQuery() {
        const searchParams = {
            params: {
                q: this.query,
                page: this.page,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 40,
            },
           
        }
        return axios.get(`${Api.BASE_URL}?key=32926626-9f8218f21c9ddc7b36f942801&`, searchParams);



        // return fetch(`${Api.BASE_URL}?key=32926626-9f8218f21c9ddc7b36f942801&${searchParams}`).then(response => {
        //     if (!response.ok) {
        //         throw new Error(response.status)
        //     }
        //     return response.json()
        // }
        // );
    }
}


