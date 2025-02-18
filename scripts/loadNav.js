// YKSINKERTAINEN JS KOODI, JOSSA COMPONENTS KANSIOSTA LADATAAN SAMA NAVBAR JOKAISELLE SIVULLE.

function loadNav() {
    // FETCHATAAN KOMPONENTTI
  fetch("components/navbar.html")
    // RESPONSESTA TEXT (SISÄLTÄÄ HTML)
    .then(response => response.text())
    // LAITETAAN DATA (NAVBAR) HTML SIVULLE JOSTA ETSITÄÄN DIV JONKA ID ON "NAVBAR" JA ASETETAAN NAV SINNE
    .then(data => (document.getElementById("navbar").innerHTML = data))
    // CATCH ERROR JA KIRJOITETAAN SIITÄ CONSOLEEN JOS NÄIN SATTUU KÄYMÄÄN
    .catch(error => console.error("Navbar ei lataudu!"));
}

// KUTSU FUNKTIOTA
loadNav();