import puppeteer from 'puppeteer';

export const readMUDBill = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://myaccount.mudomaha.com/');

  await page
    .$x(
      '/html/body/div[2]/div/div/div/div/div[2]/div/section/div[2]/div[2]/div[3]/div/div[1]/div/div[1]/div/input'
    )
    .then(usernameField =>
      usernameField[0].type(process.env.MUD_USERNAME || '')
    );

  await page
    .$x(
      '/html/body/div[2]/div/div/div/div/div[2]/div/section/div[2]/div[2]/div[3]/div/div[1]/div/div[2]/div/input'
    )
    .then(passwordField =>
      passwordField[0].type(process.env.MUD_PASSWORD || '')
    );

  await page
    .$x(
      '/html/body/div[2]/div/div/div/div/div[2]/div/section/div[2]/div[2]/div[3]/div/div[1]/div/div[3]/button'
    )
    .then(loginButton => loginButton[0].press('Enter'));

  // Wait for search results page to load
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const billValue = await page
    .$x(
      '/html/body/div[2]/div/div[3]/section/div/div/div/div/div[3]/div/section/div[4]/div[1]/div[2]/div[5]/div[2]/div[1]/div[2]/div'
    )
    .then(
      async previousBill =>
        await (await previousBill[0].getProperty('innerText')).jsonValue()
    );

  const billFloatValue = parseFloat((billValue as string).replace('$', ''));

  await page
    .$x(
      '/html/body/div[2]/div/div[3]/section/div/div/div/div/div[3]/div/section/div[2]/div/div[3]/button'
    )
    .then(logoutLink => logoutLink[0].press('Enter'));

  await page
    .$x('/html/body/div[1]/div[2]/div/div/div/button[2]')
    .then(confirmLogout => confirmLogout[0].press('Enter'));

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.screenshot({ path: 'example.png' });

  await browser.close();

  return billFloatValue;
};
