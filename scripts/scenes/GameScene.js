export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

init (){
    this.player;
    this.souls;
    this.enemy;
    this.platforms;
    this.cursors;
    this.score = 0;
    this.gameOver = false;
    this.scoreText;
    this.Resize;

}

preload (){
    this.load.image('background', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('soul', 'assets/images/soul.png');
    this.load.image('keeper', 'assets/images/keeper.png');
    this.load.image('base', 'assets/images/base.png');
    this.load.spritesheet('man', 'assets/images/man.png', { frameWidth: 32, frameHeight: 48 });
    this.load.audio('bgm', 'assets/images/distressed.mp3')
}

create (){
    
     //  The game's background
     this.add.image(400, 300, 'background');

     //  The platforms that allows the player to move
     this.platforms = this.physics.add.staticGroup();
 
     // In here the base and the platforms are scaled to fit into the game.
     this.platforms.create(400,600, 'base').setScale(2).refreshBody();
     this.platforms.create(600, 450, 'ground');
     this.platforms.create(200, 250, 'ground');
     this.platforms.create(650, 220, 'ground');
     this.platforms.create(300, 400, 'ground');
     this.music=this.sound.add('bgm');
 
    this.music.play();


 
     // The player's settings and physics property for bouncing
     this.player = this.physics.add.sprite(100, 450, 'man');
     this.player.setBounce(0.2);
     this.player.setCollideWorldBounds(true);
 
     // The player's walking and jumping animation.
     this.anims.create({
         key: 'left',
         frames: this.anims.generateFrameNumbers('man', { start: 0, end: 3 }),
         frameRate: 10,
         repeat: -1
     });
 
     this.anims.create({
         key: 'turn',
         frames: [ { key: 'man', frame: 4 } ],
         frameRate: 20
     });
 
     this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers('man', { start: 5, end: 8 }),
         frameRate: 10,
         repeat: -1
     });
 
     //   input events
     this.cursors = this.input.keyboard.createCursorKeys();
 
     
     this.souls = this.physics.add.group({
         key: 'soul',
         repeat: 11,
         setXY: { x: 12, y: 0, stepX: 70 }
     });
 
     this.souls.children.iterate(function (child) {
 
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
 
     });
 
     this.enemy = this.physics.add.group();
 
     //  The score
     this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

     //  Collision code 
     this.physics.add.collider(this.player, this.platforms);
     this.physics.add.collider(this.souls, this.platforms);
     this.physics.add.collider(this.enemy, this.platforms);
 
     
     this.physics.add.overlap(this.player, this.souls, this.collectSoul, null, this);
 
     this.physics.add.collider(this.player, this.enemy, this.hitEnemy, null, this);
     
    }

update ()
{
    

    if (this.gameOver)
    {
        return;
    }

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);   
    }


    /// Shift key to sprint

    this.Shift;

    this.Shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

if (this.Shift.isDown){
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-550);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(550);

            this. player.anims.play('right', true);
        }
    }

    else if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
}

collectSoul (player, soul)
{
    soul.disableBody(true, true);

    ///resize the spirtes body when souls collide with the sprite
    this.Resize += 1
    if (this.Resize == 1){
        this.player.setScale(1.1);
    }
    else if (this.Resize == 2){
        this.player.setScale(1.2);
    }
    else if (this.Resize == 3){
        this.player.setScale(1.3);
    }
    else if (this.Resize == 4){
        this.player.setScale(1.4);
    }
    else {
        this.player.setScale(1);
        this.Resize = 0
    }

    
    //  Add and update the score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.souls.countActive(true) === 0)
    {
        //  A new batch of souls to collect
        this.souls.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        this.x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        this.keeper = this.enemy.create(x, 16, 'keeper');
        this.keeper.setBounce(1);
        this.keeper.setCollideWorldBounds(true);
        this.keeper.setVelocity(Phaser.Math.Between(-200, 200), 20);
        this.keeper.allowGravity = false;

    }
}

hitEnemy (player, keeper)
{
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play('turn');

    this.gameOver = true;
    
}


}