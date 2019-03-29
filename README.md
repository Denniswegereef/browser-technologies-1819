## Week 1 documentation

Link to reviewing my OBA app and no javascript and color

- [week 1, onderzoek kleur en javascript](Week1.md)
- [week 2, OBA review](Week2.md)

# Create your own poll

[Online link](http://bt.denniswegereef.nl)

My case was creating a poll, it is mainly based upon the fact that people can create their own polls and share the link with their friends. I tried to great some goals for myself that I have some grip of where I wanna go with the app.

- Everything **needs** to work server side
- From everything working server side, slowly enhance in the browser
- Haven't used a database in ages, let's use one
- Never used websockets, good time to try to display real time results

## Wireflow

[Link to wireflow notes](docs/schetsen.md).

I got 4 main pages for now to make my poll usefull.

### Create a poll screen

- Functional/relialble

  - Native HTML using the right tags for the form, handle everything from the server and give the right feedback back when you rerender the `/POST` request.

  - Also for creating more poll items, there are 2 buttons for deleting and creating a new possible row. Both are seperate posts request what the server handles for you and give an updated form back.

  - Everything is basic HTML and **should** work in every browser.

- Usable
  - It's the part where CSS comes in place, but for most polls users can just do whatever they want without many restrictions. Since it just a form where you can create a question and some answers, possible feedback would that you need to **atleast** fill in the question form with 1 possible answer.
- Pleasurable laag
  - The pleasurble layer is when the javascript takes away the add and remove options and when the user types the last field it creates a new row for them.

### Vote screen

- Functional/relialble

  - Everything is basic HTML and **should** work in every browser. Such as a form and radio buttons

- Usable

  - To enhance the experience you could use a 'hack' to only show a a submit button when a user did choose a answer.
  - You can also style in certain browsers the radio buttons with the pseudo trick. Not possible in every browser as can be seen [here](https://caniuse.com/#feat=css-default-pseudo). It is not working in IE and Edge.

- Pleasurable laag

  - Handle the submit button with javascript with a better user experience and possible some animation.
  - Since IE and Edge not supporting the pseudo hack you could make a workaround with toggle classes on divs with javascript. [Classlist](https://caniuse.com/#search=classlist) is fully supported among most common browsers.

### Results

- Functional/relialble

- Everything is basic HTML and **should** work in every browser. Everything is typed out and possible to read with a screenreader, within the correct html structure.

- Usable

  - For most all the calculations are done on the server as color and percentagets, used as inline styling to set the correct width of the bars. Also the colors have different shades of blue depending on how much items there are. Also done with a simple calculation of the total divided by the amount of items up to 100% opacity.

- Pleasurable laag

  - Using websockets when there is an update to the specefic poll. Websockets are widely supported as can be seen [here](https://caniuse.com/#search=websockets). I throw out the old content and update it with the new content. I'll do that with [Childnode.remove()](https://caniuse.com/#search=remove). Used for most browsers expect IE. Than i'll just throw out the old content.

### All polls page

- Functional/relialble

- Everything is basic HTML and **should** work in every browser. Everything is typed out and possible to read with a screenreader, within the correct html structure.

- Usable

  - For the CSS part it's mostly using flexbox to create the layout. Widely accepted by the browsers as can be seen [here](https://caniuse.com/#search=flex).

- Pleasurable laag

  - Also as stated above with the result page, websockets are a quite handy feature to update live results to the page. Also when you already voted it reads out the cookie to check if you have already voted for the page.

* Feature detectie

  - I used on the different places featureu detection such as `if (window.WebSocket) {}`, also I used a small websocket for caching the js and css if service workers are avaliable.

  For the sake of trying I used a little script where you can detect if the browser is capable of using ES6 with:

  ```js
  var supportsES6 = (function() {
    try {
      new Function('(a = 0) => a')
      return true
    } catch (err) {
      return false
    }
  })()
  ```

  I was seeing if you can use the compiled babel code in combination with my normal ES6 syntax. Not because it is really efficient to have both pieces of code but just for trying and exploring new things.

  Also my own implementation of seeing if javascript is enabled or disabled with a feauture detection of remove, define in your html:

  ```html
  <div class="noscript"></div>
  ```

  And than with this code you just check everytime if there is a noscript tag is and remove the content inside it:

  ```js
  var noscripts = document.getElementsByClassName('noscript')

  for (let i = 0; i < noscripts.length; i++) {
    var element = noscripts[i]

    if (typeof element.remove === 'function') {
      element.remove()
    } else {
      element.innerHTML = ''
    }
  }
  ```

- Core functionality

* The core functionallity is that you can create polls, and vote on them. Everything is done on the server side with a mongo database behind it where the polls and votes are stored. Everytime somebody votes it creates a post request to the server and it handles and stores the data.

## User experience

- No mouse trackpad

- since I used a good use of semantic HTML and using the right tags such as `links` and `buttons` my screen reader had no problem reading it for me.

Expect the fact that when you view a single poll page that it is sometimes harder to figure out what the screenreader is meaning. Since it just rambles a certain percentage with number. Visually it works but I have to find a way to make it more usefull.

- Color

- All my color contrasts are based on [https://color.review/](https://color.review/) too. It shows when the contrasts are good, I believe this functionallity is already in or comes to google chrome in the near future.
- Also I tried to use different colorblind filters to see if content get's lost with their contrast. I used [colorblindly](https://github.com/oftheheadland/Colorblindly). I coudn't find any issues whatsover with bad contrast, especially since the whole is using the same color pallete for most of the time

As you can see my 2 main colors are thrown into the color review tool. It scores a 7.1 with both AAA and AAA on the contrast meter. As can be seen [here](color.review/check/00547C-EBF0FD).

- Javascript

  I start building the app total server side, it worked already fully without javascript. That is the main benefit of layering your project and start with the no-javascript version. I implemented some neat little things like when you view a poll you get a refresh for free every 10 seconds to see if the poll is still up to date (forced it out with progressive enhancement).

  Also small features like adding and removing poll options and suitable for the amount of options you want. Fully works without javascript :).

- Cookies

  I need to admit that I use cookies for setting a session of a year right now. Everything is done on the backend and I send a cookie with the request. After a user makes a new request I can read it out. There is only one drawback when a user disables a cookie since it is currently my only validation of checking a user has already voted. I still have to do some research how you can use it without things like localstorage/session storage and cookies. Maby the service worker cache as a nifty little trick.

But for now if you disable your cookies you can vote unlimited and cheat your way into the poll again :(.

- Internet speed

You can fully work the app without any javascript, so if it for some reason doesn't wanna load there is no problem at all. All the calculations are done on the server and sende back as html strings to the client when a request to a page goes out. So no heavy libaries where the client depends on. You only need to render static pages and when your internet speed is not that fast, and still can use all the features thanks to progressive enhancement.

- Images

  There are no images, so no issues whatsoever when they can't load. Because there are none haha.

- Fonts

  I used google fonts and when the font is not loading it uses a system fallback font such as `body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";. }`

# Code review

I did my code review with Tim Ruiterkamp, I wasn't nowhere near done and I could also list a milion small improvents (not actually a milion but you get the point). So based on when you can pass the assigement I scored pretty good actually, I added almost every item they asked us to do. Ofcourse I could make alot of improvements based on the UI and how well it responds to a user mistakes. Or it doesn't really does the job responsive at all (what makes it kinda hard to test). Also I cheated my kinda around the system of using ES6 and transpilled it down with [babel](https://babeljs.io/repl), not the most elegant way for now. Could definitely improve alot on the client side javascript for older browsers. But since there was a scope I just could not make that part.

As Tim mentioned responsive was a big thing that needed to be fixed first before actually testing it on the device lab and trying crossbrowser.

## Testing

- Device lab test

Sadly I didn't do this, I thought it was a low priority and I started late on my enhancement for the page I coudn't test them in time.

But for everything that works server side and render the pages it works perfectly and you could create and view polls on every device.

- Crossbrowser testing

- **Safari:** My progressive enhancement feature right of the bat didn't work on the home page with a juicy `[Error] TypeError: Argument 1 ('node') to Node.appendChild must be an instance of Node a`. It is on the pipeline to fix it and probaly of testing it in other browsers I could get the same result. But other than that it works quite well also with the websockets.
- **Chrome:** since I made it in Chrome, everything works prettttty good as far I could say haha.
- **Firefox:** everything works fine with no issues whatsoever, as I could see.
- **Opera mini:** everythings works expect the fact on the home page when you wanna create new rows for the polls.

**Mobile**

For the time being my site is kinda static and works okay on mobile without any use of media queries based on the viewport. I'll still have to do some tweaks on the layout but is for now not a high priority.

- Screen reader test
- I used the native screenreader what is baked in macOS called VoiceOver. Honestly this was so super hard to make it work good. But it was a quite cool experience to let him read out my webiste.

Since I just a good HTML structure and not too complex code and everything is mostly handeled at the server anyway it works quite good actually.
