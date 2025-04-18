
## 🧩 **Normes de codage**

### 1. **Nom des fichiers et dossiers**
- Les fichiers **composants** doivent être nommés en **kebab-case** (`my-component.js`).
- Les **nom des composants** doivent exprimé ce qu'est le composants. Par exemple, `ReactorLike[BottomSheet]`, `Checkout[Button]`, .... (Le dernier nom du composant exprime ce qu'il est)
- Si les composants sont spécifique à une action, son nom doit exprimer cet action, par exemple `[Create]PublicationForm`, ...
- Les **fichiers utilitaires** doivent être nommés en **kebab-case** (`calculate-sum.js`).

### 2. **Structure des composants**
- Utilisez des **fonctions** pour les composants (plutôt que des classes).
- Déclarez les composants avec les **fonctions** au lieu des **const** sauf dans le cas où on utilise un`React.memo` (avantage: Hoisting, typage plus simple) 
- Organisez le contenu de vos composants de la façon suivante : 
  1. les états
  2. les appels aux hooks
  3. les effects
  4. le rendu

```tsx

export function Calculator({left, operator, right}) {
  /**
   * 1. Component State
   */
  const { user } = useContext(UserContext);
  const [someState, setSomeState] = useState();
  const [someOtherState, setSomeOtherState] = useState();
  const result = operations[operator](left, right)
  const someCondition = true;

  /**
   * 2. Other hooks
   */
  const cachedValue = useMemo(calculateValue, dependencies)
  const cachedFn = useCallback(fn, dependencies)

  /**
   * 3. Effects
   */
  useEffect(() => {
    // your effect code

    return () => {
      // your effect cleanup code
    }
  }, dependencies);

  /**
   * 4. JSX / Return statement
   */
  return (
    {someCondition ? <ShortenedMarkup /> : (
      <div>
        <code>
          {left} {operator} {right} = <output>{result}</output>
        </code>
      </div>
    )}
  );
}

```

### 3. **ESLint et Prettier**
- Le projet utilise **ESLint** et **Prettier** pour garantir un code propre et uniformisé.

### 4. **Gestion des états**
- Utilisez **React Hooks** (`useState`, `useEffect`, etc.) pour gérer l'état et les effets.
- Si les opérations sur l'état sont complexes, utilisé `useReducer`. 
- Si l'état est partagé entre plusieurs composants, utilisez [zustand](https://zustand.docs.pmnd.rs/) et l'API Context de React.


### 5. Import Absolue

Nous utilisons l'importation absolue pour garantir des chemins d'importation clairs et éviter les problèmes liés aux chemins relatifs complexes. Cela facilite la navigation dans le code et rend le projet plus lisible.

#### Exemples d'utilisation

Au lieu d'utiliser des chemins relatifs comme ceci :

```javascript
import Login from '../../../app/pages/login-page';
import Button from '../../../components/button';
import LoginForm from '../../../features/login/components/login-form';
```

Nous pouvons maintenant utiliser des chemins d'importation absolus :

```javascript
import Login from '@/src/pages/login-page';
import Button from '@/src/components/button';
import LoginForm from '@src/app/auth/components/login-form';
```

Cette approche rend notre code plus propre et réduit la complexité des chemins d'importation, ce qui améliore la lisibilité et la maintenabilité du projet.

<!-- 
### 5. **Design system**

Le `Design System` est une collection de règles, de principes et de composants qui garantissent la cohérence visuelle et fonctionnelle à travers l'application. Cela permet à toutes les équipes (designers, développeurs, etc.) de parler le même langage visuel.

Nous avons mis en place un thème global en définissant les **design tokens** pour assurer la cohérence des styles à travers l'application. Le provider du thème utilise Zustand pour la gestion de l'état et est intégré avec l'API Context de React pour faciliter l'accès et la manipulation des styles dans les composants.

#### 1. Couleurs

Les couleurs jouent un rôle essentiel dans l'interface utilisateur. Les couleurs sont définis dans le fichier `src/shared/themes/design-tokens/color.ts`. Pour y accéder coté interface, on utilise le hooks `useTheme`. 

```jsx

import { useTheme } from '@shared/themes';


function App() {
  const theme = useTheme();

  return (<View style={{ background: theme.colors.purple }}>
    ...
  </View>)
}
```

#### 2. Typographie
Les polices définissent l’apparence et le style du texte. Des tailles de texte cohérentes devraient être utilisées à travers l'application. Le composant `Text` permet d'appliquer facilement des styles typographiques et des couleurs prédéfinis à travers l'application, tout en garantissant une cohérence visuelle grâce à l'utilisation de design tokens pour les couleurs et les variantes typographiques.

```tsx
<Text variant="bodyLarge" color="blue">Contenu</Text>
```

#### 3. Espacement (Spacing)

L'espacement est crucial pour garantir une structure visuelle claire et accessible. Cependant pour ce projet, il est assez difficile de recenser les espacements utilisés dans la maquette. 

#### 4. Les dégradés linéaires

Ce projet intègre de nombreux dégradés, ce qui est essentiel pour enrichir l'esthétique visuelle. Le composant `LinearView` permet de créer des dégradés linéaires personnalisés en utilisant les couleurs et styles définis dans le thème, garantissant ainsi une cohérence dans l'application.

Le composant peut être configuré avec des points de départ et d'arrivée pour le dégradé, tout en offrant la possibilité de définir un style de fond pour une intégration harmonieuse avec les autres éléments de l'interface.

```tsx
<LinearView
  type="purple"
  start={{ x: 0, y: 0 }}
  background="purpleDark2"
  end={{ x: 0.5, y: 0.5 }}
>
  ...
</LinearView>
```
 -->
