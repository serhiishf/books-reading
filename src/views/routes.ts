import { lazy, LazyExoticComponent } from 'react';


const IntroPage = lazy(() => import('./IntroPage/IntroPage'));

const LoginPage = lazy(() => import('./LoginPage'));

const RegisterPage = lazy(() => import('./RegisterPage'));

const LibraryPage = lazy(() => import('./LibraryPage'));

const TrainingPage = lazy(() => import('./TrainingPage'));

const Page404 = lazy(() => import('./Page404'));

export interface IRoute {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  isProtected: boolean;
  isNav: boolean;
  label: string;
  redirectTo: string;
}

const routes = [
  {
    path: '/',
    label: 'Intro',
    component: IntroPage,
    isProtected: false,
    isNav: false,
    redirectTo: '/',
  },
  {
    path: '/login',
    label: 'Login',
    component: LoginPage,
    isProtected: false,
    isNav: true,
    redirectTo: '/login',
  },
  {
    path: '/register',
    label: 'Register',
    component: RegisterPage,
    isProtected: false,
    isNav: true,
    redirectTo: '/library',
  },

  {
    path: '/library',
    component: LibraryPage,
    label: 'Library',
    isProtected: true,
    isNav: false,
    redirectTo: '/library',
  },
  {
    path: '/training',
    component: TrainingPage,
    label: 'Training',
    isProtected: true,
    isNav: false,
    redirectTo: '/training',
  },
  {
    path: '/*',
    component: Page404,
    label: '',
    isProtected: false,
    isNav: false,
    redirectTo: '/',
  },
];

export default routes;
