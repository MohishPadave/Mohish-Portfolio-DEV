# How to Add Project Images to Photos App

## Quick Start

Your project images go in: `public/assets/images/projects/`

## Folder Structure

```
public/assets/images/projects/
├── project1/    # E-Commerce Platform
├── project2/    # Social Media Dashboard
├── project3/    # Weather App
├── project4/    # Task Manager
├── project5/    # Portfolio Website
├── project6/    # Chat Application
├── project7/    # Blog Platform
├── project8/    # Music Player
├── project9/    # Fitness Tracker
└── project10/   # Recipe App
```

## Steps to Add Images

### 1. Place Your Images
Put your project screenshots in the corresponding folder:
- E-Commerce Platform → `project1/`
- Social Media Dashboard → `project2/`
- Weather App → `project3/`
- etc.

### 2. Update PhotosApp.jsx
Open `src/components/PhotosApp.jsx` and add your image filenames to the `images` array:

```javascript
const collections = [
  { 
    id: 1, 
    name: 'E-Commerce Platform', 
    folder: 'project1',
    description: 'Full-stack e-commerce application with cart and checkout',
    images: ['homepage.png', 'product-page.jpg', 'cart.png', 'checkout.png'] // Add your images here
  },
  // ... other collections
];
```

### 3. Example

Let's say you want to add screenshots for your E-Commerce Platform:

**Step 1:** Copy your images to the folder
```
public/assets/images/projects/project1/
├── homepage.png
├── product-listing.png
├── product-detail.jpg
├── shopping-cart.png
└── checkout-page.png
```

**Step 2:** Update the code in `PhotosApp.jsx`:
```javascript
{ 
  id: 1, 
  name: 'E-Commerce Platform', 
  folder: 'project1',
  description: 'Full-stack e-commerce application with cart and checkout',
  images: [
    'homepage.png',
    'product-listing.png', 
    'product-detail.jpg',
    'shopping-cart.png',
    'checkout-page.png'
  ]
},
```

**Step 3:** Save and refresh your browser!

## Tips

- **Supported formats**: JPG, PNG, JPEG, WebP, GIF
- **Recommended size**: 1920x1080 or higher
- **File size**: Keep under 2MB per image
- **Naming**: Use descriptive names (e.g., `dashboard-view.png`, `mobile-responsive.jpg`)

## Customization

You can also update:
- **Collection name**: Change the `name` field
- **Description**: Update the `description` field
- **Folder name**: Change the `folder` field (and rename the actual folder)

That's it! Your project images will now appear in the Photos app when you click on each collection.
