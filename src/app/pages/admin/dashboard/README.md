
# Admin Dashboard Pages

This directory contains the administrative interface pages for the Wildlife Monitoring System.

## Page Structure

### 1. Camera Traps (`camera_traps/page.js`)
Provides real-time wildlife detection through camera feeds.
- Features:
  - Live camera feed integration
  - Site selection from predefined locations
  - Real-time species detection
  - Detection history tracking
  - Confidence score display

### 2. Analytics (`analytics/page.js`)
Displays statistical data and visualizations of wildlife detections.
- Features:
  - Species distribution charts
  - Detection timelines
  - Site activity analysis
  - Habitat correlation analysis
  - Performance metrics

### 3. Admin Roles (`admin_roles/page.js`)
Manages user access and permissions.
- Features:
  - User listing
  - Role assignment
  - User management controls
  - Access level modification

### 4. Admin Publish (`admin_publish/page.js`)
Content management system for publishing wildlife events and stories.
- Features:
  - Event creation and editing
  - Media upload support
  - Rich text article editing
  - Content preview
  - Publication management

## Common Components

All pages share these common elements:
- Sidebar navigation
- Responsive layout
- Error handling
- Loading states
- Session management

## Technical Details

- Framework: Next.js 13+ (App Router)
- Authentication: Required for all admin pages
- API Integration: RESTful endpoints
- State Management: React hooks
- Styling: Tailwind CSS

## Usage

1. All pages require administrative login
2. Access through the sidebar navigation
3. Changes are logged and tracked
4. Real-time updates where applicable

## Development

To add new admin pages:
1. Create a new directory under `dashboard/`
2. Add a `page.js` file
3. Include the Sidebar component
4. Implement required authentication
5. Add the route to the sidebar navigation