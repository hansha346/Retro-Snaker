/**
 * Created by hansh on 2017/9/16.
 */
(function(window){

    function Snake(width,height,direction){
        this.width =width || 20;
        this.height =height || 20;

        //身体(I.位置 II.颜色); (身体整体可以数组做，单个元素为对象)
        this.body = [
            {top: 2,left: 4,color: "red"},
            {top: 2,left: 3,color: "orange"},
            {top: 2,left: 2,color: "orange"}
        ]
        //方向
        this.direction = direction || "right"
    }


    //a. 初始化蛇;(放到map中)(得用3个div初始化一条蛇)
    //定义一个新的临时数组，把每一个元素都放入数组中，将来用于删除
    var arr = [];
    Snake.prototype.init = function (map) {
        removeSnake(map);//先删除老蛇

        //(得用3个div生成一条新蛇) 所以用for循环遍历body;
        for (var i = 0; i < this.body.length; i++) {//遍历3遍
            var newDiv = document.createElement("div");
            newDiv.style.width = this.width + "px";
            newDiv.style.height = this.height + "px";
            newDiv.style.position = "absolute"
            //根据身体的不同设置不同为位置和颜色;
            newDiv.style.top = this.body[i].top * this.height + "px";
            newDiv.style.left = this.body[i].left * this.width + "px";
            newDiv.style.background = this.body[i].color;

            //放入map中;
            map.appendChild(newDiv);
            //每个div，蛇身体的一部分，都放入数组，将来删除;
            arr.push(newDiv);
        }
    }



    //删除
    function removeSnake(map){
        //I: 从map中删除div;   II:从数组中删除元素;   III: 先map后arr;
        //根据数组中的元素，删除map中的蛇身体;
        for(var i=0;i<arr.length;i++){
            map.removeChild(arr[i]);

            arr.shift();//从前删除，删除数组的第一项
            i--;
        }

        arr = [];//清空数组
    }



    //c.蛇的移动！！！！
    //蛇移动原理：删除旧蛇画新蛇;(I.让身体的后面关节设置为前面的坐标   II.头按照方向+1/-1)

    Snake.prototype.move = function (map,food) {//为啥？要用变量？
        removeSnake(map);


        //(I.让身体的后面关节设置为前面的坐标   II.头按照方向+1/-1)
        //a.从后往前遍历(不出现层叠)  b.把前面的赋值给后面   c.不管第一个;
        for(var i=this.body.length-1;i>=1;i--){
            this.body[i].top = this.body[i-1].top;
            this.body[i].left = this.body[i-1].left;
        }

        //头的方向
        switch (this.direction){
            case "right":
                this.body[0].left += 1;
                break;
            case "left":
                this.body[0].left -= 1;
                break;
            case "top":
                this.body[0].top -= 1;
                break;
            case "bottom":
                this.body[0].top += 1;
                break;
        }

        //吃食物！
        //头坐标和食物坐标相等;(1.重新生成一个食物   2.让身体增加一节最后一个的参数)
        var headx = this.body[0].left*this.width;
        var heady = this.body[0].top*this.height;
        var last = this.body[this.body.length-1];
        //判断：头坐标和食物坐标相等
        if(headx == food.left && heady == food.top){
            //1.重新生成一个食物   2.让身体增加一节最后一个的参数
            food.init(map);
            //生成一个关节
            var obj = {
                top: last.top,
                left: last.left,
                color: last.color
            };
            this.body.push(obj);
        }

        this.init(map);

    }


    window.Snake = Snake;
})(window)