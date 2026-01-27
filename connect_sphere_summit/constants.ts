
import { Users, Code, LineChart, Briefcase } from "lucide-react";
import { AudienceType, NavItem, Speaker, CategoryDetail } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "events", label: "EVENTS", href: "#" },
  { id: "speakers", label: "SPEAKERS", href: "#" },
  { id: "networking", label: "NETWORKING", href: "#" },
  { id: "manage", label: "MANAGE", href: "#" },
  { id: "contact", label: "CONTACT US", href: "#" },
];

export const SPEAKERS: Speaker[] = [
  {
    id: "1",
    name: "Sundar Pichai",
    title: "CEO",
    company: "Google",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/800px-Sundar_pichai.png",
    bio: "Sundar Pichai is the CEO of Google and Alphabet. He is responsible for Google's product development and engineering operations, as well as the company's day-to-day operations.",
    sessionTitle: "The Future of Information: AI for Everyone",
    sessionTime: "Aug 24 • 10:00 AM - 11:30 AM",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    id: "2",
    name: "Satya Nadella",
    title: "Chairman & CEO",
    company: "Microsoft",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg/800px-MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg",
    bio: "Satya Nadella is the Chairman and CEO of Microsoft. Before becoming CEO, he was the executive vice president of Microsoft's Cloud and Enterprise group.",
    sessionTitle: "Cloud Computing & The Next Industrial Revolution",
    sessionTime: "Aug 24 • 12:00 PM - 1:30 PM",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    id: "3",
    name: "Elon Musk",
    title: "CEO",
    company: "Tesla / SpaceX",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/800px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg",
    bio: "Elon Musk is a business magnate and investor. He is the founder, CEO, and Chief Engineer at SpaceX; angel investor, CEO, and Product Architect of Tesla, Inc.",
    sessionTitle: "Multi-Planetary Civilization & Sustainable Energy",
    sessionTime: "Aug 25 • 09:00 AM - 11:00 AM",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    id: "4",
    name: "Mark Zuckerberg",
    title: "CEO",
    company: "Meta",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/800px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    bio: "Mark Zuckerberg is the founder, chairman, and CEO of Meta (formerly Facebook). He leads the company's vision to build the metaverse and bring the world closer together.",
    sessionTitle: "Building the Metaverse: Connection Evolved",
    sessionTime: "Aug 25 • 02:00 PM - 3:30 PM",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    id: "5",
    name: "Jensen Huang",
    title: "CEO",
    company: "NVIDIA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_%28cropped%29.jpg/800px-Jensen_Huang_%28cropped%29.jpg",
    bio: "Jensen Huang founded NVIDIA in 1993 and has served since its inception as president, chief executive officer, and a member of the board of directors.",
    sessionTitle: "Accelerated Computing and the Rise of Generative AI",
    sessionTime: "Aug 26 • 10:00 AM - 11:30 AM",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    id: "6",
    name: "Mukesh Ambani",
    title: "Chairman",
    company: "Reliance Industries",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Mukesh_Ambani.jpg/800px-Mukesh_Ambani.jpg",
    bio: "Mukesh Ambani is an Indian billionaire business magnate. He is the chairman and managing director of Reliance Industries Ltd. (RIL), a Fortune Global 500 company.",
    sessionTitle: "Digital India: The Path to Trillion Dollar Economy",
    sessionTime: "Aug 26 • 01:00 PM - 2:00 PM",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    id: "7",
    name: "Jeff Bezos",
    title: "Founder",
    company: "Amazon",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/640px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg",
    bio: "Jeff Bezos is an American entrepreneur, media proprietor, investor, and commercial astronaut. He is the founder, executive chairman, and former president and CEO of Amazon.",
    sessionTitle: "Customer Obsession & Long-Term Thinking",
    sessionTime: "Aug 27 • 11:00 AM - 12:30 PM",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    id: "8",
    name: "Bill Gates",
    title: "Co-founder",
    company: "Microsoft",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bill_Gates_2017_%28cropped%29.jpg/640px-Bill_Gates_2017_%28cropped%29.jpg",
    bio: "Bill Gates is an American business magnate, software developer, investor, author, and philanthropist. He is a co-founder of Microsoft.",
    sessionTitle: "Solving Climate Change with Technology",
    sessionTime: "Aug 27 • 03:00 PM - 4:30 PM",
    socials: { twitter: "#", linkedin: "#" }
  }
];

export const AUDIENCE_TYPES: AudienceType[] = [
  { 
    id: "corporate",
    label: "Corporate/Business Events", 
    icon: Briefcase, 
    description: "Professional conferences, seminars, and corporate retreats for industry leaders.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "cultural",
    label: "Cultural/Arts Events", 
    icon: LineChart, 
    description: "Festivals, art exhibitions, and musical performances that inspire creativity.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "private",
    label: "Private/Social Events", 
    icon: Code, 
    description: "Weddings, birthdays, and exclusive gatherings designed for personal connection.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "charity",
    label: "Charity/Fundraising Events", 
    icon: Users, 
    description: "Galas, auctions, and community initiatives supporting meaningful causes.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop"
  }
];

export const CATEGORY_DETAILS: Record<string, CategoryDetail> = {
  "corporate": {
    id: "corporate",
    title: "Corporate & Business",
    subtitle: "Empowering Industry Leaders",
    description: "Join top-tier executives and professionals in our curated series of business summits, leadership retreats, and industry-defining conferences.",
    events: [
      {
        id: "c1",
        title: "Global Enterprise AI Summit",
        date: "October 12, 2024",
        time: "09:00 AM - 05:00 PM",
        venue: "Moscone Center, San Francisco",
        description: "Explore the integration of Artificial Intelligence in large-scale enterprise operations. Keynotes from Fortune 500 CTOs.",
        imageUrl: "https://images.unsplash.com/photo-1559223607-b461b55dc47c?q=80&w=800&auto=format&fit=crop",
        organizer: "TechCorp Global"
      },
      {
        id: "c2",
        title: "Future of Work Leadership Retreat",
        date: "November 05, 2024",
        time: "10:00 AM - 06:00 PM",
        venue: "Davos Congress Centre, Switzerland",
        description: "An exclusive gathering for CEOs and HR leaders to discuss remote work, organizational culture, and employee well-being.",
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
        organizer: "World Economic Forum"
      },
      {
        id: "c3",
        title: "SaaS Growth & Scale Conference",
        date: "December 01, 2024",
        time: "08:30 AM - 04:30 PM",
        venue: "ExCeL London, UK",
        description: "Strategies for scaling subscription businesses. Featuring founders of Unicorn startups and top VCs.",
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
        organizer: "SaaS Alliance"
      }
    ]
  },
  "cultural": {
    id: "cultural",
    title: "Cultural & Arts",
    subtitle: "Celebrating Human Creativity",
    description: "Immerse yourself in a world of artistic expression through our featured festivals, galleries, and musical performances.",
    events: [
      {
        id: "a1",
        title: "Digital Art Renaissance Expo",
        date: "September 15, 2024",
        time: "10:00 AM - 08:00 PM",
        venue: "Mori Digital Art Museum, Tokyo",
        description: "A breathtaking showcase of interactive digital installations and projection mapping art from world-renowned collectives.",
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=800&auto=format&fit=crop",
        organizer: "TeamLab Borderless"
      },
      {
        id: "a2",
        title: "Global Fusion Music Festival",
        date: "October 20, 2024",
        time: "04:00 PM - 11:00 PM",
        venue: "Jio World Garden, Mumbai",
        description: "A cross-genre musical journey featuring collaborations between classical Indian maestros and electronic music producers.",
        imageUrl: "https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=800&auto=format&fit=crop",
        organizer: "Fusion Beats"
      },
      {
        id: "a3",
        title: "Contemporary Cinema Showcase",
        date: "November 10, 2024",
        time: "06:00 PM - 10:00 PM",
        venue: "Le Grand Rex, Paris",
        description: "Screenings of award-winning independent films followed by Q&A sessions with the directors.",
        imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
        organizer: "Cannes Indie"
      }
    ]
  },
  "private": {
    id: "private",
    title: "Private & Community",
    subtitle: "Building Meaningful Connections",
    description: "Exclusive gatherings, community meetups, and developer programs designed to foster learning and personal networks.",
    events: [
      {
        id: "p1",
        title: "GDG DevFest: Cloud & AI",
        date: "September 28, 2024",
        time: "09:00 AM - 04:00 PM",
        venue: "Stanford University, CA",
        description: "Join the Google Developer Group for a day of technical sessions on Google Cloud Platform, TensorFlow, and Generative AI.",
        imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        organizer: "GDG Silicon Valley"
      },
      {
        id: "p2",
        title: "University Hackathon: GenAI for Good",
        date: "October 05, 2024",
        time: "24-Hour Event",
        venue: "MIT Media Lab, Cambridge",
        description: "A student-led hackathon focused on building solutions for social impact using the latest Large Language Models.",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=800&auto=format&fit=crop",
        organizer: "MIT Tech Club"
      },
      {
        id: "p3",
        title: "Women Techmakers Social",
        date: "October 18, 2024",
        time: "05:00 PM - 08:00 PM",
        venue: "WeWork Galaxy, Bangalore",
        description: "An evening of networking, mentorship, and inspiring talks from women leaders in the technology sector.",
        imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
        organizer: "WTM India"
      }
    ]
  },
  "charity": {
    id: "charity",
    title: "Charity & Fundraising",
    subtitle: "Making a Real Impact",
    description: "Support worthy causes through our series of galas, auctions, and community initiatives aimed at creating positive global change.",
    events: [
      {
        id: "h1",
        title: "Code for Climate Gala",
        date: "November 12, 2024",
        time: "07:00 PM - 11:00 PM",
        venue: "The Pierre, New York",
        description: "A black-tie fundraising dinner supporting open-source climate modeling projects. Featuring celebrity guest speakers.",
        imageUrl: "https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=800&auto=format&fit=crop",
        organizer: "Tech For Good"
      },
      {
        id: "h2",
        title: "Education Access Fundraiser",
        date: "December 05, 2024",
        time: "10:00 AM - 02:00 PM",
        venue: "KICC, Nairobi",
        description: "A community auction and concert to raise funds for laptop distribution programs in rural schools.",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
        organizer: "Global Learning Fund"
      },
      {
        id: "h3",
        title: "Health Tech Charity Run",
        date: "January 15, 2025",
        time: "06:00 AM - 11:00 AM",
        venue: "Brandenburg Gate, Berlin",
        description: "A 10K run bringing together the health-tech community to support medical research and accessibility.",
        imageUrl: "https://images.unsplash.com/photo-1552674605-46f5383a5e68?q=80&w=800&auto=format&fit=crop",
        organizer: "Health++"
      }
    ]
  }
};
