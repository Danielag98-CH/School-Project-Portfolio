---
title: oncontextmenu Event
author: Daniela Gonzalez
description: We will be taking a look at an event known as the "oncontextmenu"
event. This Event occurs when the user clicks on something. 
date: 2025-1-22
---

When learning JavaScript, we are often shown a variety of options when it comes to creating an interactive user experience. In the following article we will be looking into the following Javascript event, **oncontextmenu**, to give us an understanding of how to elevate our code.

Here are a few articles that I found interesting when researching this event. These articles also helped in developing a working example of code. 
1. <a href = "https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event" target = "_blank">https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event

1. <a href = "https://www.geeksforgeeks.org/html-dom-oncontextmenu-event/" target = "_blank">https://www.geeksforgeeks.org/html-dom-oncontextmenu-event/

1. <a href = "https://www.w3schools.com/jsref/event_oncontextmenu.asp" target = "_blank">https://www.w3schools.com/jsref/event_oncontextmenu.asp

**Oncontextmenu** allows a user to open a context menu in the browser. In order for the event to occur the user needs to **right-click** on the item in question to open the "context menu". A context menu is a pop-up menu after right-clicking.

We want to start off with the base of our code in the coding software you are using (personally I am using Visual Studio Code) create a file and copy the following code to get started:

```html
<!DOCTYPE html>
<html>
 
<head>
    <style>
        div {
            background: teal;
            border: 1px grey;
            padding: 10px;
        }
    </style>
</head>
 
<body>
    <h1 style="color:aqua">
            Research Paper Test
        </h1>
        <h2> oncontextmenu Event</h2>
        <div id="myDIV">
          <p>Right-click inside this the box</p>
        </div>
        <p id="try"></p>
<script>
// we will be adding JavaScript somewhere in this portion of the code.
</script>
</body>
</html>
```
It's important to note that the code I provided about is just a basic HTML code clock, it will require alot of adjustment to make it an oncontextmenu event.

Below is the JavaScript code we will insert in the noted portion from above.

```js
    document.getElementById("myDIV").oncontextmenu = function (){
        ocm()
    };

    function ocm(){
        let ocm = document.getElementById("try")
        ocm.innerHTML = "you right-clicked";
    }
```

Now if you run the code it should allow you to see a pop-up that says "you right-clicked".
 
 An alternative code that has the more modern Javascript format is as follows:
```js
<!DOCTYPE html>
<html>
 
<head>
    <style>
        div {
            background: teal;
            border: 1px grey;
            padding: 10px;
        }
    </style>
</head>
 
<body>
    <h1 style="color:rgb(31, 140, 140)">
            Research Paper Test
        </h1>
        <h2> oncontextmenu Event</h2>
        <div id="myDIV">
          <p>Right-click inside this the box</p>
        </div>
        <p id="try"></p>
        <script>
            const myDiv = document.querySelector("#myDIV");
            const tryP = document.querySelector("#try");

            myDiv.oncontextmenu = () => {
                ocm();
            };
        
            function ocm(){
                tryP.innerHTML = "you right-clicked";
            }
        </script>
</body>
</html>
```
Either choice will give the same result.

When adding a oncontextmenu event notice that the pop-up menu will stay in place till the page is refreshed, in order to change that we should add a **timeout()** function.
```js
setTimeout(() => {
    tryP.innerHTML = ""; /* clears the message */
}, 5000); /* sets timer to clear the message to 5 seconds */
```
add the code above inside the following:
```js
 function ocm(){
    tryP.innerHTML = "you right-clicked";
    // add setTimeout() here
}
```