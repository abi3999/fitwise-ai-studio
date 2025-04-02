
// This is a simulated AI service for the demo
// In a real app, you would integrate with OpenAI or another AI provider

interface DietPlan {
  meals: {
    time: string;
    description: string;
    calories: number;
  }[];
  totalCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  tips: string[];
}

interface DietRequest {
  goal: "gain" | "maintain" | "lose";
  weight: number;
  height: number;
  restrictions?: string[];
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "The hard days are the best because that's when champions are made.",
  "Success isn't always about greatness. It's about consistency.",
  "The difference between the impossible and the possible lies in a person's determination.",
  "Don't count the days, make the days count.",
  "The clock is ticking. Are you becoming the person you want to be?",
  "The pain you feel today will be the strength you feel tomorrow.",
];

export const getMotivationalQuote = (attendance: string[] = []): string => {
  // In a real app, we'd use the attendance to generate a personalized quote
  // For the demo, we'll just pick a random one
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

export const generateDietPlan = async (request: DietRequest): Promise<DietPlan> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Calculate base calories based on goal
  let baseCalories = 0;
  
  // Very simplified calculation for demo
  const bmr = 10 * request.weight + 6.25 * request.height - 5 * 30 + 5; // example for a 30-year-old male
  
  switch (request.goal) {
    case "gain":
      baseCalories = bmr + 500;
      break;
    case "maintain":
      baseCalories = bmr;
      break;
    case "lose":
      baseCalories = Math.max(1500, bmr - 500); // Never go below 1500 for safety
      break;
  }
  
  // Generate mock diet plan
  return {
    meals: [
      {
        time: "7:00 AM",
        description: "Oatmeal with berries and a protein shake",
        calories: Math.round(baseCalories * 0.25),
      },
      {
        time: "10:00 AM",
        description: "Greek yogurt with honey and almonds",
        calories: Math.round(baseCalories * 0.15),
      },
      {
        time: "1:00 PM",
        description: "Grilled chicken salad with olive oil dressing",
        calories: Math.round(baseCalories * 0.3),
      },
      {
        time: "4:00 PM",
        description: "Protein bar and a banana",
        calories: Math.round(baseCalories * 0.1),
      },
      {
        time: "7:00 PM",
        description: "Salmon with sweet potatoes and steamed vegetables",
        calories: Math.round(baseCalories * 0.2),
      },
    ],
    totalCalories: baseCalories,
    proteinGrams: Math.round(request.weight * 2), // 2g per kg of bodyweight
    carbsGrams: Math.round((baseCalories * 0.5) / 4), // 50% of calories from carbs
    fatsGrams: Math.round((baseCalories * 0.25) / 9), // 25% of calories from fats
    tips: [
      "Stay hydrated by drinking at least 3 liters of water daily",
      "Eat slowly and chew food thoroughly to aid digestion",
      "Try to eat every 3-4 hours to keep metabolism active",
      "Prioritize whole foods over processed options",
      "Adjust portions based on how your body responds",
    ],
  };
};

export const chatWithAI = async (messages: ChatMessage[]): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Last user message
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  // Mock responses
  if (lastMessage.includes("injury")) {
    return "If you're experiencing pain during exercise, stop immediately. Make sure to warm up properly before workouts and cool down afterward. Always maintain proper form, and don't hesitate to ask a trainer if you're unsure about an exercise.";
  } else if (lastMessage.includes("diet") || lastMessage.includes("food")) {
    return "A balanced diet is crucial for fitness progress. Focus on adequate protein intake (about 1.6-2g per kg of bodyweight), complex carbohydrates, healthy fats, and plenty of vegetables. Stay hydrated and consider timing your meals around your workouts for optimal results.";
  } else if (lastMessage.includes("motivation") || lastMessage.includes("tired")) {
    return "It's normal to have days when you feel less motivated. Try setting smaller, achievable goals for those days. Remember why you started, track your progress, and celebrate small wins. Sometimes, just showing up is the hardest part - once you begin, momentum often takes over.";
  } else {
    return "I'm your fitness assistant! I can help with workout advice, diet recommendations, injury prevention, and motivation. What specific fitness topic would you like to discuss?";
  }
};

export const getSafetyTips = (): {category: string, tips: string[]}[] => {
  return [
    {
      category: "Muscle Recovery",
      tips: [
        "Allow 48 hours before training the same muscle group again",
        "Ensure adequate protein intake post-workout",
        "Prioritize 7-9 hours of quality sleep",
        "Consider contrast therapy (alternating hot and cold)",
        "Stay hydrated to support tissue repair"
      ]
    },
    {
      category: "Cravings Management",
      tips: [
        "Eat regular, balanced meals to prevent hunger spikes",
        "Drink water when cravings hit - you might just be thirsty",
        "Keep healthy snacks readily available",
        "Practice mindful eating to recognize actual hunger",
        "Identify emotional triggers for unhealthy cravings"
      ]
    },
    {
      category: "Injury Prevention",
      tips: [
        "Always perform proper warm-up before intense exercise",
        "Master proper form before increasing weights",
        "Increase intensity gradually (10% rule)",
        "Listen to your body and distinguish between discomfort and pain",
        "Incorporate mobility work and stretching into your routine"
      ]
    }
  ];
};
