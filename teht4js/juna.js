// TOTEUTETAAN ASYNC FUNKTIO KUTEN AIEMMINKIN
async function fetchTrains(){
    try{
        // HAETAAN TPE SAAPUVIA JUNIA, JOTKA PYSÄHTYVÄT SIELLÄ (NONSTOPPING FALSE)
        const response = await fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/tpe?arriving_trains=100&include_nonstopping=false")
        const data = await response.json();
        displayTrains(data);
    } catch (error) {
        // TÄSSÄ ERROR -VIESTI
        document.getElementById("vastaus").innerHTML =
        "<p>Junatietoja ei kyetty hakemaan </p>" + error;
    }
}

async function displayTrains(data) {
    let teksti = document.getElementById("vastaus");
    // TÄSSÄ ON ULOMMAINEN FOR LOOP
    for (var i = 0; i < data.length; i++){
        // TÄSSÄ SISEMPI FOR LOOP
        for (var j = 0; j < data[i].timeTableRows.length; j++){
            // TÄSSÄ KATSOTAAN KAIKKI JUNAT, JOTKA SAAPUVAT TAMPEREELLE
            if (data[i].timeTableRows[j].stationShortCode=="TPE" && data[i].timeTableRows[j].type=="ARRIVAL"){

                // TEHDÄÄN MUUTTUJIA JUNAN TYYPISTÄ, NUMEROSTA, KATEGORIASTA, LÄHTÖASEMASTA, LÄHTÖAJASTA, LÄHTÖPÄIVÄSTÄ
                // PÄIVÄMÄÄRISSÄ ISO 8601 FORMAATISSA OLEVISTA PÄIVÄMÄÄRISTÄ TEHDÄÄN ENSIN UUSIA DATEJA, JOISTA JS METODILLA toLocaleDateString VOIDAAN SAADA SUOMALAISEEN FORMAATTIIN
                let tNumber = data[i].trainNumber;
                let tType = data[i].trainType;
                let tCat = data[i].trainCategory;
                let fromStation = data[i].timeTableRows[0].stationShortCode;
                let lahtopvm = data[i].timeTableRows[0].scheduledTime;
                let lahtopaiva = new Date(lahtopvm.substr(0, 10)).toLocaleDateString("fi-FI");
                let lahtoaika = lahtopvm.substr(11,5);

                // LISÄÄ MUUTTUJAT VIELÄ VIIMEISELLE ASEMALLA SILLÄ TARKASTELEMME JUNIA, JOTKA PYSÄHTYVÄT TAMPEREELLA, TAI TAMPERE ON NIIDEN PÄÄTEASEMA
                let viimeinen = data[i].timeTableRows.length - 1;
                let kohdeStation = data[i].timeTableRows[viimeinen].stationShortCode;

                // SELKOKIELISET NIMET ERI JUNATYYPEILLE
                if (tCat === "Commuter"){
                    tType = data[i].commuterLineID;
                    tCat = "Lähijuna"
                } else if(tCat === "Long-distance"){
                    tCat = "Kaukojuna"
                } else if(tCat === "Cargo"){
                    tCat = "Tavarajuna"
                } else if(tCat === "Locomotive"){
                    tCat = "Veturi"
                }

                // MUUTTUJAT TAMPEREELLE SAAPUMISAJASTA -JA PÄIVÄSTÄ
                let pvm = data[i].timeTableRows[j].scheduledTime;
                // MUUTETAAN PÄIVÄ DATE OLIOKSI JA SE PUOLESTAAN SUOMALAISEEN MUOTOON
                let paiva = new Date(pvm.substr(0, 10)).toLocaleDateString("fi-FI");
                let aika = pvm.substr(11,5);

                // TÄSSÄ MUODOSTETAAN VASTAUS TEKSTI MUUTTUJAAN
                teksti.innerHTML += `
                <p> <strong>${tCat} ${tType} (${tNumber})</strong><br/>
                Kohteesta ${fromStation} ${lahtopaiva} kello ${lahtoaika} lähtenyt juna kohteeseen ${kohdeStation}</br>
                <u>saapuu Tampereelle ${paiva} kello ${aika}</u></p>
                `
            }
        }
    }
}