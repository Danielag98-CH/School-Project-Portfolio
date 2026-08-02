# Document Root Relative Links

In Web 1 you learned about **absolute** and **relative** links.
In this activity you will learn about a third type of link that you can
use in your web pages. But first, we'll talk about 'web servers'.

In order to have a live website on the internet, your website files
must be placed on a **web server**. A web server is a computer
that is connected to the internet, and runs software that allows it
to respond to requests from clients (browsers). The web server software
that is used by Western is called **Apache**.

The folder on the web server that stores all the files for a web site is known as
the **document root directory**. The actual name of this folder may vary.
For example, in your Western hosting account, the name of the document root directory
is **public_html**, but other web servers might use a different name for the folder.

Now we can talk about document root relative links. The path for this type
of link begins with a forward slash, which indicates that the path should start from
the document root directory of the website.

Assume that this is the file structure of your document root directory:
```md
public_html/
	styles/
		- main.css
		- reset.css
	js/
		- main.js
		- image-gallery.js
	images/
		- guitar-picture.jpg
		- tennis-picture.jpg
	blog/
		- index.html
		- guitars.html
		- tennis.html
	index.html
	photos.html
```
Now assume that you want to display **guitar-picture.jpg** in the guitars blog page (**guitars.html**).
To use a relative path, the **img** element would look like this:
```html
<img src="../images/guitar-picture.jpg" alt="A cool guitar">
```
With relative paths, the starting point is the location of the file in which you want to display the image
(the location of the **guitars.html** file is inside the **blog** folder). 
So, the **src** attribute above 
uses a path that is relative to the **blog** folder. From the **blog** folder, you must first step 
up into the parent folder by specifying **../**. The next step is moving into the **images**
folder, where you'll find your destination (**guitar-picture.jpg**). 

But you could also use a **document root relative** path (which is
also referred to as a 'root relative', or 'doc root relative' path),
like so:
```html
<img src="/images/guitar-picture.jpg" alt="A cool guitar">
```
Note that doc root relative paths start with a forward slash, and 
the path always starts in document root directory for the website. So, from there,
the first step would be into the **images**, where you'll find the image

The nice thing about doc root relative paths is that they allow you to
move your files around without having to change the paths in your links.
So, if you decided that you want to move the guitars.html file to another
folder in the website, then you would not have to change the path that you
used to display the image.

We'll be seeing doc root relative paths later in this course!
