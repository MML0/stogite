<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['room_code']) && isset($_POST['username']) && isset($_POST['card_code'])) {
    $room_code = $_POST['room_code'];
    $username = $_POST['username'];
    $card_code = $_POST['card_code'];
    $filename = $room_code . '.txt';
    $userFilename = $room_code . '_' . $username . '.txt'; // File to store card_code for each user
    $updatefilename = $room_code . 'update.txt';

    if (file_exists($filename)) {
        $users = file($filename, FILE_IGNORE_NEW_LINES);
        $userCount = count($users);
        $userIndex = array_search($username, $users); // Get the index of the user in the array

        if ($userIndex === false) {
            echo "User does not exist in the room.";
            exit;
        }
        if ($userCount < $room_code%10) {
            $response = [
                'stat' => 'room is not full.',
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
            exit;
        }
        // Check if the user has already sent a card_code
        if (file_exists($userFilename)) {
            $response = [
                'stat' => 'You have already sent a card.',
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
            exit;
        }

        // Append card_code to the user's file
        file_put_contents($userFilename, $card_code . PHP_EOL);

        $updatefilename = $room_code . 'update.txt';
        file_put_contents($updatefilename, $card_code . PHP_EOL, FILE_APPEND);

    } else {
        echo "Room does not exist.";
        exit;
    }

    // Prepare response data
    $response = [
        'stat' => 'ok',
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
