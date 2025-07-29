# ⚫️ Tech Stack & Component Breakdown

This document outlines the core technologies selected for the All Da Smoke BBQ website and maps key components to each page or feature group. It also explains why each technology was chosen.

---

## ⚫️ Core Technologies

| Tool/Framework       | Purpose                                               |
| -------------------- | ----------------------------------------------------- |
| React                | Frontend UI development with reusable components      |
| Vite                 | Lightweight dev server and fast React project bundler |
| Tailwind CSS         | Utility-first CSS framework for fast UI styling       |
| Firebase (Firestore) | Backend-as-a-Service for database, hosting, and auth  |
| React Router         | Declarative routing for multi-page navigation         |
| Git + GitHub         | Version control and team collaboration                |

---

## ⚫️ Why This Stack?

- **React + Vite**: Faster build times and modern React tooling.
- **Tailwind CSS**: Speeds up UI styling without writing custom CSS.
- **Firebase**: Simple backend solution for MVP (database, authentication, file storage).
- **Scalability**: Stack can evolve with app needs (e.g., upgrade to Next.js or add CMS later).

---

## ⚫️ Component Breakdown

Components are organized by feature area for modular development and reuse.

---

### ⚫️ Core Website Pages

| Page             | Primary Components                                  |
| ---------------- | --------------------------------------------------- |
| Landing Page     | `<HeroSection />`, `<CallToAction />`, `<NavBar />` |
| Home Page        | `<FeaturedMenu />`, `<Gallery />`, `<Footer />`     |
| About Page       | `<TeamIntro />`, `<StoryTimeline />`                |
| Our Menu Page    | `<MenuGrid />`, `<FilterMenu />`                    |
| Reservation Page | `<ReservationForm />`, `<LocationMap />`            |
| Contact Us Page  | `<ContactForm />`, `<ContactDetails />`             |
| FAQ Page         | `<FAQAccordion />`                                  |

---

### ⚫️ Chef-Related Pages

| Page               | Primary Components                        |
| ------------------ | ----------------------------------------- |
| Meet the Chef Page | `<ChefList />`, `<ChefCard />`            |
| Chef Profile Page  | `<ChefProfile />`, `<RecipeHighlights />` |

---

### 🛒 E-Commerce Pages

| Page              | Primary Components                         |
| ----------------- | ------------------------------------------ |
| Shop Page         | `<ProductGrid />`, `<ProductFilters />`    |
| Shop Details Page | `<ProductDetail />`, `<AddToCartButton />` |

---

### ⚫️ Blog Pages

| Page               | Primary Components                                 |
| ------------------ | -------------------------------------------------- |
| Blog Grid View     | `<BlogList />`, `<CategoryFilter />`               |
| Blog Standard View | `<BlogListStandard />`, `<Pagination />`           |
| Blog Details Page  | `<BlogPost />`, `<RelatedPosts />`, `<Comments />` |

---

## ⚫️ Future Integrations (Post-MVP)

- **Stripe or Square**: For shop checkout and online reservations
- **CMS integration (Firebase)**: For blog and menu management
- **AI Chatbot (Azure)**: To answer menu questions or take orders

---

## ⚫️ Notes

- Component names follow PascalCase convention.
- Every page is route-driven via React Router.
- Global layout includes `<NavBar />` and `<Footer />` across all pages.
