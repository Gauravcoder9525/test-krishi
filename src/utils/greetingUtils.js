/**
 * Utility functions for user name formatting and time-based greetings
 */

/**
 * Extract and format user display name from user object or email
 * @param {Object|null} user - Firebase user or demo user object
 * @param {string} fallback - Fallback name if user is not logged in
 * @returns {string}
 */
export function getUserDisplayName(user, fallback = 'Kisan Mitra') {
  if (!user) return fallback;

  // 1. If displayName is explicitly provided and non-empty
  if (user.displayName && typeof user.displayName === 'string' && user.displayName.trim().length > 0) {
    return user.displayName.trim();
  }

  // 2. Derive from email address if available
  if (user.email && typeof user.email === 'string') {
    const rawName = user.email.split('@')[0] || '';
    if (rawName) {
      // Split by common delimiters like ., _, -, +
      const words = rawName
        .replace(/[._\-+]+/g, ' ')
        .replace(/[0-9]+/g, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      if (words.length > 0) {
        const formatted = words
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');
        if (formatted.length > 0) return formatted;
      }
      
      // If words were only numbers or symbols, fallback to capitalized raw username
      return rawName.charAt(0).toUpperCase() + rawName.slice(1);
    }
  }

  return fallback;
}

/**
 * Extract first name of user for compact pills / headers
 * @param {Object|null} user
 * @param {string} fallback
 * @returns {string}
 */
export function getUserFirstName(user, fallback = 'Farmer') {
  const fullName = getUserDisplayName(user, fallback);
  return fullName.split(' ')[0] || fallback;
}

/**
 * Extract single uppercase initial for avatar placeholder
 * @param {Object|null} user
 * @param {string} fallback
 * @returns {string}
 */
export function getUserInitial(user, fallback = 'K') {
  const name = getUserDisplayName(user, fallback);
  return (name[0] || fallback).toUpperCase();
}

/**
 * Returns dynamic greeting info based on the current hour
 * - Morning: 05:00 - 11:59
 * - Afternoon: 12:00 - 16:59
 * - Evening: 17:00 - 20:59
 * - Night: 21:00 - 04:59
 * 
 * @param {string} lang - 'en' | 'hi'
 * @param {Date} [customDate] - Optional date object for testing
 * @returns {{ period: string, text: string, icon: string }}
 */
export function getTimeOfDayGreeting(lang = 'en', customDate = null) {
  const isHi = lang === 'hi';
  const now = customDate || new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    // 5:00 AM to 11:59 AM
    return {
      period: 'morning',
      text: isHi ? 'शुभ प्रभात' : 'Good Morning',
      icon: '🌅'
    };
  } else if (hour >= 12 && hour < 17) {
    // 12:00 PM to 4:59 PM
    return {
      period: 'afternoon',
      text: isHi ? 'शुभ दोपहर' : 'Good Afternoon',
      icon: '☀️'
    };
  } else if (hour >= 17 && hour < 21) {
    // 5:00 PM to 8:59 PM
    return {
      period: 'evening',
      text: isHi ? 'शुभ संध्या' : 'Good Evening',
      icon: '🌆'
    };
  } else {
    // 9:00 PM to 4:59 AM (Night)
    return {
      period: 'night',
      text: isHi ? 'शुभ रात्रि' : 'Good Night',
      icon: '🌙'
    };
  }
}

/**
 * Generates the full personalized greeting string
 * e.g., "Good Afternoon, Mejeet Singhal 👋" or "शुभ रात्रि, किसान भाई 👋"
 * 
 * @param {Object|null} user
 * @param {string} lang
 * @returns {{ fullGreeting: string, timeText: string, userName: string, icon: string, period: string }}
 */
export function getUserGreeting(user, lang = 'en', customDate = null) {
  const isHi = lang === 'hi';
  const timeInfo = getTimeOfDayGreeting(lang, customDate);
  const defaultFallback = isHi ? 'किसान भाई' : 'Kisan Mitra';
  const userName = getUserDisplayName(user, defaultFallback);

  return {
    fullGreeting: `${timeInfo.text}, ${userName} 👋`,
    timeText: timeInfo.text,
    userName,
    icon: timeInfo.icon,
    period: timeInfo.period
  };
}
