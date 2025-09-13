# GitHub Repository Search & Bookmark App
## Project Description

A full-stack web application built with an Angular frontend and a .NET Web API backend. The app allows users to log in securely using JWT, search for GitHub repositories in real-time, and manage a personal list of bookmarked items. Bookmarks are saved to the user's session on the server. The UI is designed with Angular Material for a modern and responsive experience.

## Technology Stack

### Frontend
* Angular 18+ (Standalone Components)
* TypeScript & RxJS
* Angular Material

### Backend
* .NET 9 (Web API)
* C# / ASP.NET Core
* JWT Bearer Authentication

## How to Run the Project

To run this project, both the backend and frontend servers must be running simultaneously.

### 1. Run the Backend API (`GitHubSearchApi`)

1.  Navigate to the API project directory: `cd path/to/GitHubSearchApi`
2.  Restore dependencies: `dotnet restore`
3.  Run the server: `dotnet run`
4.  The API will be listening on a specific port (e.g., `https://localhost:7196`).

### 2. Run the Frontend Client (`github-search-client`)

1.  In a **new terminal**, navigate to the client project directory: `cd path/to/github-search-client`
2.  Install dependencies: `npm install`
3.  **Important:** Ensure the `apiUrl` in the Angular service files (`src/app/services/`) matches the port the backend is running on.
4.  Run the client: `ng serve -o`
5.  The application will open at `http://localhost:4200/`.

## Login Credentials

To log in and test the application, use the following credentials:
* **Username:** `test`
* **Password:** `password`

---
