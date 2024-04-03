<?php
if(isset($_POST['room_code'])){
    $room_code=$_POST['room_code'];
    $filename = $room_code . '.txt';
    file_put_contents($filename,'');
    $filename = $room_code . 'update.txt';
    file_put_contents($filename,'');
    echo('ok!');
}