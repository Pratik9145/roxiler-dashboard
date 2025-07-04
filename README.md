# Roxiler Transactions Dashboard

A full-stack MERN application to visualize product transactions by month with charts, search, and statistics.

### 🔧 Tech Stack

* **Frontend**: React.js, Tailwind CSS, Chart.js
* **Backend**: Node.js, Express.js, MongoDB Atlas
* **Charts**: react-chartjs-2, chart.js

---

## 💼 Features

* 📅 Filter transactions by month
* ![image](https://github.com/user-attachments/assets/29a2583f-5228-4361-9073-4e81f7ff1c9b)
* 🔍 Search transactions by title, description, or price
* ![image](https://github.com/user-attachments/assets/ff89f301-fb64-4f4a-a54d-4c844bc163f0)
* 📊 Visualize data with:
  * Bar Chart (price range)
  * Pie Chart (categories)
  ![image](https://github.com/user-attachments/assets/e01e4c5a-6caa-4a87-af33-008a55474d6a)
* 📈 Statistics: total sale, sold items, unsold items
* ![image](https://github.com/user-attachments/assets/ab0058d4-b133-4445-913e-175ffe1beb09)

* 🔄 Pagination & Combined API response

---

## 📁 Folder Structure

```
roxiler-frontend/
├── src/
│   ├── components/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
roxiler-backend/
├── controllers/
├── models/
├── routes/
├── utils/
├── config/
└── server.js
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Pratik9145/roxiler-dashboard.git
cd roxiler-dashboard
```

### 2. Backend Setup

```bash
cd roxiler-backend
npm install
```

* Create `.env`:

```
MONGO_URI=your_mongo_atlas_connection_string
PORT=5000
```

* Run the backend:

```bash
npm run dev
```

* Seed DB:

```bash
GET http://localhost:5000/api/init
```

---

### 3. Frontend Setup

```bash
cd ../roxiler-frontend
npm install
npm run dev
```

---
## 📬 API Endpoints

| Endpoint                       | Description       |
| ------------------------------ | ----------------- |
| `GET /api/init`                | Seed database     |
| `GET /api/transactions?month=` | List transactions |
| `GET /api/statistics?month=`   | Monthly stats     |
| `GET /api/bar-chart?month=`    | Bar chart data    |
| `GET /api/pie-chart?month=`    | Pie chart data    |
| `GET /api/combined?month=`     | All combined data |

---

## 👨‍💻 Author

* Pratik Choure

---

## 🌟 Show your support

Leave a ⭐ on GitHub if you like this project!
