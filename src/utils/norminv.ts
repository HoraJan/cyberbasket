function erf(inputX: number) {
  const cof = [-1.3026537197817094, 6.419697923564902e-1, 1.9476473204185836e-2,
    -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
    4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
    1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
    6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
    -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
    -6.886027e-12, 8.94487e-13, 3.13092e-13,
    -1.12708e-13, 3.81e-16, 7.106e-15,
    -1.523e-15, -9.4e-17, 1.21e-16,
    -2.8e-17,
  ] as const;
  let isneg = false;
  let d = 0;
  let dd = 0;
  let tmp;
  let x = inputX;

  if (x < 0) {
    x = -x;
    isneg = true;
  }

  const t = 2 / (2 + x);
  const ty = 4 * t - 2;

  for (let j = cof.length - 1; j > 0; j -= 1) {
    tmp = d;
    d = ty * d - dd + cof[j]!;
    dd = tmp;
  }

  const res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
  return isneg ? res - 1 : 1 - res;
}

function erfc(x: number) {
  return 1 - erf(x);
}

function erfcinv(p: number) {
  let x;
  let err;
  if (p >= 2) return -100;
  if (p <= 0) return 100;
  const pp = (p < 1) ? p : 2 - p;
  const t = Math.sqrt(-2 * Math.log(pp / 2));
  x = -0.70711 * ((2.30753 + t * 0.27061)
        / (1 + t * (0.99229 + t * 0.04481)) - t);
  for (let j = 0; j < 2; j += 1) {
    err = erfc(x) - pp;
    x += err / (1.128379167095512 * Math.exp(-x * x) - x * err);
  }
  return (p < 1) ? x : -x;
}

export function norminv(p: number, mean: number, std: number) {
  return -1.414213562373095 * std * erfcinv(2 * p) + mean;
}
