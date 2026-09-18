<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // For testing/CORS
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// Read the JSON payload from the request body
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON payload"]);
    exit();
}

// Sanitize inputs
$name = isset($input['name']) ? htmlspecialchars(trim($input['name'])) : '';
$email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($input['phone']) ? htmlspecialchars(trim($input['phone'])) : '';
$expertise = isset($input['expertise']) ? htmlspecialchars(trim($input['expertise'])) : '';
$message = isset($input['message']) ? htmlspecialchars(trim($input['message'])) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email address format"]);
    exit();
}

// ==========================================
// CONFIGURATION: Set your email addresses here
// ==========================================
$toAdminEmail = "info@prolaw-jordan.com"; 
$fromEmail = "info@prolaw-jordan.com"; // Ensure this matches your cPanel domain!

// 1. Email to the Firm (Admin)
$adminSubject = "New Contact Form Submission from $name";
$adminMessage = "
<html>
<head>
  <title>New Contact Form Submission</title>
</head>
<body>
  <h3>New Contact Form Submission</h3>
  <p><strong>Name:</strong> $name</p>
  <p><strong>Email:</strong> $email</p>
  <p><strong>Phone:</strong> $phone</p>
  <p><strong>Expertise Area:</strong> $expertise</p>
  <p><strong>Message:</strong></p>
  <p>" . nl2br($message) . "</p>
</body>
</html>
";

$adminHeaders = "MIME-Version: 1.0" . "\r\n";
$adminHeaders .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$adminHeaders .= "From: Contact Form <$fromEmail>" . "\r\n";
$adminHeaders .= "Reply-To: $email" . "\r\n";

// 2. Email to the User (Submitter)
$userSubject = "We received your message";
$userMessage = "
<html>
<head>
  <title>We received your message</title>
</head>
<body>
  <h3>Dear $name,</h3>
  <p>Thank you for reaching out to Prolaw Law Firm. We have successfully received your message.</p>
  <p>This is a confirmation of the details you submitted:</p>
  <blockquote style='border-left: 4px solid #ccc; padding-left: 10px; color: #555;'>
    <p><strong>Expertise Area:</strong> $expertise</p>
    <p><strong>Message:</strong><br/>" . nl2br($message) . "</p>
  </blockquote>
  <p>Our team will review your inquiry and get back to you shortly.</p>
  <br/>
  <p>Best regards,</p>
  <p><strong>Prolaw Law Firm</strong></p>
</body>
</html>
";

$userHeaders = "MIME-Version: 1.0" . "\r\n";
$userHeaders .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$userHeaders .= "From: Prolaw Law Firm <$fromEmail>" . "\r\n";

// Send Emails using PHP mail()
$adminSent = mail($toAdminEmail, $adminSubject, $adminMessage, $adminHeaders);
$userSent = mail($email, $userSubject, $userMessage, $userHeaders);

if ($adminSent) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Emails sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email. Please check your cPanel mail server configuration."]);
}
?>
