const labirinto = document.getElementById('labirinto');
const msgV = document.getElementById('mensagemVitoria');
const msgA = document.getElementById('mensagemAlerta');
const button = document.getElementById('button');
const ok = document.getElementById('ok');
const imgPlayer = document.getElementById('player');

const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W W W W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

let linha = 9;
let coluna = 0;

// ------ Gerar labirinto do jogo ------

for (let i = 0; i < map.length; i++) {

    let row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < map[i].length; j++) {

        let brick = map[i][j];
        let div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.rowNumber = i;
        div.dataset.columnNumber = j;

        if (brick === 'W') {
            div.classList.add('wall');

        } else if (brick === 'S') {
            div.classList.add('start');

        } else if (brick === 'F') {
            div.classList.add('finish');

        } else {
            div.classList.add('space');
        }
        row.appendChild(div);
    }
    labirinto.appendChild(row);
}

//-------- Posicionar player ----------

function colocarPlayer() {
    let playerPosition = document.querySelector("[data-row-number='" + linha + "'][data-column-number='" + coluna + "']");
    playerPosition.appendChild(player);
}
colocarPlayer()

//------- Movimentação do player --------

const movePlayer = (key) => {

    if (key === 'ArrowDown') {

        press += 1;

        if (press % 2 == 0) {
            imgPlayer.style.backgroundImage = "url('img/wmn3_dn1.gif')";

        } else {
            imgPlayer.style.backgroundImage = "url('img/wmn3_dn2.gif')";
        }
        linha++;

    } else if (key === 'ArrowUp') {

        press += 1;

        if (press % 2 == 0) {
            imgPlayer.style.backgroundImage = "url('img/wmn3_up1.gif')";

        } else {
            imgPlayer.style.backgroundImage = "url('img/wmn3_up2.gif')";
        }
        linha--;

    } else if (key === 'ArrowRight') {

        press += 1

        if (press % 2 == 0) {
            imgPlayer.style.backgroundImage = "url('img/wmn3_rt1.gif')";

        } else {
            imgPlayer.style.backgroundImage = "url('img/wmn3_rt2.gif')";
        }
        coluna++;

    } else if (key === 'ArrowLeft') {


        press += 1

        if (press % 2 == 0) {
            imgPlayer.style.backgroundImage = "url('img/wmn3_lf1.gif')";

        } else {
            imgPlayer.style.backgroundImage = "url('img/wmn3_lf2.gif')";
        }
        coluna--;
        if (coluna < 0) {
            document.removeEventListener('keydown', moveFunction);
            msgA.style.display = 'block'
        }
    }
}

const correction = (key) => {

    if (key === 'ArrowDown') {
        linha--;

    } else if (key === 'ArrowUp') {
        linha++;

    } else if (key === 'ArrowRight') {
        coluna--;

    } else if (key === 'ArrowLeft') {
        coluna++;
    }
}

let press = 1;

document.addEventListener('keydown', moveFunction = (event) => {

    let keyName = event.key;
    movePlayer(keyName);

    playerPosition = document.querySelector("[data-row-number='" + linha + "'][data-column-number='" + coluna + "']");

    if (playerPosition.classList.contains('start')) {
        movePlayer(keyName);

    } else if (playerPosition.classList.contains('wall')) {
        correction(keyName);

    } else {
        playerPosition.appendChild(player);
    }

    if (playerPosition.classList.contains('finish')) {

        msgV.style.display = 'block'; //mensagem de vitória
        let audio = new Audio('sound/you-win.mp3');
        audio.play();
        document.removeEventListener('keydown', moveFunction);
    }
});

//------- Reiniciar o jogo

button.addEventListener('click', () => {

    linha = 9;
    coluna = 0;
    playerPosition = document.querySelector("[data-row-number='" + linha + "'][data-column-number='" + coluna + "']");
    playerPosition.appendChild(player);
    msgV.style.display = 'none';
    document.addEventListener('keydown', moveFunction);
})

ok.addEventListener('click', () => {
    coluna++
    colocarPlayer()
    imgPlayer.style.backgroundImage = "url('img/wmn3_rt2.gif')";
    msgA.style.display = 'none'
    document.addEventListener('keydown', moveFunction);
})