# 🍽️ Simple Recipe API

A basic REST API to store, retrieve, and delete cooking recipes — built with **Node.js**, **Express**, and **MongoDB**.

---

## 📦 What This API Can Do

### Available Endpoints:

| Method | Endpoint              | Description                       |
|--------|-----------------------|-----------------------------------|
| GET    | `/recipes`            | Get a list of all recipes         |
| GET    | `/recipes/:id`        | Get a specific recipe by ID       |
| POST   | `/recipes`            | Add a new recipe                  |
| DELETE | `/recipes/:id`        | Delete a recipe by ID             |

Each recipe has:
- `title`: name of the recipe
- `ingredients`: list of ingredients
- `instructions`: how to make it

---

## Tech Stack

- **Backend**: Node.js + Express  
- **Database**: MongoDB (running locally)

### 🛠 How the Database Works

We’re using MongoDB to store all recipes. The data is structured using Mongoose models and connected to the server via:

```js
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

In development, the URI is:
```
mongodb://localhost:27017/recipeDB
```

---

## How to Run the Server

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/recipe-api.git
cd recipe-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file with:

```
MONGO_URI=mongodb://localhost:27017/recipeDB
```

### 4. Start MongoDB (macOS Homebrew)

```bash
brew services start mongodb-community
```

### 5. Start the Server

```bash
node index.js
```

You should see:

```
Server running on port 3000
MongoDB connected
```

---

## 🌐 How to Interact with the API

### ▶️ Add a Recipe

```bash
curl -X POST http://localhost:3000/recipes \
-H "Content-Type: application/json" \
-d '{"title":"Pasta","ingredients":["noodles","sauce"],"instructions":"Boil pasta, add sauce"}'
```

### 📋 Get All Recipes

```bash
curl http://localhost:3000/recipes
```

### 🔍 Get a Specific Recipe

```bash
curl http://localhost:3000/recipes/<recipe_id>
```

### ❌ Delete a Recipe

```bash
curl -X DELETE http://localhost:3000/recipes/<recipe_id>
```

---