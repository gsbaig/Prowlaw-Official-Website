<?php
// Include PHPMailer classes (You will need to upload the PHPMailer folder to cPanel)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// We will assume the PHPMailer folder is uploaded next to this script in the public_html directory
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    $input = $_POST;
}

if (empty($input)) {
    http_response_code(400);
    echo json_encode(["error" => "Empty payload"]);
    exit();
}

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
// SMTP CONFIGURATION (Fill this out in cPanel!)
// ==========================================
$smtpHost = 'mail.prolaw-jordan.com'; // Usually mail.yourdomain.com
$smtpUser = 'info@prolaw-jordan.com'; // Your full email address
$smtpPass = 'YOUR_EMAIL_PASSWORD_HERE'; // Replace with your actual email password
$smtpPort = 465; // Usually 465 for SSL, or 587 for TLS
$toAdminEmail = 'info@prolaw-jordan.com';

// 1. Email to the Firm (Admin)
$adminSubject = "New Contact Form Submission from $name";
$adminBody = "
<html>
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

// 2. Email to the User (Submitter)
$userSubject = "Thank you for contacting Prolaw Law Firm";
$userBody = "
<html>
<body>
  <h3>Dear $name,</h3>
  <p>Thank you for contacting us. Our team will contact you accordingly.</p>
  <p>This is a confirmation of the details you submitted:</p>
  <blockquote style='border-left: 4px solid #ccc; padding-left: 10px; color: #555;'>
    <p><strong>Expertise Area:</strong> $expertise</p>
    <p><strong>Message:</strong><br/>" . nl2br($message) . "</p>
  </blockquote>
  <br/>
  <p>Best regards,</p>
  <p><strong>Prolaw Law Firm</strong></p>
</body>
</html>
";

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable implicit SSL encryption
    $mail->Port       = $smtpPort;
    
    // Set sender info
    $mail->setFrom($smtpUser, 'Prolaw Law Firm');
    
    // --- SEND TO ADMIN ---
    $mail->addAddress($toAdminEmail);
    $mail->addReplyTo($email, $name);
    $mail->isHTML(true);
    $mail->Subject = $adminSubject;
    $mail->Body    = $adminBody;
    $mail->send();
    
    // --- SEND TO USER ---
    $mail->clearAllRecipients(); // Clear admin address
    $mail->clearReplyTos();      // Clear reply-to
    
    $mail->addAddress($email, $name);
    $mail->Subject = $userSubject;
    $mail->Body    = $userBody;
    $mail->send();
    
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Emails sent successfully"]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
?>
