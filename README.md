# README.md

## Introduction

Ce document explique les choix et décisions pris lors de l'achèvement du `TaskRepository` dans une application utilisant NestJS avec Prisma, qui a été imposé. J'y décris également les défis rencontrés durant cette phase d'implémentation.

## Choix de Conception

1. **Complétion du `TaskRepository`** :
   Étant donné que le `TaskRepository` m'a été fourni de manière incomplète, j'ai dû analyser le code existant et définir les méthodes manquantes en respectant la structure initiale tout en veillant à l'adhésion aux normes de développement.

2. **Modularité et Responsabilité Unique** :
   J'ai conservé le principe de responsabilité unique pour chaque méthode, m'assurant qu'elles effectuent une tâche précise telle que la création, la mise à jour, la suppression ou la récupération de tâches.

3. **Utilisation de Prisma** :
   Bien que Prisma ait été imposé, j'ai tiré parti de ses fonctionnalités, telles que les types sécurisés et les méthodes d'interaction avec la base de données, pour garantir des transactions efficaces et fiables.

## Décisions et Mises en œuvre

- **Ajout de Méthodes** :
   J'ai complété le `TaskRepository` en ajoutant des méthodes manquantes. Par exemple, j'ai mis en place une méthode `update` séparée de `save`, rendant le code plus clair. J'ai veillé à intégrer une logique conditionnelle dans `save` pour gérer à la fois la création et la mise à jour en fonction de la présence d'un `id`.

- **Prise en Main des Types** :
   J'ai utilisé les types `TaskCreateInput` et `TaskUpdateInput` fournis par Prisma pour garantir l'intégrité des données. Cela a été essentiel pour assurer un bon fonctionnement du code tout en limitant les erreurs potentielles.

## Points Sensibles Rencontrés

1. **Incomplétude du Repository** :
   La principale difficulté a été de terminer le `TaskRepository` de manière cohérente tout en respectant la logique du code existant. Cela a nécessité des ajustements et des tests supplémentaires pour s'assurer que toutes les fonctionnalités étaient intégrées de manière fluide.

2. **Gestion des Types** :
   L'utilisation des types `XOR` a apporté une complexité, mais a également été cruciale pour garantir des entrées valides. Cela demande un soin particulier dans la gestion des données pour éviter des erreurs.

3. **Tests Unitaires** :
   L'écriture de tests unitaires pour un code partiellement fourni a nécessité une compréhension approfondie des fonctionnalités attendues. Chaque nouvelle méthode a été testée pour assurer la conformité avec le comportement prévu.

## Conclusion

L'achèvement du `TaskRepository`, dont le modèle de base m'a été fourni, a impliqué plusieurs décisions de conception et des adaptations. J'ai intégré des pratiques de développement solides tout en m'assurant de la lisibilité et de la maintenabilité du code. Bien que confronté à des défis liés à l'incomplétude, mes choix ont été basés sur des principes de modularité et de sécurité des types afin de favoriser une base de code robuste pour l'avenir.