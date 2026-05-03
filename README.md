
WAD 2 Final Project: Advanced Task and Inventory Management System

Submitted by Maynard Villar and , Mac Savandal

Course Requirement: Laravel Application Development


Project Overview:
> We developed this application as an integrated system that combines a Personal Task Manager with a Seller Inventory System. Our primary objective was to demonstrate the proper implementation of core Laravel features, including role based access control, data ownership enforcement and complex database relationships. We built this system using the Laravel framework, integrated with Inertia.js and React for the frontend.



Technical Implementation and Features

1. Authentication
> We utilized Laravel Breeze to implement a secure User Authentication system. We ensured that all core functionalities, such as managing tasks and products, require a valid and authenticated user session.

2. CRUD Operations
> We implemented two distinct CRUD (Create, Read, Update, Delete) flows within the application:

- Task Management: We enabled users to create, view, update completion status, and delete their personal tasks.

- Product Inventory: We provided verified Sellers with the capability to manage their product inventory within the system.

3. Middleware (Access Control)
> To segregate regular users from authorized Sellers, we implemented a custom Middleware. This security layer ensures that users without a linked Seller record are automatically restricted from accessing Product management pages. We configured the system to return a 403 Forbidden Error for unauthorized access attempts.

4. Authorization (Policies)
> To enforce "Proper Ownership and Permissions," we implemented a TaskPolicy. This ensures that each user only has access to their own data. We designed the system to block any attempt to access or modify data belonging to another user through strict Authorization checks.

5. Eloquent Relationships
> We utilized various Eloquent relationships to maintain a clean and logical database structure:

- One-to-One: We linked each User to a single Seller profile.

- One-to-Many: We allowed each User to possess multiple Task records.

- Many-to-Many: We connected Sellers to Products using a pivot table that manages specific details such as stock levels and pricing.
