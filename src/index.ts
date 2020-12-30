import { readOPPDBill } from './sites/oppd';
import dotenv from 'dotenv';
import { readMUDBill } from './sites/mud';
dotenv.config();

(async () => {
  const [oppd, mud] = await Promise.all([readOPPDBill(), readMUDBill()]);

  const bills = {
    oppd,
    mud,
  };

  console.log(bills);
})();
