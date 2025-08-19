# PetcCare

PetcCare is a modern web application designed to simplify pet care management.  
It allows pet owners to **book appointments, manage records, and access services** for their pets through a seamless and user-friendly interface.

---

## 🚀 Features

- 📅 **Appointment Booking** – Seamless multi-step form to schedule vet visits.  
- 🐶 **Pet Management** – Store pet details (name, type, etc.).  
- 👨‍⚕️ **Doctor Selection** – Choose a specific doctor or let the system assign automatically.  
- 📝 **Appointment Summary** – Professional confirmation page before booking.  
- 🛠️ **Services Management** – Browse and select from available veterinary services (e.g., vaccination, grooming, check-ups).  
- 📊 **User Dashboard** – Personalized dashboard to view upcoming appointments, pet details, and service history.  
- 🔒 **Secure Data Handling** – Clean and secure backend logic.  
- 🎨 **Modern UI/UX** – Built with Next.js, TailwindCSS, and shadcn/ui for a sleek design.  


## 🛠️ Tech Stack

**Frontend**  
- React (Next.js / CRA)  
- Tailwind CSS  
- Lucide Icons 
- Email.js 
  
**Other Tools**  
- Firebase (if used for auth / db)  
- Git & GitHub  

---

## 📂 Project Structure

```bash
PetcCare/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Application pages
│   ├── hooks/       # Custom React hooks
│   ├── utils/       # Helper functions
│   ├── styles/      # Tailwind/global styles
│   └── App.js       # Root App component
├── package.json
└── README.md

```
# Clone the repository

git clone https://github.com/m-dani-sh/pet-clinic

# Navigate into project
cd pet-clinic

# Install dependencies
npm install

# Run development server
npm run dev

## 🔑 Environment Variables

Before running this project, create a `.env.local` file in the root directory and add the following:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# EmailJS Config
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_TEMPLATE_USER=your_emailjs_template_user
NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN=your_emailjs_template_admin

# Admin Email
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email
