# Week 1 Reading Assignments

## REST API Introduction
[Read this article](https://www.geeksforgeeks.org/node-js/rest-api-introduction/)
and then answer the following questions.

### What is a REST API and what is it used for?
- REST API stands for Representational State Transfer API. It is used to communicate between different systems over the internet. It is the guideline for the design and application of the 'URL'.

### What encoding/formatting is usually used for data that is sent in requests and responses?
- REST API's use HTTP methods to interact with data, but using it in a way that defines how the API should behave. REST simplifies the communication process by providing HTTP operations to send requests to the server.

- A request is sent from the client to the server over the web, using a HTTP method. The server then responds with the requested resource which could be in other forms, like HTML or JSON. 

### Explain how HTTP methods are used to make CRUD actions.
- REST uses the POST, GET, PUT, PATCH, and DELETE methods of HTTP each has a respective CRUD operation defined. 
    - **GET** is used to *read* (or retrieve) a respresentation of a resource
    - **POST** is commonly used to *create* new resources. Often used to make child resource to the parent.
    - **PUT** is used to *update* or *create* a resource on the server. The whole resource is sent over the web and replaces the current source in that web local.
    - **PATCH** is used to partially *update* a resource on the server. It modifies specific resources by requiring the fields that need to be updated in the request body.
    - **DELETE** is used to *delete* a resource requested on the web and returns a HTTP status 200.

### What does it mean for a REST API to be 'stateless'?
- Each request from the client to the server must contain all the information the server needs to fulfill the request. No session state can be stored on that type of server.



## RESTful API Design - A Practical Guide 
[Read this article](https://dev.to/leapcell/mastering-restful-api-design-a-practical-guide-408)
and then answer the following quetions.

### Which of the following URLs would be valid according to REST API standards (assume the URL is for a GET request):
- /getUser/7 -> this one is valid
- /user/7
- /users/7

### Which status code should be returned if the request was not valid?
- 400

### Which status code should be returned if the user making the request is not authenticated?
- 401

### What should the 'Content-Type' header be set to in a response that returns JSON data
- application/json


## Unit Testing Techniques 
[Read this article](https://www.testrail.com/blog/unit-testing-tdd-bdd/)
and then answer the following questions.

### Regarding automated unit testing, what does a 'unit' refer to?
- a 'unit' is a method of the class being tested. Essentially a "unit" can be the individual functions that we want to successfully work within our class. 

### What is test-driven development?
- Test-driven development is a development method involving testing your code as you progress the development of the application.
