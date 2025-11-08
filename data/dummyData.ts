export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  createdAt: string;
}

export interface Resource {
  id: number;
  title: string;
  provider: 'YouTube' | 'Udemy' | 'Coursera' | 'freeCodeCamp' | 'Other';
  url: string;
  rating: number;
  views: number;
  category: 'Web Development' | 'UI/UX Design' | 'Data Science' | 'General';
  thumbnail: string;
  summary: string; // neutral summary provided by editors
  reviews?: Review[];
  createdAt?: string;
}

export const dummyData: Resource[] = [
  {
    id: 1,
    title: 'Full Modern React Tutorial',
    provider: 'YouTube',
    url: '#',
    rating: 4.9,
    views: 2100000,
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    summary: 'This resource is highly recommended for its comprehensive coverage of React hooks and modern state management, making it perfect for both beginners and those looking to update their skills.',
    reviews: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Figma for Beginners: UI/UX Design',
    provider: 'Udemy',
    url: '#',
  rating: 4.8,
  views: 890000,
    category: 'UI/UX Design',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    summary: 'A great starting point for aspiring designers. It provides a solid foundation in Figma\'s tools and UI/UX principles through practical, easy-to-follow examples.',
    reviews: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Python for Data Science - Full Course',
    provider: 'freeCodeCamp',
    url: '#',
  rating: 4.9,
  views: 3500000,
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    summary: 'An extensive, in-depth course that covers all essential Python libraries for data science. Its project-based approach ensures you gain hands-on experience.',
    reviews: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'JavaScript Crash Course for Beginners',
    provider: 'YouTube',
    url: '#',
  rating: 4.7,
  views: 5200000,
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    summary: 'This fast-paced course is excellent for quickly grasping the fundamentals of JavaScript. It is well-structured and covers core concepts effectively.',
    reviews: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    title: 'Intro to UI/UX: Principles of User Experience',
    provider: 'Coursera',
    url: '#',
  rating: 4.8,
  views: 450000,
    category: 'UI/UX Design',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    summary: 'Offered by a leading university, this course provides a theoretical and research-backed understanding of UX principles, essential for a strong design career.',
    reviews: [],
    createdAt: new Date().toISOString()
  },
    {
    id: 6,
    title: 'Data Analysis with Pandas',
    provider: 'Udemy',
    url: '#',
  rating: 4.7,
  views: 1100000,
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    summary: 'A practical, hands-on guide to one of the most important data analysis libraries in Python. Great for learners who want to work with real-world datasets.',
    reviews: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 7,
    title: 'HTML & CSS Full Course for Beginners',
    provider: 'freeCodeCamp',
    url: '#',
  rating: 4.8,
  views: 7800000,
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    summary: 'The definitive starting point for any web developer. This exhaustive course covers everything from the basics to advanced concepts like Flexbox and Grid.',
    reviews: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 8,
    title: 'Advanced Figma: Prototyping and Animations',
    provider: 'YouTube',
    url: '#',
  rating: 4.9,
  views: 760000,
    category: 'UI/UX Design',
    thumbnail: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    summary: 'Takes your Figma skills to the next level. This tutorial is praised for its clear explanations of complex features like Smart Animate and interactive components.',
    reviews: [],
    createdAt: new Date().toISOString()
  }
];

// --- SIMULATED BACKEND API ---

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'skillscope_resources_v1';

// Optional remote API URL. Can be set via Vite env VITE_API_URL or at runtime using setApiUrl().
// Default API url: use same origin (relative `/api`) when deployed to Vercel.
// You can override with VITE_API_URL at build time or set window.SKILLSCOPE_API_URL at runtime.
export let API_URL: string | null =
  (typeof import.meta !== 'undefined' && typeof (import.meta as any).env !== 'undefined' && (import.meta as any).env.VITE_API_URL)
    ? (import.meta as any).env.VITE_API_URL
    : (typeof window !== 'undefined' && (window as any).SKILLSCOPE_API_URL
      ? (window as any).SKILLSCOPE_API_URL
      : '');

export const setApiUrl = (url: string | null) => {
  API_URL = url;
  if (typeof window !== 'undefined') (window as any).SKILLSCOPE_API_URL = url;
};

// Initialize storage on first run
const ensureInitialData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
  }
};

/** Load resources from localStorage */
export const loadAll = (): Resource[] => {
  try {
    ensureInitialData();
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Resource[];
  } catch (e) {
    console.error('Failed to load resources from storage', e);
    return dummyData;
  }
};

/** Persist resources to localStorage */
const saveAll = (items: Resource[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

/**
 * Searches for resources based on a query.
 */
export const searchResources = async (query: string): Promise<Resource[]> => {
  await sleep(300);
  if (!query) return [];
  
  // Always try to use the API first
  try {
    const url = `${API_URL.replace(/\/$/, '')}/api/search?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Remote search failed');
    const json = await res.json();
    // normalize types coming from backend
    return (json as any[]).map(j => ({
      id: j.id,
      title: j.title,
      provider: j.provider,
      url: j.url,
      rating: Number(j.rating || 0),
      views: Number(j.views || 0),
      category: j.category || 'General',
      thumbnail: j.thumbnail || '',
      summary: j.summary || '',
      reviews: j.reviews || [],
      createdAt: j.createdAt || new Date().toISOString()
    }));
  } catch (e) {
    console.error('Failed to fetch from API:', e);
    // Fallback to local mock data so the UI still shows results when the deployed
    // serverless function is missing an API key or fails. This mirrors the offline behaviour.
    try {
      return loadAll();
    } catch (err) {
      console.error('Failed to load local data as fallback:', err);
      return [];
    }
  }

  // Defensive fallback (should not reach here)
  return loadAll();
};

/**
 * Fetches all available resources.
 */
export const getResources = async (): Promise<Resource[]> => {
  // If an API URL is configured, fetch a sample set from backend (we call search for a common topic)
  if (API_URL) {
    try {
      const url = `${API_URL.replace(/\/$/, '')}/api/search?q=programming&max=20`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch remote resources');
      const json = await res.json();
      saveAll(json as Resource[]);
      return (json as any[]).map(j => ({
        id: j.id,
        title: j.title,
        provider: j.provider,
        url: j.url,
        rating: Number(j.rating || 0),
        views: Number(j.views || 0),
        category: j.category || 'General',
        thumbnail: j.thumbnail || '',
        summary: j.summary || '',
        reviews: j.reviews || [],
        createdAt: j.createdAt || new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Remote fetch failed, falling back to local data', e);
      await sleep(200);
      return loadAll();
    }
  }

  await sleep(200);
  return loadAll();
};

/**
 * Add a new resource and return it.
 */
export const addResource = async (payload: Omit<Resource, 'id' | 'views' | 'rating' | 'reviews' | 'createdAt'> & { initialViews?: number }): Promise<Resource> => {
  await sleep(200);
  // If using remote API, POST to backend instead of creating locally.
  // Note: frontend-create is disabled in production workflow; keep local fallback.
  if (API_URL) {
    // backend currently does not support creating arbitrary resources via POST /api/resources
    // so we fallback to local creation when API is set.
    console.warn('API_URL is set; creating resource locally as backend create endpoint is not available');
  }

  const all = loadAll();
  const nextId = all.reduce((m, r) => Math.max(m, r.id), 0) + 1;
  const resource: Resource = {
    ...payload,
    id: nextId,
    views: payload.initialViews || 0,
    rating: 0,
    reviews: [],
    createdAt: new Date().toISOString()
  };
  all.unshift(resource);
  saveAll(all);
  return resource;
};

/**
 * Increment view counter for a resource.
 */
export const incrementViews = async (id: number): Promise<void> => {
  if (API_URL) {
    try {
      await fetch(`${API_URL.replace(/\/$/, '')}/api/resources/${id}/views`, { method: 'POST' });
      // Try to refresh local cache for this resource
      const remote = await fetch(`${API_URL.replace(/\/$/, '')}/api/resources/${id}`);
      if (remote.ok) {
        const json = await remote.json();
        // merge/update local storage list
        const all = loadAll();
        const idx = all.findIndex(r => String(r.id) === String(id));
        const normalized = {
          id: json.id,
          title: json.title,
          provider: json.provider,
          url: json.url,
          rating: Number(json.rating || 0),
          views: Number(json.views || 0),
          category: json.category || 'General',
          thumbnail: json.thumbnail || '',
          summary: json.summary || '',
          reviews: json.reviews || [],
          createdAt: json.createdAt || new Date().toISOString()
        } as Resource;
        if (idx === -1) all.unshift(normalized); else all[idx] = normalized;
        saveAll(all);
      }
      return;
    } catch (e) {
      console.warn('Failed to increment remote views, falling back to local increment', e);
    }
  }

  const all = loadAll();
  const idx = all.findIndex(r => r.id === id);
  if (idx === -1) return;
  all[idx].views = (all[idx].views || 0) + 1;
  saveAll(all);
};

/**
 * Add a review to a resource and recalc rating.
 */
export const addReview = async (resourceId: number, review: Omit<Review, 'id' | 'createdAt'>): Promise<Review | null> => {
  await sleep(200);
  // If API is configured, POST the review to the backend and let backend recompute rating.
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL.replace(/\/$/, '')}/api/resources/${resourceId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (!res.ok) throw new Error('Failed to post review to remote');
      const created = await res.json();
      // refresh local cache
      const remote = await fetch(`${API_URL.replace(/\/$/, '')}/api/resources/${resourceId}`);
      if (remote.ok) {
        const json = await remote.json();
        // update single resource in local cache
        const all = loadAll();
        const idx = all.findIndex(r => String(r.id) === String(resourceId));
        const normalized = {
          id: json.id,
          title: json.title,
          provider: json.provider,
          url: json.url,
          rating: Number(json.rating || 0),
          views: Number(json.views || 0),
          category: json.category || 'General',
          thumbnail: json.thumbnail || '',
          summary: json.summary || '',
          reviews: json.reviews || [],
          createdAt: json.createdAt || new Date().toISOString()
        } as Resource;
        if (idx === -1) all.unshift(normalized); else all[idx] = normalized;
        saveAll(all);
      }
      return created as Review;
    } catch (e) {
      console.warn('Remote review failed, falling back to local save', e);
    }
  }

  const all = loadAll();
  const idx = all.findIndex(r => r.id === resourceId);
  if (idx === -1) return null;
  const nextReviewId = (all[idx].reviews || []).reduce((m, r) => Math.max(m, r.id), 0) + 1;
  const newReview: Review = { id: nextReviewId, createdAt: new Date().toISOString(), ...review };
  all[idx].reviews = all[idx].reviews || [];
  all[idx].reviews.push(newReview);
  // recalc rating (simple average)
  const avg = all[idx].reviews.reduce((s, r) => s + r.rating, 0) / all[idx].reviews.length;
  all[idx].rating = Math.round((avg + Number.EPSILON) * 10) / 10; // one decimal
  saveAll(all);
  return newReview;
};

export const exportResources = (): string => {
  return JSON.stringify(loadAll(), null, 2);
};

export const importResources = (json: string): void => {
  try {
    const parsed = JSON.parse(json) as Resource[];
    saveAll(parsed);
  } catch (e) {
    throw new Error('Invalid JSON');
  }
};
