---
tags:
  - css
  - design
  - html
  - font
date: 2023-11-25
---
In this post, I want to show my techniques for delivering web fonts efficiently.
I've always harbored a strong inclination toward aesthetic elements in the world of fonts. It fascinates me that we can convey the same meaning with different styles, creating a diverse user experience. Whether it's Franklin for news, Mono for scientific contexts, or Inter/Noto/Montserrat/Nunito for general use 🤓, the choice of typeface can profoundly impact the overall feel of the content. However, it's important to note that I'm a hobbyist, not a professional font designer or calligrapher.
In this post, I'd like to share my techniques for efficiently delivering web fonts.
## Pick a Font
Choosing a font is perhaps the most challenging and abstract task. It involves deciding the tone you want for your page. I usually explore options on [Google Fonts](https://fonts.google.com/), [1001Fonts](https://www.1001fonts.com/), or [Font Squirrel](https://www.fontsquirrel.com/). [Variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide) are my preference due to their versatility in style, and you can find them on [Google Fonts](https://fonts.google.com/variablefonts) or [Variable Fonts](https://v-fonts.com/).
## Define a Font
Regardless of whether it's a variable font, we typically define a font like this:
```css
@font-face {
  font-family: "MyFont";
  font-style: normal;
  font-weight: 400;
  font-display: fallback;
  src: url("../fonts/Myfont.woff2") format("woff2");
}
```
This definition states that whenever we use `font-family: "MyFont"` at `font-weight: 400`, the font will load from `Myfont.woff2`.
### Define a variable Font
For variable fonts, the definition is similar, allowing you to specify different ranges:
```css
@font-face {
  font-family: 'Roboto Flex';
  src: url('RobotoFlex-VF.woff2') format('woff2-variations');
  /* src: url("RobotoFlex-VF.woff2") format(woff2) tech(variations); New syntax */
  font-weight: 100 1000;
}
```
If you want to use the same font at different weights, you can define a range like this: `font-weight: 100 400`. You can also utilize font axes differently using the `font-variation-settings` property.
```css
.desc {
  font-family: "MyVFont";
  font-variation-settings: "CRSV" 1;
}
```
Here are some great guides about variable fonts:
- MDN - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide
- Web.dev - https://web.dev/articles/variable-fonts
## Fallback
HTML provides a [fallback](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) mechanism if, for any reason, your font is unavailable:
```css
@font-face {
  font-display: auto | block | swap | fallback | optional;
}
```
Each value makes your site behave differently. And they define for how long the browser can block the user ... and how long the browser can swap the font once the dowload is complete.
I tend to always forget the meaning. So i tell you that if your font is not mission critical then use `fallback` ... and obviously define a fallback to your family.
```css
.desc {
  font-family: "MyVFont", sans-serif;
}
```
## Optimize a font
At this point, we have successfully delivered the font to the user, and it's displayed correctly. However, there is a problem: open the Network tab and check the download size. Probably, it's not efficient, especially for a variable font with 5 axes. They can easily go up to 100 KiB or more. That's totally unacceptable.
### Axis
Do you really need all axes on your side, or do you just use one or two? If that's the case, then I have an easy trick for you to optimize your font:
- Go to Google Fonts
- Pick and add your font family to the cart
- From the cart, copy the download link and customize it

Lets pick one of my favorit font family: [Recusive](https://www.recursive.design/)
The dowload link will be something like `https://fonts.googleapis.com/css2?family=Recursive:wght@400..700` 
If i want only the `CRSV`as variable i can use the following link: `https://fonts.googleapis.com/css2?family=Recursive:wght,CRSV@400..700,0..1`
If i want the `MONO` and the `CASL` variables on a fix value: `https://fonts.googleapis.com/css2?family=Recursive:wght,CASL,MONO@400..700,1,1`
The more variables and ranges you add, the more it costs. Therefore, its advised to stick to strict value if possible.

There is also a very good CDN called [Fontsource](https://fontsource.org/). You can achieve the same thing via a customizable UI.
- Pick a font
- Go to the CDN tab
- Customize the font using the form.
### Character ranges
What languages do you want to support? Different languages can use different characters. Font designers are usually very kind and try to support as many variations as possible. However, if you only want to support, for example, Latin characters, it's a good idea to trim the others off.
If you open one of the links above from Google Fonts, you will see different sections regarding the available character sets: Latin, Latin-ext, Vietnamese, etc. Copy the one you need from the `src`, and voila, you have a much smaller font size.
Another technique is using a font tool like [Glyphhanger](https://www.zachleat.com/web/glyphhanger/). Its capapable of showing what character ranges you use on your page...
```shell
glyphhanger http://localhost:4321 --json 
```
...and subset them too...
```shell
glyphhanger http://localhost:4321 --subset=Recursive.woff2
```
Its using [fonttools](https://github.com/fonttools/fonttools) under the hood. So dont be suprised if you have to install additional Python libraries.
Both techniques are based on the `unicode-range` CSS property. It defines what character ranger are available within the font family.
```css
@font-family {
  unicode-range: U+0025-00FF; /* code point range */
}
```
## Zero cost font
If you have reached this far, you may be overwhelmed regarding the possibilities. I have good news for you: you don't need to hustle with all of this unless you want to host your font family on your own.
### CDN
You can push that entirely to a Content Delivery Network. Use [Google Fonts](https://fonts.google.com/) or [FontSource](https://fontsource.org/).
```html
<link rel="preconnect" href="https://fonts.googleapis.com">  
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>  
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
```

```css
.desc {
  font-family: 'Roboto', sans-serif;
}
```
### Font stack
Several font families are already installed on the client. So we can utilize them if we define enough fallbacks.
```css
.desc {
  font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;
}
```
Head to https://modernfontstacks.com/ if you want to see more.
### Explicit local font
Use the `local()` path within your for definition like so. This will load your system font instead of something relative in your project.
```css
@font-family {
  src: local("font");
}
```
It's also a great optimization. A font may already be installed on the client, so the browser won't download the project-specific font asset. This aspect makes this technique one of the best solutions, in my opinion.
### Cache
Last but not least, we should not forget a very powerful feature of the browser. And in our case, it's an easy win, since our font won't just so often. Declaring caching happens through the `Cache-Control` header and it's directives.
```http
Cache-Control: public, max-age=2592000
```
Here we defined that our font can used for 30 (60×60×24×30) days from the shared cache (CDN for example). Only after this period will consider the browser the asset stale and reach for fresh version.
## Conclusion
As you can see, typography is not easy, and it's certainly a unique profession on its own. We have just covered the web part here. However, I still love to play around with fonts, especially when it's about Mono/Programmic fonts.
## References
Additional useful post.
- https://medium.muz.li/bored-with-poppins-inter-here-are-some-new-fresh-sans-serif-for-2023-f4af4243b26a
- https://fonts.google.com/knowledge/choosing_type/a_checklist_for_choosing_type