# Goal Oriented Academy (GOA)

Goal Oriented Academy (GOA) is a comprehensive platform designed to manage and facilitate the activities of leaders, mentors, and students. This project includes backend services built with Node.js and Express, and a frontend built with React.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)

## Features

- User authentication and authorization
- Role-based access control
- Management of leaders, mentors, and students
- Email verification
- Comprehensive rating and evaluation system
- Integration with external services (e.g., GitHub, Codewars)

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/goal-oriented-academy.git
cd goal-oriented-academy
```
## Environment-variables
```
# //! BACKEND
PORT = 5000
MONGODB_URI = mongod.com
JWT_SECRET = jwt key
TIME_PER_LOGIN = 6 * 60 * 60 * 1000 # 6 hours
TOKEN_EXPIRATION = 1 * 24 * 60 * 60 * 1000 # 1 days

ADMIN_USER = example@gmail.com
SMTP_PASS = 4444 4444 4444 4444
NODE_ENV = development

FRONT_URL = http://localhost:5173
WEB_URL = https://example

# //! FRONTEND
MODE = development
VITE_API_URL= http://localhost:5000

GOOGLE_APPLICATION_CREDENTIALS = ./secret.json
SHEET_ID = 4444444444444444444444444444  
```

what can i add to this ??
