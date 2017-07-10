//  先描绘食物形状  放到一个函数里
var fx;
function Food(){
   this.width=20
   this.height=20
   this.backgroundColor="red"
   
   this.position="absolute"
}

// 动态渲染到页面中
Food.prototype.rende=function(){
   //创建标签
   this.top = _.random(0, ($(".box2").height() / this.height - 1)) * this.height
   this.left = _.random(0, ($(".box2").width() / this.width - 1)) * this.width

   this.$this=$("<div></div>").css({
    width: this.width,
    height: this.height,
    backgroundColor: this.backgroundColor,
    top: this.top,
    left: this.left,
    position: this.position
   })
   //  添加到幕布
   $(".box2").append(this.$this)
}
//  删除食物
  Food.prototype.remove=function(){
    this.$this.remove()
    //console.log(this)
  }
  // 创建实例对象
var food=new Food()
food.rende()




//   蛇
//  创建大概模型
function Snake(){
    this.width=20
    this.height=20
    this.headColor ='blue'
    this.bodyColor = 'yellow'
    this.size=3
    this.position="absolute"
    this.body=[
    [1,2,this.bodyColor],
    [2,2,this.bodyColor],
    [3,2,this.headColor]
    ]
    fx="39";
}
// 渲染到页面中
   
Snake.prototype.random=function(){

     this.$arr=[];
    this.body.forEach(function(i){
     var $div=$("<div></div>");
         this.$arr.push($div);
        // console.log(i);
        $div.css({
          width:this.width,
             height:this.height,
             backgroundColor: i[2],
             top: i[1] * this.height,
             left: i[0] * this.width,
             position:this.position,
        })
        $(".box2").append($div)
    }.bind(this))
}  
    var snake=new Snake()
        snake.random()

//  移动
  Snake.prototype.move = function () {
  for (var i = 0; i < this.body.length - 1; i++) {
    this.body[i][0] = this.body[i + 1][0]
    this.body[i][1] = this.body[i + 1][1]
  } 

  //  获取按键方向 
document.addEventListener("keydown",function(e){
       fx=e.keyCode;
      console.log(fx)
  })
    if(fx==39){
       _.last(this.body)[0] += 1;
    }else if(fx==37){
      _.last(this.body)[0] -= 1;
    }else if(fx==38){
      _.last(this.body)[1] -= 1;
    }else if(fx==40){
      _.last(this.body)[1] += 1;
    }

    //   重合时
    var top=_.last(this.body)[1]*this.height;
    var left=_.last(this.body)[0]*this.width;
    // console.log(top,left)
    // console.log(food.top,food.left)
     if(top==food.top && left==food.left){
      
       //  添加蛇
       var first=_.first(this.body);
       this.body.unshift([
                          first[0],
                          first[1],
                          first[2]
                        ])

      food.remove();
      food.rende()
     }
}

     
//  删除
  Snake.prototype.remove = function () {
    this.$arr.forEach(function (j) {
     j.remove()
   })
  }

//  点击开始
$(".btn").on("click",function(){
 //  定时器
 
  setInterval(function(){
   snake.move()
   snake.remove()
   snake.random()
 },100)
})



 



   