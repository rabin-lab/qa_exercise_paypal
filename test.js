require("mocha");
const webdriver = require("selenium-webdriver");
const by=webdriver.By;
const until=webdriver.until;
const chai = require("chai");
const assert = chai.assert;
const expect=chai.expect;

describe('JS-Selenium-Exercise', function () {
    describe('Test1', function () {
        it('should follow the instructions', async function () {
            this.timeout(20000);
            const driver = new webdriver.Builder()
                .forBrowser('firefox')
                .build();

                (await driver).manage().window().maximize();

            // Open google.com
            await driver.get("http://www.google.com");

            // Example assertion:
            let title = await driver.getTitle();
            assert.equal(title, "Google");

            (await driver).sleep(10000);

           // Console.log("waited for 5 seconds");

            // Check that the google logo is visible
            
            let logo=(await driver).findElement(webdriver.By.xpath('//input[@value="Google Search"]'));
            (await logo).isDisplayed().then(function(displayed){
               expect(displayed).be.true;
           });

           // Enter text "PayPal" and click "I'm Feeling Lucky"
           (await driver).findElement(by.css('input[title="Search"]'))
           .sendKeys("Paypal");

           (await driver).sleep(3000);

            // Check there are two options present: "Google Search" and "I'm Feeling Lucky"
            let feelingLuckyEle=(await driver).findElement(by.xpath('//div[@jsname="VlcLAe"]//input[contains(@value,"Feeling Lucky")]'));

            let searchEle=(await driver).findElement(by.xpath('//div[@jsname="VlcLAe"]//input[contains(@value,"Google Search")]'));
            
            
           
           driver.executeScript("arguments[0].click()",feelingLuckyEle);
           (await driver).sleep(5000);

            // Check the url is now "https://www.paypal.com/"
            await driver.getCurrentUrl().then(async function(url){
                expect(url).equals('https://www.paypal.com/in/home');  
                 });
               (await driver).sleep(5000);

            // Click "Sitemap"
            let sitemap=(await driver).findElement(by.xpath('//a[text()="Sitemap"]'));
            driver.executeScript("arguments[0].click()",sitemap);
            (await driver).sleep(2000);

            // Check the url is now "https://www.paypal.com/us/webapps/mpp/full-sitemap"
            await driver.getCurrentUrl().then(async function(urlnew){
                expect(urlnew).equals('https://www.paypal.com/in/webapps/mpp/full-sitemap');  
                 });


            // Store all of the links on this page into a list and then print them all to system.out
                 (await driver).findElements(by.css('a')).then(function(elements){
                    for(var i=0;i<elements.length;i++){
                        console.log(elements[i].getText());
                    }
                 });
            await driver.quit();
        })
    })
});