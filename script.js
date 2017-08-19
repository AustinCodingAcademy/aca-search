'use strict';

const $search = $('#search');
const $searchBtn = $('#search-btn');
const $answer = $('#answer');
const $gitSearch = $('#git-search');
const $queryBtn = $('#query-btn');
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

function gSearch() {
  console.log('gSearching...');
  let $gList = $('#git-list').children();
  console.log('$gList: ', $gList);
  $gList.each(fourth => console.log(fourth));
//  let $filterList = $gList.each(tr => {
//    if (TR_TEXT_HERE.indexOf("SEARCH_FOR") > -1) return true;
//  });
}

function capture(query, type) {
  fetch('https://test.campus.austincodingacademy.com/api/queries/56f368f58085ad1100f2ad77', {
    body: JSON.stringify({data: {query: query, searchType: type.slice(1)}}), 
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => { return res.json() })
  .then(json => {console.log(json)});
}

function getData() {
  fetch('https://test.campus.austincodingacademy.com/api/queries/56f368f58085ad1100f2ad77')
  .then(res => { return res.json() })
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
    gSearch();
  });
  gSearch();
});
