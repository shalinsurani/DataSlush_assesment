# DataSlush - Analytics Implementation Engineer Intern Assessment
This repository contains my submission for the DataSlush Analytics Implementation Engineer Intern take-home assessment.  
The goal of this project is to demonstrate skills with GA4, Google Tag Manager (GTM), JavaScript, and Looker Studio by tracking navigation clicks and scroll depth on a sample webpage, and then visualizing the results.


# Project Overview
- Nav Click Tracking: When a user clicks on a navigation item (Home, About, Blog), an event 'nav_click' is pushed into the 'dataLayer' and then sent to GA4 via GTM.  
- Scroll Depth Tracking: As the user scrolls, milestones at 25%, 50%, 75%, and 100% are detected. Each milestone triggers a single 'scroll_depth' event with parameter 'scroll_percent'.  
- Looker Studio: A simple dashboard is built on top of GA4 data to visualize navigation clicks and scroll depth engagement.  


# Implementation summary
- Nav click events: pushed with 'dataLayer.push({event:"nav_click", section_name: "Home"})'
- Scroll depth events: pushed with 'dataLayer.push({event:"scroll_depth", scroll_percent: 25})'
- GTM variables created: 'DL - section_name', 'DL - scroll_percent'
- GTM triggers: 'trg - nav_click' (Custom Event name = nav_click); 'trg - scroll_depth' (Custom Event name = scroll_depth)
- GTM tags: 'GA4 - Configuration' (Measurement ID = G-W7FZ7NF2Y6), 'GA4 Event - nav_click', 'GA4 Event - scroll_depth'


# Testing & Debugging
- Use GTM Preview mode (Tag Assistant) to view dataLayer pushes & tag firing.
- Use GA4 DebugView to confirm events reach GA4.


# Setup Steps
1. To get this project running, I first created a new GA4 property in Google Analytics. Since GA doesn’t allow localhost as a website URL, I used a placeholder domain (https://example.com) just to set up the property. From there, I copied the Measurement ID (G-W7FZ7NF2Y6), which I later used inside GTM.
2. Next, I created a new Google Tag Manager container for the web. After setting it up, GTM gave me a Container ID (GTM-KCK84XM2). I updated the index.html file and replaced the placeholder ID (GTM-KCK84XM2) with my own container ID so the page could connect to GTM correctly.
3. Inside GTM, I set up: 
         Data Layer Variables → section_name and scroll_percent, so GTM could capture the values being pushed from JavaScript.
         Triggers → one custom event trigger for nav_click and another for scroll_depth.
         Tags → a GA4 Configuration tag (Google Tag) with my Measurement ID, plus two GA4 Event tags (nav_click and scroll_depth) that map the parameters correctly.
4. After saving everything, I tested the setup using GTM Preview mode (Tag Assistant) and then confirmed in GA4 DebugView that my events were showing up exactly as expected.
5. Finally, I connected the GA4 property to Looker Studio. This allowed me to build a simple dashboard where I could see navigation clicks broken down by section name and scroll depth milestones displayed as bar charts.



# Files in this Repo
- html1.html : Basic webpage with navigation and long content.  
- tracking.js : JavaScript file handling nav click & scroll depth tracking.  
- gtm-container-export.json : Export of GTM setup (tags, triggers, variables).  
- README.md : This documentation file.
- Video Link in a .txt File
- GA4 setup notes (PDF)
- Screenshots
  
- lookerstudio-link
https://lookerstudio.google.com/reporting/7f7138bb-5ff7-4c0a-98c4-493e10bf2949



# How to Run Locally
1. Clone or download this repo to your computer.
2. Open a terminal/command prompt in the project folder.
3. Run a simple local server (to mimic a website):
   python -m http.server 8000
4. Open the browser and go to:
http://localhost:8000/html1.html

Video Link :
https://drive.google.com/file/d/1iGKpSy0ymWGloJBM8N8VQlxrRt1GEAfN/view?usp=drive_link 


# Follow-Up Questions
1. How did you prevent duplicate scroll depth events?
   -> I used a simple tracking object to remember which milestones had already been triggered. The code creates an object called scrollMilestones with boolean values for each percentage (25, 50, 75, 100). When a user reaches a milestone, the code first checks if that milestone has already been marked as true. If it hasn't been triggered yet, it fires the event and sets that milestone to true. This way, even if someone scrolls back up and down again, each milestone only gets tracked once per page visit. The tracking resets when the page is refreshed or reloaded.
2. Why is it useful to track navigation interactions separately from pageviews?
   -> Navigation clicks tell you what users are actively looking for, while pageviews just tell you they landed on your page. When someone clicks "About" in your navigation, they're making an intentional choice to learn more about your company. This gives you insights into user intent that you can't get from pageviews alone. You can see which sections people find most interesting, identify content gaps if certain navigation items get very few clicks, and understand user behavior patterns. It also helps you optimize your menu structure - if nobody clicks on a navigation item, maybe it's not useful or not positioned well.
3. How would this change if the site was a single-page application (SPA)?
   -> With an SPA, you'd need to handle route changes differently since the page doesn't actually reload when users navigate. You'd need to listen for route change events and manually trigger pageview events in GA4 when the URL changes. For scroll tracking, you'd need to reset the scroll milestones whenever someone navigates to a new section, since they're staying on the same physical page. You'd also need to consider that different sections might have different content lengths, so the scroll depth calculation might need to be section-specific rather than page-specific.
4. How would you debug scroll tracking issues in GTM or GA4?
   -> I'd start by checking the browser console to see if the scroll milestone messages are appearing when I scroll. If those aren't showing up, there's a problem with the JavaScript. If the console shows the milestones but GTM isn't firing, I'd use GTM's preview mode to see if the triggers are working properly. If GTM shows the events firing but they're not reaching GA4, I'd check the GA4 DebugView to see what's actually being received. I'd also verify that the measurement ID matches between GTM and GA4, and make sure the scroll calculation logic is working correctly by adding more console logs to see the actual scroll percentages being calculated.
