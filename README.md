# Bounce Boom Training - Employee Video Library

A comprehensive training video platform for Bounce Boom Racquet Sports employees, featuring role-based access control, video management, and interactive learning tools.

## 🎾 Project Overview

This platform provides tennis and pickleball training materials to employees with different access levels. Built with React, TypeScript, and modern UI components, it offers a professional learning management system tailored for racquet sports coaching.

## ✨ Key Features

### 🔐 Role-Based Access Control
- **Employee Access**: Full access to all training materials and platform features
- **Temporary Access**: Limited access to 5 selected videos for a specified duration (1-30 days)
- **Administrator Access**: Complete platform management including user and content administration

### 📹 Video Management System
- **YouTube Integration**: Embedded video player with full YouTube functionality
- **Video Categories**: Organized content by technique, safety, rules, equipment, customer service, and business operations
- **Interactive Features**: 
  - Thumbs-up/like system with real-time counts
  - View tracking and analytics
  - Featured video highlighting
- **Video Details**: Individual video pages with descriptions, metadata, and engagement features

### 💬 Comments & Engagement
- **Comment System**: Users can post comments on training videos
- **Real-time Interaction**: Instant comment posting with user attribution
- **Engagement Tracking**: Like counts and view statistics
- **User Feedback**: Toast notifications for user actions

### 👥 User Management (Admin)
- **User Creation**: Add new users with role assignment
- **Access Control**: Manage user permissions and temporary access duration
- **User Analytics**: Track user activity, login history, and account status
- **Bulk Operations**: Extend access, reset passwords, and manage multiple users

### 📊 Admin Dashboard
- **Analytics Overview**: Platform statistics including user counts, video metrics, and engagement data
- **Quick Actions**: Rapid access to common administrative tasks
- **Alerts System**: Notifications for expiring temporary accounts
- **Recent Activity**: Monitor new user registrations and popular content

### ⚙️ Platform Configuration
- **Settings Management**: Configure platform behavior, access policies, and notification preferences
- **Temporary Access Policies**: Set default durations and video limits for temporary users
- **Email Notifications**: Automated alerts for account creation, expiration warnings, and system events
- **Maintenance Mode**: Platform-wide access control for updates and maintenance

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Tennis Court Theme**: Professional green and yellow color scheme reflecting tennis aesthetics
- **Intuitive Navigation**: Clean, organized interface with clear visual hierarchy
- **Accessibility**: Proper contrast ratios, keyboard navigation, and screen reader support

### 🔍 Search & Discovery
- **Video Search**: Find training content by title, description, or category
- **Category Filtering**: Browse content by specific training areas
- **User Search**: Admin tools for finding and managing specific users
- **Content Organization**: Logical grouping of related training materials

## 🛠 Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Routing**: React Router for navigation
- **State Management**: React hooks and context
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and building
- **Icons**: Lucide React for consistent iconography

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Demo Users

The platform includes demo users for testing different access levels:

- **Nadeen Siddiqui** (Employee) - Full platform access
- **Sarah Johnson** (Temporary) - Limited video access with expiration
- **Gregg Deinhart** (Administrator) - Complete management access

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── admin/          # Admin panel components
│   ├── Dashboard.tsx   # Main user dashboard
│   └── PlatformDemo.tsx # Demo wrapper component
├── pages/              # Page components
│   ├── Index.tsx       # Login page
│   ├── VideoDetail.tsx # Individual video pages
│   └── NotFound.tsx    # 404 error page
├── data/               # Mock data and types
│   └── mockData.ts     # Sample data for development
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx            # Main application component
```

## 🎯 Use Cases

### For Employees
- Access comprehensive training library
- Watch technique and safety videos
- Engage with content through comments and likes
- Track personal learning progress

### For Temporary Staff
- Quick access to essential training materials
- Limited but focused content for immediate needs
- Time-bound access for seasonal or contract workers

### For Administrators
- Manage user accounts and permissions
- Upload and organize training content
- Monitor platform usage and engagement
- Configure access policies and notifications

## 🔒 Security Features

- Role-based access control with proper permission checking
- Input validation and sanitization
- Secure session management
- XSS protection through React's built-in escaping
- Proper error handling and user feedback

## 📈 Future Enhancements

- Integration with real backend API
- Video upload functionality
- Progress tracking and completion certificates
- Advanced analytics and reporting
- Mobile app development
- Integration with learning management systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Bounce Boom Racquet Sports.

---

## Development Info

**Original Project URL**: https://lovable.dev/projects/3b6300d6-4b90-4ccb-87f4-a0de2e7486cc

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3b6300d6-4b90-4ccb-87f4-a0de2e7486cc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3b6300d6-4b90-4ccb-87f4-a0de2e7486cc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
