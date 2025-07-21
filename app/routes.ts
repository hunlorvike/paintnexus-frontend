import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'features/dashboard/layout.tsx', [
    route('', 'features/dashboard/index.tsx'),
    route('paint-calculator', 'features/paint-calculator/index.tsx'),
  ]),
] satisfies RouteConfig;
