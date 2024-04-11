const myElement = document.getElementById("loading");
myElement.style.display = "block";
myElement.style.opacity = "1.0";
const cards_count = 60 ;
function shuffleArrayWithSeed(array, seed) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    // Custom seeded random number generator
    function customRandom(seed) {
      let x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
  
    // Initialize seeded random number generator
    let seedValue = seed;
    if (typeof seed === 'string') {
      seedValue = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }
  
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(customRandom(seedValue) * currentIndex);
      currentIndex--;
  
      // Swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
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
function checkForUpdates(room_code, username) {
    
    const postData = {
        room_code: room_code,
        username: username
    };
    $.ajax({
        url: 'resource/backend/check_for_updates.php',
        type: 'POST',
        data: postData,
        dataType: 'json', 
        success: function(response) {
            if (response.stat !== 'nothing yet') {
                response.cards.forEach((cardcodei, index) => {
                    console.log('New updates found:', cardcodei);
                    new_card_number = parseInt(cardcodei)%60 + 1
                    console.log( new_card_number);
                    if (isNaN(new_card_number)||cards.includes(new_card_number)) {
                        notify(txt= 'duplicated !'  , 'failure' )
                    }else{
                        cards.push(new_card_number)
                        
                        $('.cards_desk').append(`<div id="div_${new_card_number}" class="game_card"><img class"game_card_img" id="img_${new_card_number}" src="resource/cards/back1.jpg" alt="card"></div>`) 
                        $('#div_'+new_card_number).animate({
                            opacity: 1,
                            filter: 'blur(0px);'
                        }, 1000);
                        $('#add_card_number_input').val(' ')
        
                        if (cards.length==numberOfPlayers){
        
                            $('#add_card_number_input').css('display', 'none');
                            $('#refresh_desk').css('display', 'block');
                            let cards2 = shuffleArrayWithSeed(cards, Date.now()%10000);
                            $('.game_card img').each(function(index) {
                                const delay = index * 300;
                                setTimeout(() => {
                                    $(this).fadeOut(10);
                                    $(this).attr('src','resource/cards/'+cards2[index]+'.jpg')
                                    $(this).attr('card_code',''+cards2[index])
                                    $(this).before(`<span  class="on_card_number">${index+1}</span>`)
                                    
                                    $(this).fadeIn(200);
                                }, delay);
                            });
                        }
                    }
                });  
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error:', textStatus, errorThrown);
        }
    });
}

// Function to periodically check for updates every 5 seconds
function startUpdateCheck(room_code, username) {
    setInterval(function() {
        checkForUpdates(room_code, username);
    }, 3000); // 5000 milliseconds = 5 seconds
}

$(document).ready(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('phone');
        $('.cards_desk').css('justify-content', 'space-evenly');
        $('.cards_in_hand').css('justify-content', 'space-evenly');
        
    }else{
        console.log('pc');
        //$('.footer').html('<h1>open in mobile | reload</h1>');
    }
    $('#nikname').val('User'+Math.floor( Math.random() * 1000));

    
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
            $('.pause_div').animate({'opacity': "0.0"}, 200)
            $('.dark').animate({'opacity': "0.0"}, 200,function(){
                $('.pause_div').css('display', 'none');
                $('.dark').css('display', 'none');
            }); 
            if($('.info i').hasClass('fa-chevron-left')){
                $('.info').trigger("click");
            }
            $('#58097945960').html('<script type="text/JavaScript" src="https://www.aparat.com/embed/cexuZ?data[rnddiv]=58097945960&data[responsive]=yes"></script>');
            
            if(false){
                $.get("games/index.html", function(data, status){
                    //alert("Data: " + data + "\nStatus: " + status);
                    $('.main_content').html(data);
                });
            }
    };

    window.addEventListener('beforeunload', function(e) {
        // Cancel the event
        //e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
    });

    $('.dark').click(function (e) { 
        $('.info_div').animate({'opacity': "0.0"}, 200)
            $('.dark').animate({'opacity': "0.0"}, 200,function(){
                $('.info_div').css('display', 'none');
                $('.dark').css('display', 'none');
            }); 
        $('.pause_div').animate({'opacity': "0.0"}, 200)
            $('.dark').animate({'opacity': "0.0"}, 200,function(){
                $('.pause_div').css('display', 'none');
                $('.dark').css('display', 'none');
            }); 
        $('#58097945960').html('<script type="text/JavaScript" src="https://www.aparat.com/embed/cexuZ?data[rnddiv]=58097945960&data[responsive]=yes"></script>');
    })

    $('#log_in').click(function (e) {
        notify(txt='wrong password or username !'  , 'failure' )
    })
    $('.nav').click(function (e) { 
        //$('.dark').css('display', 'block');
        //$('.info_div').css('display', 'block');
        $('.dark').css({'opacity': "0.0",'display': 'block'});
        $('.pause_div').css({'opacity': "0.1","transform": "scale(1)",'display': 'block'});
        $('.pause_div').animate({'opacity': "1","transform": "scale(1.0)"}, 200)
        $('.dark').animate({'opacity': "1"}, 100)
        statuss = ['failure','success','warning']
        text = ['successfully failed ', 'Internal Server Error', 'Bad Request', 'Unauthorized', 'Forbidden', 'Gateway Timeout', 'Service Unavailable', 'Network Connection Error', 'DNS Resolution Failure', 'Cross-Origin Request Blocked', 'SSL/TLS Handshake Failure', 'Invalid URL', 'Invalid Input Data', 'Session Expired', 'Database Connection Error', 'File Upload Failure', 'Out of Memory Error', 'Script Error', 'Resource Not Available', 'Permission Denied', 'Session Timeout']
        stat = statuss[Math.floor( Math.random() * statuss.length )]

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
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover your sanity !",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, lose it!",
                closeOnConfirm: true
                },
                function(){
                loading(1000);
                $('.info i').addClass("bi-info-circle").removeClass("fa-chevron-left").addClass("bi").removeClass("fa");
                $('.login_section').css('display', 'block');
                $('.join_section').css('display', 'none');
                $('.creat_section').css('display', 'none');
                $('.desk_section').css('display', 'none');
                $('.cards_in_hand').css('display', 'none');
                $('.cards_desk').html('');
                $('.cards_in_hand').html('');
                loading(0);

                });
            }else{
                $('.dark').css({'opacity': "0.0",'display': 'block'});
                $('.info_div').css({'opacity': "0.1","transform": "scale(1)",'display': 'block'});
                $('.info_div').animate({'opacity': "1","transform": "scale(1.0)"}, 200)
                $('.dark').animate({'opacity': "1"}, 100)

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
    
    $('#join_game_btn').click(function (e) { 
        loading(20000);
        
            // Define the POST data
            let room_code = parseInt($('#room_code_input').val());
            let username =  $('#nikname').val();
            const postData = {
              room_code: room_code, // Replace with your room code
              username: username  // Replace with your username
            };
          
            // Send POST request
            $.ajax({
              url: 'resource/backend/join_room.php', // Path to your PHP script
              type: 'POST',
              data: postData,
              dataType: 'json', // Expect JSON response
              success: function(response) {
                // Handle successful response
                console.log('Success:', response);
                loading(0);

                // Check if user was added to the room
                if (response.userIndex !== -1) {
                    console.log(`Username added at index ${response.userIndex}.`);
                    let user_index = parseInt(response.userIndex)
                    $('.info i').removeClass("bi-info-circle").addClass("fa-chevron-left").removeClass("bi").addClass("fa");
                    $('.login_section').css('display', 'none');
                    $('.join_section').css('display', 'none');
                    $('.cards_in_hand').css('display', 'flex');
                    notify(txt= ' Joined '  , 'success' )
                    const all_cards = Array.from({ length: cards_count }, (_, i) => i + 1);
                    let shuffled_cards = shuffleArrayWithSeed(all_cards, room_code);
                    const numberOfPlayers = room_code%10
                    console.log(shuffled_cards,numberOfPlayers);
                    response.users.forEach((user, index) => {
                        
                        play_cards = []
                        for(i=0;i<parseInt(cards_count/numberOfPlayers);i++){
                            play_cards.push(shuffled_cards.shift())
                        }
                        console.log(play_cards);
                    });
                    notify(txt= response.users  , 'success' )
                    play_cards.forEach((card, index) => {
                        const delay = index * 200+100;
                        setTimeout(() => {
                            $('.cards_in_hand').append(`<div id="div_${card}" number="${card}" class="game_card in_hand_game_card"><img class"game_card_img" id="img_${card}" src="resource/cards/back1.jpg" alt="card"></div>`);
                            $('#div_'+card).animate({
                                opacity: 1,
                                filter: 'blur(0px);'
                            }, 1000);
                            $('#img_'+card).fadeOut(10);
                            $('#img_'+card).attr('src','resource/cards/'+card+'.jpg')
                            $('#img_'+card).fadeIn(200);
                        }, delay);
                    });
                    setTimeout(() => {
                        $('.in_hand_game_card').click(function (e) { 
                            e.preventDefault();
                            card = parseInt ($(this).attr('number'))
                            code = card + 60 *parseInt(Math.random()*13) + 60 -1
                            swal({
                                title: "Are you sure?",
                                text:`<span  class="on_card_number">${code}</span><img class"game_card_img" id="img_${card}" style="height:400px;" src="resource/cards/${card}.jpg" alt="card">` ,
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "send",
                                closeOnConfirm: true,
                                html: true
                              },
                              function(){
                                    const postData = {
                                        room_code: room_code,
                                        username: username,
                                        card_code:code
                                    };
                                    $.ajax({
                                        url: 'resource/backend/send_card.php',
                                        type: 'POST',
                                        data: postData,
                                        dataType: 'json', 
                                        success: function(response) {
                                            if (response.stat == 'ok') {
                                                setTimeout(() => {
                                                    $('#div_'+card).animate({'margin-left':'-200px','opacity':'0'}, 500);
                                                }, 100);
                                                setTimeout(() => {
                                                    $('#div_'+card).remove()
                                                    notify(txt= 'card num: '+code  , 'success' )                          
                                                }, 610); 
                                            }else if(response.stat == 'You have already sent a card.'){
                                                notify(txt= 'You have already sent a card.'  , 'failure' )
                                            }else if(response.stat == 'room is not full.'){
                                                notify(txt= 'room is not full.'  , 'failure' )
                                            }
                                        },
                                        error: function(jqXHR, textStatus, errorThrown) {
                                            console.log(response, textStatus, errorThrown);
                                        }
                                    });
                              });
                            });
                    }, numberOfPlayers*351+5000);
                } else {
                  console.log('Username already exists in the room.');
                  notify(txt= 'your Username already exists in the room.'  , 'failure' )
                }
                
                console.log(`Total users in the room: ${response.userCount}`);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                // Handle error
                loading(0);
                console.log('Error:', textStatus, errorThrown);
                if(jqXHR.responseText.includes('Room does not exist')){
                    notify(txt= 'Room does not exist !!!'  , 'failure' ) 
                }
                if(jqXHR.responseText.includes('Room is full')){
                    notify(txt= 'Room is full !!!'  , 'failure' ) 
                }
                // Parse error response if available
                let errorResponse = {};
                try {
                  errorResponse = JSON.parse(jqXHR.responseText);
                } catch (e) {
                  errorResponse.message = 'Unknown error';
                }
          
                // Display error message
                console.log('Error message:', errorResponse.message || 'Unknown error');
              }
            });
               
    })
    
    $('.room_btn').click(function (e) { 
        notify(txt= $('#nikname').val()+' '  , 'success' )
        loading(200);
        $('.info i').removeClass("bi-info-circle").addClass("fa-chevron-left").removeClass("bi").addClass("fa");
        
        $('.login_section').css('display', 'none');
        $('.creat_section').css('display', 'block');
    })
    
    $('.creat_btn').click(function (e) { 
        numberOfPlayers = parseInt($('#numberOfPlayers').val())
        //notify(txt= numberOfPlayers+' '  , 'success' )
        loading(200);
        
        $('.info i').removeClass("bi-info-circle").addClass("fa-chevron-left").removeClass("bi").addClass("fa");
        $('.login_section').css('display', 'none');
        $('.creat_section').css('display', 'none');
        $('.desk_section').css('display', 'block');
        $('#add_card_number_input').css('display', 'none');
        
        cards = []
        $('.cards_desk').html('');
        $('.cards_desk').css('display', 'flex');

        let room_id = Math.floor( Math.random() * 1000)*10+numberOfPlayers
        $('.room_code strong').html(room_id+'');
        notify(txt= 'room code: '+room_id  , 'success' )

        const postData = {
            room_code: room_id, 
          };
        $.ajax({
            url: 'resource/backend/creat_room.php', 
            type: 'POST',
            data: postData,
            success: function(response) {
              console.log(response);
              let room_code = room_id;
              let username = $('#nikname').val();
              startUpdateCheck(room_code, username);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.error('Error:', textStatus, errorThrown);
            }
          });
    })
    $('#add_card_number_input').keydown(function (e) { 
        if (e.which === 13) {
            e.preventDefault()
            new_card_number = parseInt($('#add_card_number_input').val())%60 + 1
            if (isNaN(new_card_number)||cards.includes(new_card_number)) {
                notify(txt= 'duplicated !'  , 'failure' )
            }else{
                cards.push(new_card_number)
                
                $('.cards_desk').append(`<div id="div_${new_card_number}" class="game_card"><img class"game_card_img" id="img_${new_card_number}" src="resource/cards/back1.jpg" alt="card"></div>`) 
                $('#div_'+new_card_number).animate({
                    opacity: 1,
                    filter: 'blur(0px);'
                  }, 1000);
                $('#add_card_number_input').val(' ')

                if (cards.length==numberOfPlayers){

                    $('#add_card_number_input').css('display', 'none');
                    $('#refresh_desk').css('display', 'block');
                    let cards2 = shuffleArrayWithSeed(cards, Date.now()%10000);
                    $('.game_card img').each(function(index) {
                        const delay = index * 300;
                        setTimeout(() => {
                            $(this).fadeOut(10);
                            $(this).attr('src','resource/cards/'+cards2[index]+'.jpg')
                            $(this).attr('card_code',''+cards2[index])
                            $(this).before(`<span  class="on_card_number">${index+1}</span>`)
                            
                            $(this).fadeIn(200);
                            console.log(cards2[index]);
                        }, delay);
                      });
                    
                }
            }
        }
    });    
    $('#refresh_desk').click(function (e) { 
        e.preventDefault();

        const postData = {
            room_code: parseInt($('.room_code strong').html()), 
          };
        $.ajax({
            url: 'resource/backend/next_round.php', 
            type: 'POST',
            data: postData,
            success: function(response) {
              console.log(response);
              $('#refresh_desk').css('display', 'none');
              $('.game_card').each(function(index) {
                  const delay = index * 300 + 100;
                  setTimeout(() => {
                      $(this).animate({'margin-left':'-200px','opacity':'0'}, 200);
                  }, delay);
                });
              cards = []
              setTimeout(() => {$('.cards_desk').html('')}, 2000);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.error('Error:', textStatus, errorThrown);
            }
          });


        
    }); 
    //$('.room_btn').click();
    //$('.creat_btn').click();
//     //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
// .map(function(card) {
//         $('.cards_desk').append(`<div id="div_${card}" class="game_card"><img class"game_card_img" id="img_${card}" src="${'resource/cards/'+card+'.jpg'}" alt="card"></div>`);
//         $('#div_'+card).animate({
//             opacity: 1,
//           }, 700);
//       });
      
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