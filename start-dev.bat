@echo off
REM Script de démarrage pour Windows
REM Backend: http://localhost:8000
REM Frontend: http://localhost:8080

echo 🚀 Démarrage des serveurs de développement...
echo 📂 Backend: http://localhost:8000
echo 🌐 Frontend: http://localhost:8080
echo.

REM Démarrer le backend dans une nouvelle fenêtre
echo 🔧 Démarrage du backend...
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Attendre un peu
timeout /t 3 /nobreak >nul

REM Démarrer le frontend dans une nouvelle fenêtre
echo 🎨 Démarrage du frontend...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Serveurs démarrés avec succès !
echo 📝 Backend API: http://localhost:8000/api
echo 📊 Swagger Docs: http://localhost:8000/api/docs
echo 🌐 Frontend: http://localhost:8080
echo.
echo 💡 Fermez les fenêtres de commande pour arrêter les serveurs
pause 