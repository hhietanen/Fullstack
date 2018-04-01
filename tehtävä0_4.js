kayttaja->selain:
note left of selain
kayttaja lisää muistiinpanon ja klikkaa talleta-nappia
fullstack-exampleapp.herokuapp.com/notes
end note

selain->palvelin: POST fullstack-exampleapp.herokuapp.com/notes
palvelin->selain: status 302, redirect /notes

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/notes

palvelin->selain: status 200, sivun HTML-koodi

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/main.css
palvelin->selain: status 200, css


selain->palvelin: GET fullstack-exampleapp.herokuapp.com/main.js
palvelin->selain: status 200, js

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/data.json
palvelin->selain: status 200, json

note left of palvelin
  muodostetaan HTML missä olemassaolevien
  muistiinpanojen sisältö päivitettynä uudella muistiinpanolla
end note

note left of selain
 selain näyttää palvelimen palauttaman HTML:n
 johon on muistiinpanot listattu
end note

