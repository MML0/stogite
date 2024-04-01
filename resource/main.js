const myElement = document.getElementById("loading");
myElement.style.display = "block";
myElement.style.opacity = "1.0";
$(document).ready(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('phone');
        
    }else{
        console.log('pc');
        //$('.footer').html('<h1>open in mobile | reload</h1>');
    }
    $('#nikname').val('User'+Math.floor( Math.random() * 1000));

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
            $('.loading').animate({'opacity': "0.0"}, 200,function(){$('.loading').css('display', 'none');})}, t);
    }
    //do sth when window resized
    $(window).resize(function() { 
        //$('.main_content').css('height', ($('html').height()-105)+'px') 
    }); 
    $(window).trigger("resize");


    //setTimeout(function(){$('.prof_pic').trigger( "click" );}, 5000) // fake notification

    window.history.pushState(null, "", window.location.href);        
    window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
            $('.info_div').animate({'opacity': "0.0"}, 200)
            $('.dark').animate({'opacity': "0.0"}, 200,function(){
                $('.info_div').css('display', 'none');
                $('.dark').css('display', 'none');
            });

            if(false){
                $.get("games/index.html", function(data, status){
                    //alert("Data: " + data + "\nStatus: " + status);
                    $('.main_content').html(data);
                });
            }
        };
    $('.dark').click(function (e) { 
        $('.info_div').animate({'opacity': "0.0"}, 200)
            $('.dark').animate({'opacity': "0.0"}, 200,function(){
                $('.info_div').css('display', 'none');
                $('.dark').css('display', 'none');
            }); 
    })

    $('#log_in').click(function (e) {
        notify(txt='wrong password or username !'  , 'failure' )
    })
    $('.nav').click(function (e) { 
        //$('.dark').css('display', 'block');
        //$('.info_div').css('display', 'block');
        notify(txt='Loading ...'  , 'warning' )

        // if ($('.prof_pic').hasClass('shake')){
        // }else{
        //     $('.red_dot').toggleClass("hide");
        //     $(this).addClass('shake');
        //     $(this).width();
        //     setTimeout(function(){$('.prof_pic').removeClass('shake');}, 800)
        // }
    })
    $('.info').click(function (e) { 
        if($('.info i').hasClass('fa-chevron-left')){
            //if user was in a game then go back to game menu
            loading(1000);
            
            $('.info i').addClass("bi-info-circle").removeClass("fa-chevron-left").addClass("bi").removeClass("fa");
            $('.login_section').css('display', 'block');
            $('.join_section').css('display', 'none');
            $('.creat_section').css('display', 'none');
            loading(0);
        
        }else{
            //notify(txt='there is no purpose'  , 'failure' )
            $('.dark').css({'opacity': "0.0",'display': 'block'});
            $('.info_div').css({'opacity': "0.1","transform": "scale(1)",'display': 'block'});
            $('.info_div').animate({'opacity': "1","transform": "scale(1.0)"}, 200)
            $('.dark').animate({'opacity': "1"}, 100)
            statuss = ['failure','success','warning']
            text = ['successfully failed ', 'Internal Server Error', 'Bad Request', 'Unauthorized', 'Forbidden', 'Gateway Timeout', 'Service Unavailable', 'Network Connection Error', 'DNS Resolution Failure', 'Cross-Origin Request Blocked', 'SSL/TLS Handshake Failure', 'Invalid URL', 'Invalid Input Data', 'Session Expired', 'Database Connection Error', 'File Upload Failure', 'Out of Memory Error', 'Script Error', 'Resource Not Available', 'Permission Denied', 'Session Timeout']
            stat = statuss[Math.floor( Math.random() * statuss.length )]
        }
    })
    
    $('.play_btn').click(function (e) { 
        notify(txt= $('#nikname').val()+' '  , 'success' )
        loading(1000);
        
        $('.info i').removeClass("bi-info-circle").addClass("fa-chevron-left").removeClass("bi").addClass("fa");
        $('.login_section').css('display', 'none');
        $('.join_section').css('display', 'block');
        loading(0);
        
    })
    
    $('.room_btn').click(function (e) { 
        notify(txt= $('#nikname').val()+' '  , 'success' )
        loading(1000);
        
        //$('.info i').removeClass("bi-info-circle").addClass("fa-chevron-left").removeClass("bi").addClass("fa");
        $('.login_section').css('display', 'none');
        $('.creat_section').css('display', 'block');

        $('.creat_btn').click(function (e) { 
            //globalThis(numberOfPlayers)
            numberOfPlayers = $('#numberOfPlayers').val();
            notify(txt= numberOfPlayers+' '  , 'success' )
            loading(1000);
            
            $('.info i').removeClass("bi-info-circle").addClass("fa-chevron-left").removeClass("bi").addClass("fa");
            
            $.get("games/join.html", function(data, status){
                //alert("Data: " + data + "\nStatus: " + status);
                $('.main_content').html(data);
            });
            //$('.main_content').html("<h1>hi</h1>");
            loading(0);
            
        })
        loading(0);
    })
    //clear loading page
    setTimeout(function() {
        $('.loading').animate({'opacity': "0.0"}, 200,function(){$('.loading').css('display', 'none');})
      }, 500);
});
window.onload = function () {
    console.log('loaded');
    setTimeout(function() {
        $('.loading').animate({'opacity': "0.0"}, 200,function(){$('.loading').css('display', 'none');})
      }, 500);
}