# SAHASTRA OCUDENT HEALTHCARE

A modern, responsive, high-performance healthcare website for **SAHASTRA OCUDENT HEALTHCARE**, integrating comprehensive **Eye Care & Ophthalmology** and **Dental Care** under a single unified clinic portal.

---

## 🌟 Key Highlights & Architecture

- **Defining Feature: Two-Button Department Switcher**:
  - Prominent toggle in top navigation bar and mobile header.
  - Automatically updates Hero, Services, Highlights, Appointment form pre-selection, Page Title, Meta descriptions, and URL without full page reloads.
  - Supports `/eye-care` and `/dental-care` routing (plus hash fallback `#/eye-care`, `#/dental-care` for local file system testing).
  - Uses modern CSS View Transitions and hardware-accelerated transforms for smooth visual continuity.
- **Frontend-Focused & Zero Build Step**:
  - Pure Vanilla **HTML5, CSS3, and JavaScript (ES6+)**.
  - Zero dependencies or compilation steps required — runs directly by opening `index.html` in any modern web browser or hosting statically on Vercel/Netlify.
- **Appointment Request & Dual Transmissions**:
  - Validates required fields: Full Name, Indian 10-digit Phone (+91 supported), Department, and Future Appointment Date (past dates disabled).
  - **Path 1 — Web / Email Request**: Validates and triggers a clear confirmation state with a reference ID. Ready for future EmailJS / transactional service integration.
  - **Path 2 — WhatsApp Click-to-Chat**: Generates a clean URL-encoded message containing all form parameters and opens `wa.me/919876543210` with user instruction.
- **Mobile First & Accessible**:
  - Fully responsive across desktop, tablet, and mobile.
  - Mobile department switcher bar directly accessible without opening menus.
  - Sliding mobile navigation drawer.
  - Interactive "Learn More" modal for all 12 medical services with direct appointment pre-fill.
  - Full compliance with `prefers-reduced-motion` and `:focus-visible` states.
- **Brand Identity**:
  - Official clinic logo integrated from `assets/icons/Sahastra Ocellent Healthcare Logo.png`.
  - Brand name: **SAHASTRA OCUDENT HEALTHCARE** (strictly no "LLP").

---

## 📁 Project Directory Structure

```text
Sahastra_healthcare/
├── index.html              # Semantic HTML5 master document
├── css/
│   └── style.css           # Modern CSS tokens, responsive layout, animations & themes
├── js/
│   ├── data.js             # Central clinic data, service catalogs & placeholder contact info
│   └── app.js              # Department switching, form validation, WhatsApp & modal handlers
├── assets/
│   └── icons/              # Clinic logo and official branding assets
├── vercel.json             # Static clean routing rewrites for Vercel
├── robots.txt              # Search engine crawler permissions
├── sitemap.xml             # XML sitemap for SEO indexing
└── README.md               # Documentation and maintenance guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch (No server required)
Double-click `index.html` or open it directly in Chrome, Edge, Safari, or Firefox:
```text
file:///path/to/Sahastra_healthcare/index.html
```

### Option 2: Using Any Local Static Server
If you have Node.js installed, run:
```bash
npx serve .
# Or using Python:
python -m http.server 3000
```
Open `http://localhost:3000` in your browser.

---

## ⚙️ Updating Clinic Information & Services

All clinic contact details, operating hours, addresses, and service descriptions are centralized in **`js/data.js`**:

```javascript
const CLINIC_CONFIG = {
  brand: {
    name: "SAHASTRA OCUDENT HEALTHCARE",
    logoPath: "assets/icons/Sahastra Ocellent Healthcare Logo.png"
  },
  contact: {
    phone: "+91 98765 43210",              // Update when clinic provides official number
    whatsappNumber: "919876543210",        // Without '+' or spaces for wa.me
    email: "appointments@sahastraocudent.com",
    address: {
      line1: "Plot No. 42, Healthcare Enclave",
      line2: "Sector 12, Dwarka",
      city: "New Delhi",
      postalCode: "110075"
    },
    hours: [
      { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
      { days: "Sunday", time: "10:00 AM – 2:00 PM (Prior Appointment)" }
    ]
  }
};
```

---

## ✉️ Future EmailJS / API Integration

When you are ready to connect live email delivery:
1. Sign up for an account on [EmailJS](https://www.emailjs.com/).
2. Add an Email Service (e.g. Gmail or custom clinic domain SMTP).
3. Create an Email Template with variables `{{patient_name}}`, `{{contact_number}}`, `{{department}}`, `{{preferred_date}}`, `{{preferred_time}}`, `{{message}}`.
4. Include the EmailJS SDK script in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
5. In `js/app.js` (around line 370), replace the simulated `setTimeout` with:
   ```javascript
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
     patient_name: data.patientName,
     contact_number: data.contactNumber,
     department: data.department,
     preferred_date: data.date,
     preferred_time: data.time,
     message: data.message,
   }, "YOUR_PUBLIC_KEY").then(() => {
     // Show success alert
   });
   ```

---

## 🌐 Deployment to Vercel

1. Push this repository to GitHub or GitLab.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Set Framework Preset to **"Other"** (Root directory: `./`).
5. Click **"Deploy"**.
6. The included `vercel.json` will automatically route `/eye-care` and `/dental-care` cleanly without 404s.
