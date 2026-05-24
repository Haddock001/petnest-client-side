import catCover from '../assets/cat_cover.jpg'
import dogCover from '../assets/dog_cover.jpg'
import petDog from '../assets/pet_dog.jpg'
import heroPet from '../assets/hero.png'

export const petCategories = [
  { name: 'Cats', count: 18, tone: 'bg-pink-100 text-pink-700' },
  { name: 'Dogs', count: 24, tone: 'bg-amber-100 text-amber-800' },
  { name: 'Rabbits', count: 9, tone: 'bg-emerald-100 text-emerald-700' },
  { name: 'Birds', count: 7, tone: 'bg-sky-100 text-sky-700' },
  { name: 'Fish', count: 12, tone: 'bg-indigo-100 text-indigo-700' },
]

export const pets = [
  {
    id: 'pet-101',
    name: 'Milo',
    age: '1 year',
    category: 'Cats',
    location: 'Dhanmondi, Dhaka',
    image: catCover,
    addedAt: '2026-05-18',
    adopted: false,
    shortDescription: 'Gentle, curious, and already litter trained.',
    longDescription:
      'Milo is calm around people and loves quiet windowsills. He would do best in a peaceful home with someone who enjoys slow mornings and soft playtime.',
  },
  {
    id: 'pet-102',
    name: 'Buddy',
    age: '2 years',
    category: 'Dogs',
    location: 'Uttara, Dhaka',
    image: dogCover,
    addedAt: '2026-05-16',
    adopted: false,
    shortDescription: 'A loyal walking partner with a soft heart.',
    longDescription:
      'Buddy is energetic outside and relaxed indoors. He is vaccinated, friendly with children, and responds well to basic commands.',
  },
  {
    id: 'pet-103',
    name: 'Luna',
    age: '8 months',
    category: 'Dogs',
    location: 'Mirpur, Dhaka',
    image: petDog,
    addedAt: '2026-05-12',
    adopted: false,
    shortDescription: 'Playful puppy looking for patient adopters.',
    longDescription:
      'Luna is bright, affectionate, and learning quickly. She needs a family that can continue her training and give her daily playtime.',
  },
  {
    id: 'pet-104',
    name: 'Pip',
    age: '6 months',
    category: 'Rabbits',
    location: 'Banani, Dhaka',
    image: heroPet,
    addedAt: '2026-05-09',
    adopted: false,
    shortDescription: 'Small, tidy, and comfortable with gentle handling.',
    longDescription:
      'Pip enjoys fresh greens and calm spaces. A home with a safe indoor enclosure would be perfect.',
  },
  {
    id: 'pet-105',
    name: 'Nori',
    age: '10 months',
    category: 'Cats',
    location: 'Bashundhara, Dhaka',
    image: catCover,
    addedAt: '2026-05-03',
    adopted: false,
    shortDescription: 'Sweet lap cat who warms up after a little patience.',
    longDescription:
      'Nori was rescued during a rainy week and has become affectionate with familiar people. She is looking for a steady, loving home.',
  },
  {
    id: 'pet-106',
    name: 'Scout',
    age: '3 years',
    category: 'Dogs',
    location: 'Mohammadpur, Dhaka',
    image: dogCover,
    addedAt: '2026-04-29',
    adopted: false,
    shortDescription: 'Confident, house trained, and great on walks.',
    longDescription:
      'Scout is calm, social, and loves routine. He would fit well with an active family or a single adopter who enjoys daily walks.',
  },
]

export const donations = [
  {
    id: 'donation-201',
    petName: 'Milo',
    image: catCover,
    maxAmount: 18000,
    donatedAmount: 9200,
    deadline: '2026-06-10',
    status: 'Active',
    createdAt: '2026-05-20',
    shortDescription: 'Emergency vet care and medicine for Milo.',
    longDescription:
      'Milo needs follow-up care, medicine, and nutritious food while he waits for a permanent home.',
  },
  {
    id: 'donation-202',
    petName: 'Buddy',
    image: dogCover,
    maxAmount: 25000,
    donatedAmount: 15400,
    deadline: '2026-06-18',
    status: 'Active',
    createdAt: '2026-05-17',
    shortDescription: 'Vaccination, food, and shelter support.',
    longDescription:
      'Buddy is healthy but needs vaccination boosters, foster support, and food for the next month.',
  },
  {
    id: 'donation-203',
    petName: 'Luna',
    image: petDog,
    maxAmount: 22000,
    donatedAmount: 6800,
    deadline: '2026-06-24',
    status: 'Paused',
    createdAt: '2026-05-11',
    shortDescription: 'Help Luna recover from a minor injury.',
    longDescription:
      'Luna is recovering well and needs clinic visits, bandage changes, and extra nutrition during foster care.',
  },
]

export const dashboardPets = pets.slice(0, 4)

export const adoptionRequests = [
  {
    id: 'req-301',
    petName: 'Milo',
    requester: 'Sadia Rahman',
    email: 'sadia@example.com',
    phone: '+8801711000000',
    location: 'Dhanmondi, Dhaka',
  },
  {
    id: 'req-302',
    petName: 'Buddy',
    requester: 'Arif Hossain',
    email: 'arif@example.com',
    phone: '+8801811000000',
    location: 'Uttara, Dhaka',
  },
]
