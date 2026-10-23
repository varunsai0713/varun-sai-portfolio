export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please enter your message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Checks whether a given link is a placeholder or not provided
 */
export function isPlaceholderLink(url?: string | null): boolean {
  if (!url) return true;
  const clean = url.trim();
  if (clean === '' || clean === '#' || clean.toUpperCase().includes('PLACEHOLDER')) {
    return true;
  }
  return false;
}

/**
 * Formats city and country cleanly
 */
export function formatLocation(cityPlaceholder?: string, location = 'India'): string {
  if (cityPlaceholder && cityPlaceholder.trim() && !isPlaceholderLink(cityPlaceholder)) {
    return `${cityPlaceholder.trim()}, ${location}`;
  }
  return location;
}

/**
 * Checks if a project has any valid demo or repo links
 */
export function hasActionableLinks(project: { githubUrl?: string; liveUrl?: string }): {
  hasGithub: boolean;
  hasLive: boolean;
  hasAny: boolean;
} {
  const hasGithub = !isPlaceholderLink(project.githubUrl);
  const hasLive = !isPlaceholderLink(project.liveUrl);
  return {
    hasGithub,
    hasLive,
    hasAny: hasGithub || hasLive,
  };
}
