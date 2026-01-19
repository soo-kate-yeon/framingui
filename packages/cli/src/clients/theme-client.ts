/**
 * Theme API Client for Tekton CLI
 * Communicates with the studio-api server to fetch theme data
 */

// RequestInit type for fetch options (Node.js 18+ native fetch)
type FetchRequestInit = globalThis.RequestInit;

/**
 * Theme configuration containing design tokens
 */
export interface ThemeConfig {
  [key: string]: unknown;
}

/**
 * Curated Theme response (matches Studio API schema)
 */
export interface CuratedTheme {
  id: number;
  name: string;
  category: string;
  description: string | null;
  config: ThemeConfig;
  tags: string[];
  is_active: boolean;
  one_line_definition: string | null;
  reference_style: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Paginated theme list response
 */
export interface ThemeListResponse {
  items: CuratedTheme[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Theme list parameters
 */
export interface ThemeListParams {
  skip?: number;
  limit?: number;
  category?: string;
  tags?: string;
}

/**
 * Theme API Client configuration
 */
export interface ThemeClientConfig {
  baseUrl: string;
  timeout: number;
}

/**
 * API Error class
 */
export class ThemeApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `${status} ${statusText}`);
    this.name = 'ThemeApiError';
  }
}

/**
 * Theme API Client for fetching theme data
 */
export class ThemeClient {
  private config: ThemeClientConfig;

  constructor(config?: Partial<ThemeClientConfig>) {
    this.config = {
      baseUrl: config?.baseUrl || process.env.API_URL || 'http://localhost:8000',
      timeout: config?.timeout || 5000,
    };
  }

  /**
   * Make HTTP request to Theme API
   */
  private async request<T>(
    endpoint: string,
    options: FetchRequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage: string | undefined;
        try {
          const errorBody = (await response.json()) as { detail?: string; message?: string };
          errorMessage = errorBody.detail || errorBody.message;
        } catch {
          // Ignore JSON parse errors
        }
        throw new ThemeApiError(response.status, response.statusText, errorMessage);
      }

      return (await response.json()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ThemeApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ThemeApiError(408, 'Request Timeout', 'Request timeout');
        }
        throw new ThemeApiError(0, 'Network Error', error.message);
      }

      throw new ThemeApiError(0, 'Unknown Error', 'Unknown error occurred');
    }
  }

  /**
   * Check if API is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${this.config.baseUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * List all available themes with optional filtering
   */
  async listThemes(params: ThemeListParams = {}): Promise<ThemeListResponse> {
    const queryParams = new URLSearchParams();

    if (params.skip !== undefined) {
      queryParams.set('skip', params.skip.toString());
    }
    if (params.limit !== undefined) {
      queryParams.set('limit', params.limit.toString());
    }
    if (params.category) {
      queryParams.set('category', params.category);
    }
    if (params.tags) {
      queryParams.set('tags', params.tags);
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/v2/themes${queryString ? `?${queryString}` : ''}`;

    return this.request<ThemeListResponse>(endpoint, { method: 'GET' });
  }

  /**
   * Get a theme by ID
   */
  async getTheme(id: number): Promise<CuratedTheme> {
    return this.request<CuratedTheme>(`/api/v2/themes/${id}`, { method: 'GET' });
  }

  /**
   * Get a theme by name (searches through list)
   * Returns null if not found
   */
  async getThemeByName(name: string): Promise<CuratedTheme | null> {
    try {
      // Fetch all themes (with reasonable limit)
      const response = await this.listThemes({ limit: 100 });

      // Find by exact name match (case-insensitive)
      const theme = response.items.find(
        (t) => t.name.toLowerCase() === name.toLowerCase()
      );

      return theme || null;
    } catch (error) {
      // If API error, propagate it
      if (error instanceof ThemeApiError) {
        throw error;
      }
      return null;
    }
  }

  /**
   * Get themes by category
   */
  async getThemesByCategory(category: string): Promise<CuratedTheme[]> {
    const response = await this.listThemes({ category, limit: 100 });
    return response.items;
  }

  /**
   * Get theme suggestions (if AI-powered endpoint is available)
   */
  async getThemeSuggestions(context?: string): Promise<CuratedTheme[]> {
    try {
      const endpoint = context
        ? `/api/v2/themes/suggestions?context=${encodeURIComponent(context)}`
        : '/api/v2/themes/suggestions';

      return this.request<CuratedTheme[]>(endpoint, { method: 'GET' });
    } catch {
      // Fall back to empty array if suggestions endpoint not available
      return [];
    }
  }
}

/**
 * Default Theme client instance
 */
export const themeClient = new ThemeClient();
