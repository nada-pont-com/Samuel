import MainMenu from './mainmenu.js';
import MenuFases from './menufases.js';
import fase1 from './fase1.js';
import fase2 from './fase2.js';
import fase3 from './fase3.js';
import menuFase from './men.js';
// import fase4 from './fase4.js';
// import fase5 from './fase5.js';
// import fase6 from './fase6.js';

var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 288,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ MainMenu, fase1 , fase2 , fase3 ,menuFase ,MenuFases]
  };

var game = new Phaser.Game(config);
