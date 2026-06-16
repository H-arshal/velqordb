# Velqordb – Product Requirement Document (PRD)

**A Modern SQL Playground for Learning, Practice & Mastery**

---

## Document Control
*   **Version:** 1.0 – Initial Draft
*   **Status:** In Progress
*   **Author:** Harshal (Solo Developer)
*   **Project Name:** Velqordb
*   **Stack:** React + Spring Boot + MySQL
*   **Target:** localhost (Phase 1)
*   **Timeline:** 3–4 Months
*   **Budget:** Zero (Open Source / Free Tier Tools)
*   **Date:** June 12, 2026

---

## 1. Executive Summary
Velqordb is a full-stack SQL playground web application that enables users to write, execute, analyze, and learn SQL directly in the browser — without needing any local database installation. It combines the power of a professional-grade SQL editor with a structured learning platform, query analytics, and schema visualization tools.

### Mission
To make SQL accessible, interactive, and fun for students, developers, and database professionals — entirely free, open, and running on zero budget.

### 1.1 Problem Statement
Existing SQL learning and practice tools suffer from one or more of the following limitations:
*   Expensive licensing or paywalled features (e.g., DB Fiddle Pro, DataGrip)
*   Poor UX — outdated interfaces that feel like tools from 2005
*   No integrated learning path — users must search elsewhere for challenges
*   No query analytics or performance insights
*   No schema visualization for beginners
*   No AI assistance for generating or explaining queries

### 1.2 Solution
Velqordb solves all of the above by delivering a single, cohesive platform that is:
*   **Completely free** — no cost to the user or developer
*   **Modern and fast** — React frontend, Spring Boot backend, MySQL engine
*   **Feature-rich** — editor, explorer, history, challenges, analytics, schema designer
*   **Developer-built** — runs locally; deployable on free cloud services later

---

## 2. Project Overview

### 2.1 Product Identity
*   **Product Name:** Velqordb
*   **Working Title:** QueryForge (original concept)
*   **Type:** Web Application (Full Stack)
*   **Category:** Developer Tool / EdTech / SQL Playground
*   **Primary Goal:** Learning & Practice Project (Portfolio + Skill Demonstration)
*   **Secondary Goal:** Referenceable open-source project for future use or community sharing

### 2.2 Target Users

| User Type | Primary Need | Key Feature They Use |
| :--- | :--- | :--- |
| **Students** | Learn SQL from scratch | Learning Arena, Challenges |
| **Junior Developers** | Practice SQL for interviews | Playground, Query History |
| **DBAs** | Quickly prototype queries | DB Explorer, Schema Designer |
| **Interview Candidates** | Prepare for SQL round | Challenges, Difficulty Levels |
| **Trainers / Teachers** | Create and assign problems | Admin Panel, Challenge Creator |

### 2.3 Unique Value Proposition
Velqordb is the only SQL tool that combines all of the following in a single, free, locally-runnable application:
*   SQL editor with syntax highlighting and auto-complete
*   Integrated database explorer (like MySQL Workbench, in the browser)
*   Structured learning arena with auto-graded challenges
*   Visual schema designer that generates CREATE TABLE SQL
*   Query analytics dashboard with execution metrics
*   User authentication with role-based access (Admin / Instructor / User)

---

## 3. Scope & Modules
Velqordb is designed as a 10-module full-stack application. All 10 modules are included in the full vision, to be developed across 7 phases.

### 3.1 Module Summary

| # | Module Name | Phase | Priority |
| :--- | :--- | :--- | :--- |
| 1 | Authentication & User Management | Phase 1 | Critical |
| 2 | SQL Playground (Editor + Executor) | Phase 2 | Critical |
| 3 | Database Explorer | Phase 3 | High |
| 4 | Query History | Phase 2 | High |
| 5 | Query Analytics | Phase 5 | Medium |
| 6 | SQL Learning Arena | Phase 4 | High |
| 7 | Saved Workspaces | Phase 4 | Medium |
| 8 | AI SQL Assistant (Deferred) | Deferred | Low |
| 9 | Schema Designer | Phase 3 | Medium |
| 10 | Collaboration (Future) | Future | Low |

### 3.2 Module Details

#### Module 1: Authentication & User Management (Phase 1)
*   User registration with email verification
*   Login / Logout with JWT (access + refresh token)
*   Password reset via email link
*   Role-based access control: `ADMIN`, `INSTRUCTOR`, `USER`
*   Profile management: update name, email, avatar
*   Session management with token expiry

#### Module 2: SQL Playground (Phase 2)
*   Monaco-based SQL editor with syntax highlighting
*   Auto-complete for SQL keywords, table names, and columns
*   Multi-query execution (run all or selected query)
*   Query formatting / beautifier
*   Keyboard shortcuts (Ctrl+Enter to run, Ctrl+F to format)
*   Output viewer: Table view, JSON view
*   Export results as CSV and copy to clipboard
*   Error display with line numbers

#### Module 3: Database Explorer (Phase 3)
*   Tree-view sidebar showing all schemas and tables
*   Expand table to see columns, data types, constraints
*   View indexes and foreign key relationships
*   Click-to-query: double-click a table to generate `SELECT *`
*   Search/filter tables and columns
*   View row count and table size metadata

#### Module 4: Query History (Phase 2)
*   Automatically stores all executed queries per user
*   Displays: query text, timestamp, execution time, status, row count
*   Re-run query from history with one click
*   Save a query to personal library and mark as favorite
*   Share query via generated link
*   Search and filter history by keyword, date, status

#### Module 5: Query Analytics (Phase 5)
*   Per-query metrics: execution time, rows scanned, rows returned
*   Daily execution chart (line chart)
*   Top 10 most-run queries
*   Slow query log (queries exceeding threshold)
*   Analytics dashboard with summary cards
*   Filter by date range

#### Module 6: SQL Learning Arena (Phase 4)
*   Difficulty levels: Beginner, Intermediate, Advanced, Expert
*   Topic categories: SELECT, WHERE, GROUP BY, JOINS, Subqueries, Window Functions, CTEs
*   Problem description + expected schema pre-loaded
*   User writes SQL and submits
*   Auto-evaluation: compare result set against expected result
*   Automatic scoring system
*   Progress tracker per topic and difficulty level
*   Hint system for stuck users
*   Admin/Instructor can create and publish new challenges

#### Module 7: Saved Workspaces (Phase 4)
*   Save a named workspace containing: active database state, open queries, notes
*   Load workspace to restore full context
*   List, rename, and delete workspaces
*   Export workspace as JSON backup

#### Module 8: AI SQL Assistant (Deferred)
*   *DEFERRED: Excluded from the initial 3-4 month build.*
*   Planned capability: natural language to SQL (e.g. "Show employees hired after 2025")
*   Planned capability: explain a query in plain English
*   Planned capability: suggest query optimization
*   Planned capability: generate schema from description
*   Will be integrated using Gemini API (free tier) in a future phase

#### Module 9: Schema Designer (Phase 3)
*   Visual drag-and-drop schema builder in the browser
*   Create entities (tables) with columns and data types
*   Draw relationships between tables (one-to-one, one-to-many)
*   System auto-generates `CREATE TABLE` SQL from the visual diagram
*   Export schema as SQL file
*   Import existing tables from the DB Explorer into the designer

#### Module 10: Collaboration (Future Phase)
*   *FUTURE PHASE: Not included in the 3-4 month MVP.*
*   Planned: Share query via public link
*   Planned: Team workspaces with shared access
*   Planned: Inline comments on queries
*   Planned: Query review and approval workflow

---

## 4. Functional Requirements

### 4.1 Authentication Module
*   **AUTH-001:** System shall allow users to register with username, email, and password. (Critical)
*   **AUTH-002:** System shall send email verification link on registration. (High)
*   **AUTH-003:** System shall authenticate users via JWT access tokens. (Critical)
*   **AUTH-004:** System shall issue refresh tokens valid for 7 days. (High)
*   **AUTH-005:** System shall allow password reset via email link. (High)
*   **AUTH-006:** System shall enforce role-based access (`ADMIN`, `INSTRUCTOR`, `USER`). (Critical)
*   **AUTH-007:** System shall invalidate tokens on logout. (High)

### 4.2 SQL Playground Module
*   **PLY-001:** System shall provide a Monaco-based SQL code editor. (Critical)
*   **PLY-002:** Editor shall support SQL syntax highlighting. (Critical)
*   **PLY-003:** Editor shall support keyword and schema auto-complete. (High)
*   **PLY-004:** User shall be able to run selected query or all queries. (Critical)
*   **PLY-005:** Results shall be displayed in a paginated table view. (Critical)
*   **PLY-006:** Results shall be exportable as CSV. (Medium)
*   **PLY-007:** System shall display execution errors with line references. (High)
*   **PLY-008:** System shall sandbox queries — no `DROP DATABASE`, no `GRANT`. (Critical)
*   **PLY-009:** Each user shall execute queries in an isolated schema sandbox. (Critical)

### 4.3 Learning Arena Module
*   **LRN-001:** System shall provide challenges across 4 difficulty levels. (Critical)
*   **LRN-002:** System shall auto-evaluate submissions against expected result. (Critical)
*   **LRN-003:** System shall score submissions automatically. (Critical)
*   **LRN-004:** Instructors shall be able to create and publish challenges. (High)
*   **LRN-005:** System shall track user progress per topic and difficulty. (High)
*   **LRN-006:** System shall provide optional hints per challenge. (Medium)

---

## 5. Non-Functional Requirements

### 5.1 Performance
*   SQL queries must return results within 3 seconds for standard SELECT queries.
*   Page load time must be under 2 seconds on localhost.
*   The system must handle at least 50 concurrent users in future cloud deployment.

### 5.2 Security
*   All passwords must be hashed using BCrypt (minimum 10 salt rounds).
*   JWT tokens must be signed with HS256 and expire in 15 minutes (access token).
*   SQL sandbox must whitelist only: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE TABLE`.
*   SQL sandbox must block: `DROP DATABASE`, `DROP TABLE`, `GRANT`, `REVOKE`, `TRUNCATE` on system tables.
*   User queries must execute in isolated per-user schemas to prevent data leakage.
*   All API endpoints must be protected with authentication except `/auth/register` and `/auth/login`.
*   Input validation on all API endpoints using Spring Validation.

### 5.3 Usability
*   Application must be fully functional on modern browsers: Chrome, Firefox, Edge.
*   UI must be responsive down to 768px (tablet width).
*   Error messages must be human-readable, not stack traces.
*   SQL editor must support undo/redo (Ctrl+Z / Ctrl+Shift+Z).

### 5.4 Maintainability
*   Backend must follow layered architecture: Controller → Service → Repository → Entity.
*   Frontend must follow component-based architecture with clear separation of concerns.
*   All API endpoints must be documented (Swagger/OpenAPI).
*   Code must include JSDoc / Javadoc comments on all public methods.

---

## 6. Technology Stack

### 6.1 Full Stack Overview

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | 18.x | UI framework |
| **Frontend** | TypeScript | 5.x | Type safety |
| **Frontend** | Monaco Editor | latest | SQL code editor |
| **Frontend** | Axios | 1.x | HTTP client |
| **Frontend** | Redux Toolkit | 2.x | State management |
| **Frontend** | React Router | 6.x | Client-side routing |
| **Frontend** | Recharts | 2.x | Analytics charts |
| **Backend** | Java | 17 LTS | Language |
| **Backend** | Spring Boot | 3.x | Application framework |
| **Backend** | Spring Security | 6.x | Auth & authorization |
| **Backend** | Spring Data JPA | 3.x | ORM / DB access |
| **Backend** | JJWT | 0.12.x | JWT token management |
| **Backend** | Lombok | 1.18.x | Boilerplate reduction |
| **Database** | MySQL | 8.x | Primary database |
| **Build Tool** | Maven | 3.9.x | Backend build |
| **Build Tool** | npm / Vite | latest | Frontend build |
| **Dev Tool** | Docker Compose | v2 | Local multi-service orchestration |

### 6.2 Zero-Budget Tool Choices

| Need | Free Tool Used | Notes |
| :--- | :--- | :--- |
| **IDE** | IntelliJ IDEA (Community) + VS Code | Both free editions |
| **Database Client** | MySQL Workbench | Free community tool |
| **API Testing** | Postman / Thunder Client | Free tiers |
| **Version Control** | GitHub | Free for public repos |
| **CI/CD (future)** | GitHub Actions | 2000 min/month free |
| **Deployment (future)** | Render / Railway / Vercel | Free tiers available |
| **AI Integration** | Deferred | Gemini API free tier (future phase) |

---

## 7. System Architecture

### 7.1 High-Level Architecture
Layered Monolith with modular package structure — appropriate for a solo developer and a 3-4 month timeline. Microservices complexity is avoided intentionally.
*   **Frontend Tier:** React + TypeScript SPA communicating via REST API calls.
*   **Backend Tier:** Spring Boot application with modular package structure.
*   **Data Tier:** MySQL database with per-user sandboxed schemas.

### 7.2 Backend Package Structure

| Package | Description |
| :--- | :--- |
| `com.velqordb.auth` | Registration, login, JWT, token refresh |
| `com.velqordb.user` | User profile, roles, management |
| `com.velqordb.playground` | Query execution, sandboxing, result formatting |
| `com.velqordb.query` | Query history, favorites, sharing |
| `com.velqordb.analytics` | Execution metrics, dashboard data |
| `com.velqordb.challenge` | Learning arena, problem management, scoring |
| `com.velqordb.schema` | Schema designer, metadata APIs |
| `com.velqordb.workspace` | Saved workspaces, import/export |
| `com.velqordb.common` | Shared DTOs, utilities, exceptions |
| `com.velqordb.config` | Security config, CORS, bean definitions |

### 7.3 Frontend Structure

| Directory | Contents |
| :--- | :--- |
| `src/pages/` | Login, Dashboard, Playground, Challenges, Profile, Admin |
| `src/components/` | SqlEditor, ResultTable, Sidebar, Navbar, Charts, SchemaTree |
| `src/services/` | API service files (`authService`, `queryService`, `challengeService`) |
| `src/hooks/` | Custom React hooks (`useAuth`, `useQuery`, `useDebounce`) |
| `src/store/` | Redux slices (`authSlice`, `querySlice`, `uiSlice`) |
| `src/utils/` | Helper functions, constants, formatters |
| `src/types/` | TypeScript interfaces and types |

---

## 8. Database Design

### 8.1 Core Tables

#### `users`
*   `id` BIGINT (PK, AUTO_INCREMENT): Primary key
*   `username` VARCHAR(50) (UNIQUE, NOT NULL): Login username
*   `email` VARCHAR(100) (UNIQUE, NOT NULL): Email address
*   `password` VARCHAR(255) (NOT NULL): BCrypt hashed password
*   `role` ENUM (NOT NULL, DEFAULT `USER`): `ADMIN` / `INSTRUCTOR` / `USER`
*   `is_verified` BOOLEAN (DEFAULT `FALSE`): Email verification flag
*   `created_at` TIMESTAMP (DEFAULT `NOW()`): Account creation timestamp
*   `updated_at` TIMESTAMP (ON UPDATE `NOW()`): Last update timestamp

#### `queries`
*   `id` BIGINT (PK, AUTO_INCREMENT): Primary key
*   `user_id` BIGINT (FK → `users.id`): Query owner
*   `sql_text` TEXT (NOT NULL): The SQL query content
*   `execution_time` BIGINT (NULLABLE): Execution time in ms
*   `status` ENUM (NOT NULL): `SUCCESS` / `ERROR`
*   `rows_returned` INT (DEFAULT 0): Result row count
*   `is_favorite` BOOLEAN (DEFAULT `FALSE`): Favorited by user
*   `is_saved` BOOLEAN (DEFAULT `FALSE`): Saved to library
*   `created_at` TIMESTAMP (DEFAULT `NOW()`): Execution timestamp

#### `challenges`
*   `id` BIGINT (PK, AUTO_INCREMENT): Primary key
*   `title` VARCHAR(200) (NOT NULL): Challenge title
*   `difficulty` ENUM (NOT NULL): `BEGINNER` / `INTERMEDIATE` / `ADVANCED` / `EXPERT`
*   `topic` VARCHAR(100) (NOT NULL): SQL topic (JOIN, GROUP BY, etc.)
*   `description` TEXT (NOT NULL): Problem statement
*   `schema_setup_sql` TEXT (NOT NULL): SQL to create challenge tables
*   `expected_result` JSON (NOT NULL): Expected query output
*   `created_by` BIGINT (FK → `users.id`): Instructor who created it
*   `is_published` BOOLEAN (DEFAULT `FALSE`): Visible to users
*   `created_at` TIMESTAMP (DEFAULT `NOW()`): Creation timestamp

#### `submissions`
*   `id` BIGINT (PK, AUTO_INCREMENT): Primary key
*   `challenge_id` BIGINT (FK → `challenges.id`): Linked challenge
*   `user_id` BIGINT (FK → `users.id`): Submitting user
*   `query` TEXT (NOT NULL): User-submitted SQL
*   `score` INT (DEFAULT 0): Score (0–100)
*   `is_correct` BOOLEAN (DEFAULT `FALSE`): Whether result matched
*   `attempt_no` INT (DEFAULT 1): Attempt number
*   `submitted_at` TIMESTAMP (DEFAULT `NOW()`): Submission timestamp

#### `workspaces`
*   `id` BIGINT (PK, AUTO_INCREMENT): Primary key
*   `user_id` BIGINT (FK → `users.id`): Workspace owner
*   `name` VARCHAR(100) (NOT NULL): Workspace name
*   `state_json` JSON (NOT NULL): Serialized workspace state
*   `created_at` TIMESTAMP (DEFAULT `NOW()`): Creation timestamp
*   `updated_at` TIMESTAMP (ON UPDATE `NOW()`): Last saved timestamp

---

## 9. API Design
*   **Base URL:** `http://localhost:8080/api`
*   All endpoints return JSON.
*   All secured endpoints require: `Authorization: Bearer <token>`

### 9.1 Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | No | Register a new user account |
| `POST` | `/auth/login` | No | Login and receive JWT tokens |
| `POST` | `/auth/logout` | Yes | Invalidate current token |
| `POST` | `/auth/refresh` | No | Refresh access token using refresh token |
| `POST` | `/auth/forgot-password` | No | Send password reset email |
| `POST` | `/auth/reset-password` | No | Reset password using token from email |
| `GET` | `/auth/verify-email` | No | Verify email using link token |

### 9.2 Query & Playground Endpoints

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/query/run` | Yes | Execute SQL query in user sandbox |
| `GET` | `/query/history` | Yes | Fetch paginated query history |
| `GET` | `/query/{id}` | Yes | Get a specific query by ID |
| `PUT` | `/query/{id}/favorite` | Yes | Toggle favorite on a query |
| `PUT` | `/query/{id}/save` | Yes | Save a query to library |
| `GET` | `/query/saved` | Yes | Get all saved queries for user |

### 9.3 Learning Arena Endpoints

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/challenges` | Yes | List all published challenges |
| `GET` | `/challenges/{id}` | Yes | Get challenge detail + schema |
| `POST` | `/challenges/{id}/submit` | Yes | Submit a query for evaluation |
| `GET` | `/challenges/{id}/submissions` | Yes | Get user's submissions for a challenge |
| `POST` | `/challenges` | INSTRUCTOR/ADMIN | Create a new challenge |
| `PUT` | `/challenges/{id}/publish` | INSTRUCTOR/ADMIN | Publish a challenge |
| `GET` | `/challenges/my-progress` | Yes | Get user progress summary |

### 9.4 Schema & Analytics Endpoints

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/schema/databases` | Yes | List all accessible schemas/databases |
| `GET` | `/schema/{db}/tables` | Yes | List tables in a database |
| `GET` | `/schema/{db}/{table}` | Yes | Get column/index details of a table |
| `GET` | `/analytics/summary` | Yes | Get personal analytics summary |
| `GET` | `/analytics/daily` | Yes | Daily query count chart data |
| `GET` | `/analytics/top-queries` | Yes | Most frequently run queries |
| `GET` | `/analytics/slow-queries` | Yes | Queries exceeding execution threshold |

---

## 10. Security Architecture

### 10.1 SQL Sandbox Design
Every user query passes through the sandbox layer before execution.
*   **Allowed Operations (Shaded Green/Safe):** `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE TABLE`, `CREATE INDEX`
*   **Blocked Operations (Red/Warning):** `DROP DATABASE`, `DROP TABLE`, `TRUNCATE`, `GRANT`, `REVOKE`, `ALTER USER`, `CREATE USER`, `SHOW PROCESSLIST`, `SET GLOBAL`

**Additional Sandbox Rules:**
*   Each user operates in their own isolated schema: `velqordb_user_{userId}`
*   Users cannot access other users' schemas or system schemas (`information_schema`, `mysql`, `performance_schema`)
*   Query timeout enforced: maximum 10 seconds per query execution
*   Result set size capped: maximum 10,000 rows returned per query
*   All query parameters must be validated before execution

### 10.2 JWT Token Strategy

| Token Type | Expiry | Storage Location | Purpose |
| :--- | :--- | :--- | :--- |
| **Access Token** | 15 minutes | Memory (React state) | API authentication |
| **Refresh Token** | 7 days | HttpOnly Cookie | Obtain new access token |

### 10.3 Input Validation Rules
*   All request bodies validated using Spring Validation (`@Valid`, `@NotNull`, `@Size`)
*   SQL input sanitized — parameterized execution only, no string concatenation
*   File upload endpoints must validate file type and size
*   Rate limiting applied: 100 requests/minute per user IP

---

## 11. Development Roadmap
The 3-4 month timeline is divided into 7 sequential phases. Each phase has clear deliverables.

### 11.1 Phases Overview

| Phase | Name | Duration | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 0** | Planning & Documentation | Week 1 | PRD ✓, ER Diagram, API Contracts, Wireframes |
| **Phase 1** | Foundation | Weeks 2-3 | Spring Boot setup, React setup, JWT auth, MySQL, User CRUD |
| **Phase 2** | SQL Playground | Weeks 4-5 | Monaco editor, query engine, sandbox, result viewer, query history |
| **Phase 3** | DB Explorer & Schema | Week 6 | Schema browser, metadata APIs, visual schema designer |
| **Phase 4** | Learning Arena | Weeks 7-8 | Challenge CRUD, evaluation engine, scoring, progress, workspaces |
| **Phase 5** | Analytics Dashboard | Week 9 | Metrics collection, charts, slow query log, summary cards |
| **Phase 6** | Polish & Testing | Week 10 | Unit & integration tests, bug fixing, UI polish, Swagger docs |
| **Phase 7** | Deployment | Weeks 11-12 | Docker Compose, README, GitHub setup, Render deployment |

### 11.2 Phase 1 Sprint Breakdown (Foundation)
1.  Create Spring Boot project with Maven, configure `application.properties`
2.  Set up MySQL database, create users table, test connection
3.  Implement User entity, UserRepository, UserService, UserController
4.  Add Spring Security configuration with JWT filter
5.  Implement register, login, refresh token endpoints
6.  Create React app with Vite + TypeScript
7.  Set up React Router with protected routes
8.  Set up Redux Toolkit with auth slice
9.  Build Login and Register pages
10. Connect frontend auth forms to backend API
11. Test end-to-end: register → login → JWT → protected route

---

## 12. Constraints & Assumptions

### 12.1 Constraints
*   **Budget:** Zero. All tools, services, and libraries must be free or open-source.
*   **Developer:** Solo developer — architecture and scope must reflect solo capacity.
*   **Timeline:** 3-4 months. Features not completable within this window are deferred.
*   **AI Module:** Deferred to a future phase (Gemini API integration, not in MVP).
*   **Collaboration Module:** Deferred to a future phase (complex real-time features).
*   **Deployment:** localhost for Phase 1; cloud deployment optional in Phase 7.
*   **Database:** MySQL 8.x only. No multi-database support in MVP.

### 12.2 Assumptions
*   The developer has working knowledge of React, Spring Boot, and MySQL.
*   Development machine has Java 17, Node.js 18+, MySQL 8, and Maven installed.
*   Queries are sandboxed per user — no shared execution context.
*   Email sending (for verification and password reset) uses a free SMTP service such as Gmail SMTP or Mailtrap.
*   The Monaco Editor (used in VS Code) is available via npm and suitable for embedding.
*   All challenge evaluation is result-set based — not query structure comparison.

---

## 13. Glossary
*   **SQL Sandbox:** An isolated execution environment where user queries run without access to system tables or other users' data.
*   **JWT:** JSON Web Token — a compact, URL-safe token format used for stateless authentication.
*   **Monaco Editor:** The open-source code editor that powers VS Code, available as a React component via npm.
*   **Evaluation Engine:** The component that compares a user's query result set against the expected result set to determine correctness.
*   **PRD:** Product Requirement Document — the single source of truth for all feature definitions, architecture, and design decisions.
*   **RBAC:** Role-Based Access Control — restricting system access based on roles (`ADMIN`, `INSTRUCTOR`, `USER`).
*   **Workspace:** A named snapshot of a user's active database state, open queries, and notes, saved for later use.
*   **DBA:** Database Administrator — a professional responsible for managing database systems.
*   **CTE:** Common Table Expression — a named temporary result set defined within a SQL query.
*   **MVP:** Minimum Viable Product — the most basic version of the product that delivers core value.
