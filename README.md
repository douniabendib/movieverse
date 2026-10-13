# MovieVerse

Application web React pour explorer un catalogue de films, rechercher, filtrer, consulter les détails et gérer une liste de favoris, avec l'API publique TMDB.

## Fonctionnalités
- Page **Trending** : films tendances de la semaine (poster, titre, note, date de sortie)
- **Recherche** par titre avec debounce, et message quand il n'y a aucun résultat
- **Filtre** par année et **tri** par popularité, note ou date de sortie
- Page **Détails** : poster, titre, description, genres, durée, note
- **Favoris** : ajout et suppression depuis la page Détails, liste dédiée, persistance avec `localStorage`
- Gestion des états de **chargement** et d'**erreur**
- Composants réutilisables (`MovieCard`) et hooks personnalisés (`useFavorites`, `useDebounce`)

## Stack technique
- React + Vite
- React Router
- API TMDB (The Movie Database)
- `localStorage` pour la persistance des favoris

## Installation
```bash
git clone https://github.com/douniabendib/movieverse.git
cd movieverse
npm install
```

## Configuration de la clé API
1. Créez un compte sur [developer.themoviedb.org](https://developer.themoviedb.org) et générez une clé API gratuite.
2. Copiez le fichier `.env.example` en `.env` à la racine du projet.
3. Remplacez la valeur par votre clé :
```
VITE_TMDB_API_KEY=votre_cle_api
```
Le fichier `.env` est ignoré par Git : la clé n'est jamais publiée.

## Lancement
```bash
npm run dev
```
Puis ouvrez l'adresse affichée dans le terminal (par défaut `http://localhost:5173`).

## Structure du projet
```
src/
  components/   composants réutilisables (Navbar, MovieCard)
  pages/        pages de l'application (Trending, MovieDetails, Favorites)
  services/     appels à l'API TMDB
  hooks/        hooks personnalisés (useFavorites, useDebounce)
```

## Routes
| Chemin | Page |
|---|---|
| `/` | Films tendances, recherche, filtre et tri |
| `/movie/:id` | Détails d'un film |
| `/favorites` | Liste des favoris |

## Choix techniques
- **Debounce** : la recherche attend 400 ms après la dernière frappe avant d'appeler l'API, pour éviter une requête par lettre.
- **Hooks personnalisés** : la logique des favoris et du debounce est écrite une fois et réutilisée.
- **Filtre et tri** : sans texte de recherche, l'endpoint `discover` de TMDB filtre et trie côté serveur. Avec une recherche par titre, le filtre et le tri sont appliqués côté client.

## Limites connues
- Avec une recherche par titre, le filtre par année et le tri portent uniquement sur les 20 premiers résultats.
- Pas de pagination pour l'instant.

## Améliorations prévues
- Pagination ou défilement infini
- Mode sombre, skeleton loading et design responsive
- Tri et filtre sur toutes les pages de résultats de recherche

## Crédits
Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB. Données et images : [TMDB](https://www.themoviedb.org).