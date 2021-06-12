import storage from './storage';
console.log("storage");
/////////////////////////// Parties tableau      
function renderTable(clean) {

    let trackTable = "";
    let objArray = getTrackList();
    const original = objArray[0]; 
    
    if(objArray) {
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
    }
    
    const firstVal = objArray[0];
    const lastVal = objArray[objArray.length -1];
    const totalLast = ((+lastVal.bitcoin.valeur) + (+lastVal.cardano.valeur) + (+lastVal.ethereum.valeur));
    const totalFirst = ((+firstVal.bitcoin.valeur) + (+firstVal.cardano.valeur) + (+firstVal.ethereum.valeur));
    
    document.getElementById('totalStart').innerHTML +=`${totalFirst}`;
    document.getElementById('totalCurrent').innerHTML +=`${totalLast}`;
    document.getElementById('totalPercent').innerHTML += `${calculPercent(totalFirst,totalLast,null)}`;
    
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