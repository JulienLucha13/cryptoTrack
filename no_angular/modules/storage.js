export class storage {


constructor(){}

/////////////////////////// Parties localstorage
     async register(){
    let tab = getTrackList();
    let response = await fetch("http://localhost:3000/", {
     method: 'POST',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify(tab)
    });
    console.log(`Retour du serveur : ${JSON.parse(response)}`);
    }
    
     setTrackList(obj) {
    let listSave = getTrackList();
    listSave.push(obj);
    localStorage.setItem("trackList",JSON.stringify(listSave));
    }
    
     getTrackList() {
    let tab = JSON.parse(localStorage.getItem("trackList"));
    return tab ?? [];
    }
}