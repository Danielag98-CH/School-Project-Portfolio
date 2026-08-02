# Week 2 Reading Assignment
## Part 1 - MVC
Do some research on the MVC design pattern in programming (MVC stands for Model View Controller - we'll be using models and controllers in our final project). There are many, many resources on the internet that cover MVC, and there are many different interpretations and implementations of it. It will be interesting to see what you come up with when we talk about it in class.

Then answer these questions:

### Explain the purpose of the following components, which are used in MVC design patterns:
- **Models** - demonstrates the data and business logic of an application. Responsible managing the app's data, processign business rules, and responding to requests for info from other components.
- **Views** - Displays the data from the Model to the user and sends user inputs to the Controller. It is passive and does not directly interact with the Model component.
- **Controllers** - acts as an intermediary between Model and View. It handles user input that updates the Model and changes the View to reflect the Model.

## Part 2 - Organizing Components in an Express REST API Project
[Read this article](https://treblle.com/blog/egergr), then answer the following questions.

## Explain the purpose of the following types of components (commonly used in Express APIs):
 - **Routes** - Where you declare the path of API endpoints and assign controllers.
 - **Controllers** - The methods that process an endpoint and unpacks web layer data to dispatch services.
 - **Data Access (aka Data Service)** - The layer that communicates with the database.
 
### Why might you separate the app code from the server code in an Express app?
We practice the separation to maintain scalability and to be flexible with the application down the line. We also use it to better test the individual aspects to further improve our code.
 
### Explain the ‘components’ approach to organizing your components, which was described in the article that you read.
The components approach to organizing our code, means to separate each UI component to individual folders that each serve a separate function.