

import { useRoutes } from 'react-router-dom';
import { LandingPage } from '../../Views/landingpage/LandingPage';
import { ChallengeEasy } from '../../Views/challenges/ChallengeEasy';

export const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/challenge-easy', element: <ChallengeEasy /> },
    { path: '/lightBot', file: 'lightbot.html' },
  ]);

  return routes;
};