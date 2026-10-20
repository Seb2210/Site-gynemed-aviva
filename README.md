# Site du réseau Gynemed

Site statique (HTML, CSS, JavaScript, sans dépendance ni traceur) pour le réseau des centres de santé du Marais et Médéor. Sa structure reprend celle du site aliva-health.com : bandeau animé, présentation, sections éditoriales illustrées, encadré de contact, pied de page. Le contenu est réécrit pour le réseau.

| Page | Contenu |
|---|---|
| `index.html` | Gynemed, le réseau : présentation, accès aux soins, ligne directrice, marques, fonctions support, implantations, contact |
| `medeor.html` | Médéor : rendez-vous, équipe, soins, centres |
| `marais.html` | Centres de santé du Marais, Gynécéa, Millésime : rendez-vous, histoire, soins, centres |
| `mentions-legales.html` | Éditeur, information du public (CSP, art. L. 6323-1-9), données personnelles, cookies |

Chaque page fixe sa palette par une classe sur `<body>` (`brand-gynemed`, `brand-medeor`, `brand-marais`), définie en tête de `assets/css/site.css`. Les logos sont des pictogrammes provisoires en SVG, à remplacer par les logos officiels.

## Éléments à compléter

Les informations manquantes sont visibles dans les pages, entre crochets et surlignées (classe `todo`), et les liens à brancher portent un attribut `data-todo` :

- adresses, horaires, téléphones et liens de rendez-vous en ligne de chaque centre ;
- liste des centres Médéor, marque des sites de Villerest, Montluel, Saint-Alban-de-Roche, Chauffailles, Roubaix et Valenciennes ;
- adresse électronique de contact Gynemed ;
- mentions légales : RNA ou SIRET, directeur de la publication, hébergeur, contact données personnelles, associations gestionnaires.

## Voir le site en local

```
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000. Le site peut être déposé tel quel sur n'importe quel hébergement statique (Netlify, OVH, etc.).
