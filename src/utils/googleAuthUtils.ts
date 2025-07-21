// Utility functions for Google OAuth code management

interface UsedCode {
  code: string;
  timestamp: number;
}

const USED_CODES_KEY = 'usedGoogleCodes';
const CODE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export const markCodeAsUsed = (code: string): void => {
  try {
    const usedCodes: UsedCode[] = JSON.parse(localStorage.getItem(USED_CODES_KEY) || '[]');
    const now = Date.now();
    
    // Add code with timestamp
    usedCodes.push({ code, timestamp: now });
    
    // Clean up expired codes (older than 5 minutes)
    const validCodes = usedCodes.filter((item: UsedCode) => 
      now - item.timestamp < CODE_EXPIRY_TIME
    );
    
    localStorage.setItem(USED_CODES_KEY, JSON.stringify(validCodes));
  } catch {
    // Silent error handling
  }
};

export const isCodeUsed = (code: string): boolean => {
  try {
    const usedCodes: UsedCode[] = JSON.parse(localStorage.getItem(USED_CODES_KEY) || '[]');
    const now = Date.now();
    
    // Clean up expired codes
    const validCodes = usedCodes.filter((item: UsedCode) => 
      now - item.timestamp < CODE_EXPIRY_TIME
    );
    
    // Update localStorage with cleaned codes
    localStorage.setItem(USED_CODES_KEY, JSON.stringify(validCodes));
    
    return validCodes.some((item: UsedCode) => item.code === code);
  } catch {
    return false;
  }
};

export const removeCodeFromUsed = (code: string): void => {
  try {
    const usedCodes: UsedCode[] = JSON.parse(localStorage.getItem(USED_CODES_KEY) || '[]');
    const filteredCodes = usedCodes.filter((item: UsedCode) => item.code !== code);
    localStorage.setItem(USED_CODES_KEY, JSON.stringify(filteredCodes));
  } catch {
    // Silent error handling
  }
};

export const clearUsedCodes = (): void => {
  try {
    localStorage.removeItem(USED_CODES_KEY);
  } catch {
    // Silent error handling
  }
};

// Function to clear codes older than 1 minute (for debugging)
export const clearOldCodes = (): void => {
  try {
    const usedCodes: UsedCode[] = JSON.parse(localStorage.getItem(USED_CODES_KEY) || '[]');
    const now = Date.now();
    const oneMinuteAgo = now - (1 * 60 * 1000);
    
    const recentCodes = usedCodes.filter((item: UsedCode) => 
      now - item.timestamp < oneMinuteAgo
    );
    
    localStorage.setItem(USED_CODES_KEY, JSON.stringify(recentCodes));
  } catch {
    // Silent error handling
  }
}; 