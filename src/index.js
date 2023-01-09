const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

async function updateStatus(statusMessage) {
  // Launch a headless Chrome browser
  const browser = await puppeteer.launch({ headless: true });
  // Create a new page
  const page = await browser.newPage();

  // Navigate to WhatsApp Web
  await page.goto(process.env.WHATSAPP_WEB_URL);

  // Wait for the login form to load
  await page.waitForSelector('form[action="/login"]');

  // Enter phone number and password and submit the form
  await page.type('input[name="phone"]', process.env.PHONE_NUMBER);
  await page.type('input[type="password"]', process.env.PASSWORD);
  await page.click('button[type="submit"]');

  // Wait for the main screen to load
  await page.waitForSelector('header div[title="Status"]');

  // Click on the status tab
  await page.click('header div[title="Status"]');

  // Wait for the status input field to load
  await page.waitForSelector('div[contenteditable="true"]');

  // Enter the new status message and click the send button
  await page.type('div[contenteditable="true"]', statusMessage);
  await page.click('button[title="Send"]');

  // Close the browser
  await browser.close();
}

// Update status with message "Hello, world!"
updateStatus('Hello, world!');
