kayttaja->selain:
note left of selain
kayttaja lisää muistiinpanon ja klikkaa talleta-nappia
fullstack-exampleapp.herokuapp.com/notes
end note

selain->palvelin: POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
palvelin->selain: status 201, created

note left of palvelin
  Palvelimella tallentuneena uudella viestillä lisätyt tiedot
end note

note left of selain
 selain näyttää palvelimen palauttaman HTML:n
 johon on muistiinpanot listattu
end note

