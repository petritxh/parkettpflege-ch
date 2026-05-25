import { getCMSData } from './data-service';

export interface KeywordLink {
  keyword: string;
  url: string;
}

export async function getAutoLinkDictionary(): Promise<KeywordLink[]> {
  const dictionary: KeywordLink[] = [];
  
  // Only fetching services for now to link back to the main money pages
  // We can expand this to locations and problems later if needed
  const services = await getCMSData('services');
  
  services.forEach(service => {
    if (service.focusKeyword && service.focusKeyword.trim().length > 3) {
      dictionary.push({
        keyword: service.focusKeyword.trim().toLowerCase(),
        url: `/${service.slug}`
      });
    }
  });

  // Sort by keyword length descending to match longest phrases first
  // e.g., "Parkett schleifen und versiegeln" before "Parkett schleifen"
  return dictionary.sort((a, b) => b.keyword.length - a.keyword.length);
}

export function applyAutoLinks(markdown: string, dictionary: KeywordLink[], currentUrl: string = ''): string {
  if (!markdown) return markdown;
  
  let processedMarkdown = markdown;

  // We want to avoid replacing text inside:
  // 1. Existing markdown links [text](url)
  // 2. Markdown images ![alt](url)
  // 3. Headings # text
  
  dictionary.forEach(({ keyword, url }) => {
    // Skip linking to the page we are already on
    if (url === currentUrl) return;

    // Use a regex that replaces the keyword ONLY if it's not inside a link.
    // This is a simplified regex approach. A full AST parser (rehype/remark) is better but heavier.
    // We match the keyword with word boundaries. 
    // We use a replacer function to check context.
    const regex = new RegExp(`(?<=\\b|\\s)(${escapeRegExp(keyword)})(?=\\b|\\s)`, 'gi');
    
    // We only want to replace the FIRST occurrence of a keyword in the text to avoid spamming links
    let replaced = false;

    processedMarkdown = processedMarkdown.replace(regex, (match, p1, offset, string) => {
      if (replaced) return match; // Already linked this keyword once

      // Check if we are inside a markdown link
      // A naive check: if the text from offset to end contains '](', we might be in the text of a link
      // Better check: is there a ']' before the next '['?
      const textAfter = string.substring(offset);
      const nextCloseBracket = textAfter.indexOf(']');
      const nextOpenBracket = textAfter.indexOf('[');
      
      // If we see a ']' before a '[' we are likely inside a link's anchor text
      if (nextCloseBracket !== -1 && (nextOpenBracket === -1 || nextCloseBracket < nextOpenBracket)) {
        return match;
      }
      
      // Check if we are inside an image or link URL i.e. between ( and )
      const nextCloseParen = textAfter.indexOf(')');
      const nextOpenParen = textAfter.indexOf('(');
      if (nextCloseParen !== -1 && (nextOpenParen === -1 || nextCloseParen < nextOpenParen)) {
         return match;
      }

      // Check if line is a heading
      const textBefore = string.substring(0, offset);
      const lastNewline = textBefore.lastIndexOf('\n');
      const currentLineStart = textBefore.substring(lastNewline + 1);
      if (currentLineStart.trim().startsWith('#')) {
        return match; // Don't link inside headings
      }

      replaced = true;
      return `[${match}](${url})`;
    });
  });

  return processedMarkdown;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
