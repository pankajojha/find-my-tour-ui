export const mockTours = [
  {
    id: '1',
    title: 'Kyoto Culture & Food Tour',
    destination: 'Kyoto, Japan',
    days: 5,
    price: 1499,
    rating: 4.9,
    featured: true,
    tags: ['Culture', 'Food', 'Temples'],
    summary:
      'Explore Kyoto temples, gardens, street food, and traditional ryokan experiences.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Gion District',
        description: 'Check in, evening walk through Gion, welcome dinner.'
      },
      {
        day: 2,
        title: 'Fushimi Inari & Sake District',
        description: 'Hike Fushimi Inari shrine gates and visit local sake breweries.'
      },
      {
        day: 3,
        title: 'Arashiyama Bamboo Grove',
        description: 'Bamboo forest, monkey park, river boat ride.'
      },
      {
        day: 4,
        title: 'Tea Ceremony & Kinkaku-ji',
        description: 'Traditional tea ceremony and Golden Pavilion visit.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Souvenir shopping and airport transfer.'
      }
    ]
  },
  {
    id: '2',
    title: 'Swiss Alps Adventure',
    destination: 'Interlaken, Switzerland',
    days: 7,
    price: 2499,
    rating: 4.8,
    featured: true,
    tags: ['Hiking', 'Mountains', 'Adventure'],
    summary:
      'Alpine trains, mountain hikes, lake cruises, and scenic Swiss villages.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Interlaken',
        description: 'Settle in and lakeside welcome dinner.'
      },
      {
        day: 2,
        title: 'Grindelwald Hike',
        description: 'Guided hike with mountain views.'
      },
      {
        day: 3,
        title: 'Jungfraujoch',
        description: 'Train ride to Top of Europe.'
      },
      {
        day: 4,
        title: 'Lake Brienz Cruise',
        description: 'Scenic cruise and village exploration.'
      },
      {
        day: 5,
        title: 'Adventure Day',
        description: 'Optional paragliding or canyon tour.'
      },
      {
        day: 6,
        title: 'Lauterbrunnen Valley',
        description: 'Waterfalls and cable car ride.'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Breakfast and transfer to airport.'
      }
    ]
  },
  {
    id: '3',
    title: 'Bali Wellness Retreat',
    destination: 'Ubud, Bali',
    days: 6,
    price: 1299,
    rating: 4.7,
    featured: false,
    tags: ['Wellness', 'Beach', 'Yoga'],
    summary:
      'Yoga sessions, rice terrace walks, spa treatments, and beach relaxation.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Ubud',
        description: 'Welcome drink and spa check-in.'
      },
      {
        day: 2,
        title: 'Yoga & Rice Terraces',
        description: 'Morning yoga and Tegalalang rice terrace walk.'
      },
      {
        day: 3,
        title: 'Temple & Waterfall',
        description: 'Visit Tirta Empul and Tibumana waterfall.'
      },
      {
        day: 4,
        title: 'Beach Day',
        description: 'Transfer to beach club and sunset dinner.'
      },
      {
        day: 5,
        title: 'Wellness Day',
        description: 'Spa, meditation, and healthy cooking class.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Final breakfast and airport transfer.'
      }
    ]
  }
];

export function mockAIItinerary(payload = {}) {
  const days = Math.min(Math.max(Number(payload.days) || 3, 1), 14);
  const prompt = payload.prompt || 'Personalized tour';
  const destination = payload.destination || 'your destination';
  const interests = payload.interests || 'local highlights';

  return {
    id: `ai_${Date.now()}`,
    title: `${prompt}`,
    meta: {
      destination,
      days,
      interests,
      budget: payload.budget || 'flexible',
      generatedBy: 'FindMyTour.AI'
    },
    days: Array.from({ length: days }, (_, index) => ({
      day: index + 1,
      title: `Day ${index + 1}: ${interests}`,
      summary: `AI-generated plan for ${destination}.`,
      activities: [
        'Morning: Local breakfast and orientation walk.',
        'Afternoon: Guided visit to top attractions.',
        'Evening: Dinner recommendation and night market visit.'
      ]
    }))
  };
}
