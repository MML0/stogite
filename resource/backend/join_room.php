<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['room_code']) && isset($_POST['username'])) {
    $room_code = $_POST['room_code'];
    $username = $_POST['username'];

    $filename = $room_code . '.txt';

    $userCount = 0;
    $userIndex = -1;

    if (file_exists($filename)) {
        $users = file($filename, FILE_IGNORE_NEW_LINES);

        $userCount = count($users);

        $userIndex = array_search($username, $users);
        if ($userCount === $room_code%10) {
            echo "Room is full.";
            exit;
        }else if ($userIndex === false) {
            // Append username to the file
            file_put_contents($filename, $username . PHP_EOL, FILE_APPEND);
            $users = file($filename, FILE_IGNORE_NEW_LINES);
            
            // Increment user count and get new index
            $userCount++;
            $userIndex = $userCount - 1;
        } else {
            // Set user index to the existing index
            $userIndex = -1;
        }
    } else {
        echo "Room does not exist.";
        exit;
    }

    // Prepare response data
    $response = [
        'userCount' => $userCount,
        'userIndex' => $userIndex,
        'users'     => $users
    ];

    // Send JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo "Invalid request.";
}
?>
