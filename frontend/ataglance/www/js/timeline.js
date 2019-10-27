var current_index = 0; 
    // Make the call to get the pictures here
    pictures = [
                'images/trump1.jpeg',
                'images/trump2.jpeg',
                'images/trump3.jpeg',
                'images/trump4.jpeg',
                'images/trump5.jpeg',
               ]

    descriptions = [
            'fidsofjdsoijfoidsajfoidsajfiodsajf dsjfoidsajfoidsjf dsfjdoisf jdsoiajfds',
            'fidsofjdsoijfoidsajfoidsajfiodsajf dsjfoidsajfoidsjf dsfjdoisf jdsoiajfds',
            'fidsofjdsoijfoidsajfoidsajfiodsajf dsjfoidsajfoidsjf dsfjdoisf jdsoiajfds',
            'fidsofjdsoijfoidsajfoidsajfiodsajf dsjfoidsajfoidsjf dsfjdoisf jdsoiajfds',
            'fidsofjdsoijfoidsajfoidsajfiodsajf dsjfoidsajfoidsjf dsfjdoisf jdsoiajfds'
    ]
    
   dates = [
        '2019-10-21',
        '2019-10-21',
        '2019-10-21',
        '2019-10-21',
        '2019-10-21'
   ] 


function onLoad() {
    // Make an array of img variables
    imgs = new Array(pictures.length).fill(0);
    for(var i=0; i<pictures.length; i++) {
        // Add parent div
        var div = document.createElement("div");
        $(div).addClass('container');
        $("#page").append(div);

        
        var label = document.createElement("label");
        $(label).attr('id', i+"");
        $(div).append(label);

        
        $(label).append(
            $('<input type="checkbox" />')
        );


        var card = document.createElement("div");
        $(card).addClass('card');
        $(label).append(card);

        // Child divs
        var child1 = document.createElement("div");
        $(child1).attr('id', "img_" + i);
        $(child1).addClass('front');
        $(child1).css('background-image', "url('" + pictures[i] + "')");
        $(card).append(child1);

        var child2 = document.createElement("div");
        $(child2).addClass('back');
        $(child2).text(descriptions[i]);
        $(card).append(child2);

        /*
        $('#page').append(
         $('<div id = ' + i + '></div>')
         .addClass("container")
         .append("<div id = img_"+ i + " class='img'/>" )
            .addClass('front')
        );
        */
    }

    // Make a timeline the height of the app
    canvas = document.getElementById("myCanvas");
    var body = document.body.getBoundingClientRect();
    console.log(body.top, body.right, body.bottom, body.left);
    canvas.height = body.bottom;
    canvas.width = window.innerWidth;
    ctx= document.getElementById("myCanvas").getContext("2d");
    ctx.font = "14pt paralucent-text";

    // Get image coordinates (the centers)
    var endX = 0; 
    var tickLength = 0; 
    for(var i=0; i<pictures.length; i++) {
        var img = document.getElementById(i);
        var rect = img.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        
        var centerX = rect.right + ((window.innerWidth - rect.right)/6); 
        var centerY = rect.top + (img.offsetWidth/2);

        console.log(centerX, centerY)
        var width = (window.innerWidth - centerX)/1.3;
        ctx.fillRect(centerX,centerY, width, 4);
        ctx.fillText(dates[i], centerX, centerY - 3);
        endX = centerX + width; 
        tickLength = width; 
    }
    ctx.fillRect(endX, 0, 4, body.bottom);
    
    currY = 0;
    currX = endX - (width * 0.2);
   
    /*
    while(currY < body.bottom) {
        ctx.fillRect(currX, currY, width * 0.2, 2);
        currY += (body.bottom * 1/30); 
        
    }
    */


    /*
    for(var i=pictures.length - 1; i<=0; i--) {
    }

    // Add the pictures to the screen
    if(pictures.length > 0) {
        if(pictures.length == 1) {
            $("#" + 0).show();
            $("#" + 0).addClass("active");
        }
        else {
            $("#" + 0).addClass("active");
            $("#" + 0).show();
            $("#" + 1).addClass("next");
            $("#" + 1).show();
    
        }
    }

    $("#page").on("swipe", function (event) {
        var ydiff = event.swipestart.coords[1] - event.swipestop.coords[1];
        if(ydiff < 0) {
            swipeUp();
        }
        else {
            swipeDown();
        }
    });
    */

}


function drawline(ctx, p1, p2) {
    ctx= document.getElementById("myCanvas").getContext("2d");
    ctx.strokeStyle = "#000000"
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); 
    ctx.lineTo(p2.x, p2.y); 
    ctx.stroke();
}

function swipeUp() {
    // If they can swipe up
    if(current_index >= 1) {
        // We know that there's a down (we came from there)
        $("#" + current_index).removeClass("active");
        $("#" + current_index - 1).removeClass("previous");
        
        $("#" + current_index - 1).addClass("active");
        $("#" + current_index).addClass("next");


        // Not the last
        if(current_index != pictures.length - 1) {
            $("#" + current_index + 1).removeClass("next");
            $("#" + current_index + 1).hide();
        }

        // Not the first
        if(current_index != 1) {
            $("#" + current_index - 2).addClass("previous");
            $("#" + current_index - 2).show();
        }
    
        current_index--;
    }
}

function swipeDown() {
    // If they can swipe down
    if(current_index <= pictures.length - 1) {
        $("#" + current_index).removeClass("active");
        $("#" + current_index + 1).removeClass("next");
        
        $("#" + current_index + 1).addClass("active");
        $("#" + current_index).addClass("previous");
        
        // Not the last
        if(current_index != pictures.length - 1) {
            $("#" + current_index + 2).addClass("next");
            $("#" + current_index + 2).show();
        }

        // Not the first
        if(current_index != 1) {
            $("#" + current_index - 1).removeClass("previous");
            $("#" + current_index - 1).hide();
        }

        current_index++;
    }

}


$("#div1").on("swipeleft",function(){
    $("#div1").removeClass("active");
    $("#div2").removeClass("next");
    $("#div3").removeClass("next");
    $("#div1").addClass("previous");
    $("#div2").addClass("active");
    $("#div3").addClass("next");
    
});
$("#div1").on("swiperight",function(){});

$("#div2").on("swiperight",function(){
    $("#div2").removeClass("active");
    $("#div3").removeClass("next");
    $("#div1").removeClass("previous");
    $("#div1").addClass("active");
    $("#div2").addClass("next");
    $("#div3").addClass("next");
});
$("#div2").on("swipeleft",function(){
    $("#div2").removeClass("active");
    $("#div3").removeClass("next");
    $("#div1").removeClass("previous");
    $("#div3").addClass("active");
    $("#div2").addClass("previous");
    
});

$("#div3").on("swiperight",function(){
    $("#div3").removeClass("active");
    $("#div2").removeClass("previous");
    $("#div2").addClass("active");
    $("#div1").addClass("previous");
    $("#div3").addClass("next");
    
});

$("#div3").on("swipeleft",function(){});
