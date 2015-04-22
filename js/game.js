window.onload = function() {
  var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'phaser-lmao');

  var squareSprite;

  var ground = {};
  var groundMaterial = {};
  var lastFloorPos = 288;

  var mainState = {
    //         //
    // PRELOAD //
    //         //
    preload: function() {

      // PLAYER
      this.game.load.spritesheet('lmao', 'assets/ayylmao.png', 32, 32);

      // FLOOR
      this.game.load.image('floor', 'assets/floor.png');
    },

    //        //
    // CREATE //
    //        //
    create: function() {
      game.stage.backgroundColor = '#ffffff';

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.y = 150;

      // Animate square sprite
      squareSprite = game.add.sprite(64, 256, 'lmao');
      squareSprite.animations.add('run');
      squareSprite.animations.play('run', 30, true);

      // Enabling physics creates a default rectangular body
      game.physics.enable(squareSprite, Phaser.Physics.ARCADE);
      squareSprite.body.collideWorldBounds = true;
      squareSprite.body.bounce.x = 0.5;
      squareSprite.body.bounce.y = 1.1;

      // game.input.addPointer();

      createGround();

      //
      // Create ground that the square sprite will sit upon
      //
      function createGround() {
        for (var i = 0, w = game.width; i < w; i += 32) {
          ground[i] = game.add.sprite(i, 296, 'floor');
          game.physics.enable(ground[i], Phaser.Physics.ARCADE);
          ground[i].body.allowGravity = false;
          ground[i].body.immovable = true;
          //groundMaterial[i] = game.physics.p2.createMaterial('groundMaterial', ground[i].body);
        }
      }

      //var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', squareSprite.body);
      //var worldMaterial = game.physics.p2.createMaterial('worldMaterial');

      //game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    },

    //        //
    // UPDATE //
    //        //
    update: function() {
      if (lastFloorPos < 0) {
        lastFloorPos = 288;
      }

      //
      // Ground tile only visible 70% of the time
      //
      if (~~ (Math.random() * 10) > 3) {
        ground[lastFloorPos].visible = true;
        ground[lastFloorPos].immovable = true;
      }
      else {
        ground[lastFloorPos].visible = false;
        ground[lastFloorPos].immovable = false;
      }

      game.physics.arcade.collide(squareSprite, ground[64], null, null, this);
      lastFloorPos -= 32;
    },

    //
    // RENDER
    //
    render: function() {
      //game.debug.pointer(game.input.pointer1);
    }
  };

  game.state.add('main', mainState);
  game.state.start('main');
};
