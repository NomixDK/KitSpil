//PAGE LOAD
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")
canvas.width = 1000;
canvas.height = 800;
console.log(canvas);
c.font = "20px Arial";
c.fillStyle = "white";

const image1 = document.getElementById('source1');
const image2 = document.getElementById('source2');
const image3 = document.getElementById('source3');

let currentScore1 = 0;
let currentScore2 = 0;

function PageLoad() {
    if (localStorage.getItem("tempcurrentScore1Saved") != 0) {
        currentScore1 = parseInt(localStorage.getItem("tempcurrentScore1Saved"));
    }
    if (localStorage.getItem("tempcurrentScore2Saved") != 0) {
        currentScore2 = parseInt(localStorage.getItem("tempcurrentScore2Saved"));
    }

}

function SaveScore() {
    localStorage.setItem("tempcurrentScore1Saved", currentScore1);
    localStorage.setItem("tempcurrentScore2Saved", currentScore2);
}

class Player {
    constructor(playerimage, x, y, hitbox, player_id, player_className, player_health, player_moveSpeed, player_Right, player_Left, player_Up,player_Down, player_turn) {
        this.playerimage = playerimage;
        this.x = x;
        this.y = y;
        this.hitbox = hitbox;
        this.player_id = player_id;
        this.player_className = player_className;
        this.player_health = player_health;
        this.player_moveSpeed = player_moveSpeed;
        this.player_Left = player_Left;
        this.player_Right = player_Right;
        this.player_Up = player_Up;
        this.player_Down = player_Down;
        this.player_turn = player_turn;
    }
    //HOOK TIL HTML
    draw() {
        c.drawImage(this.playerimage,this.x, this.y, this.hitbox, this.hitbox)

    }

}

class rock {
    constructor(x,y,hitbox,damage, bounce, velocity) {
        this.x = x;
        this.y = y;
        this.hitbox = hitbox;
        this.damage = damage;
        this.bounce = bounce;
        this.velocity = velocity;
    }

    draw() {
        c.drawImage(image3, this.x, this.y, this.hitbox, this.hitbox)
    }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

}
//DEFINE OBJECTS
let _player1 = new Player(image1, 100, canvas.height / 2, 100, "player1", "player", 100, 20, "a", "d", "w", "s", 1, 0, 0);
let _player2 = new Player(image2, 800, canvas.height / 2, 100, "player2", "player", 100, 20, "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", 1, 0, 0);



function SwitchTurns() {
    if (_player1.player_turn != 1) {
        _player1.player_turn = 1;
        _player2.player_turn = 0;
        document.getElementById("turnText").innerHTML = `${currentScore1} Player one's turn ${currentScore2}`;
    } else {
        _player1.player_turn = 0;
        _player2.player_turn = 1;
        document.getElementById("turnText").innerHTML = `${currentScore1} Player two's turn ${currentScore2}`;
    }

    console.log("Player 1 tur: " + _player1.player_turn);
    console.log("Player 2 tur: " + _player2.player_turn);
}
SwitchTurns()

//Game loop
var myInterval = setInterval(function () {
    console.log("looping")
    c.clearRect(0, 0, canvas.width, canvas.height)

    //1
    _player1.draw();
    c.fillText("HP:" + _player1.player_health, _player1.x + 20, _player1.y - 20)
    if (_player1.player_health == 0) {
        window.alert("PLAYER 2 WON")
        _player1.player_health = null;
        currentScore1 += 1;
        location.reload();
    }

    //2
    _player2.draw();
    c.fillText("HP:" + _player2.player_health, _player2.x + 20, _player2.y - 20)
    if (_player2.player_health == 0) {
        window.alert("PLAYER 1 WON")
        _player2.player_health = null;
        currentScore2 += 1;
        location.reload();
    }

}, 1000/60);

window.addEventListener("keydown", function (e) {
    
}, false);

//MOVE
window.addEventListener('keydown', (e) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    switch (e.key) {
        case _player1.player_Left:
            console.log("moving");
            _player1.x += _player1.player_moveSpeed;
            _player1.draw();
            break;

        case _player1.player_Right:
            console.log("moving");
            _player1.x -= _player1.player_moveSpeed;
            _player1.draw();
            break;
        case _player1.player_Down:
            console.log("moving");
            _player1.y += _player1.player_moveSpeed;
            _player1.draw();
            break;

        case _player1.player_Up:
            console.log("moving");
            _player1.y -= _player1.player_moveSpeed;
            _player1.draw();
            break;

        //P2
        case _player2.player_Left:
            console.log("moving");
            _player2.x += _player2.player_moveSpeed;
            _player2.draw();
            break;

        case _player2.player_Right:
            console.log("moving");
            _player2.x -= _player2.player_moveSpeed;
            _player2.draw();
            break;

        case _player2.player_Down:
            console.log("moving");
            _player2.y += _player2.player_moveSpeed;
            _player2.draw();
            break;

        case _player2.player_Up:
            console.log("moving");
            _player2.y -= _player2.player_moveSpeed;
            _player2.draw();
            break;
    }
})


const projectiles = [];
const projectiles2 = [];

addEventListener('click', (event) => {
    
    if (_player2.player_turn === 1) {
        const angle = Math.atan2(
            event.clientY - _player2.y,
            event.clientX - _player2.x)

        const velocity = {
            x: Math.cos(angle) *10,
            y: Math.sin(angle) *10
        }

        projectiles.push(
            new rock(_player2.x,
                _player2.y,
                30,
                10,
                3,
                velocity)
        )
        
    }
    if (_player1.player_turn === 1) {
        const angle2 = Math.atan2(
            event.clientY - _player1.y,
            event.clientX - _player1.x)

        const velocity2 = {
            x: Math.cos(angle2) * 10,
            y: Math.sin(angle2) * 10
        }

        projectiles2.push(
            new rock(_player1.x,
                _player1.y,
                30,
                10,
                3,
                velocity2)
        )

    }
    SwitchTurns();
})

function animate() {
    requestAnimationFrame(animate)
    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update();
        projectile.draw();
        let dx1 = (_player1.x + _player1.hitbox) - (projectile.x + projectile.hitbox)
        let dy1 = (_player1.y + _player1.hitbox) - (projectile.y + projectile.hitbox)
        let distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);


        //a
        if (
            projectile.x + projectile.hitbox > canvas.width ||
            projectile.x - projectile.hitbox < 0 && projectile.bounce > 0
        ) {
            projectile.velocity.x *= -1;
            projectile.bounce -= 1;
        } if (
            projectile.bounce == 0
        ) {
            projectiles.splice(projectileIndex, 1)
        }


        if (
            projectile.y + projectile.hitbox > canvas.height ||
            projectile.y - projectile.hitbox < 0 && projectile.bounce > 0
        ) {
            projectile.velocity.y *= -1;
            projectile.bounce -= 1;
        } if (
            projectile.bounce == 0
        ) {
            projectiles.splice(projectileIndex, 1)
        }

        if (distance1 < _player1.hitbox + projectile.hitbox) {
            projectiles.splice(projectileIndex, 1)
            console.log("HIT");
            if (_player1.player_health > 0) {
                _player1.player_health -= projectile.damage;
            } else {    
                _player1.player_health = 0;
            }

        }    

    })

    //b
    projectiles2.forEach((projectile2, projectile2Index) => {
        projectile2.update();
        projectile2.draw();

        let dx2 = (_player2.x + _player2.hitbox) - (projectile2.x + projectile2.hitbox)
        let dy2 = (_player2.y + _player2.hitbox) - (projectile2.y + projectile2.hitbox)
        let distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (
            projectile2.x + projectile2.hitbox > canvas.width ||
            projectile2.x - projectile2.hitbox < 0
        ) {
            projectile2.velocity.x *= -1;
            projectile2.bounce -= 1;
        } if (
            projectile2.bounce == 0
        ) {
            projectiles2.splice(projectile2Index, 1)
        }

        if (
            projectile2.y + projectile2.hitbox > canvas.height ||
            projectile2.y - projectile2.hitbox < 0
        ) {
            projectile2.velocity.y *= -1;
            projectile2.bounce -= 1;
        } if (
            projectile2.bounce == 0
        ) {
            projectiles2.splice(projectile2Index, 1)
        }


        if (distance2 < _player2.hitbox + projectile2.hitbox) {
            console.log("HIT");
            projectiles2.splice(projectile2Index, 1)
            if (_player2.player_health > 0) {
                _player2.player_health -= projectile2.damage;
            } else {
                _player2.player_health = 0;
            }

        }

    })
}
animate()
