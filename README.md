# Wildlife Conservation Platform

## About
A web-based platform focused on wildlife conservation in Borneo, featuring educational content, event management, and community engagement tools. The project showcases various wildlife species, particularly orangutans, and promotes conservation efforts at Semenggoh Nature Reserve.

## Features
- Interactive wildlife education programs
- Conservation event management
- Real-time wildlife tracking
- Community engagement initiatives
- Video streaming capabilities
- Dynamic event calendar

## Tech Stack
- Frontend: Next.js, TailwindCSS
- Backend: Node.js
- AI Integration: Flask
- Database: (Your database technology)

## Prerequisites
- Node.js
- Python 3.x
- Virtual Environment

## Installation

### Frontend
<!-- Start Project -->
npm run dev

### Backend
<!-- Start Database -->
cd backend
npm start

### AI Model
<!-- Start AI model | * Manually download the pip package that is missing. -->
cd ai
source .venv/bin/activate
flask run

## Build For Production
# To optimize image
npm i sharp

## Next Step
1. Add logic for the latest event in home to limit 2 content at a time and push the latest only.

## Security Future Plan
1. API security management for the events
2. Access list management
3. SQL injection implementation
4. Adding Token for XSS vulnerability

## Packages to Download
npm i react-confetti
npm i react-use