# Google Sheets Integration Setup

This guide will help you set up automatic data syncing from your contact form to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ New"** to create a new spreadsheet
3. Name it **"Al-Burhan Contact Submissions"**
4. In the first row, add these column headers:
   - A1: `name`
   - B1: `email`
   - C1: `phone`
   - D1: `subject`
   - E1: `message`
   - F1: `source`
   - G1: `createdAt`

Keep this sheet open for the next step.

## Step 2: Create a Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append data to sheet
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.phone || '',
      data.subject || '',
      data.message || '',
      data.source || '',
      data.createdAt || new Date().toISOString()
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Data saved to sheet' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** and name the project "Al-Burhan Contact Handler"

## Step 3: Deploy as a Web App

1. Click the **Deploy** button (top right)
2. Click **"New deployment"**
3. Select type: **Web app**
4. Configure:
   - Execute as: Your Google Account
   - Who has access: **Anyone**
5. Click **Deploy**
6. **Copy the deployment URL** (you'll need this)
7. Click **Authorize access** and grant permissions

## Step 4: Update Your Environment

1. Open your project's `.env.local` file
2. Update this line with your webhook URL:

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercontent
```

Replace `YOUR_DEPLOYMENT_ID` with the ID from your deployment URL.

## Step 5: Test It

1. Restart your dev server
2. Go to your contact form
3. Submit a test message
4. Check your Google Sheet — the data should appear automatically!

## Troubleshooting

- If data isn't appearing, check the Apps Script **Executions** tab for errors
- Make sure the webhook URL is correct in `.env.local`
- Ensure the Apps Script is deployed as "Anyone" has access
- Check your browser console for any API errors
