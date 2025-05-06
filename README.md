```markdown
# BookBox
BookBox is a user-friendly web app built with React and Spring Boot that promotes community engagement through book sharing. It allows neighbors to lend, borrow, and discover books without needing to buy them—perfect for building a culture of learning and sustainability.

## Features

- Add books with title, author, genre, description, and ISBN
- Search and filter books by title, genre, or author
- Borrow or return books from the community
- View your own books and borrowed books
- User authentication and profiles
- Book covers and details fetched from Open Library API

## Tech Stack

- **Frontend:** React (Next.js), Tailwind CSS, TypeScript
- **Backend:** Spring Boot, Java, REST API
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yannick-itoua/BookBox
   cd BookBox
   ```

2. **Start all services:**
   ```sh
   docker-compose up --build
   ```

3. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)

### Default Users

Sample users are seeded in the database for testing:
- **alice@example.com** / password1
- **bob@example.com** / password2

## API Endpoints

- `GET /api/books` — List all books
- `GET /api/books/search?title=&genre=&author=` — Search books
- `GET /api/books/{id}` — Get book by ID
- `GET /api/books/isbn/{isbn}` — Get book by ISBN
- `PUT /api/books/{id}/borrow?userId={userId}` — Borrow a book
- `PUT /api/books/{id}/return?userId={userId}` — Return a book
- `GET /api/users/{id}/books` — Get books owned by user

## Development

- Frontend code: `bookbox-frontend/`
- Backend code: `bookbox-backend/`

You can run frontend and backend separately for development using:
```sh
cd bookbox-frontend
npm install
npm run dev
```
and
```sh
cd bookbox-backend
./mvnw spring-boot:run
```

## License

This project is licensed under the MIT License.

---

*Happy reading and sharing with BookBox!*
```