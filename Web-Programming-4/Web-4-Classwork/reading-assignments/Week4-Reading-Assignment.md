# Week 4 Reading Assignment

Watch this video on JSON web tokens (JWT):
- [How does JWT authentication work](https://www.youtube.com/watch?v=hoBSjmrwF1k)

Then do some research on JSON web tokens and digital signatures. Here are some links
that you may want to checkout:
- [Using JWT in NodeJS](https://www.sitepoint.com/using-json-web-tokens-node-js/)
- [JWT and NodeJS](https://www.geeksforgeeks.org/node-js/jwt-authentication-with-node-js/)
- [Understanding Digital Signatures](https://www.cisa.gov/news-events/news/understanding-digital-signatures)
- [JWT Explained](https://www.youtube.com/watch?v=Y2H3DXDeS3Q)

Then answer the following question...

### What is a digital signature?
A digital signature according to the article is " a mathematical algorithm rountinely used to validate the authenticity and integrrity of a message." Simply put a digital signature is the unique indentifier, or digital fingerprint, used to identify users and to protect the information.

### Explain how a digital signature is created for a JSON web token.
To create the signature for a JSON web token; we need the encoded header, the encoded payload, a secret key, and the algorithm specified in the header. We then sign the message using the algorithm and secret key and encode the signature to fit the final format for the token. 

### Which http header is normally used to send a jwt token?
A header needs to have 2 components: the token type (ie: JWT) and the signing algorithm (ie: RSA or HMAC SHA256) when sending a jwt token.

### Explain how an API verifies a token that is sent to it?
When an API receives a token it follows a process to read it. It needs to start by extracting the token from the authorization header of the incoming request. It then parses and decodes the token by ensuring it follows a specific format that corresponds to the token type and then extracts the payload. The payload is expected to contain at least three claims: "exp" - expiration time, "iss" - issuer, and "role" - user role. From there the API does the validation checks, which can be as follows:
    - verifys the signature is authentic and hasn't been tampered with.
    - checks the expiration date of the token.
    - confirms it comes from a trusted user.
    - it may check if the user'r role has access to the information being accessed.
