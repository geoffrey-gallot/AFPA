'use strict'
//* tableau d'objets
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

//* animation anime.js
let contactAnime = anime ({
    targets: '.contact',
    translateY: 250,
    direction: 'reverse',
    opacity: 0,
    easing: 'linear',
    duration: 1000
})
let reseauAnime = anime ({
    targets: '.reseau',
    translateY: 250,
    direction: 'reverse',
    opacity: 0,
    easing: 'linear',
    duration: 1000,
})
let phenix = anime ({
    targets: '#phenix',
    scale: 2,
    direction: 'reverse',
    opacity: 0,
    easing: 'linear',
    duration: 500
})
let containerAnime = anime ({
    targets: '.container',
    translateX: -500,
    direction: 'reverse',
    opacity: 0,
    easing: 'linear',
    duration: 500
})

let cacheAnime = anime ({
    targets: '#cache',
    scale: 3,
    direction: 'reverse',
    opacity: 0,
    easing: 'linear',
    duration: 1500,
})




//* TODO

var nameMovie = document.getElementById('nameMovie');
var dateMovie = document.getElementById('dateMovie');
var realMovie = document.getElementById('realMovie');
var add = document.getElementById('add');
var send = document.getElementById('send');
var cache = document.getElementById('cache');
var info = document.getElementById('info');
var film = "";

//* premiere lettre systematiquement en majuscule
function majFirst(a) {
    return (a+'').charAt(0).toUpperCase() + a.substr(1);
}


//* ajout film

cache.addEventListener('click', (e) => {
    e.preventDefault();
    let addAnime = anime ({
        targets: '#add',
        scale: 3,
        direction: 'reverse',
        opacity: 0,
        easing: 'linear',
        duration: 1000,
    })
    add.setAttribute('class',"vue");
    
    send.addEventListener('click', (e) => {
        e.preventDefault();
        
        let movieInput = majFirst(nameMovie.value);
        let yearsInput = parseInt(dateMovie.value);
        let realInput = majFirst(realMovie.value);
        let yearsControl = new Date().getFullYear();
        film = {
            name: movieInput,
            years: yearsInput,
            authors: realInput
        };

        //* controle et saisi des inputs
        if ((movieInput.length >= 2) &&
            ((yearsInput >= 1900) && (yearsInput <= yearsControl)) &&
            (realInput.length >= 5)) {
            //* validation des données et enregistrement dans le tableau
            films.push(film);
            info.setAttribute('class', "green");

            //* remise a zero des inputs
            nameMovie.value = '';
            dateMovie.value = '';
            realMovie.value = '';

            info.innerHTML = "Film ajouter avec succès";
            setInterval(() => {
                info.setAttribute('class', "");
                info.innerHTML = ""
            }, 3000);
            add.setAttribute('class',"pasvue");
        } else {
            //! invalidation des données
            info.classList('red');
            //info.setAttribute('class', "red");
            let info1 = document.getElementById('info1');
            let info2 = document.getElementById('info2');
            let info3 = document.getElementById('info3');
            // creation d'une list element de refu par element de refu 

            if (movieInput.length < 2) {
                info1.innerHTML = "Titre de film non valide";
            }
            if ((yearsInput < 1900) && (yearsInput > yearsControl) && (yearsInput = " ")) {
                info2.innerHTML = "Date de film non valide";
            }
            if (realInput.length < 5) {
                info3.innerHTML = "Auteur du film non valide";
            }

            setInterval(() => {
                info.setAttribute('class', "");
                info.innerHTML = ""
            }, 3000);
        }
        return affiche(films);
    });
});

//* tri du tableau films

var movieFilters = document.getElementById('movieFilters');
var triFilm = document.getElementById('triFilm');
var triDate = document.getElementById('triDate');

movieFilters.addEventListener('change', (e) => {
    e.preventDefault();
    let index = movieFilters.selectedIndex;
    console.log(index);
    if (index == 2) {
        affiche(films.sort((a, b) => { return b.years - a.years }));
    }else if (index == 1) {
        function compareName(a, b) {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        }
        affiche(films.sort(compareName));
    }
});


//*affichage du tableau
var movieList = document.getElementById('movieList');
var title = document.getElementById('title');
var date = document.getElementById('date');
var real = document.getElementById('real');
var btnSup = document.getElementById('btnSup');

function affiche(films) {
    title.innerHTML = "";
    date.innerHTML = "";
    real.innerHTML = "";
    btnSup.innerHTML = "";
    //creation d element listpour faciliter la manipulation d element
    title.innerHTML += `<li>Titre</li>`;
    date.innerHTML += `<li>Année</li>`;
    real.innerHTML += `<li>Auteur</li>`;
    btnSup.innerHTML +=`<li class="vide"></li>`;

// attention boucle foreach ertreur d indice  fourni l objet et non l indice
    films.forEach((film,indice) => {
        title.innerHTML += `<hr><li>${film.name}</li>`;
        date.innerHTML += `<hr><li>${film.years}</li>`;
        real.innerHTML += `<hr><li>${film.authors}</li>`;
        btnSup.innerHTML += `<hr><li><button class="delete" value="${indice}">Supprimer <i class="fas fa-trash"></i></button></li>`;
    });

    //* recherche du bouton de suppression cliqué
    document.querySelectorAll("button.delete").forEach(btn => {
        btn.addEventListener("click", function () {
            return deleteMovie(this.value);
        });
    });

    //*supprime le film
    function deleteMovie(i) {
        if (confirm("confirmez-vous la suppression de ce film?")) {
            films.splice(i, 1);
            affiche(films);
        }
    }
}

affiche(films);