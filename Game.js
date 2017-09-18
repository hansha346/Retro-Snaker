/**
 * Created by hansh on 2017/9/16.
 */
(function(){
    //3.构造一个游戏对象;(只对外提供一个方法，游戏开始)
    //a. 游戏开始;
    //b. 利用定时器移动蛇(小蛇快跑);(最好不对外)
    //c. 按键改变方向;(最好不对外)

    function Game(map){
        //蛇和食物游戏可以自己创建;但是地图应该被传递过来;
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    }

    Game.prototype.start = function () {
        //1.初始化食物和蛇;
        this.food.init(this.map);
        this.snake.init(this.map);

        //2.利用定时器移动蛇(小蛇快跑);(最好不对外)
        snakeMoveOftimer(this.snake,this.food,this.map);
        //3.按键改变方向;(最好不对外)
        pressKey(this.snake);
    }



       function snakeMoveOftimer(snake,food,map) {

           var timer = setInterval(function () {

               //超出地图，game over！
               //宽高有取值范围： [0, map-snake]
               var headx = snake.body[0].left*snake.width;
               var heady = snake.body[0].top*snake.height;

               //if(headx < 0 ){
               //    alert(1)
               //    headx = map.offsetWidth-snake.width;
               //}
               //if(headx>map.offsetWidth-snake.width){
               //    headx = 0;
               //}
               //if(heady < 0 ){
               //    headx = map.offsetHeight-snake.height;
               //}
               //if(heady>map.offsetWidth-snake.width){
               //    headx = 0;
               //}



               if(headx<=0 || headx >= map.offsetWidth-snake.width){
                   alert("Game over!");
                   //清除定时器;
                   clearInterval(timer);
               }
               if(heady<=0 || heady >= map.offsetHeight-snake.height) {
                   alert("Game over!");
                   //清除定时器;
                   clearInterval(timer);
               }
               snake.move(map,food);
           },200)
    }


    function pressKey(snake){
        //通过按键改变snake的body中的direction
        document.onkeydown = function (event) {
            event = event || window.event;
            //通过按键的值，给蛇body的direction属性改变;
            //alert(event.keyCode);//  左: 37;  上: 38;  右: 39;  下: 40;
            switch (event.keyCode){
                case 37:snake.direction = "left";break;
                case 38:snake.direction = "top";break;
                case 39:snake.direction = "right";break;
                case 40:snake.direction = "bottom";break;
            }
        }
    }


    window.Game = Game;
})()