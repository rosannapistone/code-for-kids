

import { useRoutes } from 'react-router-dom';
import { LandingPage } from '../../Views/landingpage/LandingPage';
import { Games } from '../../Views/games/Games';
import { WebsiteChallenge } from '../../Views/challenges/WebsiteChallenge';
import { CodeChallenge } from '../../Views/challenges/CodeChallenge';

export const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/code-challenge', element: <CodeChallenge /> },
    { path: '/website-challenge', element: <WebsiteChallenge /> },
    { path: '/games', element: <Games /> },
  ]);

  return routes;
};