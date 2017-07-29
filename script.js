'use strict';

const $search = $('#search');
const $searchBtn = $('#search-btn');
const $answer = $('#answer');
let query;
let searchType;

function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function handleSearch() {
    let searchType = $('#select option:selected').val();
    query += "+" + searchType;
    // CAPTURE QUERY HERE
    let urlQuery = query.split(' ').join('+');
    let ddgQuery = `https://duckduckgo.com/?q=${urlQuery}`;
    window.open(ddgQuery);
}

const debSearch = debounce(() => {
    query = $search.val();
    console.log('Debounced');
    fetchTest();
}, 900);

function fetchTest() {
    fetch(`http://api.duckduckgo.com/?q=${query.split(' ').join('+')}&format=json&pretty=1`)
    .then(response => {
        console.log(response);
        return JSON.stringify(response);
    })
    .then(json => {
        console.log(json);
        $answer.text(json);
    })
    .catch(err => console.log(err));
}

$(window).ready(() => {
    $search.keypress(e => {
        query = $search.val();
        searchType = $('#select option:selected').val();
        if (e.keyCode === 13) {
            handleSearch();
        }
        debSearch();
    });
    $searchBtn.click(() => {
        handleSearch();
    });
});