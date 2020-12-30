import { readOPPDBill, readMUDBill } from './sites';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  const [oppd, mud] = await Promise.all([readOPPDBill(), readMUDBill()]);

  const bills = {
    oppd,
    mud,
  };

  console.log(bills);
})();
