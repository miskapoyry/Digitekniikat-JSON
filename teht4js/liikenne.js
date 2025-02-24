// TEHDÄÄN ASYNC FUNKTIO, JOSSA FETCHATAAN TIEKAMERAN C04507 TIEDOT

async function fetchRoad(){
    // KÄYTETÄÄN TAAS TRY CATCH -LOHKOJA, JOS ERROR NIIN SE NÄYTETÄÄN SUORAAN VASTAUKSESSA
    try{
        // KÄYTETÄÄN AWAITIA NIIN KUIN AIEMMASSA, JOSSA FUNKTION SUORITTAMINEN LOPPUU KUNNES SAADAAN PROMISET TAKAISIN.
        // API URL ON OTETTU 
        const response = await fetch("https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507");
        // TÄSSÄ TAAS TEHDÄÄN RESPONSESTA JSON
        const data = await response.json();
        // KUTSUTAAN DATALLA TÄTÄ FUNKTIOTA, JOSTA SITTEN DATA LÄHETETÄÄN
        fetchTimestamp(data);
    } catch(error) {
        // TÄSSÄ ERROR -VIESTI
        document.getElementById("vastaus").innerHTML =
        "<p>Tietoja ei kyetty hakemaan </p>" + error;
    }
}

// TÄSSÄ PUOLESTAAN SAMALLA PERIAATTELLA TOIMIVA ASYNC FUNKIO, JOLLA HAETAAN PRESETTIEN TIMESTAMPIT, MITÄ TOISESTA EI SAATU

async function fetchTimestamp(data) {
    try {
        const response = await fetch("https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/data");
        const timestampData = await response.json();

        // TÄSTÄ FUNKTIOSTA LÄHETETÄÄN MYÖS AIEMPI DATA SAMALLA DISPLAY FUNKIOLLE
        displayPictures(data, timestampData);
    } catch (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Aika tietoja ei kyetty hakemaan </p>" + error;
    }
}

// VASTAUKSEN RAKENTAVAAN FUNKTIOON OTETAAN MOLEMMISTA FETCHEISTA DATAT
async function displayPictures(data, timestampData){
    // LUODAAN KOLME MUUTTUJAA, KAKSI PRESETEILLE JA YKSI VASTAUS DIVIIN TULEVALLE TEKSTILLE
    let timestampPresets = timestampData.presets;
    let presets = data.properties.presets;
    let teksti = document.getElementById("vastaus")

    // LOOPATAAN TOISEN MUUTTUJAN (TÄSSÄ TAPAUKSESSA KUVAT SISÄLTÄVÄN) LÄPI, JOTTA SAADAAN KAIKKI 5 KUVAA JA TIMESTAMPIA
    for (var i = 0; i < presets.length; i++){

        const imageUrl = presets[i].imageUrl;
        const timestamp = timestampPresets[i].measuredTime;

        // RAKENNETAAN VASTAUS LISÄÄMÄLLÄ AINA EDELLISEEN UUSI DIV JOKA SISÄLTÄÄ KUVAN JA TIMESTAMPIN, JOITA MUOKATTU BS5 LUOKILLA
        teksti.innerHTML += `
        <div class="text-center mb-3">
        <p><strong>${timestamp}</strong></p>
        <img src=${imageUrl} class="w-100" alt="Lakalahden liikennekameran kuva">
        </div>
        `
    }
}