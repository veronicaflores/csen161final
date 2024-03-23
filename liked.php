<?php
$likedPhotos = json_decode($_COOKIE['likedPhotos'] ?? '[]', true);

?>
<!-- Database connection parameters
$servername = "localhost"; // Change this to your database server name
$username = "username"; // Change this to your database username
$password = "password"; // Change this to your database password
$dbname = "thriftit"; // Change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch liked images from the database
$sql = "SELECT id, title, image_url FROM liked_images";
$result = $conn->query($sql);

$likedImages = array();

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        // Add each liked image data to the array
        $likedImages[] = array(
            "photoId" => $row["photoId"],
            "title" => $row["title"],
            "imageUrl" => $row["image_url"]
        );
    }
} else {
    // No liked images found
    echo json_encode(array("error" => "No liked images found"));
}

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        // Display each liked image as a grid item
        echo '<div class="grid-item">';
        echo '<img src="' . $row["image_url"] . '" alt="' . $row["title"] . '">';
        echo '</div>';
    }
} else {
    echo "0 results";
}

$conn->close();
// Output the liked images as grid items
foreach ($likedImages as $image) {
    echo '<div class="grid-item">';
    echo '<img src="' . $image["imageUrl"] . '" alt="' . $image["title"] . '">';
    echo '</div>';
}
 -->