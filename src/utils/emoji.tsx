export const funEmojis: string[] = [
    "😀",
    "😂",
    "😍",
    "😎",
    "😊",
    "🐶",
    "🐱",
    "🦁",
    "🐮",
    "🐼",
    "🍔",
    "🍕",
    "🍣",
    "🍩",
    "🏀",
    "🎸",
    "🎲",
    "🎯",
    "✈️",
    "🗼",
    "🌋",
    "🏕️",
  ];
  
  export const getRandomEmoji = (): string => {
    return funEmojis[Math.floor(Math.random() * funEmojis.length)];
  };
  