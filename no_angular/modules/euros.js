/////////////////////////// Parties euros
function printEuros() {
    document.getElementById('eurosEarn').value = localStorage.getItem('euros');
    }
    
    function setEuros() {
    localStorage.setItem('euros',document.getElementById('eurosEarn').value);
    }