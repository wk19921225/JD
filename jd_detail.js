/*顶部菜单*/
+function(){
  //定义函数showSub/hideSub,用于显示/隐藏a旁边的二级菜单
  function showSub(){//this->li
    //设置当前li的最后一个子元素显示
    this.lastElementChild
        .style.display="block";
    //修改li下a的class为hover
    this.children[1].className="hover";
  }
  function hideSub(){//this->li
    //设置当前li的最后一个子元素隐藏
    this.lastElementChild
      .style.display="";
    //清除li下a的class
    this.children[1].className="";
  }
  //找到class为app_jd和class为service的li
  var lis=document.querySelectorAll(
    ".app_jd,.service"
  );
  //遍历lis中每个li，为每个li添加鼠标进入和鼠标移出事件监听
  for(var i=0;i<lis.length;i++){
    lis[i].addEventListener(
      "mouseover",showSub
    );
    lis[i].addEventListener(
      "mouseout",hideSub
    )
  }
}();

/*全部商品分类*/
+function(){
  //获得id为category的div，绑定鼠标进入/移出时间
  var div=document.getElementById(
    "category"
  );
  div.addEventListener("mouseover",
    function(){
      this.lastElementChild
          .style.display="block";
    }
  );
  div.addEventListener("mouseout",
    function(){
      this.lastElementChild
        .style.display="";
    }
  )
  //获得id为cate_box下的li
  var lis=document.querySelectorAll(
    "#cate_box>li"
  );
  //遍历每个li绑定鼠标进入/移出事件
  for(var i=0;i<lis.length;i++){
    lis[i].addEventListener(
      "mouseover",
      function(){
        this.lastElementChild
          .style.display="block";
        this.firstElementChild
          .className="hover";
      }
    );
    lis[i].addEventListener(
      "mouseout",
      function(){
        this.lastElementChild
          .style.display="";
        this.firstElementChild
          .className="";
      }
    );
  }
}();

/*标签页*/
+function(){
  //获得id为product_detail下的ul下的li
  var lis=document.querySelectorAll(
    "#product_detail>ul>li"
  );
  //为每个li绑定单击事件
  for(var i=0;i<lis.length;i++){
    lis[i].addEventListener("click",
      function(e){
        e.preventDefault();
        //如果当前li的class不是current
        if(this.className!="current"){
          //获得当前li的父元素下class为current的li
          this.parentNode
            .querySelector(".current")
            .className="";
          //设置当前li为current
          this.className="current";
          //找到id为product_detail下的class为show的div/table
          var show=
            document.querySelector(
              "#product_detail>.show"
            );
          if(show!=null)
            show.className="";
          //获得当前li下的第一个子元素的href
          var href=
          this.firstElementChild.href;
          //如果有href
          if(href!=""){
            //获得href中最后一个#的位置
            var lasti=
              href.lastIndexOf("#");
            //获得#之后的内容作为id
            var id=href.slice(lasti+1);
            //获得指定id的div/table设置其显示
            document.getElementById(id)
              .className="show";
          }
        }
      }
    )
  }
}();

/*放大镜*/
+function(){
  const LIWIDTH=62;//li的宽
  const OFFSET=20;//ul的起始left
  const MSIZE=175;//mask的大小
  const SMSIZE=350;//superMask的大小
  var LICOUNT=//所有li的个数
    document.querySelectorAll(
      "#icon_list>li"
    ).length;
  var moved=0;//左移的li个数
  var aForward=
    document.querySelector("a.forward")
  var aBackward=
  document.querySelector("a.backward");
  // 找到class为forward的a
  aForward.addEventListener(
    "click",li_move
  );
  aBackward.addEventListener(
    "click",li_move
  )
  function li_move(){
    //this->a
    //如果当前a的class中没有disabled
    if(this.className
           .indexOf("disabled")==-1){
      if(this.className=="forward")
        moved++;
      else
        moved--;
      //设置ul的left为-LIWIDTH*moved+OFFSET
      this.parentNode.lastElementChild
        .style.left=
        -LIWIDTH*moved+OFFSET+"px";
      checkA();
    }
  }
  //检查两个a的状态
  function checkA(){
    //当moved等于0
    if(moved==0){
      //为aBackward的class添加disabled
      aBackward.className+=" disabled";
    }else if(LICOUNT-moved==5){
    //否则,如果LICOUNT-moved等于5
      //为aForward的class添加disabled
      aForward.className+=" disabled";
    }else{//否则
      //设置aBackward的class为backward
      aBackward.className="backward";
      //设置aForward的class为forward
      aForward.className="forward";
    }
  }
  var mImg=
    document.getElementById("mImg");
  //为id为icon_list的ul绑定鼠标进入事件:
  document.getElementById("icon_list")
    .addEventListener("mouseover",
    function(e){
      if(e.target.nodeName=="IMG"){
        //获得当前小图片src
        var src= e.target.src;
        //获得最后一个.的位置
        var i=src.lastIndexOf(".")
        //在最后一个.前拼-m
        src=src.slice(0,i)
              +"-m"+src.slice(i);
        //设置mImg的src为src
        mImg.src=src;
      }
    }
  )
  //获得id为superMask的div
  var sm=document.getElementById(
    "superMask"
  );
  var mask=document.getElementById(
    "mask"
  );
  var lgDiv=document.getElementById(
    "largeDiv"
  );
  sm.addEventListener("mouseover",
    function(){
      mask.style.display="block";
      lgDiv.style.display="block";
      var src=mImg.src;
      var i=src.lastIndexOf(".");
      src=src.slice(0,i-1)
      +"l"+src.slice(i);
      lgDiv.style.backgroundImage=
        "url("+src+")";
    }
  )
  sm.addEventListener("mouseout",
    function(){
      mask.style.display="";
      lgDiv.style.display="";
    }
  );
  var MAX=SMSIZE-MSIZE;
  //为sm绑定鼠标移动事件
  sm.addEventListener("mousemove",
    function(e){
      var x= e.offsetX, y= e.offsetY;
      var top=y-MSIZE/ 2,
          left=x-MSIZE/2;
      if(top<0) top=0;
      else if(top>MAX) top=MAX;
      if(left<0) left=0;
      else if(left>MAX) left=MAX;
      mask.style.cssText=
        "display:block; left:"+left+"px; top:"+top+"px";
      lgDiv.style.backgroundPosition=
        -left*16/7+"px "+ -top*16/7+"px";
    }
  );
}();