# Backend API --  Système de gestion de ticket

API rest du système de gestion de ticket [Dashboard_Ticketing](https://github.com/Mamednoor/Dashboard_Ticketing)

## `Initialisation du projet`

- Projet initialisé avec Yarn init
- Gestionnaire de packet utilisé : [Yarn](https://yarnpkg.com/)

- Installation des dépendance avec `Yarn`
- Lancement du projet avec la commande : `yarn start`

Le serveur se lancera dans votre terminal
Adresse du serveur : [http://localhost:8080](http://localhost:8080)

## `Variable d'environnement`

Afin de connecter l'api à votre base de donnée merci de créer un fichier .env

Template du fichier .env à renseigner avec vos informations :

```
# General settings
PORT=8080

# Database settings
DB_URL = mongodb://localhost/{nom de la BDD}
DB_USER = {Utilisateur}
DB_PASS = {mot de passe utilisateur}

REDIS_URL = {URL de connexion à redis}

ACCESS_TOKEN = {Clé secrète du JWT pour le décodage}
REFRESH_TOKEN = {Clé secrète du JWT pour le décodage}
REFRESH_TOKEN_EXPIRE = 2 // correspond au délai d'expiration du token

User_MAILER = {Email utilisé pour l'envoi}
Password_MAILER = {Mot de passe de l'email utilisé}

URL_LINK = "http://localhost:3000/" // corresponds à l'url du front

```

## `Liste des routes`

### Routes `Users`

- *Route utilisateurs*

| #   | Routes                    | Methode | Privée     | Description                                                |
| --- | ------------------------- | ------  | ---------- | ---------------------------------------------------------- |
| 1   | `/users`                  | POST    | Non        | Enregistrement d'un utilisateur                            |
| 2   | `/users/profil`           | GET     | Oui        | Get user Info                                              |
| 3   | `/users/profil/:_id`      | PATCH   | Oui        | Modification de ton profil                                 |
| 4   | `/users/login`            | POST    | Non        | Vérification de l'utilisateur et création JWT              |
| 5   | `/users/logout`           | DELETE  | Oui        | Déconnexion et suppression JWT                             |
| 6   | `/users/forgot-password`  | POST    | Non        | Vérification de l'email et envoie code de réinitialisation |
| 7   | `/users/reset-password`   | PATCH   | Non        | Modification du mot de passe                               |
| 8   | `/users/validation`       | PATCH   | Non        | Activation du compte utilisateur                           |

- *Routes des utilisateurs admin uniquement*

| #   | Routes                     | Methode | Privée     | Description                                      |
| --- | -------------------------- | ------- | ---------- | ------------------------------------------------ |
| 1   | `/users/create-user`       | POST    | Oui        | Création d'un utilisateur par un admin           |
| 2   | `/users/user-list`         | GET     | Oui        | Récupération de tout les utilisateurs            |
| 3   | `/users/user-details/:_id` | GET     | Oui        | Détails d'un utilisateur par son ID              |
| 4   | `/users/delete-user/:_id`  | DELETE  | Oui        | Suppression d'un utilisateur par son ID          |
| 5   | `/users/update-user/:_id`  | PATCH   | Oui        | Modification d'un utilisateur par son ID         |

### Routes `Tickets`

- *Route utilisateurs*

| #   | Routes                      | Methode | Privée   | Description                                         |
| --- | --------------------------- | ------- | -------- | --------------------------------------------------- |
| 1   | `tickets`                   | GET     | Oui      | Récupération des tickets par l'utilisateur connecté |
| 2   | `tickets/:_id`              | GET     | Oui      | Détails d'un ticket par son ID                      |
| 3   | `tickets/add-ticket`        | POST    | Oui      | Création d'un ticket                                |
| 4   | `tickets/:_id`              | PUT     | Oui      | Update du ticket " Réponse à l'admin " par son ID   |

- *Routes des utilisateurs admin uniquement*

| #   | Routes                           | Methode | Privée   | Description                                              |
| --- | -------------------------------- | ------- | -------- | -------------------------------------------------------- |
| 1   | `tickets/all`                    | GET     | Oui      | Récupération de tout les tickets                         |
| 2   | `tickets/all/:_id`               | GET     | Oui      | Détails d'un ticket par son ID                           |
| 3   | `tickets/all/:_id`               | PUT     | Oui      | Update du ticket " Réponse à l'utilisateur "             |
| 4   | `tickets/close-ticket/:_id`      | PATCH   | Oui      | Fermeture du status d'un ticket " Fermé " par son ID     |
| 5   | `tickets/inprogress-ticket/:_id` | PATCH   | Oui      | Changement du status d'un ticket " En Cours " par son ID |
| 6   | `tickets/:_id`                   | DELETE  | Oui      | Suppression d'un ticket par son ID                       |

### Route `Tokens`

- *Renouvellement du token à la connexion*

| #   | Routes      | Méthode | Privée   | Description            |
| --- | ----------- | ------- | -------- | ---------------------- |
| 1   | `/tokens`   | GET     | No       | Renouvellement du JWT  |


## `Dépendances`

- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)  
- [jsonwebtoken](https://jwt.io/)  
- [body-parser](https://github.com/expressjs/body-parser#readme)  
- [cors](https://yarnpkg.com/package/cors#installation)  
- [morgan](https://yarnpkg.com/package/morgan)  
- [helmet](https://yarnpkg.com/package/helmet)  
- [joi](https://joi.dev/api/?v=17.5.0)  
- [dotenv](https://yarnpkg.com/package/dotenv)  
- [express](https://expressjs.com/fr/)  
- [mongoose](https://mongoosejs.com/)  
- [redis](https://redis.io/)  
- [nodemailer](https://nodemailer.com/about/)  
- [nodemon](https://yarnpkg.com/package/nodemon)
