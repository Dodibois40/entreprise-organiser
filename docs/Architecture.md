# Architecture Générale

Ce fichier présente l'architecture globale du projet **Entreprise Organiser**. Il sert de point d'entrée pour comprendre la répartition des différentes briques applicatives et la manière dont elles interagissent.

La plateforme est organisée selon une structure classique :

- Un serveur backend (Node.js/NestJS) responsable de l'API et de la logique métier
- Une application frontend (React) servie par Nginx
- Des services complémentaires comme PostgreSQL pour la base de données et Redis pour le cache

La communication se fait principalement via HTTP/REST, mais d'autres protocoles pourront être utilisés à l'avenir. Ce document sera complété avec des diagrammes et des explications détaillées au fur et à mesure de la conception.
