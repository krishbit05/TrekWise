import { GoogleGenAI } from '@google/genai';

const model = 'gemini-2.5-pro';

export async function generateTravelPlan(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Defining Travel Plan Structure**

I'm structuring the JSON output now. The core will be a \`travelPlan\` object holding everything. I'm focusing on defining the nested elements within that plan right now. The main object will encapsulate the \`travelPlan\` object.


**Structuring Itinerary Details**

I'm now focusing on the itinerary structure within the \`travelPlan\`. I've outlined the necessary details for each day, ensuring the budget-friendly elements are highlighted throughout. Hotel options are also structured, and now I'm working on the data structure for the day objects.


**Defining Daily Activities**

I'm now generating the JSON for the Las Vegas travel plan, starting with the main structure. It will be a 3-day itinerary focusing on budget-friendly activities for a couple. I'm focusing on defining the daily activities, their details, and relevant images.


**Refining Hotel & Itinerary Details**

I've clarified the constraints. Now, I'm working on populating the hotel options array and fine-tuning the daily itinerary with budget-friendly activities. I'm focusing on the \`travelTimeFromPrevious\` field, ensuring it's clear and concise.


**Drafting Las Vegas Itinerary**

I'm now generating the itinerary details. Day 1 focuses on the South and Mid-Strip for a budget-friendly start. I've selected hotels like The LINQ and Excalibur, aiming to capture varying price points. I'm prioritizing free activities like the Welcome Sign and Bellagio Fountains, crafting concise descriptions for each. I'm defining travel times accurately.


**Developing Hotel & Activity Data**

I'm now in the process of gathering and populating the hotel and activity data. I'm focusing on finding budget-friendly hotels in prime locations, like The LINQ and Excalibur, and collecting their addresses, images, and ratings. I'm also actively searching for free activities, such as the Bellagio Fountains and Fremont Street Experience. I am making sure to gather high-quality images and ensure that the URLs provided are valid.


**Generating Plan Details & Data**

I'm now in the final phase, generating the actual JSON output based on all gathered data and the planned structure. I'm carefully compiling hotel and activity details, including addresses, geo-coordinates, and images, and validating them. I'm meticulously crafting the itinerary day by day, ensuring budget-friendliness and clear travel times. I will run a final validation to confirm the validity of the JSON output.


**Constructing the JSON Output**

I'm now diving into the JSON structure, starting with the outer \`travelPlan\` object and its core elements. Hotel and activity data is gathered, and I'm validating the structure daily plan. I'm focusing on the itinerary for the first day, emphasizing free activities and budget-friendly suggestions.


**Refining Itinerary and Data**

I'm now in the process of refining the JSON structure, particularly the itinerary data. I've populated the main structure, added details for each place, and included image URLs. I am validating these images to make sure they are valid, public URLs, and am adding brief descriptions. I'm focusing on "travelTimeFromPrevious" to make it easy to follow.


`,
        },
        {
          text: `\`\`\`json
{
  "travelPlan": {
    "location": "Las Vegas, Nevada, USA",
    "duration": "3 Days",
    "travelerType": "Couple",
    "budget": "Cheap",
    "bestTimeToVisit": "Spring (March-May) and Fall (September-November) for pleasant weather, avoiding the extreme summer heat. Weekdays (Sunday-Thursday) are significantly cheaper for hotels and shows than weekends.",
    "hotelOptions": [
      {
        "hotelName": "Flamingo Las Vegas Hotel & Casino",
        "address": "3555 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
        "price": "$ - $$ (From ~$40/night, varies greatly)",
        "imageUrl": "https://images.unsplash.com/photo-1598604753389-c43e7413c6b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        "geoCoordinates": {
          "latitude": 36.1162,
          "longitude": -115.1706
        },
        "rating": 3.5,
        "description": "A classic, mid-strip hotel with a vibrant, retro vibe. Its central location is a huge plus for a budget trip, saving on transportation. The hotel also features the free and beautiful Flamingo Wildlife Habitat."
      },
      {
        "hotelName": "The LINQ Hotel + Experience",
        "address": "3535 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
        "price": "$$ (From ~$50/night, varies greatly)",
        "imageUrl": "https://images.unsplash.com/photo-1623961138864-39908331f138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
        "geoCoordinates": {
          "latitude": 36.1179,
          "longitude": -115.1710
        },
        "rating": 4.0,
        "description": "Modern rooms and a bustling atmosphere aimed at a younger crowd. It's perfectly located in the heart of the Strip, connected to the lively LINQ Promenade, which offers many dining and entertainment options."
      },
      {
        "hotelName": "Excalibur Hotel & Casino",
        "address": "3850 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
        "price": "$ (Often one of the cheapest on The Strip, from ~$30/night)",
        "imageUrl": "https://images.unsplash.com/photo-1625450284910-84a1a70f311e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "geoCoordinates": {
          "latitude": 36.1019,
          "longitude": -115.1752
        },
        "rating": 3.5,
        "description": "A fun, castle-themed hotel on the south end of The Strip. A great budget choice connected by a free tram to Luxor and Mandalay Bay, making it easy to explore the southern Strip attractions."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "South Strip Wonders & Iconic Sights",
        "dailyPlan": [
          {
            "placeName": "Welcome to Fabulous Las Vegas Sign",
            "placeDetails": "Start your trip with a classic photo opportunity at the iconic 'Welcome to Fabulous Las Vegas' sign. It's a must-do for first-time visitors. Go early in the morning to avoid long lines and the desert heat.",
            "imageUrl": "https://images.unsplash.com/photo-1571195152358-052615454044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "geoCoordinates": {
              "latitude": 36.0820,
              "longitude": -115.1728
            },
            "ticketPricing": "Free",
            "rating": 4.6,
            "timeToSpend": "30-45 Minutes",
            "travelTimeFromPrevious": "Start of the day (Best to take a rideshare or bus)"
          },
          {
            "placeName": "M&M's World & Hershey's Chocolate World",
            "placeDetails": "Walk north along the Strip and indulge your sweet tooth. Explore four floors of M&M's fun, including a free 3D movie. Right next door, find Hershey's Chocolate World for more treats and a giant chocolate sculpture of the Statue of Liberty.",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M%26M%27s_World_Las_Vegas.jpg/1280px-M%26M%27s_World_Las_Vegas.jpg",
            "geoCoordinates": {
              "latitude": 36.1064,
              "longitude": -115.1738
            },
            "ticketPricing": "Free to enter",
            "rating": 4.5,
            "timeToSpend": "1-1.5 Hours",
            "travelTimeFromPrevious": "20-25 minute walk or 5-minute bus ride"
          },
          {
            "placeName": "Bellagio Conservatory & Botanical Gardens",
            "placeDetails": "Step into a breathtaking floral wonderland inside the Bellagio. The Conservatory features stunning, larger-than-life displays that change with the seasons. It's a peaceful and romantic escape from the casino floor.",
            "imageUrl": "https://images.unsplash.com/photo-1542648870-438579285124?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "geoCoordinates": {
              "latitude": 36.1132,
              "longitude": -115.1763
            },
            "ticketPricing": "Free",
            "rating": 4.8,
            "timeToSpend": "45-60 Minutes",
            "travelTimeFromPrevious": "10-minute walk"
          },
          {
            "placeName": "Fountains of Bellagio Show",
            "placeDetails": "End your evening with the world-famous Fountains of Bellagio. This spectacular show of water, music, and light is a quintessential Las Vegas experience. Shows run every 30 minutes in the afternoon and every 15 minutes at night.",
            "imageUrl": "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "geoCoordinates": {
              "latitude": 36.1126,
              "longitude": -115.1767
            },
            "ticketPricing": "Free",
            "rating": 4.8,
            "timeToSpend": "15-30 Minutes",
            "travelTimeFromPrevious": "1-minute walk"
          }
        ]
      },
      {
        "day": 2,
        "theme": "Mid-Strip Charm & Hidden Gems",
        "dailyPlan": [
          {
            "placeName": "Flamingo Wildlife Habitat",
            "placeDetails": "A serene paradise in the middle of the Strip. Located on the Flamingo hotel grounds, this free attraction is home to Chilean flamingos, pelicans, swans, and turtles amidst lush foliage and waterfalls. A perfect, tranquil morning activity.",
            "imageUrl": "https://images.unsplash.com/photo-1599499963953-617f6b38c235?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
            "geoCoordinates": {
              "latitude": 36.1168,
              "longitude": -115.1701
            },
            "ticketPricing": "Free",
            "rating": 4.6,
            "timeToSpend": "45 Minutes",
            "travelTimeFromPrevious": "Start of the day (or short walk from mid-strip hotel)"
          },
          {
            "placeName": "The LINQ Promenade",
            "placeDetails": "An open-air shopping, dining, and entertainment district. It's fun to walk through, with plenty of window-shopping and people-watching. Look for happy hour deals at the various bars and restaurants for a cheap afternoon drink or snack.",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2c/The_LINQ_Hotel_and_Casino_and_the_High_Roller_at_The_LINQ_Promenade_%2821217823616%29.jpg",
            "geoCoordinates": {
              "latitude": 36.1179,
              "longitude": -115.1702
            },
            "ticketPricing": "Free to walk through",
            "rating": 4.6,
            "timeToSpend": "1.5-2 Hours",
            "travelTimeFromPrevious": "2-minute walk"
          },
          {
            "placeName": "The Venetian's Grand Canal Shoppes",
            "placeDetails": "Be transported to Venice, Italy. Stroll along the indoor canals under a painted sky, watch the gondolas float by (riding is pricey, but watching is free!), and enjoy the 'Streetmosphere' performances by costumed actors and singers.",
            "imageUrl": "https://images.unsplash.com/photo-1583342023902-615f6245f341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "geoCoordinates": {
              "latitude": 36.1212,
              "longitude": -115.1697
            },
            "ticketPricing": "Free to explore",
            "rating": 4.7,
            "timeToSpend": "1.5-2 Hours",
            "travelTimeFromPrevious": "5-minute walk"
          },
          {
            "placeName": "Mirage Volcano",
            "placeDetails": "Experience an iconic, free Vegas spectacle. The volcano in front of The Mirage hotel erupts nightly with fireballs, explosions, and a dramatic soundtrack. It's a powerful and exciting show. Check the schedule as times can vary.",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/The_Mirage_Volcano_at_night.jpg/1920px-The_Mirage_Volcano_at_night.jpg",
            "geoCoordinates": {
              "latitude": 36.1214,
              "longitude": -115.1741
            },
            "ticketPricing": "Free",
            "rating": 4.6,
            "timeToSpend": "15 Minutes",
            "travelTimeFromPrevious": "5-minute walk across the street"
          }
        ]
      },
      {
        "day": 3,
        "theme": "Downtown Vegas & The Fremont Street Experience",
        "dailyPlan": [
          {
            "placeName": "Downtown Container Park",
            "placeDetails": "A unique open-air shopping and entertainment center built from shipping containers. It features quirky shops, affordable food options, and a cool playground with a giant praying mantis sculpture out front that shoots fire at night.",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Downtown_Container_Park.jpg/1920px-Downtown_Container_Park.jpg",
            "geoCoordinates": {
              "latitude": 36.1678,
              "longitude": -115.1381
            },
            "ticketPricing": "Free to enter",
            "rating": 4.5,
            "timeToSpend": "1.5-2 Hours",
            "travelTimeFromPrevious": "Start of the day (Take the Deuce bus or a rideshare to Downtown)"
          },
          {
            "placeName": "Fremont Street Experience",
            "placeDetails": "The heart of Downtown Las Vegas. Walk this five-block pedestrian mall, enjoy the vintage casino vibes, street performers, and cheap food/drinks. Don't miss the main event after dusk!",
            "imageUrl": "https://images.unsplash.com/photo-1563415176518-369c736d2524?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            "geoCoordinates": {
              "latitude": 36.1705,
              "longitude": -115.1451
            },
            "ticketPricing": "Free",
            "rating": 4.6,
            "timeToSpend": "2-3 Hours",
            "travelTimeFromPrevious": "5-minute walk"
          },
          {
            "placeName": "Viva Vision Light Show",
            "placeDetails": "The highlight of the Fremont Street Experience. Look up to see the world's largest video screen, which comes alive on the hour every evening with a stunning light and sound show. It's an immersive and unforgettable experience.",
            "imageUrl": "https://images.unsplash.com/photo-1610484729459-1994689b88d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "geoCoordinates": {
              "latitude": 36.1709,
              "longitude": -115.1444
            },
            "ticketPricing": "Free",
            "rating": 4.7,
            "timeToSpend": "10 minutes per show (runs hourly)",
            "travelTimeFromPrevious": "You are already there"
          }
        ]
      }
    ]
  }
}
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config: {
      responseMimeType: 'application/json',
    },
    contents,
  });

  let finalText = '';
  for await (const chunk of response) {
    finalText += chunk.text;
  }

  // Sometimes, Gemini adds garbage like ```json ... ```
  // Clean it safely
  return finalText
    .replace(/^```json/, '')
    .replace(/^```/, '')
    .trim();
}
