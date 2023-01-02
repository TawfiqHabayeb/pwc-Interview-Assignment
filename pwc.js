mapboxgl.accessToken =
      "pk.eyJ1IjoidGF3ZmlxMjU0IiwiYSI6ImNsY2RqZzVsbTA0MDgzcnIwem55MHZpMnUifQ.76ssC5S85wKTi4YjrcvOdg";

const showError = (error) => {
  document.getElementById("error").innerHTML = error;
  document.getElementById("map").innerHTML = '';
};

function getCoordinates(event) {
  event.preventDefault();
  const form = document.forms[0];
  const city = form.city.value;
  if (!city) {
    showError("please enter a valid city");
    return false;
  }
  const apiUrl = `http://api.positionstack.com/v1/forward?access_key=022cb900bc0e72af153b6c84042f03f2&query=${city}`;

  fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        showError("something wrong happened with the request");
        return false;
      }
      console.log(response);
      return response.json();
    })
    .then((res) => {
      console.log(res);
      if (!res.data.length) {
        showError("please enter a valid city");
        return false;
      }
      const lat = res.data[0].latitude;
      const lng = res.data[0].longitude;
      document.getElementById("error").innerHTML = "";
      
    new mapboxgl.Map({
      container: "map", 
      style: "mapbox://styles/mapbox/streets-v12", 
      center:[lng, lat],
      zoom: 11, 
    });

    })

    .catch((error) => {
      showError(error.message);
    });

  return false;
}
