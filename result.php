<?php
if(isset($_POST['name']) && isset($_POST['password'])){
    $username=$_POST['username'];
    $password=$_POST['password'];
    var_dump("$username : $password");
}