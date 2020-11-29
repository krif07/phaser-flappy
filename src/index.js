const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                //y: 400
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const pipeVerticalDistanceRange = [100, 200];
//const pipeVerticalPositionRange = [30, config.height - 30 - pipeVerticalDistance];
const flapVelocity = 180;
const initialBirdPosition = {x: config.width * 0.1, y: config.height / 2};

let bird = null;
let upperPipe = null;
let lowerPipe = null;
let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
let pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);

// Loading assets, such as images, music, animations ...
function preload(){
    // this context - scene
    // contains functions and properties
    this.load.image('sky', './assets/sky.png');
    this.load.image('bird', './assets/bird.png');
    this.load.image('pipe', './assets/pipe.png');
}

function create(){
    //this.add.image(config.width/2, config.height/2, 'sky');
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
    bird.body.gravity.y = 400;
    upperPipe = this.physics.add.sprite(500, pipeVerticalPosition, 'pipe').setOrigin(0, 1 );
    lowerPipe = this.physics.add.sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0);
    console.log(bird.body);

    this.input.on('pointerdown',flap);

    //this.input.keyboard.on('keydown_SPACE', flap);
    let space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    space.on('down', flap);
}

function update(time, delta) {
    if(bird.y > config.height || bird.y < -bird.height){
        restartPlayerPosition();
    }
}

function restartPlayerPosition(){
    bird.x = initialBirdPosition.x;
    bird.y = initialBirdPosition.y;
    bird.body.velocity.y = 0;
}

function flap(){
    bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);
