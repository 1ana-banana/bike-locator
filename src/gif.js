
export class Gif {
  async getRandomGif() {
    try {
      let response = await fetch(`https://api.giphy.com/v1/gifs/random?tag=&rating=r&lang=en&api_key=${process.env.API_KEY_GIPHY}`);
      if  (response.status != 200 || response.ok != true) {
        return false;
      } else {
        let jsonifiedResponse = await response.json();
        return jsonifiedResponse;
      }
    } catch(error) {
      return false;
    }
  }
}
