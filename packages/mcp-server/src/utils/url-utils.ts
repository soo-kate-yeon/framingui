/**
 * URL utility functions for MCP server
 * Handles UTM parameter injection for analytics tracking
 */

/**
 * Add UTM parameters to a URL for MCP tool response tracking
 * Format: ?utm_source=ai&utm_medium=mcp&utm_content=TOOL_NAME
 *
 * @param baseUrl - Base URL to add UTM parameters to
 * @param toolName - Name of the MCP tool making the response
 * @returns URL with UTM parameters appended
 *
 * @example
 * addMcpUtmParams('https://framingui.com/pricing', 'whoami')
 * // Returns: 'https://framingui.com/pricing?utm_source=ai&utm_medium=mcp&utm_content=whoami'
 */
export function addMcpUtmParams(baseUrl: string, toolName: string): string {
  try {
    const url = new URL(baseUrl);

    // Add UTM parameters
    url.searchParams.set('utm_source', 'ai');
    url.searchParams.set('utm_medium', 'mcp');
    url.searchParams.set('utm_content', toolName);

    return url.toString();
  } catch (error) {
    // If URL parsing fails, return original URL with query string appended
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}utm_source=ai&utm_medium=mcp&utm_content=${toolName}`;
  }
}
