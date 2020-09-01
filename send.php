<?php

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$email = $_POST['email'];
$phone = $_POST['phone'];
$comment = $_POST['comment'];


// шаблон письма
$title = "Обратная связь:";
$body = "
<h2>Новое письмо</h2>
<b>Телефон:</b> $phone<br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$comment
";

// Валидация почты
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

    // конфиг PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();   
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth   = true;
        //$mail->SMTPDebug = 2;
        $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

        $mail->Host       = 'smtp.yandex.ru'; 
        $mail->Username   = 'ishmenevev'; 
        $mail->Password   = 'test-mailer'; 
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('ishmenevev@yandex.ru', 'Евгений');

        // Получатель письма
        $mail->addAddress('ishmenevev@mail.ru');  

        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $body;    

        // проверка при отправлении
        if ($mail->send()) {
            $result = "success";
        } else {
            $result = "error";
        }

    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }
} else {
	$result = "email";
}
// общий результат
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

?>
