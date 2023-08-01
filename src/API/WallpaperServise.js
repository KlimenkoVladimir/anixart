import axios from "axios";

export default class WallpaperServise {

    static async getWallpaper() {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: "anime",
                orientation: "landscape",
                client_id: "a3t6x86dcV6PmYI-TvAPE72woBcpwN502pgvE_uQTwI"
            }
        })
        return response
    }
}
// const url = 'https://serpapi.com/search.json?engine=yandex_images&text=coffee&api_key=185db14179e483a7ef9adec28bf8c7ff1da972d544a60a78f7dfab733f3a1825';

// function sendRequest(method, url, body = null) {
//   return fetch(url, {
//     mode: 'no-cors',
//   })
// }

// sendRequest('GET', url).then(d => console.log(d))



//