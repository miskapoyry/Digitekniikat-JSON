function fetchaa2Teht(){
    // URL, JOSTA JSON DATA FETCHATAAN (REPON data.json file)
    const url = "https://miskapoyry.github.io/Digitekniikat-JSON/teht2.json";
        // ENSIN FETCHATAAN AIEMMIN MÄÄRITELTY URL
        fetch(url)
         // SITTEN RESPONSESTA TEHDÄÄN JSON MUOTOINEN .json() funktiolla
         .then(response => response.json())
         // SAATU DATA LÄHETETÄÄN "kerro" -NIMISELLE FUNKTIOLLE
         .then(data => kerro2(data))
         // MIKÄLI TULEE ERROR, SE CATCHATAAN
         .catch(error => {
             // TÄMÄ VIESTI NÄYTETÄÄN ERRORIN SATTUESSA
             document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan </p>"
         })
}

function kerro2(data) {

    // TÄSSÄ LUODAAN SiSÄLLÖSTÄ LISTA KÄYTTÄMÄLLÄ MAPPIA JA NUOLINOTAATIOTA. JOKAINEN "OSALLISTUJA" LAITETAAN HTML LI SISÄÄN JA JOIN TYHJÄ LOPUSSA, JOTTA SEPARATOR EI OLISI ,
    const osallistujaLista = data.toteutus.osallistujat.nimi.map((nimi) => `<li class="listing">${nimi}</li>`).join("");
    const alku = new Date(data.toteutus.alku_pvm).toLocaleDateString("fi-FI");
    const loppu = new Date(data.toteutus.loppu_pvm).toLocaleDateString("fi-FI")

    // TÄSSÄ RAKENNETAAN VASTAUS JA ANNETAAN ELEMENTEILLE CLASSIT VAIKKA EI VÄLTTÄMÄTTÄ OLISIKAAN TARPEEN. NÄITÄ CLASSEJA KÄYTETÄÄN CSS TIEDOSTOSSA.
    const vastaus = `
        <h1 class="heading">${data.toteutus.nimi}</h1>
        <br />
        <img class="JSONimage" src=${data.toteutus.kuva} alt="Suuri, tyhjä ja moderni luokkahuone." />
        <br />
        <p class="description"> Toteutuksella on ${data.toteutus.osallistujat.lukumaara} osallistujaa</p>
        ${osallistujaLista}
        <br />
        <p class="description"> Toteutus alkoi ${alku} ja päättyy ${loppu} </p>
        <p class="description"> Kesto on ${data.toteutus.kesto_viikkoina} viikkoa </p>
    `;

    // VASTAUS LAITETAAN HTML id="vastaus" SISÄLLE ETSIMÄLLÄ DOKUMENTISTA SEN ID JA LAITTAMALLA INNERHTML
    document.getElementById("vastaus").innerHTML = vastaus;
}