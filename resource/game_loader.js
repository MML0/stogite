$(document).ready(function(){
    function notify(txt='',status='warning'){
        id = 'notif_'+Math.floor( Math.random() * 100 )
        if (status=='success'){
            html = '<div id="'+id+'" class="notification_box success"><span style="color: black;">'+txt+'</span> <i class="fa-solid fa-circle-check"></i></div>'
        }
        if (status=='failure'){
            html = '<div id="'+id+'" class="notification_box failure"><span style="color: black;">'+txt+'</span> <i class="fa-solid fa-circle-xmark"></i></div>'
        }
        if (status=='warning'){
            html = ' <div id="'+id+'" class="notification_box warning"><span style="color: black;">'+txt+'</span> <i class="fa-solid fa-triangle-exclamation"></i></i></div>'
        }
        $('.notification_div').html($('.notification_div').html()+html);
        
        setTimeout(function(){
            $('.notification_box:first' ).animate({ 
                'margin-right' : '-350px',
            },{ duration: 290, queue: false });
        }, 3000)
        setTimeout(function(){
            $('.notification_box:first').remove();
        }, 3290)
       
    }
    function loading (t=200){
        $('.loading').css('display', 'block');
        $('.loading').animate({'opacity': "1.0"}, 200)
        setTimeout(function() {
            $('.loading').animate({'opacity': "0.0"}, 200,function(){$('.loading').css('display', 'none');})
          }, t);

    }
    
    
    $('.game_logo').click(function (e) { 
        loading(1000);
        
        id = $(this).attr('id');
        console.log(id);
        
        $('.info i').removeClass("bi-info-circle").addClass("fa-chevron-left").removeClass("bi").addClass("fa");
        
        var xhl = new XMLHttpRequest();
        xhl.open("Post" , "./result.php" , true);
        xhl.onreadystatechange=()=>{
        if(xhl.status==200 && xhl.readyState==xhl.DONE){
            xhl.responseText();
        }
        var data = new FormData(document.getElementById("form"));
        xhl.send(data);
        }
        $.get("games/"+id+".html", function(data, status){
            //alert("Data: " + data + "\nStatus: " + status);
            $('.main_content').html(data);
        });
        //$('.main_content').html("<h1>hi</h1>");
        loading(0);

    });

});
