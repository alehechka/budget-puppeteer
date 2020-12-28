import { readOPPDBill } from '../src/sites/oppd';

describe('OPPD Bill', () => {
  it('works', async () => {
    expect(await readOPPDBill()).toReturn();
  });
});
