# User Stories – CSIT314 Event Management System

**Version 2.0**  
**Written by:** Chelsea (Project Manager/Documentation Lead)  
**Last edited:** 16th April 2025  

---

## Purpose  
This document outlines the core user stories for the Event Management System. It is structured to support our chosen agile methodology and incremental delivery across the defined user roles. Each story was written to reflect the specific system functionality from an end-user perspective and adheres to INVEST principles (Independent, Negotiable, Valuable, Estimable, Small and Testable).  

---

## 1.2 Format Standard  
Each user story follows the format:  
**“As a [type of user], I want to [goal] so that [benefit].”**

---

## 1.3 Actor Overview  
This project includes the following user types:
- General Users (attendees)
- Event Organisers
- System (backend operations)
- Administrators

---

## 1.4 User Stories by Actor

### 1.4.1 General Users  
Users interact with the platform primarily to register, browse, and attend events. Their experience should be seamless, intuitive, and responsive across all devices.

- As a user, I want to register for an account so that I can access personalised features.  
- As a user, I want to log in and log out securely so that I can protect my account information.  
- As a user, I want to view upcoming events so that I can choose which ones to attend.  
- As a user, I want to search and filter events by date, type, or location so that I can find relevant options quickly.  
- As a user, I want to register or purchase tickets for events so that I can confirm my participation.  
- As a user, I want to view a history of events I've registered for so that I can track my engagements.  
- As a user, I want to receive email or in-app notifications about event changes or confirmations so that I stay updated.  
- As a user, I want to receive a digital ticket upon registration so that I can present it at the event.  
- As a user, I want to request a refund for cancelled or missed events so that I can recover my costs.  
- As a user, I want to check in using my digital ticket so that my attendance is recorded efficiently.  
- As a user, I want my ticket status and availability to update in real-time so that I get accurate information before booking.  
- As a user, I want to view the perks associated with VIP and General tickets so that I can choose based on value.  
- As a user, I want to upgrade from a general ticket to a VIP ticket (if available) so that I can access premium features.  

### 1.4.2 Event Organisers  
Organisers use the platform to manage event creation, attendee lists, and real-time updates. Their interaction must support efficient content creation and administrative control.  

- As an organiser, I want to log in to my organiser account so that I can manage my events.  
- As an organiser, I want to create new event listings so that users can see what I’m offering.  
- As an organiser, I want to edit or cancel events so that I can keep information accurate.  
- As an organiser, I want to view the list of attendees per event so that I can prepare accordingly.  
- As an organiser, I want to send event updates to registered users so that they stay informed.  
- As an organiser, I want to generate basic reports on event attendance so that I can evaluate success.  
- As an organiser, I want to define VIP and General ticket tiers so that I can offer differentiated experiences.  
- As an organiser, I want to trigger refunds in case of cancellations so that users are compensated.  
- As an organiser, I want to view live ticket sales and capacity stats so that I can monitor event performance.  
- As an organiser, I want to scan and verify user tickets on check-in so that I can ensure valid entry.  

### 1.4.3 System-Level Functionalities (Non-Human Actors)  
These user stories reflect core system operations required to support user-facing features. Though they aren’t user-initiated, they are still essential to functional integrity.

- As the system, I must validate user input on all forms so that data is consistent and error-free.  
- As the system, I must send confirmation emails after registration or ticket purchases so that users receive proof of action.  
- As the system, I must implement secure authentication so that user data is protected.  
- As the system, I must provide role-based access so that users only access relevant features.  
- As the system, I must log user interactions so that audit trails are maintained.  
- As the system, I must generate and deliver digital tickets upon successful registration so that users receive timely access credentials.  
- As the system, I must automatically process refunds for cancelled events so that user payments are reversed without manual work.  
- As the system, I must update event capacity and ticket status in real-time so that organisers and users view accurate data.  
- As the system, I must differentiate features based on ticket type (VIP vs General) so that users access correct privileges.  

### 1.4.4 Administrators  
Administrators manage system integrity and user governance.

- As an admin, I want to monitor system-wide activity so that I can ensure smooth operations.  
- As an admin, I want to review and moderate events so that I can remove inappropriate or duplicate content.  
- As an admin, I want to manage user accounts so that I can suspend or deactivate as necessary.  

---



## 1.5 Document Note  
This user story list is expected to evolve with stakeholder feedback and ongoing sprint retrospectives (i.e. changes in the Rubric or any updates from the Subject Coordinator).  
Non-functional requirements (e.g. performance, usability, accessibility) will be addressed separately (should it be required in the final submission).  

*This version of the user stories reflects key revisions made after receiving feedback on our earlier submission from the Subject Coordinator. These updates were guided by marking criteria and identified gaps (e.g. digital ticket generation, refunds, real-time data, and check-in). All stories have been revised to maintain alignment with the INVEST model and provide comprehensive functional coverage across all user roles.*