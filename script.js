'use strict';

function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

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
    const debTest = debounce(() => {
        console.log("DEBOUNCE TEST");
    }, 1000);
    $search.keypress(e => {
        if (e.keyCode === 13) {
            handleSearch()
        }
        debounce(debTest(), 2000);
    });
});