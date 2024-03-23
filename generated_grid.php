<?php
// Assuming data.json is in the same directory
$data = json_decode(file_get_contents('data.json'), true);
foreach ($data as $item) {
    echo "hi";
    echo '<div class="grid-item">';
    //echo '<img src="' . $item['imageUrl'] . '" alt="' . $item['title'] . '">';
    echo '<div class="like-button">Like</div>'; // Adding like button
    //echo '<div class="save-button">&#x1F4BE;</div>'; // Unicode character for floppy disk
    echo '</div>';
}
?>
