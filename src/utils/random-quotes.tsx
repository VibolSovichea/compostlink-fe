export const getDailyCompostQuote = (): string => {
  const quotes = [
    "Compost like a boss! 🌱",
    "Scraps today, soil tomorrow! ♻️",
    "Dirt's best friend? You! 🌍",
    "Keep calm and compost on! 🏡",
    "Less waste, more wonder! ✨",
    "Turning scraps into magic! 🔄",
    "Compost: The circle of life! 🌿",
    "Your soil says thanks! 🙌",
    "Trash less, compost more! 🚀",
    "Nature loves your leftovers! 💚"
  ];

  const today = new Date();
  const dayIndex = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();
  return quotes[dayIndex % quotes.length];
};