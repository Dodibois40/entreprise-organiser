console.log('JavaScript externe chargé !');
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('js-result').innerHTML = 
        '<strong>JavaScript externe fonctionne !</strong><br>' +
        'Date: ' + new Date().toLocaleString();
});
