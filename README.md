<img width="1036" height="970" alt="Screenshot 2026-05-03 095343" src="https://github.com/user-attachments/assets/29dd0753-ca32-4fd2-b3c4-d57f724d474c" />
<img width="1033" height="1029" alt="Screenshot 2026-05-03 095522" src="https://github.com/user-attachments/assets/6ca90788-7c9b-494f-bb1b-e5527e7282fc" />
<img width="1036" height="1023" alt="Screenshot 2026-05-03 095315" src="https://github.com/user-attachments/assets/cac1fe82-35f3-4f7a-b4e5-48e009d3e177" />


Screen Record:
https://drive.google.com/drive/folders/1nuoUvupptWiuRLhHkcyf2X61M1AqWaoy?usp=sharing




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
