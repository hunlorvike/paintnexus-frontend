import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'features/dashboard/layout.tsx', [
    route('', 'features/dashboard/index.tsx'),
  ]),
] satisfies RouteConfig;
