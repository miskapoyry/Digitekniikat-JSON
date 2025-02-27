// TEHDÄÄN FUNKTIO, JOSSA DATA FETCHATAAN JA PALAUTETAAN JSON RESPONSE

function fetchaaData() {
    // URL, JOSTA JSON DATA FETCHATAAN (REPON data.json file)
    const url = "https://miskapoyry.github.io/Digitekniikat-JSON/data.json";

    // KÄYTÄN MIELUUMMIN NUOLINOTAATIOTA, SILLÄ ITSE FUNKTION SYNTAKSI ON TÄTEN TODELLA PALJON YKSINKERTAISEMPI

    // ENSIN FETCHATAAN AIEMMIN MÄÄRITELTY URL
    fetch(url)

        // SITTEN RESPONSESTA TEHDÄÄN JSON MUOTOINEN .json() funktiolla
        .then(response => response.json())
        // SAATU DATA LÄHETETÄÄN "kerro" -NIMISELLE FUNKTIOLLE
        .then(data => kerro(data))
        // MIKÄLI TULEE ERROR, SE CATCHATAAN
        .catch(error => {
            // TÄMÄ VIESTI NÄYTETÄÄN ERRORIN SATTUESSA
            document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan </p>"
        })
}

function kerro(data) {

    // TÄSSÄ LUODAAN SiSÄLLÖSTÄ LISTA KÄYTTÄMÄLLÄ MAPPIA JA NUOLINOTAATIOTA. JOKAINEN "SISÄLTÖ" LAITETAAN HTML LI SISÄÄN JA JOIN TYHJÄ LOPUSSA, JOTTA SEPARATOR EI OLISI ,
    const sisaltoLista = data.opintojakso.sisalto.map((sisalto) => `<li class="listing">${sisalto}</li>`).join("");

    // TÄSSÄ LUODAAN TEKNIIKKA TAULU MAPPAAMALLA TEKNIIKKA <tr> ja <td> SISÄLLE JA JOIN PERÄÄN, ETTEI SEPARATOR OLISI ,
    const tekniikkaTaulu = data.opintojakso.tekniikat.map((tekniikka) => 
        `<tr>
            <td>${tekniikka.aihe}</td>
            <td><a href=${tekniikka.linkki}>${tekniikka.linkki}</td>
        </tr>
        `
    ).join("");

    // TÄSSÄ RAKENNETAAN VASTAUS JA ANNETAAN ELEMENTEILLE CLASSIT VAIKKA EI VÄLTTÄMÄTTÄ OLISIKAAN TARPEEN. NÄITÄ CLASSEJA KÄYTETÄÄN CSS TIEDOSTOSSA.
    const vastaus = `
        <h1 class="heading">${data.otsikko}</h1>
        <h2 class="description">${data.kuvaus}</h2>
        <img class="JSONimage" src=${data.kuva} alt="Kuva luokkahuoneesta kampuksella." />
        <p class="info">${data.opintojakso.nimi} - ${data.opintojakso.tunnus} - ${data.opintojakso.opintopisteet} opintopistettä </p>
        ${sisaltoLista}
        <div class="centered">
            <table class="table">
                <tr>
                    <th>Aihe</th>
                    <th>Linkki</th>
                </tr>
                ${tekniikkaTaulu}
            </table>
        </div>
    `;

    // VASTAUS LAITETAAN HTML id="vastaus" SISÄLLE ETSIMÄLLÄ DOKUMENTISTA SEN ID JA LAITTAMALLA INNERHTML
    document.getElementById("vastaus").innerHTML = vastaus;
}