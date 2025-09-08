URL Shortener Web Application
This project is a user-friendly URL shortener built with React that not only shortens URLs but also provides detailed analytical insights into the clicks on each shortened link.

🌟 Features
URL Shortener Page
Create Short Links: Shorten up to 5 URLs at once.

Customization: Provide an optional custom shortcode and set an expiration period (in minutes). If no expiration is provided, the link defaults to a 30-minute validity.

Client-Side Validation: Ensures that all input fields (URL format, shortcode, validity) are validated before making a request to the server.

Instant Display: Upon creation, the shortened URLs are displayed with their respective creation and expiry dates.

URL Shortener Statistics Page
Detailed Analytics: View a list of all shortened URLs created in the current session.

Click Data: For each short link, you can see:

The total number of times the link has been clicked.

Detailed click timestamps.

The geographical source of each click.

The location (country/city) from which the click originated.

General Functionality
Unique Shortcodes: The application ensures that all generated shortcodes are unique.

Redirection: Clicking on a shortened URL automatically redirects to the original long URL.

Error Handling: Robust client-side error handling provides clear, user-friendly messages for invalid inputs or other operational issues.

🚀 How to Run the Project
This project uses a standard React and Node.js setup. Follow these steps to get it running on your local machine.

Prerequisites
Node.js (version 14 or higher)

npm or Yarn

Steps
Clone the repository:

Bash

git clone <your-repository-url>
cd <your-repository-folder>
Install dependencies:
This project likely has separate package.json files for the frontend and backend.

Frontend (React):

Bash

cd Frontend_Test_Submission
npm install
# or yarn install
Backend (Node.js):

Bash

cd Logging_Middleware
npm install
# or yarn install
Start the Backend Server:
The backend server must be running before you start the frontend.

Bash

cd Logging_Middleware
npm start
# or node server.js
The server will run on http://localhost:3000.

Start the Frontend Application:
The frontend is a React application that runs on a different port.

Bash

cd Frontend_Test_Submission
npm start
# or npm run dev (if using Vite)
The React application will open in your browser, running on http://localhost:3000 as per the requirements.

🛠️ Technology Stack
Frontend: React

Styling: Native CSS (no Material UI, ShadCN, or other CSS libraries)

Backend: Node.js

API/Data: Logging Middleware (as per project requirements)

📝 Project Structure
The project is split into two main folders:

Frontend_Test_Submission/: Contains the React application code.

Logging_Middleware/: Contains the Node.js backend server and logging middleware.

<img width="1919" height="837" alt="image" src="https://github.com/user-attachments/assets/8808811a-ddf5-474d-8071-19078a61e7e8" />

