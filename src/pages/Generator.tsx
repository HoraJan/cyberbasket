// min  stred  max
// UTOK  0  3  6
// OBRANA  0  3  6
// PŘIHÁVKA  0  3  6
// SVALY  0  3  6

import { useTranslation } from 'react-i18next';
import { Tabs } from '../components/Tabs';
import { GeneratedResults } from './parts/GeneratedResults';

// DISTRIBUCE  value  distribuce  PPT
// sračka  0  5%  0-5%
//   1  10%  5-15
//   2  20%  15-35
// averge joe  3  30%  35-65
//   4  20%  65-85
//   5  10%  85-95
// hvězda  6  5%  95-100
//     100%

export const Generator = () => {
  const { t } = useTranslation();
  const tabs = [
  //   {
  //   id: 'stats',
  //   label: t('statistics'),
  //   component: <Stats />,
  //   value: 'stats',
  // },
    {
      id: 'results',
      label: t('generatedResults'),
      component: <GeneratedResults />,
      value: 'results',
    },
  ];
  return (
    <Tabs tabs={tabs} paramName="generator" defaultTab="results" />
  );
};
