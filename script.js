'use strict';

const $search = $('#search');
const $searchBtn = $('#search-btn');
const $answer = $('#answer');
const $gitSearch = $('#git-search');
const $queryBtn = $('#query-btn');
let query;
let searchType;
let gitQuery;

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
    args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function gSearch() {
  console.log('gSearching for ' + gitQuery);
  let $tr = $('#git-list').children();
  console.log($td); // <--- LEFT OFF HERE
}

function capture(query, type) {
  fetch('https://test.campus.austincodingacademy.com/api/queries/56f368f58085ad1100f2ad77', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data: {query: query, searchType: type.slice(1)}})
  })
  .then(res => res.json())
  .then(json => console.log(json));
}

function getData() {
  fetch('https://test.campus.austincodingacademy.com/api/queries/56f368f58085ad1100f2ad77')
  .then(res => res.json())
  .then(json => {console.log(json)});
  console.log('got data');
}

function handleSearch() {
  let searchType = $('#select option:selected').val();
  capture(query, searchType);
  query += "+" + searchType;
  // CAPTURE QUERY HERE
  let urlQuery = query.split(' ').join('+');
  let ddgQuery = `https://duckduckgo.com/?q=${urlQuery}`;
  window.open(ddgQuery);
}

const debSearch = debounce(() => {
  query = $search.val();
  console.log(query);
  instantAns();
}, 600);


function instantAns() {
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

  $queryBtn.click(() => {
    console.log('queryclick');
    getData();
  });

  $('#git-button').click(() => {
    $('#git-list').children().hide();
  });

  $('#git-search').keyup(e => {
    gitQuery = $('#git-search').val();
    if (e.target.value === "") {
      $('#git-list').children().hide();
      $('.default-git').show();
    }
    gSearch();
  });

  $('#git-button').click(() => {
    gSearch();
  });
});
