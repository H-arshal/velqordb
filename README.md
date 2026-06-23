# VelqorDB 🚀

**A Modern, Full-Stack SQL Playground for Learning, Practice & Mastery.**

VelqorDB is a web-based SQL interactive playground that enables users to write, execute, analyze, and learn SQL directly in their browser — without requiring any local database installation. The platform combines an intuitive database explorer, structured learning arenas, query execution histories, visual schema design, and performant query analytics into a cohesive, developer-friendly interface.

---

## 🛠️ Tech Stack

### Frontend
*   **Core**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS v4, shadcn/ui (Radix UI), Lucide Icons
*   **State Management**: Redux Toolkit (RTK)
*   **Editor**: Monaco Editor (VS Code's code-editing engine)
*   **Data Visualization**: Recharts

### Backend
*   **Core Framework**: Spring Boot 3.x
*   **Language**: Java 17
*   **Security**: Spring Security, JWT (Stateless Sessions)
*   **Data Access**: Spring Data JPA, Hibernate
*   **Database**: MySQL 8.x

---

## 🎯 Features & Implementation Status

Below is the current feature implementation progress across the codebase:

| Feature / Module | Frontend Status | Backend Status | Integration Status |
| :--- | :---: | :---: | :---: |
| **Authentication & User Roles** (JWT, Rate-Limiting, Password Hashing) | Complete ✅ | Complete ✅ | Integrated ✅ |
| **Workspace CRUD** (Create/Rename/Delete Isolated Schemas) | Complete ✅ | Complete ✅ | Integrated ✅ |
| **SQL Playground (Editor / Layout)** (Tabs, formatting, CSV export) | Complete ✅ | *In Progress* 🚧 | *Pending* ⏳ |
| **SQL Sandboxed Execution Engine** (Schema creation, execution safety) | *Mocked* 🧪 | *Planned (Phase 2)* ⏳ | *Pending* ⏳ |
| **Database Explorer** (Tree view of schemas, tables, fields) | Complete (Mocked) 🧪 | *Planned (Phase 3)* ⏳ | *Pending* ⏳ |
| **Query History** (Saved runs, timestamps, execution statistics) | Complete (Mocked) 🧪 | *Planned (Phase 2)* ⏳ | *Pending* ⏳ |
| **Visual Schema Designer** (Entity relation mapping & code export) | *Mocked* 🧪 | *Planned (Phase 3)* ⏳ | *Pending* ⏳ |
| **SQL Learning Arena** (Multi-difficulty coding challenges) | *Mocked* 🧪 | *Planned (Phase 4)* ⏳ | *Pending* ⏳ |
| **Query Analytics** (Execution charts, performance highlights) | *Mocked* 🧪 | *Planned (Phase 5)* ⏳ | *Pending* ⏳ |

---

## ⚙️ Getting Started

Follow these instructions to configure and run VelqorDB locally.

### 📋 Prerequisites
*   **Java Development Kit (JDK)**: Version 17 or higher
*   **Node.js**: Version 18 or higher (along with `npm` or `yarn`)
*   **MySQL Database**: Version 8.x running locally on port 3306

---

### 💾 1. Database Setup
Create the core schema in your local MySQL instance:
```sql
CREATE DATABASE velqordb_core;
```

---

### ☕ 2. Backend Setup (`velqordb_backend`)

1. Navigate to the backend directory:
   ```bash
   cd velqordb_backend
   ```
2. Create your local profile configuration by copying or creating a file named **`application-dev.properties`** inside `src/main/resources/`:
   ```properties
   # Database Credentials
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD

   # JWT Secret Key (Set a secure base64-encoded string for local signing)
   jwt.secret=NDAwMGZlOTMtNGE4Ny00OTlkLTg5YjItN2FjOTFjNTBhYjhlM2I0ZDM5MWMtNjE5My00MzllLWE2NDctMTlhMjQ3YzBlMzg5
   ```
   > [!NOTE]  
   > `application-dev.properties` is pre-configured in `.gitignore` and will never be committed to Git.

3. Run the Spring Boot application:
   *   **Windows**:
       ```powershell
       ./mvnw spring-boot:run
       ```
   *   **Linux/macOS**:
       ```bash
       ./mvnw spring-boot:run
       ```
   *   The API server will launch at **`http://localhost:8080`**.

---

### ⚛️ 3. Frontend Setup (`velqordb_frontend`)

1. Navigate to the frontend directory:
   ```bash
   cd velqordb_frontend
   ```
2. Set up your local environment file. Create a **`.env`** file at the root of `velqordb_frontend/`:
   ```env
   VITE_API_URL=http://localhost:8080
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to **`http://localhost:5173`** to access the playground.

---

## 📂 Project Structure

```text
velqordb/
├── velqordb_backend/        # Spring Boot API
│   ├── src/main/java/       # Java source files (Controller-Service-Repository)
│   └── src/main/resources/  # Configuration files & SQL schemas
│
├── velqordb_frontend/       # React client
│   ├── src/                 # React UI components, page layouts, services, store
│   └── public/              # Static assets
│
└── docs/                    # Technical & implementation documents
    ├── PRD.md               # Original Product Requirements Document (PRD)
    └── implemented-so-far.txt # Developer progress and next steps log
```

---

## 📖 Additional Resources

*   **Product Requirements**: To view the full technical specifications, features description, and security rules, refer to [docs/PRD.md](file:///d:/Project/velqordb/docs/PRD.md).
*   **Developer Progress Log**: To see a detailed history of implemented code files, refactors, and upcoming milestones, refer to [docs/implemented-so-far.txt](file:///d:/Project/velqordb/docs/implemented-so-far.txt).
