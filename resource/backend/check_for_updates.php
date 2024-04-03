<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['room_code']) && isset($_POST['username'])) {
    $room_code = $_POST['room_code'];
    $username = $_POST['username'];
    $filename = $room_code . 'update.txt';

    if (file_exists($filename)) {
        // Read the content of the update file
        $updateContent = file_get_contents($filename);

        if (!empty($updateContent)) {
            // Send the update content to the user
            $cards = file($filename, FILE_IGNORE_NEW_LINES);

            $response = [
                'room_code' => $room_code,
                'username' => $username,
                'cards'     => $cards
            ];
        
            // Send JSON response
            header('Content-Type: application/json');
            echo json_encode($response);
            // Empty the update file
            file_put_contents($filename, '');

        } else {
            $response = [
                'stat' => 'nothing yet',
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    } else {
        echo "Update file does not exist.";
    }
} else {
    echo "Invalid request.";
}
?>
