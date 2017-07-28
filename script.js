const DDG = require('node-ddg-api');
const ddg = new DDG('aca-search');

console.log(ddg);

$(window).ready(() => {
    const $search = $('#search');
    const handleSearch = () => {
        let searchType = $('#select option:selected').val();
        let query = $search.val();
        query += "+" + searchType;
        // CAPTURE QUERY HERE
        let urlQuery = query.split(' ').join('+');
        let ddgQuery = `https://duckduckgo.com/?q=${urlQuery}`;
        window.open(ddgQuery);
    }
    $search.keypress(e => {
        if (e.keyCode === 13) {handleSearch()}         
    });
});