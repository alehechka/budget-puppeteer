import { google } from 'googleapis';

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export const listCells = (auth: any) => {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: process.env.BUDGET_SHEET_ID,
      range: 'Cloud Functions!A2:D',
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res?.data.values;
      if (rows?.length) {
        console.log('Date, OPPD, MUD, Cox:');
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map(row => {
          console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}`);
        });
      } else {
        console.log('No data found.');
      }
    }
  );
};
