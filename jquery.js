let playing = false, score, trialsLeft, step, action;
let fruits = ["apple", "avocado", "banana", "lemon", "mango", "orange", "strawberry"];

$(function() {

  // click on start-reset button
  $("#startreset").click(function() {

    // we are playing
    if(playing == true) {

      // reload page(reset)
      location.reload();

    }  // we are not playing
     else {

      // game initiated
      playing = true;
      
      // set score to 0
      score = 0;
      $("#scorevalue").html(score);

      // show trials left
      $("#trialsleft").show();
      trialsLeft = 3;

      addHearts();
      
      // Hide gane over box
      $("#gameover").hide();

      // change button to reset
      $("#startreset").css("background-image", "url(img/reset.png)");

      // start sending fruits
      startAction();
    }
  });

  // slice a fruit
  $("#fruit1").mouseover(function(){

    score++;

    // update score
    $("#scorevalue").html(score);

    // play sound
    $("#slicesound")[0].play();
    // document.getElementById("slicesound").play();

    // stop fruit
    clearInterval(action);

    $("#fruit1").css({"cursor" : "crosshair"}); 

    // hide fruit
    $("#fruit1").hide("explode"); // slice fruit

    // send new fruit
    setTimeout(startAction, 500);

  });

  // functions

  // fill trailLeft box with hearts
  function addHearts() {

    $("#trialsleft").empty();

    for(i = 0; i < trialsLeft; i++) {
      $("#trialsleft").append('<img src="img/heart.png" class="life">');
    }

  }

  // start sending fruits
  function startAction() {

    // generate a fruit
    $("#fruit1").show();

    // choose a random fruit
    chooseFruit();

    // position fruits randomly
    $("#fruit1").css({'left' : Math.round(950*Math.random()), 'top' : -40});
    
    // generate random step
    step = 1 + Math.round(8 * Math.random());

    // move fruit down by one step every 10 ms
    action = setInterval(() => {

      // move fruit by one step
      $("#fruit1").css('top', $("#fruit1").position().top + step);

      // check if the fruit is too low
      if($("#fruit1").position().top > $("#fruitsContainer").height()) {
       
        // check if we have trials left
        if(trialsLeft > 1) {

          $("#fruit1").show();

          chooseFruit(); // choose a random fruit

          // position fruits randomly
          $("#fruit1").css({'left' : Math.round(1250*Math.random()), 'top' : -40});

          // generate random step
          step = 1 + Math.round(8 * Math.random());

          //reduce trials by 1
          trialsLeft--;

          //  populate trialsLeft box
          addHearts();

        } else {

          // game over
          playing = false;

          $("#startreset").css("background-image", "url(img/start.png)");
          $("#gameover").show();
          $("#gameover").html('<p>Game Over</p><p>Your score is ' + score + '</p>');
          $("#trialsleft").hide();

          stopAction();
        }
      }
    }, 8);
  }

  // generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr({"src" : "img/" + fruits[Math.floor(7 * Math.random())] + ".png"});
  }

  // Stop dropping fruits

  function stopAction() {

    clearInterval(action);

    $("#fruit1").hide();

  }

});