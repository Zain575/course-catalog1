# Next.js & FastAPI Course Catalog (Lab 5)

A full-stack Course Catalog web application built with a **Next.js (App Router)** frontend and a **FastAPI** backend, featuring robust CRUD operations, server actions, SWR data fetching, and CORS configuration.

## 🛠️ Project Structure
```text
course-catalog/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Main course listing page
│   ├── new/              # Add course page & Server Action
│   ├── filter/           # Elective filter page (SWR)
│   └── [id]/             # Dynamic route for course details
├── components/           # Reusable UI components (CourseList, ElectiveFilter, LikeButton, EnrollForm)
├── lib/                  # API client & data fetching utilities
├── Dockerfile            # Container configuration
└── docker-compose.yml    # Multi-service orchestration