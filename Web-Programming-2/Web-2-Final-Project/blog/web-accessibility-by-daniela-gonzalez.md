---
title: web accessibility
author: Daniela Gonzalez
description: We will be taking at how to add accessibility when creating a website.
published: "2025-02-05"
---

# Web Accessibility 
Web-accessibility as a whole was created to allow people with a range of disabilities to be able to interact with websites. Though not only for people with disabilities, web accessibility standards of practice allows for everyone to be able to navigate various websites.

## Examples of Common Web-accessibility Barriers
1. Poor Color Contrast:
    - not enough contrast between background and text.
    - screen readers may not read off color names for color-based instructions to the blind.
2. Lack of Text Alternatives:
    - no image description is given for blind users to understand.
3. Lack of Video Audio Captions:
    - people with hearing impairment don't always have access to videos with captions to be able to read and understand what they are seeing.
4. Mouse-Only:
    - people may not be able to use a trackpad or computer mouse to navigate the website, so an alternative can be provided. 
5. Hard to read online forms:
    - online forms may be difficult to understand if missing:
        - Labels
        - clear Instruction
        - Error Indicators 

The need for accessibility can be divided into 5 groups:
    - Auditory: people with hearing loss that require transcripts for audio and captions fpr video.
    - Cognitive, Learning, and neurological: people that have a challenge understanding information, so we need clear structure, consistent labeling, and predictable links and plain language.
    - Physical: people with limitations in everday motor skills need assistive technology like switches and voice recognition to help them navigate the site.
    - Visual: people with reduced vision, we need to make sure text is big enough, color contrast is high, and content supports text-to-speech to help.
    - Speech: for those who are not able to speak we will not make a service voice-based only.

# Solutions

Developers have developed a method to be able to assist in the creation of accessible websites. It's ARIA which stands for **Accessible Rich Internet Application**, and it is defining how we make the web more accessible to people with disabilities. 

## How this works
ARIA defines sematics that can be added to elements, that can be further divided into roles which are supported by states, and properties. Developers need to assign an ARIA role with the matching states and properties to an element. 
 There are 4 attribute types: 
    - Widget 
    - Live Region
    - Drag-and-Drop
    - Relationship
and regardless of the ARIA role that can be assigned there are those that can be considered "Global" attributes.




The following links were what I used to research the topic of web-accessibility:
1. <a href="https://www.ada.gov/resources/web-guidance/" target="_blank">ADA: https://www.ada.gov/resources/web-guidance/</a>
2. <a href="https://www.w3.org/WAI/standards-guidelines/" target="_blank">W3C WAI: https://www.w3.org/WAI/standards-guidelines/</a>
3. <a href="https://www.freecodecamp.org/news/best-practices-for-accessibility-in-web-development/" target="_blank">freeCodeCamp: https://www.freecodecamp.org/news/best-practices-for-accessibility-in-web-development/</a>
4. <a href="https://www.w3schools.com/accessibility/accessibility_intro.php" target="_blank">https://www.w3schools.com/accessibility/accessibility_intro.php</a>
5. <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" target="_blank">https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA</a>
