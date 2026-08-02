# Week 3 Reading Assignment

Read these articles, and then answer the questions below
- [Salting and Hashing Passwords](https://crackstation.net/hashing-security.htm)
- [Adding Salt to Hashing](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/)
- [Meta Fined $100M for Storing Passwords in Plain Text](https://arstechnica.com/security/2024/09/meta-slapped-with-101-million-fine-for-storing-passwords-in-plaintext/)

### Explain the difference between encrypting and hashing
As far as I can tell the biggest difference between encrypting and hashing is the ability to reverse the scrabling of data. Encrypting for example rearrages data so that no one can read it with out the key to reverse the arrangement. While hashing turns data, like encrypting, scrables code as well but there is no way to reverse the process. In short encrypting is reversible while hashing is a one-way change. 

### Why is it important to 'salt' a password before hashing it?
We want to 'salt' our passwords before hashing them in order to limit the possibility of similar hashings. Meaning if we 'salt' a password first we create more unique and harder to crack hashings then if we didn't. The article "adding Salt to Hashing" sums it up best by saying "the uniqueness of salt per hash creates a significant computational barrier for attackers, who must now generate separate hash tables for each user."

### What types of attacks will hackers attempt that can be mitigated by salting passwords?
One example is a "Dictionary attack": which is a strategy used by attackers to crack passwords by trying a list of likely passwords, like a dictionary or common password list, against password hashes stored in a system. Salting can help mitigate it by adding unique, random strings to each user's password before the password is then hashed and stored, effectively making your password stronger against hacks.

### Why is it important to use a unique salt string for each user password?
We want to use unique salt strings for each user to ensure that each hash is unique when storing our passwords, this way we reduce the chance of repeatable hashes and increase the difficulty of cracking passwords.