import { readOPPDBill } from './sites/oppd';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  const bills: Record<string, any> = {};

  bills.oppd = await readOPPDBill();

  console.log(bills);
})();
