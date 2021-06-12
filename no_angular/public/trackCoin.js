// import table from './modules/table';

// const { response } = require("express");

// const { response } = require("express");

// renderTable();
// printEuros();

// function addTable() {
//     table.addTable();
// }

renderTable();
printEuros();

/////////////////////////// Parties tableau      
async function renderTable(clean) {

let trackTable = "";
let objArray = await getTrackList();
const original = objArray[0]; 
debugger;
if(objArray && objArray.length>0) {
      objArray.forEach((e,index) => {

          const previous = objArray[index-1] ?? e;
          
          trackTable += `<tr> 
          <td>${e.date}</td>
          <td class="${classTraded(e.bitcoin.traded)}">${e.bitcoin.valeur}€   ${calculPercent(previous.bitcoin.valeur,e.bitcoin.valeur,original.bitcoin.valeur)}</td>
          <td class="${classTraded(e.cardano.traded)}">${e.cardano.valeur}€   ${calculPercent(previous.cardano.valeur,e.cardano.valeur,original.cardano.valeur)}</td>
          <td class="${classTraded(e.ethereum.traded)}">${e.ethereum.valeur}€  ${calculPercent(previous.ethereum.valeur,e.ethereum.valeur,original.ethereum.valeur)}</td>
          </tr>`
      });

      if(trackTable) {
          if(clean)  {
              document.getElementById("appendTab").lastChild.innerHTML = trackTable;
              return;
          }
        document.getElementById("appendTab").innerHTML += trackTable;
      }


    const firstVal = objArray[0];
    const lastVal = objArray[objArray.length -1];
    const totalLast = ((+lastVal.bitcoin.valeur) + (+lastVal.cardano.valeur) + (+lastVal.ethereum.valeur));
    const totalFirst = ((+firstVal.bitcoin.valeur) + (+firstVal.cardano.valeur) + (+firstVal.ethereum.valeur));

    document.getElementById('totalStart').innerHTML +=`${totalFirst}`;
    document.getElementById('totalCurrent').innerHTML +=`${totalLast}`;
    document.getElementById('totalPercent').innerHTML += `${calculPercent(totalFirst,totalLast,null)}`;
  }
}

function addTable() {
let bitcoin = {valeur: document.getElementById("addBitcoin").value,
              traded:  document.getElementById("checkBitcoin").checked};

let cardano = {valeur: document.getElementById("addCardano").value,
              traded:  document.getElementById("checkCardano").checked};

let ethereum = {valeur: document.getElementById("addEthereum").value,
              traded:  document.getElementById("checkEthereum").checked};

let date = new Date().toJSON().slice(0,10).split('-').reverse().join('/');

if(bitcoin && cardano && ethereum) {
  this.setTrackList({
      date,
      bitcoin,
      cardano,
      ethereum
  });
  renderTable(true);
} else {
  alert("Remplir tous les champs");
}

}

function calculPercent(previous,next, original) {

const globalPercent = Math.round(((+next)-(+previous))/previous*100);
const originalPercent = original? Math.round(((+next)-(+original))/original*100): null;

console.table([previous,next,original,globalPercent,originalPercent]);

return `${makeCssForPercent(globalPercent)}  ${makeCssForPercent(originalPercent)}`;

}

function makeCssForPercent (percent) {

if(percent === null) {
  return '';
}

if(percent>0) {
  return `<span class="percentGreen percent">+${percent}%</span>`;
}
if(percent<0){
  return `<span class="percentRed percent">${percent}%</span>`;
}
if(percent === 0) {
  return `<span class="percent">${percent}%</span>`;
}

}

function classTraded(traded) {
if(traded) {
  return 'traded';
}
return '';
}



/////////////////////////// Parties euros
function printEuros() {
document.getElementById('eurosEarn').value = localStorage.getItem('euros');
}

function setEuros() {
localStorage.setItem('euros',document.getElementById('eurosEarn').value);
}

/////////////////////////// Parties localstorage
async function register() {
let tab = getTrackList();
let response = await fetch("http://localhost:3000/api/saveState", {
 method: 'POST',
 headers: {'Content-Type':'application/json'},
 body: JSON.stringify(tab)
});
console.log(`Retour du serveur : ${JSON.stringify(response)}`);
}

function setTrackList(obj) {
let listSave = getTrackList();
listSave.push(obj);
localStorage.setItem("trackList",JSON.stringify(listSave));
}

async function getTrackList() {
let tab = JSON.parse(localStorage.getItem("trackList"));

if(!tab) {
   response = await fetch("http://localhost:3000/api/getState",
  {method:'GET',
  headers: {'Content-Type':'application/json'}});
    if(response.ok) {
      tab = await response.json();
      tab = tab.responseJson;
    }
}
console.log(tab);
return tab ?? [];
}






