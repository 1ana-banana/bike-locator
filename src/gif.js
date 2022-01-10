export class Gif {
  async getRandomGif() {
    try {
      let response = await fetch(`http://api.giphy.com/v1/gifs/random`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error) {
      return false;
    }
  }
}