/**
 * Created by hansh on 2017/9/16.
 */
(function(){


    function Food(width,height,top,left,background){
        // ||设置一个初始值，不传入参数的话属性的值
        this.width = width || 20;
        this.height = height || 20;
        this.top = top || 0;
        this.left = left  || 0;
        this.background = background || "green";
    }

    var newDiv = null;
    Food.prototype.init = function(map){

        removeFood(map);

        newDiv = document.createElement("div");

        newDiv.style.width = this.width + "px";
        newDiv.style.height = this.height + "px";
        newDiv.style.background = this.background;
        //位置是随机出现的
        this.top = parseInt(Math.random()*(map.offsetHeight)/this.height)*this.height;
        this.left = parseInt(Math.random()*(map.offsetWidth)/this.width)*this.width;
        //this.top = 40;
        //this.left = 200;
        newDiv.style.top = this.top +"px";
        newDiv.style.left = this.left +"px";
        newDiv.style.position = "absolute";

        map.append(newDiv);
    }
    //b. 删除食物的方法;(最好不对外)
    function removeFood(map){
        //console.log(newDiv);//第一次是null
        if(newDiv != null){
            map.removeChild(newDiv);
        }
    }




    window.Food = Food;
})()