'use strict';

const $search = $('#search');
const $searchBtn = $('#search-btn');
const $answer = $('#answer');
const $gitSearch = $('#git-search');
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
    console.log(query);
    fetchTest();
}, 600);

function fetchTest() {
    fetch(`https://api.duckduckgo.com/?q=${query.split(' ').join('+')}&format=json&pretty=1`)
    .then(response => {
        console.log(response);
        return response.text();
    })
    .then(json => {
        console.log(json);
        $answer.text(json);
    })
    .catch(err => console.log("err:", err));
}

// $("#git-list").searcher({
//     itemSelector:  "tr", // jQuery selector for the data item element
//     textSelector:  "td", // jQuery selector for the element which contains the text
//     inputSelector: "#git-search"  // jQuery selector for the input element
// });

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