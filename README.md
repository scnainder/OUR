# OUR - Landing Pages

Beautiful landing pages built with Next.js and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Header component
│   └── Footer.tsx       # Footer component
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Deployment to Cloudflare Pages

### 1. Connect Repository to Cloudflare

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click "Create a project" → "Connect to Git"
3. Select the OUR repository
4. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `out`

### 2. Environment Variables (if needed)

Set any required environment variables in Cloudflare Pages settings.

### 3. Deploy

Cloudflare will automatically build and deploy on every push to the main branch.

## Adding New Pages

To add a new landing page:

1. Create a new folder in `app/`:
   ```bash
   mkdir app/about
   ```

2. Add a `page.tsx` file:
   ```bash
   touch app/about/page.tsx
   ```

3. Add your page content

## Customization

Edit the following to customize your landing pages:

- **Brand Colors**: Update `tailwind.config.js`
- **Fonts**: Modify `app/globals.css`
- **Metadata**: Update `app/layout.tsx`
- **Components**: Add/edit components in `components/`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)