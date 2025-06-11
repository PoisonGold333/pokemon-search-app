import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import('./routes/root'),
    children: [
      {
        index: true,
        lazy: () => import('./routes/home'),
      },
      {
        path: "pokemon/:nameOrId",
        lazy: () => import('./routes/pokemon'),
      },
    ],
  },
]);

export const ROUTES = {
  HOME: '/',
  POKEMON: '/pokemon',
  POKEMON_DETAIL: (nameOrId: string) => `/pokemon/${nameOrId}`,
} as const;