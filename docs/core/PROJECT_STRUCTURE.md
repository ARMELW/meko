
## 📂 **Structure du projet**

La structure de base utilisée dans ce projet est basé sur la repository [bulletproof-react](https://github.com/alan2207/bulletproof-react/) :

```
├── docs                  # Documentation du projet, guides techniques ou fonctionnels.
├── public                # Fichiers statiques accessibles publiquement (favicon, images, etc.).
├── src                   # Dossier source principal contenant tout le code applicatif.
│   ├── app               # Tout ce qui est en rapport au feature : component, hooks, logic, type, ...
│   │   ├── ...          
│   ├── assets            # Fichiers statiques utilisés dans le code (images, icônes, polices...).
│   ├── components        # Composants UI réutilisables classés par niveau d'abstraction (Atomic Design).
│   ├── config            # Fichiers de configuration depuis notre .env
│   ├── hooks             # Custom React Hooks partagés/global dans toute l’application.
│   ├── utils               # Fonctions utilitaires, helpers globaux, bibliothèques internes. 
│   ├── pages             # Les pages du routeur, organisées par feature (route-level components).
│   │   └──  ...           
│   ├── routes            # Définition des routes (privées/publiques), chemins, navigation et data.
│   ├── services          # Intégration avec les API externes ou internes.
│   │   ├── api           # Services API centralisés
│   │   ├── session       # Gestion des sessions utilisateur (auth state, token refresh...).
│   │   └── ...
│   ├── main.tsx          # Point d’entrée principal React : hydrate l’application dans le DOM.
│   ├── index.css         # Fichier CSS principal (base styles, Tailwind, resets...).
│   ├── App.tsx           # Composant racine de l’application avec structure de routes/layout.
│   ├── bootstrap.ts      # Initialisation globale (services, contextes, listeners...).
│   └── vite-env.d.ts     # Déclaration des types pour Vite (env vars, assets...).
├── tsconfig.app.json     # Configuration TypeScript spécifique à l’application (frontend).
├── tsconfig.json         # Fichier racine de config TypeScript (étend d’autres tsconfig).
├── tsconfig.node.json    # Configuration TS dédiée à l’environnement Node.js (scripts, tooling).
├── eslint.config.js      # Configuration ESLint pour le linting du code TypeScript/JS.
├── index.html            # Fichier HTML de base injecté par Vite avec le point d’entrée.
├── package.json          # Dépendances du projet, scripts, métadonnées du package.
├── package-lock.json     # Verrouillage des dépendances pour une installation reproductible.
├── components.json       # Définition des chemins pour les composants basés shadcn
└── vite.config.ts        # Configuration de Vite (build, alias, plugins, env vars...).
```

### 1. Principes de structure :

- **Séparation des préoccupations** : Les composants sont séparés en fonction de leur rôle. Les **composants réutilisables** se trouvent dans `src/components/`, tandis que les **écrans** sont regroupés dans `/src/pages/`. 
- **Regroupement par fonctionnalités** : Le dossier `/src/app` regroupe les composants liés à une fonctionnalité spécifique `/src/app/[feature]/components`, les données nécessaires `/src/app/[feature]/data.ts`, les utilitaires `/src/app/[feature]/feature`, les types `/src/app/[feature]/api` et les requetes `/src/app/[feature]`. Cela permet de centraliser tout ce qui est pertinent pour une fonctionnalité donnée, facilitant ainsi la compréhension et la maintenance.
- **Réutilisabilité** : Les composants sont conçus pour être réutilisables à travers l'application, ce qui réduit la duplication de code et favorise la cohérence.
- **Modularité** : La logique métier est isolée dans des fichiers spécifiques : `hooks` ou des logiques spécifiques `helpers` pour éviter de mélanger logique et présentation.
- **Extensibilité** : La structure permet d'ajouter facilement de nouvelles fonctionnalités sans perturber l'architecture existante. Les nouveaux modules peuvent être ajoutés dans `/src/app/[feature]`.

### 2. Structure du dossier `src/components`

Le dossier `src/components` suit l'architecture [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/#templates) :

```
├── atoms         # Composants les plus basiques (boutons, inputs, icônes...).
├── molecules     # Combinaisons simples d’atoms (ex: champ de formulaire avec label).
├── organisms     # Combinaisons complexes de composants (ex: carte utilisateur, header).
├── templates     # Layouts ou structures de pages avec placeholders pour du contenu.
└── ui            # Composants UI partagés basé shadcn sans dépendance métier (ex: modals, tooltips).  
```

#### Atoms
Les **atoms** sont les composants les plus simples et les plus basiques. Ce sont les éléments fondamentaux qui ne peuvent pas être décomposés davantage. 
<!-- Par rapport à notre design system, 

- Des boutons (`Button`)
- Des champs de texte (`TextInput`)
- Des étiquettes (`Text`)
- Des icônes (`Icon`) -->

#### Molécules
Les **molecules** sont des combinaisons de atoms qui travaillent ensemble pour accomplir une fonction simple. Elles encapsulent des interactions entre plusieurs éléments atomiques.

Exemple : Un champ de recherche (combinant un champ de texte et un bouton)

#### Organismes
Les organisms sont des combinaisons de molecules (et parfois d'atoms) qui forment des sections distinctes de l'interface utilisateur. Ce sont des composants plus complexes qui peuvent inclure des interactions et des fonctionnalités plus avancées.

Exemple : Une carte de profil utilisateur avec une photo, un nom et des informations supplémentaires.

#### Templates
Les templates sont des objets au niveau de la page qui organisent des composants dans une mise en page spécifique et articulent la structure de contenu sous-jacente du design. Ils servent de modèles pour les écrans ou les pages complètes de l'application.

### 3. Structure du dossier `src/app/[feature]`

Le dossier `src/app` regroupe les modules par fonctionnalité, ce qui permet de maintenir la logique et les composants associés à une fonctionnalité spécifique en un seul endroit. Voici une structure typique :
```
├── app               # Tout ce qui est en rapport au feature 
│   ├── [feature_name]/
│   │   ├── helpers/        # Fonctions utilitaires ou logiques spécifiques à la fonctionnalité
│   │   ├── hooks/          # Hooks React personnalisés pour cette fonctionnalité
│   │   ├── components/     # Composants spécifiques à cette fonctionnalité
│   │   ├── api/            # Requêtes API spécifiques à cette fonctionnalité
│   │   ├── data.ts         # Données nécessaires à la fonctionnalité
│   │   ├── types.ts        # Types TypeScript spécifiques à la fonctionnalité
│   │   └── index.ts        # Point d'entrée pour exporter les ressources de la fonctionnalité
└── ...
```

#### Dossier `helpers/`
Le dossier `helpers` contient des fonctions utilitaires ou logiques spécifiques à la fonctionnalité qui ne sont pas directement liées à l'interface utilisateur. Ces fonctions peuvent inclure la manipulation de données, des transformations ou des calculs réutilisables.

#### Dossier `hooks/`
Ce dossier regroupe les hooks React personnalisés créés spécifiquement pour cette fonctionnalité. Ces hooks encapsulent des logiques réutilisables liées à l'état, aux effets ou aux actions asynchrones, comme les appels API.

#### Dossier `components/`
Le dossier `components` contient les composants spécifiques à la fonctionnalité. Ces composants sont isolés pour répondre aux besoins de cette fonctionnalité particulière.

#### Dossier `api/`
Le dossier `api` regroupe les fichiers contenant les requêtes API spécifiques à la fonctionnalité. Chaque fichier peut correspondre à un ensemble d'appels API liés.

#### Fichier `data.ts`
Le fichier `data.ts` centralise les données nécessaires à la fonctionnalité, comme des objets de configuration ou des données statiques.

#### Fichier `types.ts`
Le fichier `types.ts` contient les types TypeScript spécifiques à la fonctionnalité, comme les interfaces, types ou énumérations (enums). Cela garantit une meilleure vérification de type et une maintenance facilitée.

#### Fichier `index.ts`
Le fichier `index.ts` sert de point d'entrée pour exporter toutes les ressources de la fonctionnalité, comme les composants, hooks, helpers, ou types. Cela simplifie les imports et améliore l'organisation du code.
<!-- 
### 4. **Typage**

Les types sont utilisés à plusieurs niveaux pour structurer et garantir la robustesse du code TypeScript. Il est indispensable de **typer** nos composants, nos fonctions, et de les **mettre à jour** nos types. Voici un aperçu des différentes catégories de types et leur emplacement :

#### Dans le dossier `src/shared/types/`
1. **Types pour les entités** : Définitions des entités de domaine, par exemple, les utilisateurs, les produits ou les articles, souvent reçues via des API.
2. **Types utilitaires** : Types réutilisables dans tout le projet, comme les types génériques, les types de fonction, ou les alias.
3. **Types de navigation** : Typage des routes et des paramètres de navigation utilisés dans le projet (React Navigation).

#### Dans le dossier `src/shared/stores`
4. **Types des stores** : Typage des états globaux gérés par des stores comme **Zustand** ou tout autre gestionnaire d'état. Ces types incluent les structures des états et les actions de modification.

#### Dans le dossier `src/shared/themes`
5. **Types pour le thème** : Typage des styles globaux et des design tokens utilisés dans les composants UI. Cela inclut les couleurs, polices, tailles, et autres variables de style.

#### Dans le dossier `src/shared/components` et `src/features/...`
6. **Types des components** : Définition des types des `props` pour les composants UI. Ces types incluent les propriétés passées aux composants réutilisables et les types spécifiques aux composants atomiques, moléculaires, et plus complexes.
  
#### Dans le dossier `src/features/...`
7. **Types des API** : Types pour la gestion des données provenant des appels API, y compris les types des réponses, les requêtes, et les erreurs.
8. **Types des contextes** : Typage des données partagées via les contextes React, permettant de définir l'état global ou local d'une fonctionnalité particulière.
9. **Types des schémas** : Types liés aux schémas de validation (par exemple, via **Yup** ou **Zod**) pour la validation des données avant de les consommer dans l'application.

Cette organisation des types garantit une structuration claire et centralisée pour les entités importantes, tout en maintenant la flexibilité d'ajouter des types spécifiques dans les fonctionnalités.
 -->
