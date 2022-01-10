export class Bicycle {
  async getStolenBikeByLocation(address, radius) {
    try {
      let response = await fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=100&location=${address}&distance=${radius}&stolenness=proximity&app_id=${process.env.API_KEY}`);
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