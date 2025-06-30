# Chaat Client

A React-based client application for creating and managing AI chatbots.

## 🚀 Quick Start

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The app will automatically connect to `http://localhost:8000` for the API.

### Environment Configuration

The application automatically detects the environment and uses the appropriate API configuration:

- **Development**: Uses `http://localhost:8000` (your local backend)
- **Production**: Uses `/api` (proxied through nginx to your production backend)

#### Environment Files

- `.env.local` - Local development (automatically created)
- `.env.development` - Development environment 
- `.env.production` - Production environment
- `.env.example` - Example configuration

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build specifically for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔧 API Configuration

The API configuration is automatic:

**Development:**
```bash
# Automatically uses localhost
npm run dev
```

**Production Build:**
```bash
# Automatically uses /api proxy
npm run build
```

**Custom API URL:**
```bash
# Override with environment variable
VITE_API_URL=http://your-api-url.com npm run build
```

## 🐳 Docker Deployment

### Production Deployment

```bash
# Build and run with nginx proxy
docker build -t chaat-client .
docker run -p 80:80 chaat-client
```

The nginx configuration automatically proxies `/api/*` requests to your backend server.

### Development with Docker

```bash
# Build for development
npm run build:local
docker build -t chaat-client-dev .
docker run -p 80:80 chaat-client-dev
```

## 🔑 Features

- **Bot Creation**: Create simple chat bots and Q&A knowledge base bots
- **Bot Type Selection**: Choose between different bot types
- **Knowledge Base Management**: Upload PDF files for Q&A bots
- **Real-time Status**: Monitor bot deployment and knowledge base processing
- **File Upload**: Drag & drop PDF upload with validation
- **Authentication**: JWT-based authentication with auto-refresh

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | Auto-detected based on environment |

## 📦 Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation
- **Docker** for containerization

## 🔄 Development Workflow

1. **Local Development:**
   ```bash
   npm run dev
   ```
   Automatically connects to `localhost:8000`

2. **Production Build:**
   ```bash
   npm run build
   ```
   Automatically configured for production deployment

3. **Deploy:**
   ```bash
   docker build -t chaat-client .
   docker run -p 80:80 chaat-client
   ```

**No manual configuration switching required!** 🎉
