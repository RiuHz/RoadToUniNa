
# RoadToUniNa

A web-based Wiki Game where players navigate through Wikipedia pages with the goal of reaching the University of Naples Federico II page in the shortest path possible.
## About

RoadToUniNa is a full-stack web application inspired by the classic Wiki Game. Starting from a randomly selected Wikipedia page, players must navigate through hyperlinks and strategically reach the page dedicated to the University of Naples Federico II.

The project was developed as part of a university assignment and focuses on web technologies, client-server communication, and interactive web application design.

This project was developed to demonstrate:

- Full-stack web application development
- Client-server architecture
- RESTful API design and integration
- Authentication and authorization using JWT
- Environment-based configuration
- Database management with ORMs
- Angular frontend development
- Modern web application design principles
## Tech Stack

**Frontend**

- Angular
- TypeScript
- HTML5
- CSS3

**Backend**

- Node.js
- Express.js
- Sequelize ORM
- SQLite3

## Architecture

The project follows a client-server architecture.

**Frontend Layer**

Responsible for:

- User interaction and game visualization
- Authentication management
- Navigation between game views
- Communication with backend services

**Backend Layer**

Responsible for:

- Game session management
- User authentication and authorization
- Retrieval and processing of Wikipedia data
- Persistence and business logic

**Database Layer**

Responsible for:

- User account storage
- Match history and statistics
- Persistence of application data

This separation of concerns improves maintainability, scalability, and testability.
## Repository Structure

**Backend**

- `backend/controllers` → Request handlers and business logic for API endpoints
- `backend/errors` → Custom error classes and centralized error handling
- `backend/middleware` → Authentication and request processing
- `backend/models` → Database models and entities
- `backend/routes` → API route definitions and endpoint mappings

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
DB_CONNECTION_URI = "sqlite:database.db"
DIALECT = "sqlite"

JWT_SECRET = "Super Secret Web Tech Exam 2026"
```

## Usage

Clone the repository:

```bash
git clone https://github.com/RiuHz/Connect-Four.git
```

### Backend Setup

Create the following files inside the backend directory:

```
database.db
```

Start the backend server:

```bash
cd backend
npm install
npm run start
```

### Frontend Setup

Start the Angular application:

```bash
cd frontend
npm install
npm run start
```

Then open:

http://localhost:8080

**Note**: The frontend start command is mapped to the Angular development server.
## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.


## Authors

- GitHub: [@RiuHz](https://www.github.com/RiuHz)
