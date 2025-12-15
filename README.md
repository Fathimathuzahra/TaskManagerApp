# 🚀 **Task Manager Pro** - Full Stack Application

![Task Manager Dashboard](https://img.shields.io/badge/Status-Complete-success) ![Django](https://img.shields.io/badge/Django-6.0-green) ![React](https://img.shields.io/badge/React-18-blue) ![JWT](https://img.shields.io/badge/Auth-JWT-orange)

A **complete, production-ready** Task Manager application built with **Django REST Framework** backend and **React** frontend. Features enterprise-grade authentication, real-time task management, and a stunning modern UI.

---

## ✨ **Features That Impress**

### 🎯 **Core Requirements (100% Complete)**
| Feature | Status | Description |
|---------|--------|-------------|
| 🔐 **JWT Authentication** | ✅ Complete | Secure login/register with token-based auth |
| 📝 **Full CRUD Operations** | ✅ Complete | Create, Read, Update, Delete tasks |
| 👤 **User Isolation** | ✅ Complete | Each user sees only their own tasks |
| 🔍 **Task Filtering** | ✅ Complete | Filter by All/Pending/Completed |
| 🎨 **Clean UI/UX** | ✅ Complete | Modern, responsive design |

### 🌟 **Bonus Features (All Implemented!)**
| Feature | Status | Badge |
|---------|--------|-------|
| ⚡ **Priority Levels** | ✅ Implemented | ![Priority](https://img.shields.io/badge/High-Medium-Low-yellow) |
| 📅 **Due Dates** | ✅ Implemented | ![Date Picker](https://img.shields.io/badge/Date-Picker-blue) |
| 📊 **Progress Tracking** | ✅ Implemented | ![Progress](https://img.shields.io/badge/Visual-Progress%20Bar-green) |
| 🔎 **Search Functionality** | ✅ Implemented | ![Search](https://img.shields.io/badge/Instant-Search-purple) |
| 🌙 **Dark/Light Mode** | ✅ Implemented | ![Theme](https://img.shields.io/badge/Dark-Light%20Mode-ff69b4) |

---

## ⚡ **Quick Start Guide**

### **📦 Prerequisites**
```bash
# Required Software
- Python 3.8+ 🐍
- Node.js 16+ ⚛️
- Git 📦
```

### **🚀 Setup Instructions**

```bash
# 1. Clone Repository
git clone https://github.com/Fathimathuzahra/TaskManagerApp.git
cd TaskManagerApp

# 2. Backend Setup
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
# Backend runs at: http://127.0.0.1:8000

# 3. Frontend Setup (New Terminal)
cd ../frontend
npm install
npm start
# Frontend runs at: http://localhost:3000
```

---

## 🔗 **API Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | User registration | ❌ No |
| POST | `/api/auth/login/` | JWT token authentication | ❌ No |
| GET | `/api/auth/me/` | Current user info | ✅ Yes |
| GET | `/api/tasks/` | List all tasks | ✅ Yes |
| POST | `/api/tasks/` | Create new task | ✅ Yes |
| PUT | `/api/tasks/{id}/` | Update task | ✅ Yes |
| DELETE | `/api/tasks/{id}/` | Delete task | ✅ Yes |

---

## 📁 **Project Structure**

```
TaskManagerApp/
├── backend/                 # Django REST API
│   ├── users/              # 👤 Authentication App
│   ├── tasks/              # ✅ Task Management App
│   ├── db.sqlite3          # Database
│   └── requirements.txt    # Python dependencies
├── frontend/               # React Application
│   ├── src/
│   │   ├── contexts/      # 🔐 Auth Context
│   │   ├── pages/         # 🖥️ Pages (Login, Register, Dashboard)
│   │   ├── components/    # 🧩 Reusable Components
│   │   └── App.js         # Main Application
│   └── package.json       # Node dependencies
└── README.md              # This Documentation
```

---

## 🎨 **UI Features**

### **🌙 Dark/Light Mode Toggle**
- Click the 🌙/☀️ button in top-right corner
- Theme persists across pages
- Smooth transitions between modes

### **📊 Progress Dashboard**
- Visual progress bar with completion percentage
- Real-time task statistics
- Color-coded priority indicators

### **🔍 Smart Search**
- Instant search across task titles and descriptions
- Combined with status filtering
- Case-insensitive matching

---

## 🧪 **Testing the Application**

1. **Register a new user** at `http://localhost:3000/register`
2. **Login** with your credentials
3. **Create tasks** using "+ Add New Task" button
4. **Test features**:
   - Filter tasks (All/Pending/Completed)
   - Edit/Delete tasks
   - Toggle dark mode
   - Search for tasks
   - Check progress bar updates

---

## 🚀 **Deployment**

### **Frontend (Vercel)**
```bash
npm run build
vercel --prod
```

### **Backend (Railway/Render)**
```bash
# Update ALLOWED_HOSTS in settings.py
# Set DEBUG = False
# Add production database
```

---

## 🐛 **Troubleshooting**

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npx kill-port 3000` |
| CORS errors | Check `CORS_ALLOW_ALL_ORIGINS = True` |
| Database issues | `python manage.py migrate --run-syncdb` |
| Node modules error | Delete `node_modules` and `npm install` |

---

## 📸 **Screenshots**

*(Add your screenshots in a `screenshots/` folder)*
1. `login.png` - Login page with dark mode toggle
2. `dashboard.png` - Main dashboard with tasks
3. `dark-mode.png` - Dark theme implementation
4. `tasks.png` - Task creation and listing

---

## 👤 **Author**

**Fathimath Uzahra**  
- GitHub: [@Fathimathuzahra](https://github.com/Fathimathuzahra)

---

## 📄 **License**

MIT License - see LICENSE file for details.

---

<div align="center">

### **Ready for Submission!** 🎯

[![Open in GitHub](https://img.shields.io/badge/View%20Code-GitHub-black)](https://github.com/Fathimathuzahra/TaskManagerApp)
[![Try Locally](https://img.shields.io/badge/Run%20Locally-Localhost-blue)](http://localhost:3000)

</div>

---

**Built for Full Stack Development Internship Assessment**  
**All requirements + bonus features completed**  
**Ready for review and deployment**
