
# CSS Worksheet

## Problem 1
Explain the difference between these two selectors (make sure to mention the elements that each selector is targeting):
```css
ul li.selected{
	/*rules (property settings) go here*/
}


ul li .selected{
	/*rules (property settings) go here*/
}
```
### Put your answer here
ul li.selector, with no space between the period is targeting the li element with the class of selected that is directly inside of a ul.

while theh ul li .selected, with a space between the li and .selected, targets any element with the class selected inside an li element, which is in turn inside a ul. 


## Problem 2
What are **square brackets** used for in CSS selectors?
For example, what does the following selector target:
```css
input[type=text]{
	/*rules (property settings) go here*/
}
```
### Put your answer here
Square brackets are attribute selectors, they allow us to target specifics elements of our code. In the example above the "[type="text"]" is looking for inputs that specifically have a "type" of "text".


## Problem 3
What is the **greater than** character used for in CSS selectors?
For example, what does the following selector target:
```css
div > p{
	/*rules (property settings) go here*/
}
```
### Put your answer here
the > is called a child combinator and is used to select elements that are direct children of a specific parent. In the example above p is a direct child of div and the code is targeting all of the elements that fall within that category.


## Problem 4
What is the **tilde** used for in CSS selectors?
For example, what does the following selector target?
```css
h3 ~ p{
	/*rules (property settings) go here*/
}
```
### Put your answer here
the tilde is called a subsequent-sibling combinator and is used to match occurences between elements that share the same parent.
In the example above h3 is matching the occurence of p.


## Problem 5
What is the **+** sign used for in CSS selectors?
For example, what does the following selector target:
```css
input[type=radio] + label{
	/*rules (property settings) go here*/
}
```
### Put your answer here
the + is called a next-sibling combinator and is used to select that is placed immediately after another specific element. 


## Problem 6
Explain what a **psuedo selector** is in CSS.
And include a code sample that demonstrates a psuedo selector.
### Put your answer here
a pseudo selector is used to add style to selectors, but only when they meet certain conditions.
Example of Pseudo selector
a:hover{
	background-color: blue;
	font-size: 10px;
}