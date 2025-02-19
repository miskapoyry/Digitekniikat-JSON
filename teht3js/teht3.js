function fetchEvents() {
  // Osoite josta fetchataan
  fetch("https://api.visittampere.com/api/v1/visittampere/event/published/all/?for mat=json&lang=fi")
    // Muunnetaan vastaus JSON muotoon nuolinotaatiofunktiolla

    .then((response) => response.json())

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus
    // Kutsutaan funktiota ja välitetään sille json-vastaus tapahtumat(responseJson)})

    .then((data) => tapahtumat(data))

    // Jos tuli jokin virhe
    .catch((error) => {
      // TÄMÄ VIESTI NÄYTETÄÄN ERRORIN SATTUESSA
      document.getElementById("vastaus").innerHTML =
        "<p>Tietoa ei pystytä hakemaan </p>" + error;
    });
}

function tapahtumat(data) {

    var teksti = "";
    teksti = "<h1>Tampereella tapahtuu</h1><br />";
    
    // LOOPATAAN JSON RESPONSEN LÄPI JA LAITETAAN JOKAISEN SILMUKAN SISÄLTÖ TEKSTIIN
    for (var i = 0; i < data.length; i++) {
    // DATA.TITLE HAKEE OTSIKON
    teksti = teksti + "<h3>" + data[i].title + "</h3>";
    // DATA.DESCRIPTION HAKEE KUVAUKSEN
    teksti = teksti + "<p>" + data[i].description + "</p>";
    // DATA.URL HAKEE TAPAHTUMAN URL
    teksti = teksti + "<p> <a href=" + data[i].url + ">" + data[i].url + "</a></p><hr />";
    }
    
    // TEKSTI LAITETAAN HTML SIVUN DIVIIN, JOKA ID ON "VASTAUS"
    document.getElementById("vastaus").innerHTML = teksti;
    }

function fetchWeather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Helsinki,FI&appid=665ecd56dfc08dbb50feb8b8f5034e28&units=metric")
    // Muunnetaan vastaus JSON muotoon nuolinotaatiofunktiolla

    .then((response) => response.json())

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus
    // Kutsutaan funktiota ja välitetään sille json-vastaus tapahtumat(responseJson)})

    .then((data) => saa(data))

    // Jos tuli jokin virhe
    .catch((error) => {
      // TÄMÄ VIESTI NÄYTETÄÄN ERRORIN SATTUESSA
      document.getElementById("vastaus").innerHTML =
        "<p>Tietoa ei pystytä hakemaan </p>" + error;
    });
}

function saa(data){
    
}