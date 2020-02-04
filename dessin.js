const canvas = document.getElementById('gol');
const ctx = canvas.getContext('2d');
var compteur = 0;
var run = false;
var run_button = document.querySelector('#run-button')

var compteur_container = document.querySelector('#compteur')
compteur_container.innerHTML = compteur.toString()

function draw() {
    dataArray.forEach((line, y) => {
        line.forEach((cell, x) => {
            ctx.fillStyle = cell ? "#fff" : "#000";
            ctx.fillRect(x * 10, y * 10, 10, 10);
        })
    })
}
draw()

function newCycle() {
    if (run) {
        compteur++
        compteur_container.innerHTML = compteur.toString()
        dataArray = dataArray.reduce((res, line, y) => {
            return res = [
                ...res,
                line.map((cell, x) => {
                    // prevent to process the edges of our canvas
                    if (x > 0 && y > 0 && x < 99 && y < 99) {
                        let surroundings = [
                            dataArray[y - 1][x - 1], // top-left
                            dataArray[y - 1][x],   // top
                            dataArray[y - 1][x + 1], // top-right
                            dataArray[y][x - 1],   // center-left
                            dataArray[y][x + 1],   // center-right
                            dataArray[y + 1][x - 1], // bottom-left
                            dataArray[y + 1][x],   // bottom
                            dataArray[y + 1][x + 1]  // bottom-right
                        ]
                        surroundings = surroundings.reduce((acc, cur) => acc += cur, 0);
                        if (cell) {
                            // Une cellule vivante possédant deux ou
                            // trois voisines vivantes le reste, sinon elle meurt.
                            if (surroundings === 2 || surroundings === 3) {
                                cell = 1
                            } else {
                                cell = 0
                            }
                        } else {
                            // Une cellule morte possédant exactement
                            // trois voisines vivantes devient vivante (elle naît).
                            if (surroundings === 3) {
                                cell = 1
                            } else {
                                cell = 0
                            }
                        }
                    }
                    return (cell)
                })
            ]
        }, [])
    }
}

function switch_state() {
    run? (run = false) : (run = true)
    if (run){
        run_button.innerHTML = "Mettre le jeu en pause"
    } else {
        run_button.innerHTML = "Cliquez pour lancer le jeu"
    }
}

function newCycle2() {
    if (run === true) {
        console.log('oui')
        compteur++
        compteur_container.innerHTML = compteur.toString()
        var temp_array = dataArray
        for (var i = 0; i < temp_array.length; i++) {
            var temp_array2 = temp_array[i]
            for (var x = 0; x < temp_array2.length; i++) {

            }
        }
    }
}

FRAME_RATE = 100 // fps, permet de chosir le nombre de création de vie par seconde;
const loop = window.setInterval(function(){
    newCycle()
    draw()
}, 1000/FRAME_RATE)
