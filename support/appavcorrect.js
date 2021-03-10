'use strict'

var films = [{
        name: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        name: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        name: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        name: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    },
];

// TODO

var nameMovie = document.getElementById('nameMovie');
var dateMovie = document.getElementById('dateMovie');
var realMovie = document.getElementById('realMovie');
var send = document.getElementById('send');

var movieList = document.getElementById('movieList');




// function control(name, date, real) {
//     console.log('hello');
//     if (nameMovie.length < 2) {
//         console.log('le nom du film doit comporter au minimum deux caractère')
//     } else {
//         console.log('ok name');
//     }

//     let yearsControl = new Date().getFullYear();
//     if ((dateMovie <= 1900) && (dateMovie > yearsControl)) {
//         console.log('la date doit etre comprise en 1900 et cette année');
//     } else {
//         console.log('ok date');
//     }

//     if (realMovie.length < 5) {
//         console.log('le nom de l auteur doit comporter au minimum cinq caractère')
//     } else {
//         console.log('ok real');
//     }
// }


//send.addEventListener('click', control(nameMovie, dateMovie, realMovie));


var title = document.getElementById('title');
var date = document.getElementById('date');
var real = document.getElementById('real');
var btnSup = document.getElementById('btnSup');

function affiche(films) {
    for (let i = 0; i < films.length; i++) {
        title.innerHTML += `<hr><li>${films[i].name}</li>`;
        date.innerHTML += `<hr><li>${films[i].years}</li>`;
        real.innerHTML += `<hr><li>${films[i].authors}</li>`;
        btnSup.innerHTML += `<hr><li><button class="btnDelete" value="${i}">Supprimer</button></li>`
    }
}

affiche(films);

// recherche du bouton de suppression cliqué
var btnDeletes = document.querySelectorAll("btndelete");

btnDeletes.foreach(e => {
    e.addEventListener("click",function(){
        return deleteMovie(this.value);
    })
});



function deleteMovie(i){
    if(confirm("confirmez-vous la suppression de ce film?")){
        films.splice(i,1);
        affiche(films);
    }
}

