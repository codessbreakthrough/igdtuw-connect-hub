# 3-Day Project Reading Plan
## IGDTUW Connect Hub - Codebase Understanding Guide

This plan will help you systematically understand the project structure, functionality, and components over 3 days.

---

## 📋 **Day 1: Core Architecture & Foundation**

### Morning Session (2-3 hours)
**Focus: Understanding the project foundation and data flow**

#### 1. Start with Project Structure
- [ ] Read `README.md` - Project overview and setup instructions
- [ ] Review `package.json` dependencies (read-only file)
- [ ] Check `tailwind.config.ts` - Design system configuration
- [ ] Review `src/index.css` - Global styles and CSS variables

#### 2. Application Entry Point
- [ ] **File: `src/main.tsx`**
  - Add comments explaining the React app bootstrap
  - Document any providers or global configurations

- [ ] **File: `src/App.tsx`**
  - Comment the overall app structure
  - Explain routing setup and provider hierarchy
  - Document the layout structure (navbar, main, footer)

#### 3. Core Context Providers (Most Important)
- [ ] **File: `src/contexts/AuthContext.tsx`** ⭐
  - **Priority: HIGH** - This manages all user authentication
  - Add detailed comments for:
    - `User` interface and `AuthContextType`
    - `validateEmail()` function - email domain validation
    - `login()` function - authentication flow with localStorage
    - `signup()` function - user registration process
    - Mock user system and admin detection
  - Document the localStorage strategy for user persistence

- [ ] **File: `src/contexts/PostContext.tsx`** ⭐
  - **Priority: HIGH** - This manages all posts and communities
  - Add detailed comments for:
    - `Post` and `Community` interfaces
    - `createPost()` function - post creation flow
    - `upvotePost()` function - voting mechanism
    - `flagPost()` and `deletePost()` functions
    - `createCommunity()` function - community creation
    - DEFAULT_COMMUNITIES constant and initialization
  - Document the localStorage persistence strategy

### Afternoon Session (1-2 hours)

#### 4. Utility Functions
- [ ] **File: `src/lib/utils.ts`**
  - Comment the utility functions (likely `cn` classname utility)
  - Explain any helper functions

---

## 📱 **Day 2: Pages & User Experience**

### Morning Session (2-3 hours)
**Focus: Understanding user-facing pages and navigation**

#### 1. Authentication Pages
- [ ] **File: `src/pages/Login.tsx`**
  - Comment the login form structure
  - Document form validation and submission flow
  - Explain navigation after successful login

- [ ] **File: `src/pages/Signup.tsx`**
  - Comment the registration form
  - Document email validation requirements (igdtuw.ac.in domain)
  - Explain user creation process

#### 2. Main Application Pages
- [ ] **File: `src/pages/Home.tsx`** ⭐
  - **Priority: HIGH** - Main landing page
  - Comment the community cards display
  - Document the "Ask Question" and "Create Community" dialogs
  - Explain the layout and user interaction flows

- [ ] **File: `src/pages/Feed.tsx`** ⭐
  - **Priority: HIGH** - Core content consumption page
  - Comment the post filtering and sorting logic
  - Document the AI suggestions component integration
  - Explain the post creation form and display
  - Document the upvoting and flagging mechanisms

- [ ] **File: `src/pages/Communities.tsx`**
  - Comment the community listing and search functionality
  - Document community joining/creation flows
  - Explain the community management features

#### 3. User-Centric Pages
- [ ] **File: `src/pages/Profile.tsx`**
  - Comment user profile display and editing
  - Document user posts and activity display
  - Explain settings and logout functionality

- [ ] **File: `src/pages/Notifications.tsx`**
  - Comment notification display and management
  - Document notification types and interactions

### Afternoon Session (1-2 hours)

#### 4. Administrative & Special Pages
- [ ] **File: `src/pages/Admin.tsx`**
  - Comment admin-only functionality
  - Document flagged content management
  - Explain admin privileges and restrictions

- [ ] **File: `src/pages/NotFound.tsx`**
  - Comment the 404 page structure and navigation

---

## 🧩 **Day 3: Components & UI Elements**

### Morning Session (2-3 hours)
**Focus: Understanding reusable components and UI patterns**

#### 1. Navigation Components
- [ ] **File: `src/components/Navbar.tsx`** ⭐
  - **Priority: HIGH** - Main navigation
  - Comment the search functionality
  - Document user menu and authentication state handling
  - Explain the "Ask Question" dialog integration
  - Comment responsive design considerations

- [ ] **File: `src/components/FooterNavigation.tsx`**
  - Comment mobile navigation structure
  - Document active state management
  - Explain responsive behavior

#### 2. Core Feature Components
- [ ] **File: `src/components/CreatePostForm.tsx`** ⭐
  - **Priority: HIGH** - Content creation
  - Comment form validation and submission
  - Document anonymous posting feature
  - Explain tag selection and community assignment
  - Comment the file upload functionality (if any)

- [ ] **File: `src/components/PostCard.tsx`** ⭐
  - **Priority: HIGH** - Content display
  - Comment the post display logic
  - Document voting UI and interactions
  - Explain the flag/delete functionality
  - Comment timestamp formatting and user display

- [ ] **File: `src/components/PostDetail.tsx`**
  - Comment the detailed post view
  - Document comment system integration
  - Explain navigation and sharing features

#### 3. Enhanced Feature Components
- [ ] **File: `src/components/AiSuggestions.tsx`**
  - Comment the AI suggestions logic (currently stub)
  - Document the similar posts display
  - Explain future enhancement possibilities

- [ ] **File: `src/components/UserProfileHover.tsx`**
  - Comment the user hover card functionality
  - Document user information display
  - Explain interaction patterns

### Afternoon Session (1-2 hours)

#### 4. UI Component Library Review
**Note: These are shadcn/ui components - focus on customizations**

Priority files to review for customizations:
- [ ] `src/components/ui/button.tsx` - Check for custom variants
- [ ] `src/components/ui/card.tsx` - Document any custom styling
- [ ] `src/components/ui/dialog.tsx` - Review modal implementations
- [ ] `src/components/ui/form.tsx` - Check form validation setup
- [ ] `src/components/ui/input.tsx` - Document input customizations

#### 5. Custom Hooks (if any)
- [ ] `src/hooks/use-mobile.tsx` - Comment mobile detection logic
- [ ] `src/hooks/use-toast.ts` - Document toast notification system

---

## 📝 **Comment Writing Guidelines**

### Function Comments Template:
```typescript
/**
 * Brief description of what the function does
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @example Usage example if complex
 */
```

### Component Comments Template:
```typescript
/**
 * ComponentName - Brief description of component purpose
 * 
 * Features:
 * - Key feature 1
 * - Key feature 2
 * 
 * Props:
 * - propName: Description
 * 
 * Usage: Where and how this component is used
 */
```

### Key Areas to Comment:
1. **Business Logic**: Why certain decisions are made
2. **Data Flow**: How data moves between components
3. **Side Effects**: localStorage operations, API calls
4. **User Interactions**: Click handlers, form submissions
5. **State Management**: How state is updated and why
6. **Error Handling**: How errors are caught and displayed
7. **Authentication**: Permission checks and user validation
8. **Performance**: Any optimization techniques used

---

## 🎯 **Success Criteria**

By the end of 3 days, you should understand:
- ✅ How user authentication works
- ✅ How posts are created, displayed, and managed
- ✅ How communities function
- ✅ The overall data flow and state management
- ✅ The UI component structure and reusability
- ✅ How the application handles user interactions
- ✅ The mobile responsiveness strategy
- ✅ The admin functionality and content moderation

---

## 🔗 **Quick Reference Links**

### Authentication Flow:
`src/contexts/AuthContext.tsx` → `src/pages/Login.tsx` → `src/pages/Signup.tsx`

### Content Management:
`src/contexts/PostContext.tsx` → `src/components/CreatePostForm.tsx` → `src/components/PostCard.tsx`

### Navigation:
`src/App.tsx` → `src/components/Navbar.tsx` → `src/components/FooterNavigation.tsx`

### Main User Flows:
- **Home** → `src/pages/Home.tsx`
- **Feed** → `src/pages/Feed.tsx`
- **Communities** → `src/pages/Communities.tsx`
- **Profile** → `src/pages/Profile.tsx`

---

## 📚 **Additional Notes**

- This is an MVP using localStorage for persistence
- Email domain restricted to @igdtuw.ac.in
- Admin functionality is role-based
- Mobile-first responsive design
- Toast notifications for user feedback
- Anonymous posting capability
- Real-time-like updates through React state

**Priority Focus**: Start with Day 1 morning session as it contains the core application logic that everything else depends on.