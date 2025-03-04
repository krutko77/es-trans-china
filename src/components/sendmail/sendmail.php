<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);


$mail->isSMTP();                                            //Send using SMTP
$mail->Host       = 'smtp.timeweb.ru';                     //Set the SMTP server to send through
$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
$mail->Username   = 'drivers-lending77@es-trans.ru';                     //SMTP username
$mail->Password   = 'es-trans77';                               //SMTP password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
$mail->Port       = 465;


//От кого письмо
$mail->setFrom('es-trans.ru', 'Сайт ЕС Транс'); // Указать нужный E-mail
//Кому отправить
$mail->addAddress('kpv@es-trans.pro'); // Указать нужный E-mail 
//Тема письма
$mail->Subject = 'Привет! Это запрос с сайта ЕС Тзанс.';

//Тело письма
$body = '<h1>Запрос</h1>';
//Форма по услугам растаможки
if (trim(!empty($_POST['company-name-customs']))) {
	$body .= '<p><strong>Название компании:</strong> ' . $_POST['company-name-customs'] . '</p>';
}
if (trim(!empty($_POST['first-name-customs']))) {
	$body .= '<p><strong>Имя:</strong> ' . $_POST['first-name-customs'] . '</p>';
}
if (trim(!empty($_POST['tel-customs']))) {
	$body .= '<p><strong>Телефон:</strong> ' . $_POST['tel-customs'] . '</p>';
}
if (trim(!empty($_POST['email-customs']))) {
	$body .= '<p><strong>Email:</strong> ' . $_POST['email-customs'] . '</p>';
}
if (trim(!empty($_POST['text-message-customs']))) {
	$body .= '<p><strong>Сообщение:</strong> ' . $_POST['text-message-customs'] . '</p>';
}

//Форма по вакансиям менеджера или логиста
if (trim(!empty($_POST['first-name-offer']))) {
	$body .= '<p><strong>Имя:</strong> ' . $_POST['first-name-offer'] . '</p>';
}
if (trim(!empty($_POST['last-name-offer']))) {
	$body .= '<p><strong>Фамилия:</strong> ' . $_POST['last-name-offer'] . '</p>';
}
if (trim(!empty($_POST['tel-customs']))) {
	$body .= '<p><strong>Телефон или мессенджер:</strong> ' . $_POST['tel-customs'] . '</p>';
}
if (trim(!empty($_POST['email-customs']))) {
	$body .= '<p><strong>Email:</strong> ' . $_POST['email-customs'] . '</p>';
}
if (trim(!empty($_POST['text-message-customs']))) {
	$body .= '<p><strong>Сообщение:</strong> ' . $_POST['text-message-customs'] . '</p>';
}
//Форма по вакансии водителя
if (trim(!empty($_POST['name-driver']))) {
	$body .= '<p><strong>Имя и фамилия:</strong> ' . $_POST['name-driver'] . '</p>';
}
if (trim(!empty($_POST['tel-driver']))) {
	$body .= '<p><strong>Телефон или мессенджер:</strong> ' . $_POST['tel-driver'] . '</p>';
}

// Проверка на бота
if ($_POST['code'] != 'NOSPAM') {
	exit;
}

$mail->Body = $body;

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
