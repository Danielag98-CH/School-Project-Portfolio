# Control Structures
In Web 1 you learned about the following **control structures**:
1. IF Statements (and all of their variations)
1. While Loops
1. For Loops

Now you will explore the control structures that are listed below. 
For each one, write a brief paragraph that describes the control
structure and the situations when you would use it.
Also, include a fun and imaginative code sample that demonstrates 
the control structure.

## Switch/Case Statement
We use switch statements in code to select one of many code blocks to be executed. The way they work is the switch expression is evaluated once, the value is then compared with the values for each case and if there is a match then the matched value is executed if not then the default code is given. In switch statements we also provide the case data inside the code block. In the code we need to provide the default that will be provided when there is no match,as well as we need to include the keyword "break" to help exit the code blocks. 

```js
const favoriteBerry = prompt("Enter your favorite Berry!")

switch(favoriteBerry.toLowerCase()){
    case "strawberry":
        message = "strawberries are my fave too!";
        break;
    case "blueberry":
        message = "Good Choice, great for antioxidants!";
        break;
    case "raspberry":
        message = "Those are yummy!";
        break;
    case "blackberry":
        message = "Its so hard to find non-bitter ones, goodluck!";
        break;
    default:
        message = "Interesting choice I am exited to try that";

}
alert(message);
```

## For/In Loop
For in statements loops through the properties of an object. Something to take note, if index order is important, do not use for in over an array.  

```js
const kitty = {firstName: "kimchi", lastName: "Gonzalez", color: "white", age: "2"};
for(let x in kitty){
    console.log(kitty[x]);
}
```

## Conditional Operator (aka Ternary Operator)
A Ternary Operator is a described as a shortcut method for writing simple if-else statements. It can also be called a Conditional operator because it works based on having a condition. This operator works in three parts; a 'condition' which is a statement that returns a true or false, the 'value if true' where it will return if the condition is true, and the 'value if false' is what happens when the condition is false.

```js
const school = prompt("Enter your grade");

const result = school >= 45 ? "You are passing": "please work harder";

alert(result);


```

