import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';



// Preload scenes
let menuScene = new MenuScene();
let gameScene = new GameScene();


// Scene

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

let game = new Phaser.Game(config);


// Load Scenes
game.scene.add('MenuScene', menuScene);
game.scene.add('GameScene', gameScene);

// Start Menu
game.scene.start('MenuScene');


