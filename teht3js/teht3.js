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

// MÄÄRITELLÄÄN LETILLÄ KAKSI MUUTTUJAA, JOTKA TÄYTETÄÄN FUNKTIOISSA

let helData = null;
let treData = null;

function fetchWeatherHel() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Helsinki,FI&appid=665ecd56dfc08dbb50feb8b8f5034e28&units=metric&lang=fi")
    // Muunnetaan vastaus JSON muotoon nuolinotaatiofunktiolla

    .then((response) => response.json())

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus
    // Kutsutaan funktiota ja välitetään sille json-vastaus tapahtumat(responseJson)})

    .then((data) => {
      helData = data;
      saa(helData);
    })

    // Jos tuli jokin virhe
    .catch((error) => {
      // TÄMÄ VIESTI NÄYTETÄÄN ERRORIN SATTUESSA
      document.getElementById("vastaus").innerHTML =
        "<p>Helsingin tietoa ei pystytä hakemaan </p>" + error;
    });
}

function fetchWeatherTre() {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Tampere,FI&appid=665ecd56dfc08dbb50feb8b8f5034e28&units=metric&lang=fi")
  // Muunnetaan vastaus JSON muotoon nuolinotaatiofunktiolla

  .then((response) => response.json())

  // Käsitellään muunnettu (eli JSON muotoinen) vastaus
  // Kutsutaan funktiota ja välitetään sille json-vastaus tapahtumat(responseJson)})

  .then((data) => {
    treData = data;
    saa(treData);
  })

  // Jos tuli jokin virhe
  .catch((error) => {
    // TÄMÄ VIESTI NÄYTETÄÄN ERRORIN SATTUESSA
    document.getElementById("vastaus").innerHTML =
      "<p>Tampereen tietoa ei pystytä hakemaan </p>" + error;
  });
}

// TÄSSÄ LUODAAN SAA FUNKTIO, JOSSA MOLEMMAT DATAT, ELI TAMPEREEN JA HELSINGIN FETCHIT TULEVAT SAMAAN PAIKKAAN. MUOTOILUISSA KÄYTETTY CSS LUOKKIA SEKÄ BOOTSTRAPIA

function saa(){
    document.getElementById("vastaus").innerHTML = `
    <div class="centered weather-box">
      <div class="d-flex p-2 bd-highlight">
        <div class="m-5">
          <p>Kaupunki: ${helData.name}</p>
          <p>Sää: ${helData.weather[0].description}</p>
          <p>Lämpötila: ${helData.main.temp}°C</p>
          <p>Tuulen Nopeus: ${helData.wind.speed} m/s</p>
          <img class="d-block mx-auto" src="https://openweathermap.org/img/wn/${helData.weather[0].icon}@2x.png" alt="Helsingin sää kuva">
        </div>
        <div class="m-5">
          <p>Kaupunki: ${treData.name}</p>
          <p>Sää: ${treData.weather[0].description}</p>
          <p>Lämpötila: ${treData.main.temp}°C</p>
          <p>Tuulen Nopeus: ${treData.wind.speed} m/s</p>
          <img class="d-block mx-auto" src="https://openweathermap.org/img/wn/${treData.weather[0].icon}@2x.png" alt="Tampereen sää kuva">
        </div>
      </div>
    </div>
    `
}