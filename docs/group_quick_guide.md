# CSIT314 - Group Project Quick Guide  
**Event Management System (2025)**  
*Simple breakdown of what we need to do including roles and process*  
**Prepared and simplified by: Chelsea**

---

## Project Objective

The object of this group assignment is to build an Event Management System where:

### Users can:
- Register/log in  
- Browse events  
- Register/purchase tickets  
- Receive notifications  

### Organisers can:
- Create and manage events  
- View attendees  
- Process payments  
- Get reports  

> This is meant to mimic real-world systems like Eventbrite or Humanitix,  
> but we’re going to be working on a smaller scale.

---

## Development Process Overview

### 1. Group Formation + Roles
- Maximum of 5 members  
- Roles and responsibilities outlined below (can be adjusted as needed)

---

### 2. Pick Development Methodology
- Scrum recommended for iterative work and team collaboration  
- Here's the original proposed Scrum calendar (subject to revision):

| Sprint # | Dates            | Focus                                                                 |
|----------|------------------|------------------------------------------------------------------------|
| 1        | Apr 1 – Apr 12   | Finalise user stories, assign roles, set up GitHub + repo, start UI mockups |
| 2        | Apr 15 – Apr 26  | Initial backend setup, frontend login/register, basic structure        |
| 3        | Apr 29 – May 10  | Core features: event creation, event listing, registration flow        |
| 4        | May 13 – May 24  | Add notifications, payment mock, attendee dashboard                    |
| 5        | May 27 – May 31  | Bug fixes, testing, polish, UI enhancements                            |
| 6        | Jun 3 – Jun 7    | Finalise documentation, user manual, submit project                    |

*Note: This plan may need adjustment around mid-semester break. We can either take a break or use that week to catch up.*

---

### Suggested Weekly Breakdown (per sprint):
- **Tuesday:**
  - Plan tasks
  - Assign issues in GitHub Projects (or equivalent)
  - Set sprint goal

- **Friday/Sunday:**
  - Share progress
  - Reflect: what worked? what didn’t?
  - Log meeting summary combining weekly updates

---

## Important Dates
- **Progress Report Submission:** Friday, April 18 (Week 7)  
  Includes:
  - User stories  
  - Development plan + methodology  
  - UML diagrams (use case, class, sequence)  
  - Screenshots/snippets of system  
  - Meeting logs + team contributions

- **Final Deliverables Due:** Week 13 (check Moodle for confirmation)

---

### 3. Select Project Management Tool
**Proposal:** Use GitHub (instead of Taiga)

**Why GitHub:**
- Everything in one place (code, tasks, CI/CD)
- Real-time collaboration + version control
- Supports task tracking via issues/boards
- Required CI/CD pipelines supported (via GitHub Actions)

> *CI/CD (Continuous Integration/Deployment): automatically test/build every time we push to repo. Keeps things stable and avoids manual chaos.*

---

## Suggested Group Roles

Each member has a **Primary** role and **Support** role. These can be flexible. Everyone overlaps during crunch time (especially before submissions).

---

### 1. Project Manager + Documentation Lead  
**Assigned:** Chelsea  

**Primary Responsibilities:**
- Coordinate sprint goals, timelines, deadlines  
- Run sprint planning + retrospectives  
- Maintain GitHub Project board  
- Draft & format Progress Report  
- Write/refine:
  - User stories  
  - Methodology  
  - Testing strategies  
  - Contribution summaries  
  - Final editing

**Support:**
- Format user manual in final sprint  
- Edit/report check for consistency

**Report Evidence:**
- GitHub board screenshots, sprint logs, written sections, meeting minutes

---

### 2. UML + Planning Diagram Specialist  
**Assigned:** Tamim  

**Primary Responsibilities:**
- Create all required UML diagrams:
  - Use Case  
  - Class  
  - Sequence  
  - (Optional: ERD)

- Provide explanatory notes for each diagram

**Support:**
- Collaborate with devs to match logic  
- Assist user manual visuals/flow charts

**Report Evidence:**
- Diagrams, write-ups, explanations

---

### 3. Frontend Developer + UI Lead  
**Assigned:** Zuhor  

**Primary Responsibilities:**
- Build layouts and UI components (login/register, listings)  
- Style interactive elements (HTML/CSS/JS or Figma)  
- Create clickable mockups if not yet coding

**Support:**
- Provide screenshots for report  
- Assist with user manual UI sections  
- Coordinate with backend for integration

**Report Evidence:**
- UI screenshots, mockups, code snippets

---

### 4. Backend Developer + Data Wizard  
**Unassigned (as of writing)**  

**Primary Responsibilities:**
- Design database schema (SQL or ORM)  
- Code backend logic:
  - Event creation  
  - Ticket reg  
  - Auth  
  - Payment mock

- Dummy data generation (10 organisers, 50 users)

**Support:**
- Set up GitHub Actions CI/CD  
- Write backend guide for manual

**Report Evidence:**
- API routes, test data script, DB diagram, CI config

---

### 5. User Manual Coordinator + QA Assistant  
**Unassigned (as of writing)**  

**Primary Responsibilities:**
- Draft user manual:
  - System overview  
  - Feature usage  
  - Step-by-step guides

- Collect screenshots from team  
- Ensure clarity for non-technical readers

**Support:**
- Format final manual with PM  
- Test usability across system  
- Act as end-user for QA

**Report Evidence:**
- Manual draft, annotated screenshots, test notes

---

### Notes:
- All members should contribute at least 1 screenshot/diagram/snippet  
- All contributions should be acknowledged in report appendices

