<?php
header('Content-Type: application/json');

$diagnostic = [
    'status' => 'OK',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => $_SERVER['SERVER_NAME'] ?? 'Unknown',
    'php_version' => phpversion(),
    'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown',
    'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'Unknown',
    'request_uri' => $_SERVER['REQUEST_URI'] ?? 'Unknown',
    'method' => $_SERVER['REQUEST_METHOD'] ?? 'Unknown',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
];

echo json_encode($diagnostic, JSON_PRETTY_PRINT);
?>
