import { lazy, LazyExoticComponent } from 'react';

const IntroPage = lazy(() => import('./views/IntroPage'));

const LoginPage = lazy(() => import('./views/LoginPage'));

const RegisterPage = lazy(() => import('./views/RegisterPage'));

const AboutPage = lazy(() => import('./views/AboutPage'));

const LibraryPage = lazy(() => import('./views/LibraryPage'));

const TrainingPage = lazy(() => import('./views/TrainingPage'));

const Page404 = lazy(() => import('./views/Page404'));

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
    path: '/about',
    label: 'About us',
    component: AboutPage,
    isProtected: false,
    isNav: true,
    redirectTo: '/about',
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
  // {
  //   path: null,
  //   component: Page404,
  //   label: null,
  //   isProtected: null,
  //   isNav: false,
  // },
];

export default routes;
