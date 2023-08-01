import axios from "axios";

export default class TestServise {
    
    static async getAnime(filter = 'bypopularity', type = null) {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
            params: {
                type: type,
                filter: filter
            }
        })
        return response
    }

    static async getAnimeOngoing() {
        return TestServise.getAnime('airing')
    }
    static async getAnimeUpcoming() {
        return TestServise.getAnime('upcoming')
    }
    static async getAnimeFinished() {
        return TestServise.getAnime('bypopularity')
    }
    static async getAnimeMovie() {
        return TestServise.getAnime(null, 'movie')
    }
    static async getAnimeOVA() {
        return TestServise.getAnime(null, 'ova')
    }

    static async getAnimeSearch(inputQueary) {
        const response = await axios.get('https://api.jikan.moe/v4/anime', {
            params: {
                q: inputQueary
            }
        })
        return response
    }

    static async getAnimeById(id) {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
        return response
    }
     
}