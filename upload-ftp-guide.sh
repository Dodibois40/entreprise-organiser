#!/bin/bash

# Guide d'upload FTP pour O2Switch
echo "📁 Guide d'Upload FTP pour O2Switch"
echo "===================================="
echo ""

# Informations de connexion
echo "🔐 Informations de connexion FTP :"
echo "Hôte : volant.o2switch.net"
echo "Port : 21"
echo "Utilisateur : cexe9174"
echo "Mot de passe : rm9q-Pagd-QKP!"
echo ""

# Instructions FileZilla
echo "📋 Instructions avec FileZilla :"
echo "1. Téléchargez FileZilla (gratuit) : https://filezilla-project.org/"
echo "2. Lancez FileZilla"
echo "3. Connectez-vous avec les infos ci-dessus"
echo "4. Dans la partie droite (serveur), naviguez vers /public_html/"
echo "5. Dans la partie gauche (local), naviguez vers votre dossier deploy/"
echo "6. Glissez-déposez le fichier .htaccess vers /public_html/"
echo ""

# Instructions ligne de commande
echo "💻 Upload automatique via lftp :"
echo "Commande à exécuter :"
echo "lftp -c \"open -u cexe9174,'rm9q-Pagd-QKP!' volant.o2switch.net; put deploy/.htaccess -o public_html/.htaccess; quit\""
echo ""

# Vérifier si lftp est installé
if command -v lftp &> /dev/null; then
    echo "✅ lftp est installé. Voulez-vous uploader maintenant ? (o/n)"
    read -r response
    if [[ "$response" =~ ^[OoYy]$ ]]; then
        echo "📤 Upload du fichier .htaccess..."
        lftp -c "open -u cexe9174,'rm9q-Pagd-QKP!' volant.o2switch.net; put deploy/.htaccess -o public_html/.htaccess; quit"
        echo "✅ Upload terminé !"
        echo "🌐 Testez votre site : http://votre-domaine.com"
    fi
else
    echo "⚠️  lftp n'est pas installé."
    echo "Pour installer : sudo apt-get install lftp"
fi

echo ""
echo "🎯 Après l'upload :"
echo "- Votre domaine redirigera vers entreprise-organiser/"
echo "- Frontend : https://votre-domaine.com"
echo "- API : https://votre-domaine.com/entreprise-organiser/backend/api/" 