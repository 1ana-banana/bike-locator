import { Bicycle } from "./bicycle.js";
import { Gif } from "./gif.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    $("#inputs").hide();
    const searchRadius = parseFloat($("input#distance").val());
    let location = $("input#location").val();
    const locationArray = location.split("");
    const excludedChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "-", "_", "?", "/", ">", "<", ":", ";", "'", ",", "`", "~"];
    for (let i = 0; i < locationArray.length; i++) {
      if (excludedChars.includes(locationArray[i])) {
        locationArray[i] = " ";
      }
    }
    location = locationArray.join("");

    (async () => {
      let bicycle = new Bicycle();
      const response = await bicycle.getStolenBikeByLocation(location, searchRadius);
      getElements(response);
    })();

    (async () => {
      let gif = new Gif();
      const gifResponse = await gif.getRandomGif();
      returnGif(gifResponse);
    })();

    const getElements =  function(response) {
      if (response === false) {
        $("#results").append(`<div class='row'><div class="col-md-12">There was an error. <a href='index.html'>Click here</a> to try again.</div></div>`);
        $("#bikeStats").hide();
        $("#summary").hide();
        $("#results").show();
      } else if (response.bikes.length === 0) {
        $("#results").append(`<div class='row'><div class="col-md-12">There are no stolen bikes in your requested location. <a href='index.html'>Click here</a> to try another location.</div></div>`);
        $("#bikeStats").hide();
        $("#summary").hide();
        $("#results").show();
      } else if (response.bikes.length > 0) {
        $("#results").show();
        let manufacturerArray = [];
        response.bikes.forEach(function(bike){
          manufacturerArray.push(bike.manufacturer_name);
        });
        let maximumFrequency = 1;
        let counter = 0;
        let manufacturer;
        for (let i = 0; i < manufacturerArray.length; i++){
          for (let j = i; j < manufacturerArray.length; j++){
            if (manufacturerArray[i] === manufacturerArray[j]) {
              counter++;
            }
            if (maximumFrequency < counter) {
              maximumFrequency = counter;
              manufacturer = manufacturerArray[i];
            }
          }
          counter = 0;
        }
        $(".summary").html(manufacturer);
        $(".maxFreq").html(maximumFrequency);
        $(".totalStolenBikes").hrml(manufacturerArray.length);
        response.bikes.forEach(function(bike) {
          let unix_timestamp = "${bike.date_stolen}";
          let date = new  Date(unix_timestamp *1000);
          let bikeThumb;
          if (bike.thumb != null) {
            bikeThumb = bike.thumb;
          } else {
            bikeThumb = "https://depositphotos.com/8522974/stock-photo-bicycle-silhouette.html"
          }
          $("#bikeStats").append(`<div class='row'><div class='col-md-4'><strong>${bike.manufacturer_name}</strong> ${bike.frame_model}</div><div class='col-md-4'>${date}</div><div class='col-md-4'><center><img src='${bikeThumb}' alt='A photo of bike' height='200px' width='200px'></center></div> </div>`);
        });
      }
    };
    const returnGif = function(gifResponse) {
      if (gifResponse.text != "undefined") {
        $(".jumbotron").append(`<p>"${gifResponse.gifText}"</p>`);
      }
    };
  });
});