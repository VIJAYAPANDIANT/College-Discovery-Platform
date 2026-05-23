import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const MOCK_COLLEGES = [
  {
    id: "mit",
    name: "Massachusetts Institute of Technology (MIT)",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Cambridge, MA",
    rating: 4.9,
    feesPerYear: 59750,
    type: "Private",
    established: 1861,
    placementRate: 97,
    avgPackage: 115000,
    description: "The Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts. Established in 1861, MIT has played a key role in the development of modern science, engineering, mathematics, and technology.",
    courses: [
      { name: "B.S. in Computer Science & Engineering", duration: "4 Years", fees: 59750 },
      { name: "B.S. in Electrical Engineering", duration: "4 Years", fees: 59750 },
      { name: "M.S. in Media Arts and Sciences", duration: "2 Years", fees: 61200 },
      { name: "Ph.D. in Physics", duration: "5 Years", fees: 58000 }
    ],
    reviews: [
      {
        userName: "Alex Johnson",
        rating: 5,
        comment: "An unmatched academic atmosphere. The collaboration and projects here push your boundaries. Highly recommend the CSE program.",
        date: "2026-03-12"
      },
      {
        userName: "Samantha Lin",
        rating: 5,
        comment: "Excellent career fairs and networking opportunities. It is intense, but the resources provided are top-tier.",
        date: "2026-04-05"
      }
    ],
    amenities: ["State-of-the-art Labs", "24/7 Library", "Gym & Sports Center", "On-campus Housing", "Research Center", "Innovation Hub"],
    rank: 1,
    website: "https://www.mit.edu"
  },
  {
    id: "stanford",
    name: "Stanford University",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Stanford, CA",
    rating: 4.9,
    feesPerYear: 61730,
    type: "Private",
    established: 1885,
    placementRate: 96,
    avgPackage: 122000,
    description: "Located in the heart of Silicon Valley, Stanford University is one of the world's leading teaching and research institutions. It is known for its entrepreneurial character, academic strength, and wealth.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 61730 },
      { name: "B.A. in Economics", duration: "4 Years", fees: 61730 },
      { name: "MBA (Master of Business Administration)", duration: "2 Years", fees: 76500 },
      { name: "M.S. in Symbolic Systems", duration: "2 Years", fees: 63000 }
    ],
    reviews: [
      {
        userName: "Marcus Aurelius",
        rating: 5,
        comment: "Being in Silicon Valley gives Stanford an unparalleled advantage. Startups, tech giants, venture capital are literally right outside the campus.",
        date: "2026-02-20"
      },
      {
        userName: "Elena Rostova",
        rating: 4,
        comment: "Beautiful campus and outstanding faculty. The interdisciplinary research culture is highly supported here.",
        date: "2026-04-18"
      }
    ],
    amenities: ["Silicon Valley Network", "Startup Incubator", "Olympic-size Pool", "Art Museums", "Golf Course", "Student Centers"],
    rank: 2,
    website: "https://www.stanford.edu"
  },
  {
    id: "harvard",
    name: "Harvard University",
    logo: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Cambridge, MA",
    rating: 4.8,
    feesPerYear: 57260,
    type: "Private",
    established: 1636,
    placementRate: 95,
    avgPackage: 110000,
    description: "Harvard University is the oldest institution of higher learning in the United States, established in 1636. Harvard is devoted to excellence in teaching, learning, and research, and to developing leaders in many disciplines.",
    courses: [
      { name: "B.A. in Computer Science", duration: "4 Years", fees: 57260 },
      { name: "B.A. in Government", duration: "4 Years", fees: 57260 },
      { name: "Master of Laws (LL.M.)", duration: "1 Year", fees: 72000 },
      { name: "Master in Public Policy (MPP)", duration: "2 Years", fees: 59800 }
    ],
    reviews: [
      {
        userName: "Chloe Bennet",
        rating: 5,
        comment: "The prestige is real, but so is the workload. The alumni network is incredibly powerful and opens doors globally.",
        date: "2026-01-15"
      }
    ],
    amenities: ["Historic Campus", "Harvard Library System", "Multiple Dining Halls", "Rowing Club", "Arts Centers", "Career Placement Office"],
    rank: 3,
    website: "https://www.harvard.edu"
  },
  {
    id: "caltech",
    name: "California Institute of Technology (Caltech)",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Pasadena, CA",
    rating: 4.7,
    feesPerYear: 60810,
    type: "Private",
    established: 1891,
    placementRate: 94,
    avgPackage: 108000,
    description: "Caltech is a world-renowned science and engineering institute that marshals some of the world's brightest minds and most innovative tools to address fundamental scientific questions and pressing societal challenges.",
    courses: [
      { name: "B.S. in Physics", duration: "4 Years", fees: 60810 },
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 60810 },
      { name: "M.S. in Aeronautics", duration: "2 Years", fees: 62500 }
    ],
    reviews: [
      {
        userName: "David Kim",
        rating: 5,
        comment: "Very small class sizes. You get to do actual research with professors from your very first year. Highly quantitative and challenging.",
        date: "2026-03-30"
      }
    ],
    amenities: ["NASA JPL Access", "Seismological Lab", "High-Performance Computing", "Observatory Access", "Fitness Center"],
    rank: 4,
    website: "https://www.caltech.edu"
  },
  {
    id: "berkeley",
    name: "University of California, Berkeley",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Berkeley, CA",
    rating: 4.8,
    feesPerYear: 44000,
    type: "Public",
    established: 1868,
    placementRate: 93,
    avgPackage: 98000,
    description: "The University of California, Berkeley is a public research university in Berkeley, California. Founded in 1868 as the state's first land-grant university, Berkeley is consistently ranked among the top public universities in the world.",
    courses: [
      { name: "B.A. in Computer Science", duration: "4 Years", fees: 44000 },
      { name: "B.S. in Business Administration", duration: "4 Years", fees: 48000 },
      { name: "M.S. in Computer Science", duration: "2 Years", fees: 42000 }
    ],
    reviews: [
      {
        userName: "Rachel Green",
        rating: 5,
        comment: "Berkeley CSE is legendary. The competitive atmosphere can be stressful, but it shapes you into a top-tier engineer.",
        date: "2026-05-01"
      }
    ],
    amenities: ["Research Labs", "Student Union", "Recreational Sports Facility", "Libraries", "Botanical Garden", "Public Transit Access"],
    rank: 5,
    website: "https://www.berkeley.edu"
  },
  {
    id: "oxford",
    name: "University of Oxford",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Oxford, UK",
    rating: 4.9,
    feesPerYear: 48500,
    type: "Public",
    established: 1096,
    placementRate: 95,
    avgPackage: 92000,
    description: "The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world.",
    courses: [
      { name: "B.A. in Computer Science", duration: "3 Years", fees: 48500 },
      { name: "B.A. in Philosophy, Politics and Economics (PPE)", duration: "3 Years", fees: 46200 },
      { name: "M.Sc. in Advanced Computer Science", duration: "1 Year", fees: 52000 }
    ],
    reviews: [
      {
        userName: "William Shake",
        rating: 5,
        comment: "The tutorial system is incredible. Personal attention from world experts weekly. History is embedded in every wall.",
        date: "2026-02-14"
      }
    ],
    amenities: ["Historic Colleges", "Bodleian Library", "Oxford Union Debating", "Punting Club", "Science Parks", "Museums"],
    rank: 6,
    website: "https://www.ox.ac.uk"
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Cambridge, UK",
    rating: 4.8,
    feesPerYear: 51000,
    type: "Public",
    established: 1209,
    placementRate: 94,
    avgPackage: 94000,
    description: "Founded in 1209, the University of Cambridge is a collegiate research university in Cambridge, United Kingdom. Cambridge is the world's third-oldest surviving university.",
    courses: [
      { name: "BA Hons in Computer Science", duration: "3 Years", fees: 51000 },
      { name: "BA Hons in Engineering", duration: "3 Years", fees: 51000 },
      { name: "Master of Advanced Study (MASt) in Mathematics", duration: "1 Year", fees: 49000 }
    ],
    reviews: [
      {
        userName: "Newton Isaac",
        rating: 5,
        comment: "Excellent training ground for mathematical sciences. Cambridge's tradition of academic rigor is alive and well.",
        date: "2026-03-01"
      }
    ],
    amenities: ["Historic Chapels & Grounds", "Cambridge University Library", "Rowing & Sports Clubs", "Language Center", "Student Computing Labs"],
    rank: 7,
    website: "https://www.cam.ac.uk"
  },
  {
    id: "columbia",
    name: "Columbia University",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1200",
    location: "New York, NY",
    rating: 4.7,
    feesPerYear: 63500,
    type: "Private",
    established: 1754,
    placementRate: 93,
    avgPackage: 104000,
    description: "Columbia University is a private Ivy League research university in New York City. Established in 1754 as King's College on the grounds of Trinity Church in Manhattan, Columbia is the oldest institution of higher education in New York.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 63500 },
      { name: "B.A. in Political Science", duration: "4 Years", fees: 63500 },
      { name: "M.S. in Data Science", duration: "1.5 Years", fees: 58000 }
    ],
    reviews: [
      {
        userName: "Jenny York",
        rating: 5,
        comment: "Studying in Manhattan is a unique experience. Amazing opportunities for internships and jobs, especially in finance and media.",
        date: "2026-04-22"
      }
    ],
    amenities: ["Manhattan Campus", "Butler Library", "Career Design Labs", "On-campus Gym", "Global Center Networks"],
    rank: 8,
    website: "https://www.columbia.edu"
  },
  {
    id: "princeton",
    name: "Princeton University",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Princeton, NJ",
    rating: 4.9,
    feesPerYear: 59710,
    type: "Private",
    established: 1746,
    placementRate: 95,
    avgPackage: 112000,
    description: "Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746 in Elizabeth as the College of New Jersey, Princeton is the fourth-oldest institution of higher education in the United States.",
    courses: [
      { name: "A.B. in Computer Science", duration: "4 Years", fees: 59710 },
      { name: "B.S.E. in Operations Research & Financial Engineering", duration: "4 Years", fees: 59710 },
      { name: "Ph.D. in Mathematics", duration: "5 Years", fees: 54000 }
    ],
    reviews: [
      {
        userName: "Nash John",
        rating: 5,
        comment: "The mathematics department here is legendary. Intense, focused, and absolutely rewarding.",
        date: "2026-03-10"
      }
    ],
    amenities: ["Historic Campus", "Firestone Library", "Princeton Art Museum", "Graduate College", "Sports Centers"],
    rank: 9,
    website: "https://www.princeton.edu"
  },
  {
    id: "yale",
    name: "Yale University",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "New Haven, CT",
    rating: 4.8,
    feesPerYear: 62250,
    type: "Private",
    established: 1701,
    placementRate: 94,
    avgPackage: 105000,
    description: "Yale University is a private Ivy League research university in New Haven, Connecticut. Founded in 1701 as the Collegiate School, it is the third-oldest institution of higher education in the United States.",
    courses: [
      { name: "B.A. in Computer Science", duration: "4 Years", fees: 62250 },
      { name: "B.A. in Political Science", duration: "4 Years", fees: 62250 },
      { name: "J.D. (Doctor of Law)", duration: "3 Years", fees: 71500 }
    ],
    reviews: [
      {
        userName: "Eli Yale",
        rating: 5,
        comment: "Excellent law school and humanities courses. The residential college system makes it feel like home.",
        date: "2026-04-12"
      }
    ],
    amenities: ["Residential Colleges", "Beinecke Library", "Yale Art Gallery", "Payne Whitney Gym", "Yale Bowl"],
    rank: 10,
    website: "https://www.yale.edu"
  },
  {
    id: "uchicago",
    name: "University of Chicago",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Chicago, IL",
    rating: 4.8,
    feesPerYear: 64260,
    type: "Private",
    established: 1890,
    placementRate: 93,
    avgPackage: 102000,
    description: "The University of Chicago is a private research university in Chicago, Illinois. Located in the Hyde Park neighborhood, UChicago has been at the forefront of multiple scientific, economic, and political fields.",
    courses: [
      { name: "B.A. in Economics", duration: "4 Years", fees: 64260 },
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 64260 },
      { name: "Ph.D. in Economics", duration: "5 Years", fees: 59000 }
    ],
    reviews: [
      {
        userName: "Friedman Milton",
        rating: 5,
        comment: "The Chicago School of Economics is famous for a reason. Strict academic rigor and deep analytical foundations.",
        date: "2026-02-28"
      }
    ],
    amenities: ["Gothic Architecture", "Regenstein Library", "Oriental Institute", "Ratner Athletics Center", "Hyde Park Campus"],
    rank: 11,
    website: "https://www.uchicago.edu"
  },
  {
    id: "imperial",
    name: "Imperial College London",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "London, UK",
    rating: 4.7,
    feesPerYear: 46500,
    type: "Public",
    established: 1907,
    placementRate: 92,
    avgPackage: 89000,
    description: "Imperial College London is a public research university in London, United Kingdom. It focuses exclusively on science, technology, medicine, and business, and is consistently ranked among the top universities globally.",
    courses: [
      { name: "B.Eng. in Computing", duration: "3 Years", fees: 46500 },
      { name: "B.Sc. in Physics", duration: "3 Years", fees: 45000 },
      { name: "M.Sc. in Advanced Computing", duration: "1 Year", fees: 48000 }
    ],
    reviews: [
      {
        userName: "James Watt",
        rating: 5,
        comment: "Amazing computing and engineering programs. Being in South Kensington gives you great access to London's museum district.",
        date: "2026-05-02"
      }
    ],
    amenities: ["South Kensington Campus", "Imperial Library", "Ethos Sports Center", "Science Incubator", "Enterprise Lab"],
    rank: 12,
    website: "https://www.imperial.ac.uk"
  },
  {
    id: "upenn",
    name: "University of Pennsylvania",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Philadelphia, PA",
    rating: 4.8,
    feesPerYear: 63500,
    type: "Private",
    established: 1740,
    placementRate: 94,
    avgPackage: 110000,
    description: "The University of Pennsylvania is a private Ivy League research university in Philadelphia, Pennsylvania. Founded in 1740 by Benjamin Franklin, UPenn is one of the nine colonial colleges chartered before the U.S. Declaration of Independence.",
    courses: [
      { name: "B.S. in Economics (Wharton)", duration: "4 Years", fees: 63500 },
      { name: "B.S.E. in Computer Science", duration: "4 Years", fees: 63500 },
      { name: "Master of Biotechnology", duration: "2 Years", fees: 58000 }
    ],
    reviews: [
      { userName: "Benjamin F", rating: 5, comment: "Wharton Business School is unmatched. An incredible alumni base and great opportunities in banking.", date: "2026-04-10" }
    ],
    amenities: ["Wharton School Access", "Fisher Fine Arts Library", "Penn Museum", "Franklin Field", "Urban Campus"],
    rank: 13,
    website: "https://www.upenn.edu"
  },
  {
    id: "cornell",
    name: "Cornell University",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Ithaca, NY",
    rating: 4.7,
    feesPerYear: 62450,
    type: "Private",
    established: 1865,
    placementRate: 93,
    avgPackage: 101000,
    description: "Cornell University is a private Ivy League research university in Ithaca, New York. Founded in 1865 by Ezra Cornell and Andrew Dickson White, Cornell was intended to teach and make contributions in all fields of knowledge.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 62450 },
      { name: "B.S. in Hotel Administration", duration: "4 Years", fees: 62450 },
      { name: "M.Eng. in Computer Science", duration: "1 Year", fees: 60200 }
    ],
    reviews: [
      { userName: "Andy White", rating: 5, comment: "Beautiful gorges and campus. Highly rigorous, but the hotel administration school is world-famous.", date: "2026-03-25" }
    ],
    amenities: ["Ithaca Gorges", "Uris Library", "Cornell Botanic Gardens", "Dairy Bar", "Engineering Quad"],
    rank: 14,
    website: "https://www.cornell.edu"
  },
  {
    id: "jhu",
    name: "Johns Hopkins University",
    logo: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Baltimore, MD",
    rating: 4.8,
    feesPerYear: 60480,
    type: "Private",
    established: 1876,
    placementRate: 92,
    avgPackage: 96000,
    description: "Johns Hopkins University is a private research university in Baltimore, Maryland. Founded in 1876, JHU was the first American research university and is renowned for its medical, nursing, and public health schools.",
    courses: [
      { name: "B.S. in Biomedical Engineering", duration: "4 Years", fees: 60480 },
      { name: "B.A. in International Studies", duration: "4 Years", fees: 60480 },
      { name: "Master of Public Health (MPH)", duration: "2 Years", fees: 65000 }
    ],
    reviews: [
      { userName: "Dr. Watson", rating: 5, comment: "The BME program is the best in the nation. Access to JHU Hospital provides unmatched clinical opportunities.", date: "2026-04-15" }
    ],
    amenities: ["Hopkins Hospital", "George Peabody Library", "Homewood Campus", "Bloomberg Center", "Lacrosse Field"],
    rank: 15,
    website: "https://www.jhu.edu"
  },
  {
    id: "duke",
    name: "Duke University",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Durham, NC",
    rating: 4.8,
    feesPerYear: 60400,
    type: "Private",
    established: 1838,
    placementRate: 93,
    avgPackage: 98000,
    description: "Duke University is a private research university in Durham, North Carolina. Founded by Methodists and Quakers in the present-day town of Trinity in 1838, the school moved to Durham in 1892.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 60400 },
      { name: "B.A. in Public Policy", duration: "4 Years", fees: 60400 },
      { name: "M.S. in Global Health", duration: "2 Years", fees: 55000 }
    ],
    reviews: [
      { userName: "Blue Devil", rating: 5, comment: "Duke Basketball atmosphere is insane! Academics are top notch and the campus chapel is beautiful.", date: "2026-02-18" }
    ],
    amenities: ["Duke Chapel", "Cameron Indoor Stadium", "Sarah P. Duke Gardens", "Duke Forest", "Medical Center"],
    rank: 16,
    website: "https://www.duke.edu"
  },
  {
    id: "northwestern",
    name: "Northwestern University",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Evanston, IL",
    rating: 4.7,
    feesPerYear: 62390,
    type: "Private",
    established: 1851,
    placementRate: 93,
    avgPackage: 97000,
    description: "Northwestern University is a private research university in Evanston, Illinois. Founded in 1851, Northwestern is the oldest chartered university in Illinois and is widely known for its journalism and business schools.",
    courses: [
      { name: "B.S. in Journalism (Medill)", duration: "4 Years", fees: 62390 },
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 62390 },
      { name: "MBA (Kellogg School of Management)", duration: "2 Years", fees: 78000 }
    ],
    reviews: [
      { userName: "Medill Alum", rating: 5, comment: "Medill has the absolute best journalism network in the world. Being right next to Lake Michigan is a scenic plus.", date: "2026-03-05" }
    ],
    amenities: ["Lake Michigan Beach", "Deering Library", "Kellogg Global Hub", "Ryan Fieldhouse", "Shakespeare Garden"],
    rank: 17,
    website: "https://www.northwestern.edu"
  },
  {
    id: "dartmouth",
    name: "Dartmouth College",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Hanover, NH",
    rating: 4.7,
    feesPerYear: 60680,
    type: "Private",
    established: 1769,
    placementRate: 93,
    avgPackage: 99000,
    description: "Dartmouth College is a private Ivy League research university in Hanover, New Hampshire. Established in 1769, it is the ninth-oldest institution of higher education in the United States and one of the nine colonial colleges.",
    courses: [
      { name: "A.B. in Computer Science", duration: "4 Years", fees: 60680 },
      { name: "A.B. in Economics", duration: "4 Years", fees: 60680 },
      { name: "B.E. in Engineering Sciences", duration: "4 Years", fees: 61500 }
    ],
    reviews: [
      { userName: "Green Key", rating: 5, comment: "Incredible undergraduate focus. Tucked away in New Hampshire, it has a tight-knit and passionate alumni community.", date: "2026-04-18" }
    ],
    amenities: ["The Dartmouth Green", "Baker-Berry Library", "Hood Museum of Art", "Dartmouth Skiway", "Tuck School of Business"],
    rank: 18,
    website: "https://home.dartmouth.edu"
  },
  {
    id: "brown",
    name: "Brown University",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Providence, RI",
    rating: 4.8,
    feesPerYear: 62680,
    type: "Private",
    established: 1764,
    placementRate: 93,
    avgPackage: 100000,
    description: "Brown University is a private Ivy League research university in Providence, Rhode Island. It is the seventh-oldest institution of higher education in the United States and is famous for its Open Curriculum.",
    courses: [
      { name: "Sc.B. in Computer Science", duration: "4 Years", fees: 62680 },
      { name: "A.B. in Applied Mathematics", duration: "4 Years", fees: 62680 },
      { name: "Sc.M. in Data Science", duration: "1 Year", fees: 58000 }
    ],
    reviews: [
      { userName: "OpenCurric", rating: 5, comment: "The Open Curriculum is freeing! You can explore courses without stressful distribution requirements. Best Ivy by far.", date: "2026-05-10" }
    ],
    amenities: ["College Hill Campus", "John Hay Library", "Brown Arts Initiative", "Olney Gym", "Manning Chapel"],
    rank: 19,
    website: "https://www.brown.edu"
  },
  {
    id: "vanderbilt",
    name: "Vanderbilt University",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Nashville, TN",
    rating: 4.7,
    feesPerYear: 58130,
    type: "Private",
    established: 1873,
    placementRate: 92,
    avgPackage: 94000,
    description: "Vanderbilt University is a private research university in Nashville, Tennessee. Founded in 1873, it was named in honor of shipping and rail magnate Cornelius Vanderbilt, who provided the school its initial endowment.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 58130 },
      { name: "B.A. in Economics", duration: "4 Years", fees: 58130 },
      { name: "M.S. in Finance", duration: "1 Year", fees: 54000 }
    ],
    reviews: [
      { userName: "Vandy Kid", rating: 5, comment: "Nashville is an amazing city! The campus is an arboretum, very green and beautiful. Academics are top-notch.", date: "2026-03-12" }
    ],
    amenities: ["National Arboretum Campus", "Heard Library", "Memorial Gym", "Sarratt Student Center", "Vanderbilt Observatory"],
    rank: 20,
    website: "https://www.vanderbilt.edu"
  },
  {
    id: "rice",
    name: "Rice University",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1200",
    location: "Houston, TX",
    rating: 4.8,
    feesPerYear: 54100,
    type: "Private",
    established: 1912,
    placementRate: 93,
    avgPackage: 95000,
    description: "Rice University is a private research university in Houston, Texas. Located on a 300-acre campus near the Houston Museum District and adjacent to the Texas Medical Center, Rice is known for its undergraduate focus.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 54100 },
      { name: "B.A. in Architecture", duration: "5 Years", fees: 56000 },
      { name: "Ph.D. in Bioengineering", duration: "5 Years", fees: 49000 }
    ],
    reviews: [
      { userName: "Owl City", rating: 5, comment: "Very small class sizes and a unique residential college system similar to Oxford/Yale. Houston food scene is close by.", date: "2026-04-20" }
    ],
    amenities: ["Residential Colleges", "Fondren Library", "Rice Stadium", "Moody Center for the Arts", "Bioscience Research Collaborative"],
    rank: 21,
    website: "https://www.rice.edu"
  },
  {
    id: "washu",
    name: "Washington University in St. Louis",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "St. Louis, MO",
    rating: 4.7,
    feesPerYear: 59420,
    type: "Private",
    established: 1853,
    placementRate: 92,
    avgPackage: 93000,
    description: "Washington University in St. Louis is a private research university with its main campus mostly in St. Louis County, and Forest Park, Missouri. Founded in 1853, JHU is named after George Washington.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 59420 },
      { name: "B.F.A. in Communication Design", duration: "4 Years", fees: 59420 },
      { name: "MD (Doctor of Medicine)", duration: "4 Years", fees: 68000 }
    ],
    reviews: [
      { userName: "StL Local", rating: 5, comment: "Beautiful collegiate gothic campus. The food program here is ranked #1 in the country, and dorms are like hotels.", date: "2026-03-30" }
    ],
    amenities: ["Gothic Architecture Campus", "Olin Library", "Mildred Lane Kemper Art Museum", "Athletic Complex", "Forest Park Access"],
    rank: 22,
    website: "https://wustl.edu"
  },
  {
    id: "ucla",
    name: "University of California, Los Angeles (UCLA)",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Los Angeles, CA",
    rating: 4.8,
    feesPerYear: 43000,
    type: "Public",
    established: 1919,
    placementRate: 92,
    avgPackage: 92000,
    description: "The University of California, Los Angeles is a public research university in Los Angeles, California. Founded in 1919, UCLA is the second-oldest campus of the University of California system and a top public university.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 43000 },
      { name: "B.A. in Psychology", duration: "4 Years", fees: 41000 },
      { name: "MBA (Anderson School of Management)", duration: "2 Years", fees: 68500 }
    ],
    reviews: [
      { userName: "Bruin Power", rating: 5, comment: "Westwood is a safe and beautiful area. Food in the dining halls is amazing. Academics are hard, but social life is great.", date: "2026-05-15" }
    ],
    amenities: ["Royce Hall", "Powell Library", "Pauley Pavilion", "Drake Stadium", "Westwood Village Access"],
    rank: 23,
    website: "https://www.ucla.edu"
  },
  {
    id: "umich",
    name: "University of Michigan",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Ann Arbor, MI",
    rating: 4.8,
    feesPerYear: 53200,
    type: "Public",
    established: 1817,
    placementRate: 93,
    avgPackage: 90000,
    description: "The University of Michigan is a public research university in Ann Arbor, Michigan. Founded in 1817 in Detroit as the Catholepistemiad, the university was moved to Ann Arbor in 1837.",
    courses: [
      { name: "B.S.E. in Computer Science", duration: "4 Years", fees: 53200 },
      { name: "B.B.A. (Ross School of Business)", duration: "4 Years", fees: 56000 },
      { name: "M.S. in Data Science", duration: "1.5 Years", fees: 48000 }
    ],
    reviews: [
      { userName: "Wolverine", rating: 5, comment: "Ann Arbor is the best college town in America! School pride is unmatched, especially on game days at the Big House.", date: "2026-04-02" }
    ],
    amenities: ["The Big House (Stadium)", "Shapiro Undergraduate Library", "Ross Business Building", "Nichols Arboretum", "Central Campus Quad"],
    rank: 24,
    website: "https://umich.edu"
  },
  {
    id: "unc",
    name: "University of North Carolina at Chapel Hill",
    logo: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Chapel Hill, NC",
    rating: 4.7,
    feesPerYear: 36000,
    type: "Public",
    established: 1789,
    placementRate: 91,
    avgPackage: 83000,
    description: "The University of North Carolina at Chapel Hill is a public research university in Chapel Hill, North Carolina. It is the flagship of the University of North Carolina system and is chartered as the first public university.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 36000 },
      { name: "B.A. in Media & Journalism", duration: "4 Years", fees: 36000 },
      { name: "MBA (Kenan-Flagler)", duration: "2 Years", fees: 58000 }
    ],
    reviews: [
      { userName: "TarHeel", rating: 5, comment: "Tar Heel pride is everywhere! The campus is gorgeous, especially in the spring with the Old Well in bloom.", date: "2026-03-20" }
    ],
    amenities: ["The Old Well", "Wilson Library", "Dean Smith Center", "Franklin Street Access", "Morehead Planetarium"],
    rank: 25,
    website: "https://www.unc.edu"
  },
  {
    id: "uva",
    name: "University of Virginia",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Charlottesville, VA",
    rating: 4.7,
    feesPerYear: 52000,
    type: "Public",
    established: 1819,
    placementRate: 92,
    avgPackage: 86050,
    description: "The University of Virginia is a public research university in Charlottesville, Virginia. It was founded in 1819 by Thomas Jefferson and is classified as a UNESCO World Heritage Site.",
    courses: [
      { name: "B.S. in Systems Engineering", duration: "4 Years", fees: 52000 },
      { name: "B.A. in Government", duration: "4 Years", fees: 50000 },
      { name: "M.S. in Business Analytics", duration: "1 Year", fees: 46000 }
    ],
    reviews: [
      { userName: "Cville Fan", rating: 5, comment: "The Rotunda and the Lawn are historic. UVA has a very unique student-run honor system that shapes campus culture.", date: "2026-04-12" }
    ],
    amenities: ["Jeffersonian Rotunda", "The Lawn", "Alderman Library", "Scott Stadium", "Aquatic & Fitness Center"],
    rank: 26,
    website: "https://www.virginia.edu"
  },
  {
    id: "utaustin",
    name: "University of Texas at Austin",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Austin, TX",
    rating: 4.8,
    feesPerYear: 40000,
    type: "Public",
    established: 1883,
    placementRate: 93,
    avgPackage: 88000,
    description: "The University of Texas at Austin is a public research university in Austin, Texas. Founded in 1883, UT Austin is the flagship institution of the University of Texas System and a major hub for tech placements.",
    courses: [
      { name: "B.S. in Computer Science (Turing Scholars)", duration: "4 Years", fees: 40000 },
      { name: "B.B.A. in Finance (McCombs)", duration: "4 Years", fees: 42000 },
      { name: "M.S. in Computer Science", duration: "2 Years", fees: 38000 }
    ],
    reviews: [
      { userName: "HookEm", rating: 5, comment: "Hook 'em Horns! McCombs and Cockrell engineering are top tier. Austin tech boom means jobs are everywhere.", date: "2026-05-18" }
    ],
    amenities: ["UT Tower", "Perry-Castañeda Library", "McCombs Business Building", "Darrell K Royal Stadium", "Gregory Gym"],
    rank: 27,
    website: "https://www.utexas.edu"
  },
  {
    id: "uwseattle",
    name: "University of Washington",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Seattle, WA",
    rating: 4.8,
    feesPerYear: 39900,
    type: "Public",
    established: 1861,
    placementRate: 92,
    avgPackage: 87000,
    description: "The University of Washington is a public research university in Seattle, Washington. Founded in 1861, UW is one of the oldest universities on the West Coast and is famous for its medical and computer science schools.",
    courses: [
      { name: "B.S. in Computer Science (Allen School)", duration: "4 Years", fees: 39900 },
      { name: "B.S. in Bioengineering", duration: "4 Years", fees: 39900 },
      { name: "Ph.D. in Computer Science", duration: "5 Years", fees: 34000 }
    ],
    reviews: [
      { userName: "RainyDay", rating: 5, comment: "Cherry blossoms in the Quad during spring are magical. The Paul G. Allen CSE school is heavily recruited by Microsoft and Amazon.", date: "2026-03-24" }
    ],
    amenities: ["Suzzallo Library (Gothic Reading Room)", "The Quad Cherry Blossoms", "Husky Stadium", "Intramural Activities Building", "Rainier Vista"],
    rank: 28,
    website: "https://www.washington.edu"
  },
  {
    id: "gatech",
    name: "Georgia Institute of Technology",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Atlanta, GA",
    rating: 4.8,
    feesPerYear: 31300,
    type: "Public",
    established: 1885,
    placementRate: 94,
    avgPackage: 94000,
    description: "The Georgia Institute of Technology is a public research university and institute of technology in Atlanta, Georgia. It is a highly ranked tech school in the United States and has multiple satellite campuses.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 31300 },
      { name: "B.S. in Aerospace Engineering", duration: "4 Years", fees: 31300 },
      { name: "M.S. in Cybersecurity", duration: "1.5 Years", fees: 28500 }
    ],
    reviews: [
      { userName: "Buzz Tech", rating: 5, comment: "Very tough curriculum but extremely high return on investment. Tech recruiters respect a Georgia Tech degree immensely.", date: "2026-04-10" }
    ],
    amenities: ["Clough Commons", "Klaus Advanced Computing", "CRC Recreation Center", "Bobby Dodd Stadium", "Student Center Commons"],
    rank: 29,
    website: "https://www.gatech.edu"
  },
  {
    id: "uiuc",
    name: "University of Illinois Urbana-Champaign",
    logo: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Urbana, IL",
    rating: 4.7,
    feesPerYear: 34500,
    type: "Public",
    established: 1867,
    placementRate: 93,
    avgPackage: 89000,
    description: "The University of Illinois Urbana-Champaign is a public land-grant research university in Illinois. Founded in 1867, UIUC is the flagship institution of the University of Illinois system and holds one of the top CS programs globally.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 34500 },
      { name: "B.S. in Computer Engineering", duration: "4 Years", fees: 34500 },
      { name: "M.S. in Computer Science", duration: "2 Years", fees: 31000 }
    ],
    reviews: [
      { userName: "Grainger CS", rating: 5, comment: "Grainger engineering library is huge. UIUC is a supercomputing hub and highly connected to tech recruiters globally.", date: "2026-04-18" }
    ],
    amenities: ["Grainger Library", "Illini Union", "Memorial Stadium", "State Farm Center", "Activities Recreation Center"],
    rank: 30,
    website: "https://illinois.edu"
  },
  {
    id: "purdue",
    name: "Purdue University",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "West Lafayette, IN",
    rating: 4.7,
    feesPerYear: 28800,
    type: "Public",
    established: 1869,
    placementRate: 92,
    avgPackage: 82000,
    description: "Purdue University is a public land-grant research university in West Lafayette, Indiana. Founded in 1869, Purdue is renowned for its engineering programs, aviation school, and historical association with spaceflight.",
    courses: [
      { name: "B.S. in Aerospace Engineering", duration: "4 Years", fees: 28800 },
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 28800 },
      { name: "M.S. in Mechanical Engineering", duration: "2 Years", fees: 26000 }
    ],
    reviews: [
      { userName: "BoilerMaker", rating: 5, comment: "Purdue engineering lives up to its reputation. Cradle of Astronauts represents our history in space exploration.", date: "2026-03-15" }
    ],
    amenities: ["Purdue Memorial Union", "Hicks Undergraduate Library", "Mackey Arena", "Ross-Ade Stadium", "Purdue Airport"],
    rank: 31,
    website: "https://www.purdue.edu"
  },
  {
    id: "utoronto",
    name: "University of Toronto",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Toronto, Canada",
    rating: 4.7,
    feesPerYear: 45000,
    type: "Public",
    established: 1827,
    placementRate: 91,
    avgPackage: 85000,
    description: "The University of Toronto is a public research university in Toronto, Ontario, Canada. Founded by royal charter in 1827 as King's College, it was the first institution of higher learning in Upper Canada.",
    courses: [
      { name: "B.Sc. in Computer Science", duration: "4 Years", fees: 45000 },
      { name: "B.A.Sc. in Engineering Science", duration: "4 Years", fees: 47500 },
      { name: "Master of Science in Applied Computing", duration: "1.5 Years", fees: 42000 }
    ],
    reviews: [
      { userName: "UofT Kid", rating: 5, comment: "Very large campus right in downtown Toronto. Highly academic and competitive. The library system is massive.", date: "2026-05-01" }
    ],
    amenities: ["Downtown Campus (St. George)", "Robarts Library", "Hart House", "Varsity Stadium", "Goldring Center"],
    rank: 32,
    website: "https://www.utoronto.ca"
  },
  {
    id: "ethz",
    name: "ETH Zurich",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Zurich, Switzerland",
    rating: 4.8,
    feesPerYear: 32000,
    type: "Public",
    established: 1855,
    placementRate: 93,
    avgPackage: 98000,
    description: "ETH Zurich is a public research university in Zürich, Switzerland. Founded by the Swiss federal government in 1855, the school focuses exclusively on science, technology, engineering, and mathematics.",
    courses: [
      { name: "B.Sc. in Computer Science", duration: "3 Years", fees: 32000 },
      { name: "M.Sc. in Computer Science", duration: "2 Years", fees: 34000 }
    ],
    reviews: [
      { userName: "Swiss Tech", rating: 5, comment: "Incredibly cheap tuition compared to US colleges, but the workload is massive and exams are highly filter-oriented.", date: "2026-04-20" }
    ],
    amenities: ["Zürich Campus", "ETH Library", "ASVZ Sports Center", "Science Hub", "High-Performance Computing Center"],
    rank: 33,
    website: "https://ethz.ch"
  },
  {
    id: "ucl",
    name: "University College London (UCL)",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "London, UK",
    rating: 4.7,
    feesPerYear: 45000,
    type: "Public",
    established: 1826,
    placementRate: 91,
    avgPackage: 88000,
    description: "University College London is a public research university in London, United Kingdom. It is a member institution of the federal University of London and the second-largest university in the United Kingdom by total enrolment.",
    courses: [
      { name: "B.Sc. in Computer Science", duration: "3 Years", fees: 45000 },
      { name: "B.Sc. in Economics", duration: "3 Years", fees: 42000 },
      { name: "M.Sc. in Machine Learning", duration: "1 Year", fees: 49000 }
    ],
    reviews: [
      { userName: "Jeremy B", rating: 5, comment: "Fantastic location in central London. The CS program is highly analytical and deeply rooted in AI research.", date: "2026-04-12" }
    ],
    amenities: ["Bloomsbury Campus", "UCL Library Services", "Student Central", "Science Labs", "Bloomsbury Theatre"],
    rank: 34,
    website: "https://www.ucl.ac.uk"
  },
  {
    id: "nus",
    name: "National University of Singapore (NUS)",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Singapore",
    rating: 4.8,
    feesPerYear: 38000,
    type: "Public",
    established: 1905,
    placementRate: 94,
    avgPackage: 96000,
    description: "The National University of Singapore is a national public research university in Singapore. Founded in 1905 as the Straits Settlements and Federated Malay States Government Medical School, NUS is the oldest higher education institution in Singapore.",
    courses: [
      { name: "Bachelor of Computing in Computer Science", duration: "4 Years", fees: 38000 },
      { name: "B.Eng. in Electrical Engineering", duration: "4 Years", fees: 37000 },
      { name: "Master of Computing", duration: "1.5 Years", fees: 41000 }
    ],
    reviews: [
      { userName: "Lee Min", rating: 5, comment: "Incredible campus life at UTown. Academic rigor is extremely high, but the global opportunities are fantastic.", date: "2026-05-02" }
    ],
    amenities: ["University Town (UTown)", "Yusof Ishak House", "NUS Libraries", "Olympic Pool", "On-campus Shuttle"],
    rank: 35,
    website: "https://nus.edu.sg"
  },
  {
    id: "tsinghua",
    name: "Tsinghua University",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Beijing, China",
    rating: 4.8,
    feesPerYear: 30000,
    type: "Public",
    established: 1911,
    placementRate: 95,
    avgPackage: 92000,
    description: "Tsinghua University is a major public research university in Beijing, China, and a member of the C9 League. It is consistently ranked as one of the best academic institutions in Asia.",
    courses: [
      { name: "B.S. in Computer Science and Technology", duration: "4 Years", fees: 30000 },
      { name: "B.Eng. in Electronic Engineering", duration: "4 Years", fees: 30000 },
      { name: "M.S. in Advanced Computing", duration: "2 Years", fees: 32000 }
    ],
    reviews: [
      { userName: "Wei Zhang", rating: 5, comment: "Top tier in China and globally. The coding contest culture here (like Tsinghua ICPC) is intensely competitive.", date: "2026-04-18" }
    ],
    amenities: ["Tsinghua Science Park", "Historic Gardens", "Sports Centers", "Huge Library System", "Student Dining Halls"],
    rank: 36,
    website: "https://www.tsinghua.edu.cn"
  },
  {
    id: "ntu",
    name: "Nanyang Technological University (NTU)",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Singapore",
    rating: 4.7,
    feesPerYear: 36500,
    type: "Public",
    established: 1991,
    placementRate: 93,
    avgPackage: 91000,
    description: "Nanyang Technological University is a national public research university in Singapore. It is the second oldest autonomous university in the country and is highly ranked for engineering and technology.",
    courses: [
      { name: "B.Eng. in Computer Science", duration: "4 Years", fees: 36500 },
      { name: "B.Eng. in Materials Engineering", duration: "4 Years", fees: 35000 },
      { name: "M.S. in Artificial Intelligence", duration: "1 Year", fees: 40000 }
    ],
    reviews: [
      { userName: "Tan Kah", rating: 5, comment: "The Hive building is architectural art. Engineering labs are top-notch with great industry partnerships.", date: "2026-03-29" }
    ],
    amenities: ["The Hive", "Yunnan Garden Campus", "NTU Library", "Robotics Research Centre", "Student Residences"],
    rank: 37,
    website: "https://www.ntu.edu.sg"
  },
  {
    id: "sorbonne",
    name: "Sorbonne University",
    logo: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Paris, France",
    rating: 4.6,
    feesPerYear: 28000,
    type: "Public",
    established: 1257,
    placementRate: 89,
    avgPackage: 78000,
    description: "Sorbonne University is a public research university located in Paris, France, established in 1257 by Robert de Sorbon. It is one of the most prestigious universities in Europe and the French-speaking world.",
    courses: [
      { name: "B.Sc. in Computer Science", duration: "3 Years", fees: 28000 },
      { name: "B.Sc. in Mathematics", duration: "3 Years", fees: 26000 },
      { name: "M.Sc. in Bioinformatics", duration: "2 Years", fees: 30000 }
    ],
    reviews: [
      { userName: "Pierre L", rating: 4, comment: "Rich history and incredible architecture in the Latin Quarter. Program is very theoretical.", date: "2026-02-15" }
    ],
    amenities: ["Latin Quarter Campus", "Sorbonne Library", "Marie Curie Campus", "Student Clubs", "Cultural Center"],
    rank: 38,
    website: "https://www.sorbonne-universite.fr"
  },
  {
    id: "tokyo",
    name: "University of Tokyo",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Tokyo, Japan",
    rating: 4.8,
    feesPerYear: 26000,
    type: "Public",
    established: 1877,
    placementRate: 94,
    avgPackage: 85000,
    description: "The University of Tokyo, abbreviated as Todai, is a public research university located in Bunkyo, Tokyo, Japan. Established in 1877, it is the first imperial university and one of Japan's most prestigious institutions.",
    courses: [
      { name: "B.S. in Information Science", duration: "4 Years", fees: 26000 },
      { name: "B.Eng. in Mechanical Engineering", duration: "4 Years", fees: 26000 },
      { name: "M.S. in Computer Science", duration: "2 Years", fees: 28000 }
    ],
    reviews: [
      { userName: "Kenji Sato", rating: 5, comment: "Todai has an amazing reputation in Japan. The Hongo campus is beautiful, especially during autumn when the ginkgo leaves turn gold.", date: "2026-05-10" }
    ],
    amenities: ["Hongo Campus", "Sanshiro Pond", "General Library", "University Museum", "Ginkgo Avenue"],
    rank: 39,
    website: "https://www.u-tokyo.ac.jp"
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Melbourne, Australia",
    rating: 4.7,
    feesPerYear: 39000,
    type: "Public",
    established: 1853,
    placementRate: 90,
    avgPackage: 81000,
    description: "The University of Melbourne is a public research university located in Melbourne, Australia. Founded in 1853, it is Australia's second oldest university and the oldest in Victoria.",
    courses: [
      { name: "Bachelor of Science in Computing and Software Systems", duration: "3 Years", fees: 39000 },
      { name: "Bachelor of Design", duration: "3 Years", fees: 37500 },
      { name: "Master of Information Technology", duration: "2 Years", fees: 42000 }
    ],
    reviews: [
      { userName: "Sarah M", rating: 5, comment: "The campus is a great mix of historic sandstone and ultra-modern buildings. Melbourne is also a fantastic city to live in.", date: "2026-03-22" }
    ],
    amenities: ["Southbank Campus", "Baillieu Library", "Melbourne University Sport", "Student Union", "Research Labs"],
    rank: 40,
    website: "https://www.unimelb.edu.au"
  },
  {
    id: "anu",
    name: "Australian National University (ANU)",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Canberra, Australia",
    rating: 4.7,
    feesPerYear: 37500,
    type: "Public",
    established: 1946,
    placementRate: 91,
    avgPackage: 83000,
    description: "The Australian National University is a national public research university located in Canberra, the capital of Australia. Its main campus in Acton encompasses seven teaching and research colleges.",
    courses: [
      { name: "Bachelor of Advanced Computing (Honours)", duration: "4 Years", fees: 37500 },
      { name: "Bachelor of Finance", duration: "3 Years", fees: 36000 },
      { name: "Master of Computing", duration: "2 Years", fees: 40000 }
    ],
    reviews: [
      { userName: "Jack H", rating: 5, comment: "Outstanding research focus. The professors are top-tier and the computing facilities are excellent.", date: "2026-04-05" }
    ],
    amenities: ["Acton Campus", "Chifley Library", "Supercomputer Gadi Access", "ANU Sport", "Student Accommodation"],
    rank: 41,
    website: "https://www.anu.edu.au"
  },
  {
    id: "sydney",
    name: "University of Sydney",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Sydney, Australia",
    rating: 4.7,
    feesPerYear: 41000,
    type: "Public",
    established: 1850,
    placementRate: 92,
    avgPackage: 84000,
    description: "The University of Sydney is a public research university in Sydney, Australia. Founded in 1850, it is Australia's first university and is regarded as one of the world's leading universities.",
    courses: [
      { name: "Bachelor of Advanced Computing", duration: "4 Years", fees: 41000 },
      { name: "Bachelor of Commerce", duration: "3 Years", fees: 39500 },
      { name: "Master of Data Science", duration: "1.5 Years", fees: 43000 }
    ],
    reviews: [
      { userName: "Emily S", rating: 5, comment: "Beautiful neo-gothic quadrangle that looks like Hogwarts. Excellent career fairs and links to Sydney's business center.", date: "2026-03-14" }
    ],
    amenities: ["Camperdown Campus", "Fisher Library", "USyd Sport & Fitness", "Macleay Museum", "Student Union Hub"],
    rank: 42,
    website: "https://www.sydney.edu.au"
  },
  {
    id: "mcgill",
    name: "McGill University",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Montreal, Canada",
    rating: 4.7,
    feesPerYear: 42000,
    type: "Public",
    established: 1821,
    placementRate: 91,
    avgPackage: 86000,
    description: "McGill University is a public research university in Montreal, Quebec, Canada. Founded in 1821 by royal charter, the university bears the name of James McGill, a prominent Montreal merchant.",
    courses: [
      { name: "B.Sc. in Computer Science", duration: "4 Years", fees: 42000 },
      { name: "B.Eng. in Software Engineering", duration: "4 Years", fees: 44000 },
      { name: "M.Sc. in Computer Science", duration: "2 Years", fees: 39000 }
    ],
    reviews: [
      { userName: "Antoine L", rating: 5, comment: "Montreal is a great student city. McGill has highly rigorous science programs and a very diverse student body.", date: "2026-04-20" }
    ],
    amenities: ["Downtown Campus", "Macdonald Campus", "McLennan Library", "Redpath Museum", "Athletics Complex"],
    rank: 43,
    website: "https://www.mcgill.ca"
  },
  {
    id: "ubc",
    name: "University of British Columbia (UBC)",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Vancouver, Canada",
    rating: 4.7,
    feesPerYear: 41500,
    type: "Public",
    established: 1908,
    placementRate: 92,
    avgPackage: 85000,
    description: "The University of British Columbia is a public research university with campuses in Vancouver and Kelowna, British Columbia. Established in 1908, UBC is British Columbia's oldest university.",
    courses: [
      { name: "B.Sc. in Computer Science", duration: "4 Years", fees: 41500 },
      { name: "B.A. in International Relations", duration: "4 Years", fees: 38000 },
      { name: "Master of Data Science", duration: "1 Year", fees: 46000 }
    ],
    reviews: [
      { userName: "Chloe W", rating: 5, comment: "Beautiful campus surrounded by beaches and forests. The CS coop program is amazing for getting internships.", date: "2026-05-11" }
    ],
    amenities: ["Vancouver Campus", "Irving K. Barber Learning Centre", "UBC Aquatic Centre", "Museum of Anthropology", "Botanical Garden"],
    rank: 44,
    website: "https://www.ubc.ca"
  },
  {
    id: "nyu",
    name: "New York University (NYU)",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "New York, NY",
    rating: 4.7,
    feesPerYear: 60500,
    type: "Private",
    established: 1831,
    placementRate: 92,
    avgPackage: 98000,
    description: "New York University is a private research university in New York City. Chartered in 1831 by the New York State Legislature, NYU was founded by a group of New Yorkers led by Albert Gallatin.",
    courses: [
      { name: "B.S. in Computer Science (Courant)", duration: "4 Years", fees: 60500 },
      { name: "B.F.A. in Film and Television (Tisch)", duration: "4 Years", fees: 62000 },
      { name: "M.S. in Data Science", duration: "2 Years", fees: 58000 }
    ],
    reviews: [
      { userName: "NYC Student", rating: 5, comment: "The city is your campus. Greenwich Village is a beautiful place to learn, and the internship access is unbeatable.", date: "2026-04-18" }
    ],
    amenities: ["Washington Square Park Campus", "Bobst Library", "Kimmel Center", "Tisch School Hall", "Courant Institute"],
    rank: 45,
    website: "https://www.nyu.edu"
  },
  {
    id: "cmu",
    name: "Carnegie Mellon University (CMU)",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1200",
    location: "Pittsburgh, PA",
    rating: 4.9,
    feesPerYear: 61300,
    type: "Private",
    established: 1900,
    placementRate: 96,
    avgPackage: 118000,
    description: "Carnegie Mellon University is a private research university based in Pittsburgh, Pennsylvania. Founded in 1900 by Andrew Carnegie, the school is famous for its School of Computer Science.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 61300 },
      { name: "B.S. in Artificial Intelligence", duration: "4 Years", fees: 61300 },
      { name: "Master of Computational Data Science (MCDS)", duration: "1.5 Years", fees: 64000 }
    ],
    reviews: [
      { userName: "Tartan CS", rating: 5, comment: "CMU CS is the absolute best. Incredibly intense, but you will learn a massive amount and get recruited by top firms.", date: "2026-03-30" }
    ],
    amenities: ["Gates Center for Computer Science", "Hunt Library", "Cohon University Center", "Robotics Institute", "Drama Theater"],
    featured: true,
    rank: 46,
    website: "https://www.cmu.edu"
  },
  {
    id: "usc",
    name: "University of Southern California (USC)",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Los Angeles, CA",
    rating: 4.7,
    feesPerYear: 63400,
    type: "Private",
    established: 1880,
    placementRate: 92,
    avgPackage: 96000,
    description: "The University of Southern California is a private research university in Los Angeles, California. Founded in 1880, it is the oldest private research university in California.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 63400 },
      { name: "B.S. in Business Administration (Marshall)", duration: "4 Years", fees: 63400 },
      { name: "M.S. in Computer Science (Game Development)", duration: "2 Years", fees: 60000 }
    ],
    reviews: [
      { userName: "Trojan Pride", rating: 5, comment: "The Trojan Family network is real and extremely strong in LA and beyond. Excellent school spirit!", date: "2026-05-02" }
    ],
    amenities: ["USC Village", "Leavey Library", "Galen Center", "Los Angeles Memorial Coliseum", "Cinematic Arts Complex"],
    rank: 47,
    website: "https://www.usc.edu"
  },
  {
    id: "bu",
    name: "Boston University",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Boston, MA",
    rating: 4.6,
    feesPerYear: 61000,
    type: "Private",
    established: 1839,
    placementRate: 91,
    avgPackage: 90000,
    description: "Boston University is a private research university in Boston, Massachusetts. The university is nonsectarian, but has been historically affiliated with the United Methodist Church.",
    courses: [
      { name: "B.A. in Computer Science", duration: "4 Years", fees: 61000 },
      { name: "B.S. in Business Administration (Questrom)", duration: "4 Years", fees: 61000 },
      { name: "M.S. in Software Development", duration: "1.5 Years", fees: 55000 }
    ],
    reviews: [
      { userName: "Terrier", rating: 5, comment: "Beautiful campus running along the Charles River. Boston is the ultimate college town and has tons of startups.", date: "2026-04-10" }
    ],
    amenities: ["Charles River Campus", "Mugar Memorial Library", "FitRec Center", "Agganis Arena", "Questrom Building"],
    rank: 48,
    website: "https://www.bu.edu"
  },
  {
    id: "umiami",
    name: "University of Miami",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Coral Gables, FL",
    rating: 4.6,
    feesPerYear: 58000,
    type: "Private",
    established: 1925,
    placementRate: 90,
    avgPackage: 88000,
    description: "The University of Miami is a private research university in Coral Gables, Florida. As of 2026, the university enrolls approximately 19,000 students in 12 separate colleges.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 58000 },
      { name: "B.S. in Marine Science", duration: "4 Years", fees: 59000 },
      { name: "MBA", duration: "2 Years", fees: 62000 }
    ],
    reviews: [
      { userName: "CaneLife", rating: 5, comment: "Incredible campus with a lake in the center. The marine biology program is one of the best due to the location.", date: "2026-03-12" }
    ],
    amenities: ["Coral Gables Campus", "Richter Library", "Lakeside Village", "Herbert Wellness Center", "Rosenstiel School Access"],
    rank: 49,
    website: "https://welcome.miami.edu"
  },
  {
    id: "wisconsin",
    name: "University of Wisconsin-Madison",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Madison, WI",
    rating: 4.7,
    feesPerYear: 39000,
    type: "Public",
    established: 1848,
    placementRate: 91,
    avgPackage: 84000,
    description: "The University of Wisconsin-Madison is a public land-grant research university in Madison, Wisconsin. Founded when Wisconsin achieved statehood in 1848, UW-Madison is the official state university of Wisconsin.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 39000 },
      { name: "B.S. in Mechanical Engineering", duration: "4 Years", fees: 39000 },
      { name: "M.S. in Computer Sciences", duration: "2 Years", fees: 36000 }
    ],
    reviews: [
      { userName: "BadgerFan", rating: 5, comment: "Terrace sunsets at Memorial Union are the best! Academics are extremely solid, particularly in CS and biochemistry.", date: "2026-05-12" }
    ],
    amenities: ["Memorial Union Terrace", "Memorial Library", "Camp Randall Stadium", "Kohl Center", "Lakeshore Nature Preserve"],
    rank: 50,
    website: "https://www.wisc.edu"
  },
  {
    id: "ohio",
    name: "Ohio State University",
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Columbus, OH",
    rating: 4.6,
    feesPerYear: 35000,
    type: "Public",
    established: 1870,
    placementRate: 90,
    avgPackage: 80000,
    description: "The Ohio State University is a public land-grant research university in Columbus, Ohio. Founded in 1870 as a land-grant university, Ohio State is the third-largest university campus in the United States.",
    courses: [
      { name: "B.S. in Computer Science & Engineering", duration: "4 Years", fees: 35000 },
      { name: "B.S. in Business Administration (Fisher)", duration: "4 Years", fees: 36000 },
      { name: "M.S. in Electrical and Computer Engineering", duration: "2 Years", fees: 32000 }
    ],
    reviews: [
      { userName: "Buckeye", rating: 5, comment: "Massive campus with endless opportunities. The school pride here is out of this world, especially during football season.", date: "2026-04-02" }
    ],
    amenities: ["Thompson Library", "Ohio Stadium", "RPAC Fitness Center", "Fisher Hall", "Wexner Center for the Arts"],
    rank: 51,
    website: "https://www.osu.edu"
  },
  {
    id: "pennstate",
    name: "Penn State University",
    logo: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "University Park, PA",
    rating: 4.6,
    feesPerYear: 38000,
    type: "Public",
    established: 1855,
    placementRate: 90,
    avgPackage: 81000,
    description: "The Pennsylvania State University is a public state-related land-grant research university with campuses and facilities throughout Pennsylvania. Founded in 1855, Penn State's flagship campus is at University Park.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 38000 },
      { name: "B.S. in Supply Chain & Information Systems", duration: "4 Years", fees: 38000 },
      { name: "M.S. in Information Sciences and Technology", duration: "2 Years", fees: 34000 }
    ],
    reviews: [
      { userName: "NittanyLion", rating: 5, comment: "State College is a true college town. Penn State has one of the largest alumni networks in the world, which is great for jobs.", date: "2026-03-20" }
    ],
    amenities: ["Pattee and Paterno Library", "Beaver Stadium", "Penn State Creamery", "Bryce Jordan Center", "Hub-Robeson Center"],
    rank: 52,
    website: "https://www.psu.edu"
  },
  {
    id: "minnesota",
    name: "University of Minnesota Twin Cities",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Minneapolis, MN",
    rating: 4.6,
    feesPerYear: 36000,
    type: "Public",
    established: 1851,
    placementRate: 89,
    avgPackage: 82000,
    description: "The University of Minnesota, Twin Cities is a public land-grant research university in the Twin Cities of Minneapolis and Saint Paul, Minnesota. The Twin Cities campus is the oldest and largest in the University of Minnesota system.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 36000 },
      { name: "B.B.A. (Carlson School of Management)", duration: "4 Years", fees: 37500 },
      { name: "M.S. in Data Science", duration: "1.5 Years", fees: 33000 }
    ],
    reviews: [
      { userName: "Gopher", rating: 5, comment: "Beautiful campus that straddles the Mississippi River. Very strong engineering and business programs.", date: "2026-04-12" }
    ],
    amenities: ["Walter Library", "Huntington Bank Stadium", "Recwell Center", "Carlson School Building", "Mississippi River Paths"],
    rank: 53,
    website: "https://twin-cities.umn.edu"
  },
  {
    id: "tamu",
    name: "Texas A&M University",
    logo: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "College Station, TX",
    rating: 4.7,
    feesPerYear: 40000,
    type: "Public",
    established: 1876,
    placementRate: 92,
    avgPackage: 86000,
    description: "Texas A&M University is a public land-grant research university in College Station, Texas. It was founded in 1876 and became the flagship institution of the Texas A&M University System in 1948.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 40000 },
      { name: "B.S. in Petroleum Engineering", duration: "4 Years", fees: 42000 },
      { name: "M.S. in Management Information Systems", duration: "2 Years", fees: 35000 }
    ],
    reviews: [
      { userName: "AggieLand", rating: 5, comment: "Gig 'em! The Aggie Honor Code and traditions make this school incredibly unique. Engineering programs are highly respected.", date: "2026-05-18" }
    ],
    amenities: ["Evans Library", "Kyle Field", "Student Recreation Center", "Memorial Student Center", "Zachry Engineering Complex"],
    rank: 54,
    website: "https://www.tamu.edu"
  },
  {
    id: "rutgers",
    name: "Rutgers University",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=150&h=150&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "New Brunswick, NJ",
    rating: 4.6,
    feesPerYear: 33000,
    type: "Public",
    established: 1766,
    placementRate: 90,
    avgPackage: 82000,
    description: "Rutgers University–New Brunswick is a public land-grant research university in New Brunswick and Piscataway, New Jersey. Chartered in 1766, Rutgers is the eighth-oldest college in the United States.",
    courses: [
      { name: "B.S. in Computer Science", duration: "4 Years", fees: 33000 },
      { name: "B.A. in Economics", duration: "4 Years", fees: 31000 },
      { name: "M.S. in Computer Science", duration: "2 Years", fees: 29500 }
    ],
    reviews: [
      { userName: "ScarletKnight", rating: 4, comment: "Huge university spread across multiple campuses. Excellent proximity to NYC and Philly for jobs.", date: "2026-03-24" }
    ],
    amenities: ["Alexander Library", "SHI Stadium", "Werblin Recreation Center", "Rutgers Student Center", "Busch Campus Labs"],
    rank: 55,
    website: "https://newbrunswick.rutgers.edu"
  }
];

async function main() {
  console.log("Start seeding...");

  // Delete existing records
  await prisma.review.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.college.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed Colleges, Courses, and Reviews
  for (const col of MOCK_COLLEGES) {
    await prisma.college.create({
      data: {
        id: col.id,
        name: col.name,
        logo: col.logo,
        bannerImage: col.bannerImage,
        location: col.location,
        rating: col.rating,
        reviewsCount: col.reviews.length,
        feesPerYear: col.feesPerYear,
        type: col.type,
        established: col.established,
        placementRate: col.placementRate,
        avgPackage: col.avgPackage,
        description: col.description,
        website: col.website,
        rank: col.rank,
        featured: col.featured || false,
        amenities: col.amenities,
        courses: {
          create: col.courses,
        },
        reviews: {
          create: col.reviews.map((rev) => ({
            userName: rev.userName,
            rating: rev.rating,
            comment: rev.comment,
            date: rev.date,
          })),
        },
      },
    });
  }

  // Create a default user for testing/login
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@uniscope.com",
      password: hashedPassword,
    },
  });

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

