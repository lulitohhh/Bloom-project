# 🌱 Bloom – Interactive Nature Learning App for Kids

**Bloom** is a web-based interactive educational platform designed to help young children learn about nature through play. Kids can plant, grow, and care for virtual plants while discovering species, ecosystems, and fun facts in a magical digital garden.

---

## 🚀 Live Demo

🌐 [Visit Bloom](https://your-public-domain-link.com)

---

## ✨ Features

- 👩‍🌾 **Dashboard Garden** – Grow and take care of your plants with watering and fertilizing tools.
- 📚 **Almanac** – Discover unlocked species and learn about their ecosystem in an interactive encyclopedia.
- 🎮 **Mini-Games & Challenges** – Earn coins by completing nature-themed activities.
- 🧑‍🚀 **User Profiles** – Track your progress, choose your avatar, and personalize your experience.
- 🔐 **Authentication** – Login/Register securely using Firebase Auth.
- 🔁 **Real-Time Updates** – Plant growth and inventory sync in real time using Firestore.
- 📱 **Fully Responsive** – Optimized for mobile, tablet, and desktop devices.
- 🧩 **Accessibility & Usability** – Designed with children in mind: large buttons, friendly fonts, and keyboard navigation.

---

## 🛠️ Tech Stack

### Core
- **React** – Functional components and hooks
- **React Router** – Page navigation
- **Redux Toolkit** – Global state management
- **Firebase** – Authentication & Firestore for database
- **Framer Motion** – Animations and transitions
- **Vite** – Fast bundler and development server

### Styling
- **Tailwind CSS** – Utility-first CSS framework
- **Custom Components** – For modular UI design

### Other Libraries
- `react-icons` – Icon set for UI elements
- `clsx` – Conditional classNames for styling
- `uuid` – For unique identifiers
- `date-fns` – Date formatting and manipulation (if applicable)

---

## 📁 Project Structure

```plaintext
src/
├── components/        # Reusable UI components
├── pages/             # Main screens: Dashboard, Almanac, Store, etc.
├── redux/             # Redux slices (coins, user, plants, etc.)
├── services/          # Firebase and API logic
├── utils/             # Helpers, authentication, constants
├── assets/            # Images and icons
├── App.jsx
├── main.jsx

How to run locally
# Clone this repo
git clone https://github.com/your-username/bloom.git
cd bloom

# Install dependencies
npm install

# Start the dev server
npm run dev
