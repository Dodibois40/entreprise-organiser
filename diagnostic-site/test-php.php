<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Test PHP</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .info { background: #e7f3ff; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🐘 Test PHP</h1>
    
    <div class="info">
        <h3>📊 Informations serveur :</h3>
        <p><strong>PHP Version :</strong> <?php echo phpversion(); ?></p>
        <p><strong>Serveur :</strong> <?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Non défini'; ?></p>
        <p><strong>Document Root :</strong> <?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'Non défini'; ?></p>
        <p><strong>Script Name :</strong> <?php echo $_SERVER['SCRIPT_NAME'] ?? 'Non défini'; ?></p>
        <p><strong>Request URI :</strong> <?php echo $_SERVER['REQUEST_URI'] ?? 'Non défini'; ?></p>
    </div>
    
    <div class="info">
        <h3>📂 Structure de dossiers :</h3>
        <pre><?php 
        $dir = __DIR__;
        echo "Dossier actuel : $dir\n";
        echo "Contenu :\n";
        $files = scandir($dir);
        foreach($files as $file) {
            if($file != '.' && $file != '..') {
                echo "  - $file\n";
            }
        }
        ?></pre>
    </div>
    
    <div class="info">
        <h3>🔍 Variables d'environnement :</h3>
        <pre><?php
        foreach($_SERVER as $key => $value) {
            if(strpos($key, 'HTTP_') === 0 || strpos($key, 'REQUEST_') === 0) {
                echo "$key = $value\n";
            }
        }
        ?></pre>
    </div>
</body>
</html>
