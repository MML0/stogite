<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['room_code'])) {
    $room_code = $_POST['room_code'];
    $filename = $room_code . '.txt';

    if (file_exists($filename)) {
        $users = file($filename, FILE_IGNORE_NEW_LINES);

        // Loop through each username and delete the user's file
        foreach ($users as $username) {
            $userFilename = $room_code . '_' . $username . '.txt';

            if (file_exists($userFilename)) {
                unlink($userFilename); // Delete the user's file
            }
        }

        // Optionally, you can delete the main room file if needed
        // unlink($filename);

        echo "All user files have been cleared for the next round.";
    } else {
        echo "Room does not exist.";
    }
} else {
    echo "Invalid request.";
}
?>
