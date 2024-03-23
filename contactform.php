<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check for empty fields
    if(empty($_POST['firstname']) || empty($_POST['lastname']) || empty($_POST['email']) || empty($_POST['subject'])) {
        echo "Please fill out all required fields.";
        exit;
    }

    // Get form data
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];

    // Set up email parameters
    $to = "jasmeenjanda@gmail.com"; // Replace with your email address
    $subject = "Contact Form Submission from $firstname $lastname";
    $message = "First Name: $firstname\n";
    $message .= "Last Name: $lastname\n";
    $message .= "Email: $email\n";
    $message .= "Message:\n$subject";

    // Send email
    if (mail($to, $subject, $message)) {
        echo "Thank you for your message. We will get back to you soon!";
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} 
else 
{
    echo "Access denied";
}
?>
