export const INITIAL_USER = {
  name: "Alex Rivera",
  email: "alex.rivera@globetrotter.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bio: "Passionate nomad, photography enthusiast, & food explorer. Traveling through incredible India & beyond!",
  preferences: ["🏛️ History", "🍜 Foodie", "🌿 Nature", "🏖️ Beaches", "🥾 Hiking"],
  stats: {
    countriesVisited: 14,
    totalTrips: 22,
    budgetSaved: "₹1,45,000",
    milesTraveled: "58,400"
  }
};

export const INITIAL_TRIPS = [
  {
    id: "trip-india-1",
    title: "Golden Triangle: Jaipur, Agra & Delhi Heritage",
    destinations: ["Jaipur", "Agra", "New Delhi"],
    startDate: "2026-10-10",
    endDate: "2026-10-18",
    coverPhoto: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
    description: "Explore the majestic Taj Mahal, royal Rajasthani palaces, and historic Old Delhi street food.",
    status: "upcoming",
    targetBudget: 120000,
    categoriesBudget: {
      transport: 35000,
      stay: 45000,
      activities: 22000,
      meals: 18000
    },
    itinerary: [
      {
        day: 1,
        title: "Old Delhi Spice Trail & Red Fort",
        items: [
          { id: "i1", title: "Express Train from IGI Airport to Hotel", category: "transport", cost: 1200, time: "10:00" },
          { id: "i2", title: "Check-in at Haveli Dharampura Delhi", category: "stay", cost: 8500, time: "12:30" },
          { id: "i3", title: "Chandni Chowk Rickshaw Food Walk & Red Fort", category: "activities", cost: 1800, time: "15:00" },
          { id: "i4", title: "Mughlai Feast at Karim's Jama Masjid", category: "meals", cost: 1500, time: "20:00" }
        ]
      },
      {
        day: 2,
        title: "Agra Expressway & Taj Mahal Sunset View",
        items: [
          { id: "i5", title: "Private Car Transfer to Agra via Yamuna Expressway", category: "transport", cost: 4200, time: "07:30" },
          { id: "i6", title: "Mehtab Bagh Sunset Taj Mahal Viewpoint", category: "activities", cost: 500, time: "17:00" },
          { id: "i7", title: "Taj Hotel Agra Stay", category: "stay", cost: 7200, time: "19:00" }
        ]
      },
      {
        day: 3,
        title: "Sunrise Taj Mahal & Pink City Jaipur",
        items: [
          { id: "i8", title: "Taj Mahal Guided Sunrise Entry", category: "activities", cost: 2200, time: "05:45" },
          { id: "i9", title: "Agra Fort Marble Palaces Tour", category: "activities", cost: 1100, time: "10:00" },
          { id: "i10", title: "Drive to Pink City Jaipur", category: "transport", cost: 4500, time: "14:00" },
          { id: "i11", title: "Traditional Rajasthani Thali at Chokhi Dhani", category: "meals", cost: 1800, time: "20:00" }
        ]
      }
    ]
  },
  {
    id: "trip-india-2",
    title: "Kerala Backwaters & Munnar Tea Country",
    destinations: ["Munnar", "Alleppey", "Kochi"],
    startDate: "2026-11-20",
    endDate: "2026-11-27",
    coverPhoto: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
    description: "Serene houseboat cruising, rolling emerald tea estates, and coastal spice gardens.",
    status: "upcoming",
    targetBudget: 95000,
    categoriesBudget: {
      transport: 24000,
      stay: 42000,
      activities: 15000,
      meals: 14000
    },
    itinerary: [
      {
        day: 1,
        title: "Fort Kochi Colonial Heritage & Chinese Fishing Nets",
        items: [
          { id: "i12", title: "Kochi Airport Taxi Transfer", category: "transport", cost: 1400, time: "11:00" },
          { id: "i13", title: "Fort Kochi Boutique Heritage Resort", category: "stay", cost: 5500, time: "13:30" },
          { id: "i14", title: "Kathakali Classical Dance Performance", category: "activities", cost: 800, time: "18:00" },
          { id: "i15", title: "Fresh Catch Seafood Dinner at Seagull", category: "meals", cost: 1600, time: "20:30" }
        ]
      },
      {
        day: 2,
        title: "Scenic Drive to Munnar & Tea Museum",
        items: [
          { id: "i16", title: "Private Cab Drive through Cheeyappara Waterfalls to Munnar", category: "transport", cost: 3200, time: "08:30" },
          { id: "i17", title: "Tata Tea Estate Walk & Tasting", category: "activities", cost: 600, time: "14:00" },
          { id: "i18", title: "Munnar Misty Resort Stay", category: "stay", cost: 6200, time: "17:30" }
        ]
      }
    ]
  },
  {
    id: "trip-india-3",
    title: "Leh-Ladakh High Altitude Himalayas",
    destinations: ["Leh", "Pangong Tso", "Nubra Valley"],
    startDate: "2025-08-05",
    endDate: "2025-08-14",
    coverPhoto: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
    description: "Cross Khardung La pass, double-hump camel rides in Nubra, and blue Pangong Lake.",
    status: "past",
    targetBudget: 140000,
    categoriesBudget: {
      transport: 48000,
      stay: 52000,
      activities: 22000,
      meals: 18000
    },
    itinerary: [
      {
        day: 1,
        title: "Leh Acclimatization & Shanti Stupa",
        items: [
          { id: "i19", title: "Leh Kushok Bakula Airport Shuttle", category: "transport", cost: 800, time: "09:00" },
          { id: "i20", title: "Grand Dragon Hotel Leh Check-in", category: "stay", cost: 9500, time: "11:00" },
          { id: "i21", title: "Sunset Prayer at Shanti Stupa", category: "activities", cost: 0, time: "17:30" }
        ]
      }
    ]
  }
];

export const NEARBY_RECOMMENDED_DATA = [
  {
    id: "rec-ind-1",
    name: "Taj Mahal Sunrise Viewpoint",
    category: "🏛️ Historical places",
    categoryKey: "historical",
    location: "Agra, Uttar Pradesh",
    rating: 4.98,
    reviews: 8420,
    price: "₹₹",
    costEstimate: 2200,
    distance: "0.8 km away",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    description: "The magnificent white marble monument of love reflecting golden morning sunlight.",
    aiMatch: 99,
    aiInsiderTip: "✨ Enter through the East Gate by 05:30 AM to capture pristine reflection pool shots before crowds arrive."
  },
  {
    id: "rec-ind-2",
    name: "Alleppey Backwaters Houseboat Cruise",
    category: "🌿 Nature",
    categoryKey: "nature",
    location: "Alleppey, Kerala",
    rating: 4.9,
    reviews: 3850,
    price: "₹₹₹",
    costEstimate: 8500,
    distance: "1.5 km away",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    description: "Glide past palm-fringed canals, quiet lagoons, and paddy fields on a traditional wooden Kettuvallam.",
    aiMatch: 98,
    aiInsiderTip: "✨ Request local Karimeen Pollichathu (pearl spot fish in banana leaf) served hot on board."
  },
  {
    id: "rec-ind-3",
    name: "Amber Fort & Jal Mahal View",
    category: "🏛️ Historical places",
    categoryKey: "historical",
    location: "Jaipur, Rajasthan",
    rating: 4.88,
    reviews: 4920,
    price: "₹₹",
    costEstimate: 1500,
    distance: "2.4 km away",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    description: "Opulent hilltop fort with Sheesh Mahal (Mirror Palace) overlooking Maota Lake.",
    aiMatch: 97,
    aiInsiderTip: "✨ Visit the Tattoo Cafe rooftop opposite Hawa Mahal at 5:00 PM for the ultimate palace facade photos."
  },
  {
    id: "rec-ind-4",
    name: "Palolem & Baga Beach Sunset Shacks",
    category: "🏖️ Beaches",
    categoryKey: "beaches",
    location: "Goa, India",
    rating: 4.82,
    reviews: 6200,
    price: "₹₹",
    costEstimate: 2400,
    distance: "0.4 km away",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    description: "Crescent-shaped palm bay with soft white sand, calm swimming waters, and beach shacks.",
    aiMatch: 96,
    aiInsiderTip: "✨ Head to Palolem south island during low tide for natural rock pools and kayak rentals."
  },
  {
    id: "rec-ind-5",
    name: "Triund Peak Himalayan Ridge Trek",
    category: "🥾 Hiking",
    categoryKey: "hiking",
    location: "McLeod Ganj, Himachal Pradesh",
    rating: 4.92,
    reviews: 2950,
    price: "Free",
    costEstimate: 0,
    distance: "4.2 km away",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80",
    description: "9 km alpine trail offering breathtaking panoramas of the snow-covered Dhauladhar mountain range.",
    aiMatch: 97,
    aiInsiderTip: "✨ Start by 08:00 AM from Gallu Devi temple to reach the crest by noon for tea at Magic View Cafe."
  },
  {
    id: "rec-ind-6",
    name: "Chandni Chowk & Paranthe Wali Gali Food Trail",
    category: "🍜 Food",
    categoryKey: "food",
    location: "Old Delhi, India",
    rating: 4.85,
    reviews: 5400,
    price: "₹",
    costEstimate: 800,
    distance: "1.1 km away",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    description: "Historic 300-year-old culinary street famous for stuffed fried paranthas, rabri jalebi, and chaat.",
    aiMatch: 99,
    aiInsiderTip: "✨ Try the rabri-kulfi at Kuremal Mohanlal Kulfiwale and daulat ki chaat during winter months."
  },
  {
    id: "rec-ind-7",
    name: "Pangong Tso High Altitude Blue Lake",
    category: "📸 Photography",
    categoryKey: "photography",
    location: "Ladakh, India",
    rating: 4.96,
    reviews: 3100,
    price: "Free",
    costEstimate: 0,
    distance: "5.0 km away",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    description: "Endorheic lake situated at 4,225 meters altitude changing colors from turquoise blue to emerald green.",
    aiMatch: 98,
    aiInsiderTip: "✨ Stay overnight in Lukung eco-camps to photograph starry night skies and Milky Way core over the lake."
  }
];

export const COMMUNITY_TRIPS = [
  {
    id: "comm-ind-1",
    author: "Rohan Sharma",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    title: "10-Day Royal Rajasthan Heritage & Desert Safari",
    destinations: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"],
    coverPhoto: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
    likes: 648,
    copies: 215,
    days: 10,
    estCost: 115000,
    tags: ["Palaces", "Desert Safari", "Forts"],
    itinerary: [
      {
        day: 1,
        title: "Jaipur Pink City Palace & Hawa Mahal",
        items: [
          { title: "Airport Cab to Heritage Hotel", category: "transport", cost: 1200, time: "10:00" },
          { title: "City Palace & Jantar Mantar Observatory", category: "activities", cost: 1500, time: "11:30" },
          { title: "Laxmi Misthan Bhandar Rajasthani Thali", category: "meals", cost: 900, time: "14:00" }
        ]
      },
      {
        day: 2,
        title: "Jaisalmer Sam Sand Dunes Camping",
        items: [
          { title: "Camel Safari & Cultural Folk Dance at Sam Dunes", category: "activities", cost: 3500, time: "16:30" },
          { title: "Swiss Desert Tent Stay with Dinner", category: "stay", cost: 6500, time: "19:00" }
        ]
      }
    ]
  },
  {
    id: "comm-ind-2",
    author: "Ananya Sen",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    title: "7-Day Kerala God's Own Country Tranquility",
    destinations: ["Kochi", "Munnar", "Alleppey"],
    coverPhoto: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
    likes: 512,
    copies: 168,
    days: 7,
    estCost: 78000,
    tags: ["Houseboat", "Tea Gardens", "Ayurveda"],
    itinerary: [
      {
        day: 1,
        title: "Alleppey Houseboat Check-in & Backwater Cruise",
        items: [
          { title: "Private Air-Conditioned Deluxe Houseboat", category: "stay", cost: 12000, time: "12:00" },
          { title: "Traditional Kerala Banana Leaf Lunch", category: "meals", cost: 0, time: "13:30" }
        ]
      }
    ]
  },
  {
    id: "comm-ind-3",
    author: "Vikram Malhotra",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    title: "Leh-Ladakh Motorbike Circuit Expedition",
    destinations: ["Leh", "Nubra Valley", "Pangong Tso"],
    coverPhoto: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
    likes: 720,
    copies: 290,
    days: 9,
    estCost: 135000,
    tags: ["Himalayas", "Biking", "Adventure"],
    itinerary: [
      {
        day: 1,
        title: "Khardung La Pass Ride (5,359 meters)",
        items: [
          { title: "Royal Himalayan 411cc Motorbike Rental", category: "transport", cost: 2500, time: "08:00" },
          { title: "Diskit Monastery & Giant Buddha Statue", category: "activities", cost: 400, time: "15:00" }
        ]
      }
    ]
  }
];

export const PIXEL_PASSPORT_STAMPS = [
  {
    id: "stamp-india-1",
    country: "India",
    flag: "🇮🇳",
    code: "IND-2026",
    city: "Jaipur & Agra",
    date: "Oct 2026",
    status: "unlocked",
    color: "#f59e0b",
    icon: "🕌"
  },
  {
    id: "stamp-india-2",
    country: "Kerala",
    flag: "🇮🇳",
    code: "KRL-2026",
    city: "Munnar & Alleppey",
    date: "Nov 2026",
    status: "unlocked",
    color: "#10b981",
    icon: "🛶"
  },
  {
    id: "stamp-india-3",
    country: "Ladakh",
    flag: "🇮🇳",
    code: "LDK-2025",
    city: "Leh & Pangong Tso",
    date: "Aug 2025",
    status: "unlocked",
    color: "#06b6d4",
    icon: "🏔️"
  },
  {
    id: "stamp-japan",
    country: "Japan",
    flag: "🇯🇵",
    code: "JPN-2026",
    city: "Kyoto & Tokyo",
    date: "Apr 2026",
    status: "unlocked",
    color: "#ec4899",
    icon: "⛩️"
  },
  {
    id: "stamp-italy",
    country: "Italy",
    flag: "🇮🇹",
    code: "ITA-2026",
    city: "Positano",
    date: "Jul 2026",
    status: "unlocked",
    color: "#10b981",
    icon: "🍕"
  },
  {
    id: "stamp-swiss",
    country: "Switzerland",
    flag: "🇨🇭",
    code: "CHE-LOCKED",
    city: "Interlaken",
    date: "Locked",
    status: "locked",
    color: "#64748b",
    icon: "🏔️"
  }
];

export const PIXEL_GALLERY_MEMORIES = [
  {
    id: "mem-ind-1",
    title: "Sunrise Glow at Taj Mahal Reflection Pool",
    location: "Agra, India",
    date: "Oct 12, 2026",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    tags: ["TajMahal", "Agra", "WonderOfTheWorld"],
    tripId: "trip-india-1"
  },
  {
    id: "mem-ind-2",
    title: "Cruising Kerala Backwaters on Kettuvallam",
    location: "Alleppey, Kerala",
    date: "Nov 22, 2026",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    tags: ["Kerala", "Backwaters", "GodsOwnCountry"],
    tripId: "trip-india-2"
  },
  {
    id: "mem-ind-3",
    title: "Emerald Blue Pangong Tso Lake",
    location: "Ladakh, India",
    date: "Aug 8, 2025",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    tags: ["Ladakh", "PangongTso", "Himalayas"],
    tripId: "trip-india-3"
  },
  {
    id: "mem-ind-4",
    title: "Hawa Mahal Palace Archways",
    location: "Jaipur, Rajasthan",
    date: "Oct 14, 2026",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    tags: ["Jaipur", "PinkCity", "Rajasthan"],
    tripId: "trip-india-1"
  }
];

export const ACTIVITIES_CATALOG = [
  {
    id: "act-ind-1",
    title: "Taj Mahal & Agra Fort Private Sunrise Guided Tour",
    category: "🎟️ Activities",
    location: "Agra, India",
    price: 2400,
    rating: 4.98,
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "act-ind-2",
    title: "Alleppey Luxury Houseboat Day Cruise & Kerala Feast",
    category: "🎟️ Activities",
    location: "Alleppey, Kerala",
    price: 8500,
    rating: 4.9,
    duration: "6 hours",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "act-ind-3",
    title: "Scuba Diving & Watersports Package at Grand Island",
    category: "🎟️ Activities",
    location: "Goa, India",
    price: 3500,
    rating: 4.85,
    duration: "5 hours",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "act-ind-4",
    title: "Royal Rajasthani Thali at Chokhi Dhani Ethnic Village",
    category: "🍽️ Meals",
    location: "Jaipur, India",
    price: 1800,
    rating: 4.8,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "act-ind-5",
    title: "Vande Bharat Express AC Chair Car Train Ticket",
    category: "🚗 Transport",
    location: "New Delhi to Agra",
    price: 1500,
    rating: 4.95,
    duration: "1.8 hours",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  }
];
