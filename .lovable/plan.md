1. Anchor
- Sprint Review Dashboard est une app client-side de présentation de métriques Agile à partir d'exports CSV Jira.
- ReviewPage affiche déjà un empty state structuré (classe `.empty-state`, emoji, titre, texte, bouton vers /admin).
- ForecastPage affiche deux états vides en "quick & dirty" Tailwind inline : un quand `csvLoaded === false` et un autre quand les données sont insuffisantes pour la simulation Monte Carlo.
- AdminPage est déjà renommée "Préparation" dans le cover et la navigation.

2. Problem & JTBD
- Quand l'utilisateur ouvre Review ou Forecast sans CSV, il doit comprendre immédiatement qu'il faut aller sur la page Préparation pour charger les données.
- L'actuel Forecast est visuellement décalé et moins guidant : pas de bouton d'action, icône Material Symbols, wording "page Admin".

3. Scope / Out of scope
In scope :
- Refactoriser les empty states de ReviewPage et ForecastPage pour utiliser le même style et le même composant.
- Mettre à jour les textes pour pointer vers "Préparation" (et non "Admin").
- Garder le bouton d'action "Aller à la préparation".

Out of scope :
- Modifier la logique de parsing CSV ou la simulation Monte Carlo.
- Modifier AdminPage au-delà du libellé déjà existant.
- Ajouter de nouvelles fonctionnalités (snapshots, export, etc.).

4. Business rules
- RG-01 : Un empty state s'affiche quand `csvLoaded === false` (Review et Forecast).
- RG-02 : Sur Forecast, un empty state spécifique s'affiche quand `forecastData` est nul ou `forecastData.isValid === false`.
- RG-03 : Le bouton d'action principal redirige vers `/admin` (page Préparation).
- RG-04 : Le wording doit mentionner "Préparation" et non "Admin".

5. Acceptance criteria
- Review / no CSV : Given `csvLoaded` is false, when I open Review, then I see an empty state with icon, title, description, and a button to Préparation.
- Forecast / no CSV : Given `csvLoaded` is false, when I open Forecast, then I see the same empty-state style as Review with icon, title, description, and a button to Préparation.
- Forecast / invalid data : Given CSV is loaded but forecast is invalid, when I open Forecast, then I see an empty state with a forecast-specific icon, title, and error message, plus a button to Préparation.
- Navigation : Clicking the action button navigates to `/admin`.
- Wording : The button and helper text say "Préparation", not "Admin".

6. Technical plan
- Créer un composant réutilisable `EmptyState` dans `src/components/EmptyState.tsx` avec props : icon, title, description, actionLabel, onAction.
- Remplacer l'empty state inline de ReviewPage par le composant `EmptyState`.
- Remplacer les deux empty states inline de ForecastPage par le composant `EmptyState` (variantes no-data et invalid-forecast).
- Ajuster `src/styles/components/empty-state.css` si nécessaire pour gérer les variants d'erreur.
- Vérifier le rendu visuel dans le preview et le bon fonctionnement du bouton de navigation.
- Lancer les tests existants (`npx vitest run`) pour s'assurer qu'aucune régression n'est introduite.

7. Assumptions & risks
Assumptions :
- On conserve l'emoji 📊 comme icône principale pour rester cohérent avec ReviewPage actuel.
- On garde les Material Symbols (`upload_file`, `analytics`) pour les icônes des variants spécifiques.
- On ne change pas la structure des pages au-delà de la zone d'empty state.

Risks :
- Si un composant `EmptyState` existe déjà ailleurs, il faudra l'unifier. Exploration actuelle : il n'existe pas de composant React dédié, seulement des classes CSS.