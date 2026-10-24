function validateContactForm(data) {
  const errors = {};
  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = "Please enter your name.";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = "Please enter your email address.";
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }
  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = "Please enter your message.";
  } else if (trimmedMessage.length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
function isPlaceholderLink(url) {
  if (!url) return true;
  const clean = url.trim();
  if (clean === "" || clean === "#" || clean.toUpperCase().includes("PLACEHOLDER")) {
    return true;
  }
  return false;
}
function formatLocation(cityPlaceholder, location = "India") {
  if (cityPlaceholder && cityPlaceholder.trim() && !isPlaceholderLink(cityPlaceholder)) {
    return `${cityPlaceholder.trim()}, ${location}`;
  }
  return location;
}
function hasActionableLinks(project) {
  const hasGithub = !isPlaceholderLink(project.githubUrl);
  const hasLive = !isPlaceholderLink(project.liveUrl);
  return {
    hasGithub,
    hasLive,
    hasAny: hasGithub || hasLive
  };
}
export {
  formatLocation,
  hasActionableLinks,
  isPlaceholderLink,
  validateContactForm
};
