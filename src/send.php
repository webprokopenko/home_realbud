<?php

$mails = array('adv@realbud.com.ua');
define('MAIL_SUBJECT', 'Новая заявка с сайта HOME РЕАЛ КАПИТАЛ БУД Home');

$headers   = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/plain; charset=utf-8";
$headers[] = "X-Mailer: PHP/".phpversion();

(isset($_POST['name'])) ? $name = 'Имя заказчика: ' . htmlspecialchars($_POST['name']) . "\n": $name = '';
(isset($_POST['phone'])) ? $phone = 'Телефон заказчика: ' . htmlspecialchars($_POST['phone']) . "\n": $phone = '';
(isset($_POST['email'])) ? $email = 'Почта заказчика: ' . htmlspecialchars($_POST['email']) . "\n": $email = '';
(isset($_POST['from'])) ? $from = 'Откуда: ' . htmlspecialchars($_POST['from']) . "\n": $from = '';

$result = true;

foreach ($mails as $val) {
    if (!mail($val, MAIL_SUBJECT, $name . $phone . $email . $from , implode("\r\n", $headers))) {
        $result = false;
        break;
    }
}

if ($result) {
    header('Location: thanks.html');
    exit;
}
?>