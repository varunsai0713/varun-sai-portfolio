import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  isPlaceholderLink,
  formatLocation,
  hasActionableLinks,
} from './portfolio.ts';

test('validateContactForm rejects empty submissions', () => {
  const result = validateContactForm({ name: '', email: '', message: '' });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test('validateContactForm checks email validity and message length', () => {
  const invalidEmail = validateContactForm({
    name: 'Varun',
    email: 'not-an-email',
    message: 'Hello there',
  });
  assert.equal(invalidEmail.isValid, false);
  assert.equal(invalidEmail.errors.email, 'Please enter a valid email address.');

  const shortMessage = validateContactForm({
    name: 'Varun',
    email: 'test@example.com',
    message: 'Hey',
  });
  assert.equal(shortMessage.isValid, false);
  assert.equal(shortMessage.errors.message, 'Message must be at least 10 characters long.');

  const valid = validateContactForm({
    name: 'Recruiter Jane',
    email: 'jane@techcorp.com',
    message: 'We are impressed with your Spring Boot and React projects.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('isPlaceholderLink identifies empty or placeholder values', () => {
  assert.equal(isPlaceholderLink(undefined), true);
  assert.equal(isPlaceholderLink(''), true);
  assert.equal(isPlaceholderLink('   '), true);
  assert.equal(isPlaceholderLink('#'), true);
  assert.equal(isPlaceholderLink('[PLACEHOLDER: repo]'), true);
  assert.equal(isPlaceholderLink('https://github.com/varunsai'), false);
});

test('formatLocation handles empty or missing city gracefully', () => {
  assert.equal(formatLocation('', 'India'), 'India');
  assert.equal(formatLocation(undefined, 'India'), 'India');
  assert.equal(formatLocation('[PLACEHOLDER: city]', 'India'), 'India');
  assert.equal(formatLocation('Bengaluru', 'India'), 'Bengaluru, India');
});

test('hasActionableLinks detects live and github links', () => {
  const noLinks = hasActionableLinks({ githubUrl: '', liveUrl: '[PLACEHOLDER]' });
  assert.equal(noLinks.hasGithub, false);
  assert.equal(noLinks.hasLive, false);
  assert.equal(noLinks.hasAny, false);

  const githubOnly = hasActionableLinks({ githubUrl: 'https://github.com/varunsai/devconnect', liveUrl: '' });
  assert.equal(githubOnly.hasGithub, true);
  assert.equal(githubOnly.hasLive, false);
  assert.equal(githubOnly.hasAny, true);
});
