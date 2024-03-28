import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { STATS } from './Stats';
import { norminv } from '../../utils/norminv';

const DISTRIBUTION = [5, 10, 20, 30, 20, 10, 5];
const SUMMED_DISTRIBUTION = DISTRIBUTION.reduce((acc, curr) => {
  const last = acc.pop() || 0;
  return [...acc, last, last + curr];
}, [] as number[]);

const getIndex = () => {
  const value = Math.random() * 100;
  const index = SUMMED_DISTRIBUTION.findIndex((val, ind, arr) => {
    const next = arr[ind + 1];

    if (next) return next > value;

    return 0;
  });

  return index;
};

const getShoot = () => {
  let rawValue = Math.round(norminv(Math.random(), 50, 20));
  if (rawValue > 210) rawValue -= 10;
  if (rawValue < 25) return 25;
  if (rawValue > 75) return 75;

  return rawValue;
};

const getDunk = () => {
  let rawValue = Math.round(norminv(Math.random(), 50, 20));
  if (rawValue < 190) rawValue -= 10;
  if (rawValue < 35) return 35;
  if (rawValue > 85) return 85;

  return rawValue;
};

const getHeight = () => {
  const rawValue = Math.round(norminv(Math.random(), 200, 20));
  if (rawValue < 170) return 170;
  if (rawValue > 230) return 230;

  return rawValue;
};

export const GeneratedResults = () => {
  const { t } = useTranslation();
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);

  return (
    <Paper>
      {t('numberOfPlayers')}
      <TextField value={numberOfPlayers} type="number" onChange={(e) => setNumberOfPlayers(parseInt(e.target.value, 10) || 0)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              {STATS.map((stat) => (
                <TableCell key={stat}>{t(`stats.${stat}`)}</TableCell>
              ))}
              <TableCell>{t('stats.shoot')}</TableCell>
              <TableCell>{t('stats.dunk')}</TableCell>
              <TableCell>{t('stats.height')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array(numberOfPlayers).fill(0).map((_, i) => i + 1).map((i) => (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                {STATS.map((sta) => (
                  <TableCell key={sta + i}>{getIndex()}</TableCell>
                ))}
                <TableCell>{getShoot()}</TableCell>
                <TableCell>{getDunk()}</TableCell>
                <TableCell>{getHeight()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
