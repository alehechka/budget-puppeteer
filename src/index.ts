// import { readOPPDBill, readMUDBill } from './sites';
import { authorize, updateCells } from './sheets';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  const [oppd, mud] = [55, 66]; //await Promise.all([readOPPDBill(), readMUDBill()]);
  const today = new Date().toLocaleDateString('en-US');

  var values = [[today, oppd, mud]];
  authorize(updateCells, values);
})();
