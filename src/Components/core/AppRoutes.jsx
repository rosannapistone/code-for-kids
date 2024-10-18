

import { useRoutes } from 'react-router-dom';
import { LandingPage } from '../../Views/landingpage/LandingPage';
import { ChallengeEasy } from '../../Views/challenges/ChallengeEasy';
import { ChallengeHard } from '../../Views/challenges/ChallengeHard';
import { Games } from '../../Views/games/Games';

export const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/challenge-easy', element: <ChallengeEasy /> },
    { path: '/challenge-hard', element: <ChallengeHard /> },
    { path: '/games', element: <Games /> },
    { path: '/lightBot', file: 'lightbot.html' },
  ]);

  return routes;
};