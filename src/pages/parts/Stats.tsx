import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'usehooks-ts';

export const STATS = ['attack', 'defense', 'pass', 'muscles'] as const;
const LIMITS = ['min', 'avg', 'max'] as const;
const SINGLE_VALUE = {
  min: 0,
  avg: 3,
  max: 6,
};
const DEFAULT_VALUES = {
  attack: {
    ...SINGLE_VALUE,
  },
  defense: {
    ...SINGLE_VALUE,
  },
  pass: {
    ...SINGLE_VALUE,
  },
  muscles: {
    ...SINGLE_VALUE,
  },
} as const;

export const Stats = () => {
  const { t } = useTranslation('cyberbasket');
  const [values, setValues] = useLocalStorage('defaultValues', DEFAULT_VALUES);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            {LIMITS.map((limit) => <TableCell key={limit}>{limit}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {STATS.map((stat) => (
            <TableRow key={stat}>
              <TableCell>{t(`stats.${stat}`)}</TableCell>
              {LIMITS.map((limit) => (
                <TableCell key={stat + limit}>
                  <TextField
                    type="number"
                    value={values[stat][limit]}
                    onChange={(e) => setValues((oldValue) => {
                      const newValue = JSON.parse(JSON.stringify(oldValue));
                      newValue[stat][limit] = parseInt(e.target.value, 10) || 0;

                      return newValue;
                    })}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
