window.onload = function() {
  var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'phaser-lmao');

  var ground = {};
  var lastFloorPos = 288;

  var mainState = {
    //
    // PRELOAD
    //
    preload: function() {

      // PLAYER
      this.game.load.spritesheet('lmao', 'assets/ayylmao.png', 32, 32);

      // FLOOR
      this.game.load.image('floor', 'assets/floor.png', 32, 32);
    },

    //
    // CREATE
    //
    create: function() {
      game.stage.backgroundColor = '#ffffff';

      var sprite = game.add.sprite(64, 256, 'lmao');
      sprite.animations.add('run');
      sprite.animations.play('run', 30, true);

      createGround();

      function createGround() {
        for (var i = 0, w = game.width; i < w; i += 32) {
          ground[i] = game.add.sprite(i, 264, 'floor');
        }
      }
    },

    //
    // UPDATE
    //
    update: function() {
      if (lastFloorPos < 0) {
        lastFloorPos = 288;
      }

      if (~~ (Math.random() * 10) > 3) {
        ground[lastFloorPos].visible = true;
      }
      else {
        ground[lastFloorPos].visible = false;
      }

      lastFloorPos -= 32;
    }
  };

  game.state.add('main', mainState);
  game.state.start('main');
};
