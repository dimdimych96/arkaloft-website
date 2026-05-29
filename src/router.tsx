import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from './App';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Reviews = lazy(() => import('./pages/Reviews').then(m => ({ default: m.Reviews })));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'services', element: <Services /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'contact', element: <Contact /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <TermsOfService /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
