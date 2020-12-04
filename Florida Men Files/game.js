class Game {
    constructor() {}

    getState(){
        var gameStateRef = db.ref("Gamestate");
        gameStateRef.on("value",function(data){
            gameState = data.val();
        });
    }
    updateState(state){
        db.ref("/").update({
            Gamestate : state
        });
    }
    start(){
        if(gameState === 0) {
            player = new Player();
            player.getCount();
            form = new Form();
            form.display();
        }
        car1 = createSprite(displayWidth/2 - 300, displayHeight);
        car1.addImage("car1",car1_png);
        car2 = createSprite(displayWidth/2 - 100, displayHeight);
        car2.addImage("car2",car2_png);
        car3 = createSprite(displayWidth/2 + 100, displayHeight);
        car3.addImage("car3",car3_png);
        car4 = createSprite(displayWidth/2 + 300, displayHeight);
        car4.addImage("car4",car4_png);
        cars = [car1, car2, car3, car4];
        
    }

    end(){
        console.log(gameState + " end");
        var over = createElement("h2");
        over.position(displayWidth/2, -displayHeight * 24 + 1000);
        over.html("Game Over");
    }

    play() {
        console.log(gameState + " play");
        form.greeting.hide();
        Player.getPlayersInfo();

        if(allPlayers !== undefined) {
            background(ground_png);
            image(track_jpg,0, -displayHeight * 24, displayWidth, displayHeight * 25);

            if (keyDown(UP_ARROW)){
                player.distance+=10;
                player.update();
            } 
            if (keyDown(UP_ARROW)&&keyDown(SHIFT)){
               
                player.distance+=25;
                player.update();
            }
            if (player.distance>=21450){
                gameState = 2
            }
            
            var yPos = 200;
            var index = 0;

            for(var plr in allPlayers) {
                yPos = displayHeight - 100 - allPlayers[plr].distance;
                cars[index].y = yPos;
                if(plr === "player" + player.index) {
                    fill("#ffffff");
                    ellipse(cars[index].x, cars[index].y - 100, 80, 80);
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index].y;

                } else {
                    
                }
                index++;
            }
            
        }
        drawSprites();
    }
}





