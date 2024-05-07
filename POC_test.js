Feature('My First Test');

Scenario('Verify "The Latest News" section @1', ({ I }) => {
    I.amOnPage("https://techcrunch.com/");
    I.seeElement('.post-block');
    within('.post-block', () => {
      I.seeElement('img');
      I.seeElement('.river-byline');
    });
  });


Scenario('Verify full news content @2' , ({ I }) => {
    I.amOnPage("https://techcrunch.com/");
    within('.post-block', async () => {
        let newsTitle = await I.grabTextFrom('h2');
        I.wait(10);
        await I.scrollTo('h2'); //Sometimes an ad iframe comes in front of the h2 tag
        await I.waitForElement('h2');
        await I.click('h2');
        await I.seeInTitle(newsTitle);
        let count = await I.grabNumberOfVisibleElements("//*[@class='article-content']//a");
        if(count!=0){
        await I.waitForElement("//*[@class='article-content']//a",10);
        console.log(count);
        let dizi =await I.grabAttributeFromAll("//*[@class='article-content']//a",'href');
        let linkCount = dizi.length;
        console.log(dizi);
        console.log(linkCount);
            if (linkCount != count) {
              throw new Error('Invalid link found within news content');
            }
          }
        else
          console.log("Link Not Found!");
      });
    });
    
    