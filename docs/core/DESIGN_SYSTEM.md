
# Design system

## Base Components

All base components for the application are located in the `src/components` directory. This directory is organized to promote modularity and reusability:

-   `atoms/`: Contains the smallest, indivisible components (e.g., buttons, inputs, labels).
-   `molecules/`: Composed of one or more atoms, forming more complex UI elements (e.g., input fields with labels).
-   `organisms/`: Relatively complex components composed of molecules and/or atoms (e.g., a form, a section of a page).

> You can view the design system in the `/ui` page of the application.

## Styling with Tailwind CSS

The styling for the application is primarily managed using Tailwind CSS. This utility-first CSS framework allows for rapid UI development and consistent styling across the application. 

### Typography

Text styles are managed through the `Typography` component.

### Colors and Themes

Colors are defined using design tokens and integrated with Tailwind CSS. These colors align with the color palette defined in our Figma design. You can find the color definitions in `src/index.css`. This file includes custom CSS properties (variables) to manage the overall theme.

```css
@theme {
  --color-meko-dark-blue-transparent: oklch(0.21 0.1063 263.16 / 60%); /* #000F47 */
  --color-meko-blue-transparent-1: oklch(0.21 0.1063 263.16 / 15%);
  --color-meko-blue-transparent-2: oklch(0.21 0.1063 263.16 / 20%);
  --color-meko-blue-transparent-3: oklch(0.21 0.1063 263.16 / 30%);

  --color-meko-blue-light-1: oklch(0.76 0.1444 230.11); /* #28C2FC */
  --color-meko-blue-light-3: oklch(0.84 0.1005 224.76); /* #7EDAFD */
  --color-meko-blue-flat: oklch(0.52 0.1401 247.65); /* #006EB6 */
  --color-meko-blue-darker: oklch(0.42 0.1947 261.88); /* #0040B6 */

  --color-meko-orange: oklch(0.73 0.1777 47.62); /* #FF7F32 */
  --color-meko-white-blue: oklch(0.95 0.0356 221.18); /* #D4F3FE */
  --color-meko-green: oklch(0.66 0.1932 147.4); /* #00AF42 */

  --color-meko-red: oklch(0.56 0.2057 27); /* #D32828 */
  --color-meko-red-2: oklch(0.65 0.2048 24.87); /* #F34B4B */
  --color-meko-red-transparent: oklch(0.36 0.147 29.1 / 20%); /* #780101 */

  --text-h1: 3rem;
  --text-h1--font-weight: 700;
  --text-h2: 1.75rem;
  --text-h2--font-weight: 800;
  --text-h3: 1.25rem;
  --text-h3--font-weight: 800;
}
```

To apply these styles, use Tailwind CSS classes in your components:

```jsx
import { Button } from "@/components";

function MyComponent() {
  return (
  <Button className="bg-meko-blue-light-1 text-white font-bold py-2 px-4 rounded">
    Click me
  </Button>
  );
}
```

