---
author: PUT YOUR NAME HERE
copyright: Niall Kader
title: Arrays Review
---

Create a sample page and experiment with the array methods listed below.
Come up with a few very simple code samples for each of them.

Then fill in the details for each of the methods below.
I have done the first one for you (the foreach() method) to demonstrate 
what I expect you to do with the other methods listed.

## forEach()
The forEach method is used to loop through the array.
There are two parameters that you can pass into forEach().
Only the first one is required:
1. a **callback** function.
These are the parameters that you can define for the callback (only the first parameter is required):
	1. The **current element**
	1. The **index** of the current element
	1. The **array** that you are looping through
1. a value/object to be used as **this**, which is usually not useful.

JavaScript will loop through the array and invoke the callback for each element in the array,
passing in the parameters described above.

Here's an example:
```js
const scores = [94, 85,9 7];
scores.forEach((ce)=> console.log(ce))
```

Here's an example that uses the index parameter in the callback:
```js
scores.forEach((ce, index)=>{
	console.log("INDEX: " + index, "CURRENT ELEMENT (a score): " + ce);
});
```

# Part 1

## push()
The **push()** method adds new items to an array, specifically the end of an array. 

This method does not have set parameters, it accepts any number of elements that the user would like to add to the end of an array. A minimum of one item is required. 

The **push()** returns an number and the new length of an array.  
```js
const colors = ["aqua", "maroon","teal", "copper", "lilac" ];
colors.push("navy", "turquoise", "purple", "mauve", "forest green");
console.log(colors);
console.log(colors.length);

const fruit = ["tomato", "strawberry", "passionfruit", "mango", "kiwi", "pomegranate"];

const veggies = ["broccoli", "cauliflower", "bell peppers", "lettuce", "carrots", "potatoes"];

fruit.push(...veggies); /* the "..." in this code is called a "spread operator" it takes each element of the veggies array and adds them individually to the fruit array*/
console.log(fruit);
console.log(fruit.length);
```



## includes()
The **includes()** method searches an array to see if it contains, or doesn't contain, a specified value.  

This method need a searchElement, which is the value to search for, and optionally you can add a fromIndex. fromIndex is an optional parameter in the method that specifies the position in the array to start searching from, if not used the default value to begin the search is 0. 

The **includes()** method returns a boolean expression, it will search the array and return **true** if a value is found and **false** if the value is not found.

```js
const countries = ["Belize", "Italy", "Greece", "Japan", "Korea", "The United Kingdom", "France"];

console.log(countries.includes("Japan"));
console.log(countries.includes("Romania"));
console.log(countries.includes("Korea", 3));
```

## concat()
The **concat()** method concatenates or joins two or more arrays into one.

We need multiple arrays or values to be able to join. 

This method returns a new array, it does not change the existing arrays, it just joins them.

```js
const a1 = ["Arianna", "Angela", "Logan", "Jessie", "Sonja"];
const a2 = ["Hannah", "Jack", "Katie", "Julie", "Holly"];
const a3 = ["Stacie", "Leslie", "Dave", "Maria", "Marcy"];
const coworkers = a1.concat(a2, a3);
console.log(coworkers);
```

## join()
The **join()** method creates a new string by concatenating all the elements in the array.

This method has an optional parameter of a separator, when creating the code you can add what you would like the returned array to 
look like. Options include " - ", " ' ' ", and the default is a comma.


This method returns a string value.

```js
const elements = ["fire", "water", "earth", "air"];
console.log(elements.join(' - '));
```

## pop()
The **pop()** method changes the original array by removing the **last element** in an array.

There are no specified or optional parameters.

This method returns the value or element that was affected by **pop()**.

```js
const onlineGames = ["Genshin Impact", "Valorant", "Stardew Valley", "World or Warcraft", "Fortnite"];
console.log(onlineGames.pop());

```

## find()
The **find()** method searches an array and returns an element that satisfies the set parameters.

This method has a required parameter and a few optional ones.
Required:
1. a  function is needed to run for each given array element
2. currentValue is needed to give the value of the current element
Optional:
1. The index of the current element
2. The array of the current element 
3. thisValue is a value passed into the function as its **this** value.

Returned we get the value of the first element that satesfies what was given, if not "undefined" is returned.

```js
const coworkersAges = [24, 26, 27, 45, 36, 53, 65, 42, 35];
const searchAge = coworkersAges.find(age => age >= 35);
console.log(searchAge);

```

## splice()
The **splice()** method can add or remove elements from an array.

When creating a splice method we need to include the parameter of the index, this index tells our function where to add or remove the given value. 
Optional parameters include:
1. a count - which tells how many items to be removed
2. items - if new elements are to be added, what are they.

The returned value is an array that has the removed elements.

```js
const newColors = ["blue", "green", "yellow", "pink", "orange", "red"];
console.log(newColors.splice(3));
```


## slice()
The **slice()** method returns the selected elements in a given array as a new array, without affecting the old array.

Optional parameters are a "start" which is the position in which to begin in the array, and/or a "end" which is an end position where it stops.

Returned we get the array with the selected elements.

```js
const bedroom = ["tv", "desk", "computer","bed", "closet", "pillows","blankets", "night stand"];
const essentials = bedroom.slice(3, 8);
console.log(essentials); 
```



# Part 2

## filter()
The **filter()** method creates a new array that contains all the elements that satisfy the test provided by a function. It does not change the original array.

Required parameters are a function and a currentValue. Optional parameters are an index, the arrays being used, or a thisValue element.

Returned we get an array containing what passes the filter method.

```js
const coworkersAges = [24, 26, 27, 45, 36, 53, 65, 42, 35];
const checkAge = coworkersAges.filter(age => age >= 40);
console.log(checkAge);
```

## map()
The **map()** method creates a new array filled with the results of calling a provided function on every listed element of in the calling array.

Required paramters include a callback function and a currentValue. Optional values include an index, the arrays being used, or a thisValue.

Returned is the array containing the results of the parameters called on the given array. 

```js
const animals = ["dogs", "cats", "horses", "turtles", "snakes", "hamsters"];
 const animalsList = animals.map(a => "<li>" + a + "<li>");
 console.log(animalsList);
```

## reduce()
The **reduce()** method executes a "reducer" function for array elements. To specify this method takes all the items in an array and "reduces" them down to a single value. How the values are combined is defined by the user-defined "reducer", it could be adding them together or combining them in other ways.

Required parameters include the callback function and the currentValue. Also included in the required parameters is an "accumulator", which is a variable that keeps track of the result as the method goes through each element in an array. 
Optional parameters include, currentValue, currentIndex, the arrays being used, and/or an initialValue.

Returned we get the combined result of the method.

```js
const someScores = [45, 85, 62, 93, 78, 56];
const sum = someScores.reduce((s, ce) => s + ce, 0);
console.log(sum);
```
