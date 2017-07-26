'use strict';
window.onload = () => {
    document.querySelector('#search-bar').addEventListener("Keydown", e => {
        if e.keyCode === 13 {console.log('Tastycakes')}
    })
}