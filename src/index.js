const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 400
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

let bird = null;
let flapVelocity = 180;
const VELOCITY = 200;
// Loading assets, such as images, music, animations ...
function preload(){
    // this context - scene
    // contains functions and properties
    this.load.image('sky', './assets/sky.png');
    this.load.image('bird', './assets/bird.png');
}

function create(){
    //this.add.image(config.width/2, config.height/2, 'sky');
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    bird = this.physics.add.sprite(config.width/10, config.height/2, 'bird').setOrigin(0);
    console.log(bird.body);

    this.input.on('pointerdown',flap);

    //this.input.keyboard.on('keydown_SPACE', flap);
    let space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    space.on('down', flap);
}

function update(time, delta) {

}

function flap(){
    bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);
