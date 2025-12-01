# Equipment Management System 🚧

A web-based application to manage lab/university equipment across multiple departments — track inventory, costs, and availability easily.

---

## 📚 What is this Project

This project helps departments (CSE, EEE, Mechanical, Civil, etc.) manage their lab equipment: record items, track quantities, calculate total cost and quantities by department, and display summarized inventory state. It works with a database (MongoDB) in backend, and uses authentication to restrict access.

---

## 🛠️ Features

- Department-wise equipment tracking (CSE, EEE, Mechanical, Civil)  
- Track quantities, item types, total cost per department  
- Inventory summary — items count & cost aggregated by type (e.g. laptops, instruments, etc.)  
- Admin login/logout to secure access  
- Simple clean UI rendering equipment inventory  

---

## 💡 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT + session  
- **Templating:** EJS or similar (for rendering inventory pages)  
- **Other:** Bcrypt.js for password hashing  
## 📸 Screenshots

![Home Dashboard](assets/Screenshot%202025-12-02%20002110.png)
![CSE Overview](assets/Screenshot%202025-12-02%20002143.png)
![EEE Overview](assets/Screenshot%202025-12-02%20002154.png)
![ME Dept](assets/Screenshot%202025-12-02%20002235.png)
![CE Dept](assets/Screenshot%202025-12-02%20002304.png)
![Equipment Table](assets/Screenshot%202025-12-02%20002329.png)
![Equipment Details](assets/Screenshot%202025-12-02%20002339.png)
![Login Page](assets/Screenshot%202025-12-02%20002356.png)


