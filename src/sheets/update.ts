import { google } from 'googleapis';

export const updateCells = (auth: any, values: any[][]) => {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values
    .append({
      spreadsheetId: process.env.BUDGET_SHEET_ID,
      range: 'Cloud Functions!A3:D',
      requestBody: { values },
      valueInputOption: 'RAW',
    })
    .then((response: any) => {
      console.log(response.statusText);
    })
    .catch(err => console.error(err));
};
