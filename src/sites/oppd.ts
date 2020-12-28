import puppeteer from 'puppeteer';

export const readOPPDBill = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://myaccount.oppd.com/myaccount/logon');

  const usernameField = await page.$x(
    '/html/body/form/div[4]/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[2]/div[1]/div[1]/input'
  );
  await usernameField[0].type(process.env.OPPD_USERNAME || '');

  const passwordField = await page.$x(
    '/html/body/form/div[4]/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[2]/div[1]/div[2]/input[1]'
  );
  await passwordField[0].type(process.env.OPPD_PASSWORD || '');

  await page
    .$x(
      '/html/body/form/div[4]/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[2]/div[1]/div[5]/input'
    )
    .then(loginButton => loginButton[0].press('Enter'));

  // Wait for search results page to load
  await page.waitForNavigation({ waitUntil: 'load' });

  const previousBill = await page.$x(
    '/html/body/form/div[4]/div[2]/div[2]/div/div[1]/div/div[6]/div[3]/div/span[2]/strong/span'
  );

  const billValue = await (
    await previousBill[0].getProperty('innerText')
  ).jsonValue();
  const billFloatValue = parseFloat((billValue as string).replace('$', ''));

  await page
    .$x('/html/body/form/div[4]/div[2]/div[2]/div/div[1]/div/div[2]/span/a')
    .then(logoutLink => logoutLink[0].press('Enter'));

  await page
    .$x('/html/body/div[2]/div[3]/div/button[1]')
    .then(confirmLogout => confirmLogout[0].press('Enter'));

  await page.waitForNavigation({ waitUntil: 'load' });
  await browser.close();

  return billFloatValue;
};
