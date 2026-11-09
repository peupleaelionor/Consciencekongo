# Temple Sirius

Boutique numérique de **Guide Sirius**, école **Conscience Kongo**.

Quatre seuils :

| Produit | Prix |
|---|---|
| L'Aigle de Sirius (phare) | 247 € |
| Le Sceau d'Ankh | 47 € |
| Double Astre | 97 € |
| L'Arbre Fermé | 490 € |

Le sceau de l'école est dans `public/brand/logo.jpg`.

## Déploiement Vercel

Le dépôt est prêt pour un import GitHub. Rien à configurer à la main.

1. Ouvrir [Importer Consciencekongo sur Vercel](https://vercel.com/new/clone?repository-url=https://github.com/peupleaelionor/Consciencekongo).
2. Choisir le compte Vercel, laisser la branche **main**.
3. Ne pas ajouter de variable d'environnement. Ne pas changer la commande de build. Ne pas remplir « Output Directory » : le build écrit l'API de sortie Vercel (`.vercel/output`), pas un dossier `dist`.
4. Lancer **Deploy**.

Node 22 et la région Paris (`cdg1`) sont déjà fixés. Le paiement n'est pas branché : la page confirme une demande, elle ne prélève rien.

