# Roxiler Transactions Dashboard

A full-stack MERN application to visualize product transactions by month with charts, search, and statistics.

### 🔧 Tech Stack

* **Frontend**: React.js, Tailwind CSS, Chart.js
* **Backend**: Node.js, Express.js, MongoDB Atlas
* **Charts**: react-chartjs-2, chart.js

---

## 💼 Features

* 📅 Filter transactions by month
* 🔍 Search transactions by title, description, or price
* 📊 Visualize data with:

  * Bar Chart (price range)
  * Pie Chart (categories)
* 📈 Statistics: total sale, sold items, unsold items
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
git clone https://github.com/yourusername/roxiler-dashboard.git
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
