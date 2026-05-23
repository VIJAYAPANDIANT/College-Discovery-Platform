import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const MOCK_COLLEGES = [
  {
    id: "mit",
    name: "Massachusetts Institute of Technology (MIT)",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Cambridge, MA",
    rating: 4.9,
    fees: 59750,
    placementRate: 97,
    overview: "The Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts. Established in 1861, MIT has played a key role in the development of modern science, engineering, mathematics, and technology.",
    courses: [
      { courseName: "B.S. in Computer Science & Engineering", duration: "4 Years" },
      { courseName: "B.S. in Electrical Engineering", duration: "4 Years" },
      { courseName: "M.S. in Media Arts and Sciences", duration: "2 Years" },
      { courseName: "Ph.D. in Physics", duration: "5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "An unmatched academic atmosphere. The collaboration and projects here push your boundaries. Highly recommend the CSE program." },
      { rating: 5, comment: "Excellent career fairs and networking opportunities. It is intense, but the resources provided are top-tier." }
    ]
  },
  {
    id: "stanford",
    name: "Stanford University",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Stanford, CA",
    rating: 4.9,
    fees: 61730,
    placementRate: 96,
    overview: "Located in the heart of Silicon Valley, Stanford University is one of the world's leading teaching and research institutions. It is known for its entrepreneurial character, academic strength, and wealth.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Economics", duration: "4 Years" },
      { courseName: "MBA (Master of Business Administration)", duration: "2 Years" },
      { courseName: "M.S. in Symbolic Systems", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Being in Silicon Valley gives Stanford an unparalleled advantage. Startups, tech giants, venture capital are literally right outside the campus." },
      { rating: 4, comment: "Beautiful campus and outstanding faculty. The interdisciplinary research culture is highly supported here." }
    ]
  },
  {
    id: "harvard",
    name: "Harvard University",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Cambridge, MA",
    rating: 4.8,
    fees: 57260,
    placementRate: 95,
    overview: "Harvard University is the oldest institution of higher learning in the United States, established in 1636. Harvard is devoted to excellence in teaching, learning, and research, and to developing leaders in many disciplines.",
    courses: [
      { courseName: "B.A. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Government", duration: "4 Years" },
      { courseName: "Master of Laws (LL.M.)", duration: "1 Year" },
      { courseName: "Master in Public Policy (MPP)", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "The prestige is real, but so is the workload. The alumni network is incredibly powerful and opens doors globally." }
    ]
  },
  {
    id: "caltech",
    name: "California Institute of Technology (Caltech)",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Pasadena, CA",
    rating: 4.7,
    fees: 60810,
    placementRate: 94,
    overview: "Caltech is a world-renowned science and engineering institute that marshals some of the world's brightest minds and most innovative tools to address fundamental scientific questions and pressing societal challenges.",
    courses: [
      { courseName: "B.S. in Physics", duration: "4 Years" },
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "M.S. in Aeronautics", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Very small class sizes. You get to do actual research with professors from your very first year. Highly quantitative and challenging." }
    ]
  },
  {
    id: "berkeley",
    name: "University of California, Berkeley",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Berkeley, CA",
    rating: 4.8,
    fees: 44000,
    placementRate: 93,
    overview: "The University of California, Berkeley is a public research university in Berkeley, California. Founded in 1868 as the state's first land-grant university, Berkeley is consistently ranked among the top public universities in the world.",
    courses: [
      { courseName: "B.A. in Computer Science", duration: "4 Years" },
      { courseName: "B.S. in Business Administration", duration: "4 Years" },
      { courseName: "M.S. in Computer Science", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Berkeley CSE is legendary. The competitive atmosphere can be stressful, but it shapes you into a top-tier engineer." }
    ]
  },
  {
    id: "oxford",
    name: "University of Oxford",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Oxford, UK",
    rating: 4.9,
    fees: 48500,
    placementRate: 95,
    overview: "The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world.",
    courses: [
      { courseName: "B.A. in Computer Science", duration: "3 Years" },
      { courseName: "B.A. in Philosophy, Politics and Economics (PPE)", duration: "3 Years" },
      { courseName: "M.Sc. in Advanced Computer Science", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "The tutorial system is incredible. Personal attention from world experts weekly. History is embedded in every wall." }
    ]
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Cambridge, UK",
    rating: 4.8,
    fees: 51000,
    placementRate: 94,
    overview: "Founded in 1209, the University of Cambridge is a collegiate research university in Cambridge, United Kingdom. Cambridge is the world's third-oldest surviving university.",
    courses: [
      { courseName: "BA Hons in Computer Science", duration: "3 Years" },
      { courseName: "BA Hons in Engineering", duration: "3 Years" },
      { courseName: "Master of Advanced Study (MASt) in Mathematics", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "Excellent training ground for mathematical sciences. Cambridge's tradition of academic rigor is alive and well." }
    ]
  },
  {
    id: "columbia",
    name: "Columbia University",
    image: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1200",
    location: "New York, NY",
    rating: 4.7,
    fees: 63500,
    placementRate: 93,
    overview: "Columbia University is a private Ivy League research university in New York City. Established in 1754 as King's College on the grounds of Trinity Church in Manhattan, Columbia is the oldest institution of higher education in New York.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Political Science", duration: "4 Years" },
      { courseName: "M.S. in Data Science", duration: "1.5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Studying in Manhattan is a unique experience. Amazing opportunities for internships and jobs, especially in finance and media." }
    ]
  },
  {
    id: "princeton",
    name: "Princeton University",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Princeton, NJ",
    rating: 4.9,
    fees: 59710,
    placementRate: 95,
    overview: "Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746 in Elizabeth as the College of New Jersey, Princeton is the fourth-oldest institution of higher education in the United States.",
    courses: [
      { courseName: "A.B. in Computer Science", duration: "4 Years" },
      { courseName: "B.S.E. in Operations Research & Financial Engineering", duration: "4 Years" },
      { courseName: "Ph.D. in Mathematics", duration: "5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "The mathematics department here is legendary. Intense, focused, and absolutely rewarding." }
    ]
  },
  {
    id: "yale",
    name: "Yale University",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "New Haven, CT",
    rating: 4.8,
    fees: 62250,
    placementRate: 94,
    overview: "Yale University is a private Ivy League research university in New Haven, Connecticut. Founded in 1701 as the Collegiate School, it is the third-oldest institution of higher education in the United States.",
    courses: [
      { courseName: "B.A. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Political Science", duration: "4 Years" },
      { courseName: "J.D. (Doctor of Law)", duration: "3 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Excellent law school and humanities courses. The residential college system makes it feel like home." }
    ]
  },
  {
    id: "uchicago",
    name: "University of Chicago",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Chicago, IL",
    rating: 4.8,
    fees: 64260,
    placementRate: 93,
    overview: "The University of Chicago is a private research university in Chicago, Illinois. Located in the Hyde Park neighborhood, UChicago has been at the forefront of multiple scientific, economic, and political fields.",
    courses: [
      { courseName: "B.A. in Economics", duration: "4 Years" },
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "Ph.D. in Economics", duration: "5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "The Chicago School of Economics is famous for a reason. Strict academic rigor and deep analytical foundations." }
    ]
  },
  {
    id: "imperial",
    name: "Imperial College London",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "London, UK",
    rating: 4.7,
    fees: 46500,
    placementRate: 92,
    overview: "Imperial College London is a public research university in London, United Kingdom. It focuses exclusively on science, technology, medicine, and business, and is consistently ranked among the top universities globally.",
    courses: [
      { courseName: "B.Eng. in Computing", duration: "3 Years" },
      { courseName: "B.Sc. in Physics", duration: "3 Years" },
      { courseName: "M.Sc. in Advanced Computing", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "Amazing computing and engineering programs. Being in South Kensington gives you great access to London's museum district." }
    ]
  },
  {
    id: "upenn",
    name: "University of Pennsylvania",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Philadelphia, PA",
    rating: 4.8,
    fees: 63500,
    placementRate: 94,
    overview: "The University of Pennsylvania is a private Ivy League research university in Philadelphia, Pennsylvania. Founded in 1740 by Benjamin Franklin, UPenn is one of the nine colonial colleges chartered before the U.S. Declaration of Independence.",
    courses: [
      { courseName: "B.S. in Economics (Wharton)", duration: "4 Years" },
      { courseName: "B.S.E. in Computer Science", duration: "4 Years" },
      { courseName: "Master of Biotechnology", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Wharton Business School is unmatched. An incredible alumni base and great opportunities in banking." }
    ]
  },
  {
    id: "cornell",
    name: "Cornell University",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Ithaca, NY",
    rating: 4.7,
    fees: 62450,
    placementRate: 93,
    overview: "Cornell University is a private Ivy League research university in Ithaca, New York. Founded in 1865 by Ezra Cornell and Andrew Dickson White, Cornell was intended to teach and make contributions in all fields of knowledge.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.S. in Hotel Administration", duration: "4 Years" },
      { courseName: "M.Eng. in Computer Science", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "Beautiful gorges and campus. Highly rigorous, but the hotel administration school is world-famous." }
    ]
  },
  {
    id: "jhu",
    name: "Johns Hopkins University",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Baltimore, MD",
    rating: 4.8,
    fees: 60480,
    placementRate: 92,
    overview: "Johns Hopkins University is a private research university in Baltimore, Maryland. Founded in 1876, JHU was the first American research university and is renowned for its medical, nursing, and public health schools.",
    courses: [
      { courseName: "B.S. in Biomedical Engineering", duration: "4 Years" },
      { courseName: "B.A. in International Studies", duration: "4 Years" },
      { courseName: "Master of Public Health (MPH)", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "The BME program is the best in the nation. Access to JHU Hospital provides unmatched clinical opportunities." }
    ]
  },
  {
    id: "duke",
    name: "Duke University",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Durham, NC",
    rating: 4.8,
    fees: 60400,
    placementRate: 93,
    overview: "Duke University is a private research university in Durham, North Carolina. Founded by Methodists and Quakers in the present-day town of Trinity in 1838, the school moved to Durham in 1892.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Public Policy", duration: "4 Years" },
      { courseName: "M.S. in Global Health", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Duke Basketball atmosphere is insane! Academics are top notch and the campus chapel is beautiful." }
    ]
  },
  {
    id: "northwestern",
    name: "Northwestern University",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Evanston, IL",
    rating: 4.7,
    fees: 62390,
    placementRate: 93,
    overview: "Northwestern University is a private research university in Evanston, Illinois. Founded in 1851, Northwestern is the oldest chartered university in Illinois and is widely known for its journalism and business schools.",
    courses: [
      { courseName: "B.S. in Journalism (Medill)", duration: "4 Years" },
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "MBA (Kellogg School of Management)", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Medill has the absolute best journalism network in the world. Being right next to Lake Michigan is a scenic plus." }
    ]
  },
  {
    id: "dartmouth",
    name: "Dartmouth College",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Hanover, NH",
    rating: 4.7,
    fees: 60680,
    placementRate: 93,
    overview: "Dartmouth College is a private Ivy League research university in Hanover, New Hampshire. Established in 1769, it is the ninth-oldest institution of higher education in the United States and one of the nine colonial colleges.",
    courses: [
      { courseName: "A.B. in Computer Science", duration: "4 Years" },
      { courseName: "A.B. in Economics", duration: "4 Years" },
      { courseName: "B.E. in Engineering Sciences", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Incredible undergraduate focus. Tucked away in New Hampshire, it has a tight-knit and passionate alumni community." }
    ]
  },
  {
    id: "brown",
    name: "Brown University",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Providence, RI",
    rating: 4.8,
    fees: 62680,
    placementRate: 93,
    overview: "Brown University is a private Ivy League research university in Providence, Rhode Island. It is the seventh-oldest institution of higher education in the United States and is famous for its Open Curriculum.",
    courses: [
      { courseName: "Sc.B. in Computer Science", duration: "4 Years" },
      { courseName: "A.B. in Applied Mathematics", duration: "4 Years" },
      { courseName: "Sc.M. in Data Science", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "The Open Curriculum is freeing! You can explore courses without stressful distribution requirements. Best Ivy by far." }
    ]
  },
  {
    id: "vanderbilt",
    name: "Vanderbilt University",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Nashville, TN",
    rating: 4.7,
    fees: 58130,
    placementRate: 92,
    overview: "Vanderbilt University is a private research university in Nashville, Tennessee. Founded in 1873, it was named in honor of shipping and rail magnate Cornelius Vanderbilt, who provided the school its initial endowment.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Economics", duration: "4 Years" },
      { courseName: "M.S. in Finance", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "Nashville is an amazing city! The campus is an arboretum, very green and beautiful. Academics are top-notch." }
    ]
  },
  {
    id: "rice",
    name: "Rice University",
    image: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1200",
    location: "Houston, TX",
    rating: 4.8,
    fees: 54100,
    placementRate: 93,
    overview: "Rice University is a private research university in Houston, Texas. Located on a 300-acre campus near the Houston Museum District and adjacent to the Texas Medical Center, Rice is known for its undergraduate focus.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Architecture", duration: "5 Years" },
      { courseName: "Ph.D. in Bioengineering", duration: "5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Very small class sizes and a unique residential college system similar to Oxford/Yale. Houston food scene is close by." }
    ]
  },
  {
    id: "washu",
    name: "Washington University in St. Louis",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "St. Louis, MO",
    rating: 4.7,
    fees: 59420,
    placementRate: 92,
    overview: "Washington University in St. Louis is a private research university with its main campus mostly in St. Louis County, and Forest Park, Missouri. Founded in 1853, JHU is named after George Washington.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.F.A. in Communication Design", duration: "4 Years" },
      { courseName: "MD (Doctor of Medicine)", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Beautiful collegiate gothic campus. The food program here is ranked #1 in the country, and dorms are like hotels." }
    ]
  },
  {
    id: "ucla",
    name: "University of California, Los Angeles (UCLA)",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Los Angeles, CA",
    rating: 4.8,
    fees: 43000,
    placementRate: 92,
    overview: "The University of California, Los Angeles is a public research university in Los Angeles, California. Founded in 1919, UCLA is the second-oldest campus of the University of California system and a top public university.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Psychology", duration: "4 Years" },
      { courseName: "MBA (Anderson School of Management)", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Westwood is a safe and beautiful area. Food in the dining halls is amazing. Academics are hard, but social life is great." }
    ]
  },
  {
    id: "umich",
    name: "University of Michigan",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Ann Arbor, MI",
    rating: 4.8,
    fees: 53200,
    placementRate: 93,
    overview: "The University of Michigan is a public research university in Ann Arbor, Michigan. Founded in 1817 in Detroit as the Catholepistemiad, the university was moved to Ann Arbor in 1837.",
    courses: [
      { courseName: "B.S.E. in Computer Science", duration: "4 Years" },
      { courseName: "B.B.A. (Ross School of Business)", duration: "4 Years" },
      { courseName: "M.S. in Data Science", duration: "1.5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Ann Arbor is the best college town in America! School pride is unmatched, especially on game days at the Big House." }
    ]
  },
  {
    id: "unc",
    name: "University of North Carolina at Chapel Hill",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Chapel Hill, NC",
    rating: 4.7,
    fees: 36000,
    placementRate: 91,
    overview: "The University of North Carolina at Chapel Hill is a public research university in Chapel Hill, North Carolina. It is the flagship of the University of North Carolina system and is chartered as the first public university.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Media & Journalism", duration: "4 Years" },
      { courseName: "MBA (Kenan-Flagler)", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Tar Heel pride is everywhere! The campus is gorgeous, especially in the spring with the Old Well in bloom." }
    ]
  },
  {
    id: "uva",
    name: "University of Virginia",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Charlottesville, VA",
    rating: 4.7,
    fees: 52000,
    placementRate: 92,
    overview: "The University of Virginia is a public research university in Charlottesville, Virginia. It was founded in 1819 by Thomas Jefferson and is classified as a UNESCO World Heritage Site.",
    courses: [
      { courseName: "B.S. in Systems Engineering", duration: "4 Years" },
      { courseName: "B.A. in Government", duration: "4 Years" },
      { courseName: "M.S. in Business Analytics", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "The Rotunda and the Lawn are historic. UVA has a very unique student-run honor system that shapes campus culture." }
    ]
  },
  {
    id: "utaustin",
    name: "University of Texas at Austin",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Austin, TX",
    rating: 4.8,
    fees: 40000,
    placementRate: 93,
    overview: "The University of Texas at Austin is a public research university in Austin, Texas. Founded in 1883, UT Austin is the flagship institution of the University of Texas System and a major hub for tech placements.",
    courses: [
      { courseName: "B.S. in Computer Science (Turing Scholars)", duration: "4 Years" },
      { courseName: "B.B.A. in Finance (McCombs)", duration: "4 Years" },
      { courseName: "M.S. in Computer Science", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Hook 'em Horns! McCombs and Cockrell engineering are top tier. Austin tech boom means jobs are everywhere." }
    ]
  },
  {
    id: "uwseattle",
    name: "University of Washington",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Seattle, WA",
    rating: 4.8,
    fees: 39900,
    placementRate: 92,
    overview: "The University of Washington is a public research university in Seattle, Washington. Founded in 1861, UW is one of the oldest universities on the West Coast and is famous for its medical and computer science schools.",
    courses: [
      { courseName: "B.S. in Computer Science (Allen School)", duration: "4 Years" },
      { courseName: "B.S. in Bioengineering", duration: "4 Years" },
      { courseName: "Ph.D. in Computer Science", duration: "5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Cherry blossoms in the Quad during spring are magical. The Paul G. Allen CSE school is heavily recruited by Microsoft and Amazon." }
    ]
  },
  {
    id: "gatech",
    name: "Georgia Institute of Technology",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Atlanta, GA",
    rating: 4.8,
    fees: 31300,
    placementRate: 94,
    overview: "The Georgia Institute of Technology is a public research university and institute of technology in Atlanta, Georgia. It is a highly ranked tech school in the United States and has multiple satellite campuses.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.S. in Aerospace Engineering", duration: "4 Years" },
      { courseName: "M.S. in Cybersecurity", duration: "1.5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Very tough curriculum but extremely high return on investment. Tech recruiters respect a Georgia Tech degree immensely." }
    ]
  },
  {
    id: "uiuc",
    name: "University of Illinois Urbana-Champaign",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Urbana, IL",
    rating: 4.7,
    fees: 34500,
    placementRate: 93,
    overview: "The University of Illinois Urbana-Champaign is a public land-grant research university in Illinois. Founded in 1867, UIUC is the flagship institution of the University of Illinois system and holds one of the top CS programs globally.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.S. in Computer Engineering", duration: "4 Years" },
      { courseName: "M.S. in Computer Science", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Grainger engineering library is huge. UIUC is a supercomputing hub and highly connected to tech recruiters globally." }
    ]
  },
  {
    id: "purdue",
    name: "Purdue University",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "West Lafayette, IN",
    rating: 4.7,
    fees: 28800,
    placementRate: 92,
    overview: "Purdue University is a public land-grant research university in West Lafayette, Indiana. Founded in 1869, Purdue is renowned for its engineering programs, aviation school, and historical association with spaceflight.",
    courses: [
      { courseName: "B.S. in Aerospace Engineering", duration: "4 Years" },
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "M.S. in Mechanical Engineering", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Purdue engineering lives up to its reputation. Cradle of Astronauts represents our history in space exploration." }
    ]
  },
  {
    id: "utoronto",
    name: "University of Toronto",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Toronto, Canada",
    rating: 4.7,
    fees: 45000,
    placementRate: 91,
    overview: "The University of Toronto is a public research university in Toronto, Ontario, Canada. Founded by royal charter in 1827 as King's College, it was the first institution of higher learning in Upper Canada.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "4 Years" },
      { courseName: "B.A.Sc. in Engineering Science", duration: "4 Years" },
      { courseName: "Master of Science in Applied Computing", duration: "1.5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Very large campus right in downtown Toronto. Highly academic and competitive. The library system is massive." }
    ]
  },
  {
    id: "ethz",
    name: "ETH Zurich",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Zurich, Switzerland",
    rating: 4.8,
    fees: 32000,
    placementRate: 93,
    overview: "ETH Zurich is a public research university in Zürich, Switzerland. Founded by the Swiss federal government in 1855, the school focuses exclusively on science, technology, engineering, and mathematics.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "3 Years" },
      { courseName: "M.Sc. in Computer Science", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Incredibly cheap tuition compared to US colleges, but the workload is massive and exams are highly filter-oriented." }
    ]
  },
  {
    id: "ucl",
    name: "University College London (UCL)",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "London, UK",
    rating: 4.7,
    fees: 45000,
    placementRate: 91,
    overview: "University College London is a public research university in London, United Kingdom. It is a member institution of the federal University of London and the second-largest university in the United Kingdom by total enrolment.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "3 Years" },
      { courseName: "B.Sc. in Economics", duration: "3 Years" },
      { courseName: "M.Sc. in Machine Learning", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "Fantastic location in central London. The CS program is highly analytical and deeply rooted in AI research." }
    ]
  },
  {
    id: "nus",
    name: "National University of Singapore (NUS)",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Singapore",
    rating: 4.8,
    fees: 38000,
    placementRate: 94,
    overview: "The National University of Singapore is a national public research university in Singapore. Founded in 1905 as the Straits Settlements and Federated Malay States Government Medical School, NUS is the oldest higher education institution in Singapore.",
    courses: [
      { courseName: "Bachelor of Computing in Computer Science", duration: "4 Years" },
      { courseName: "B.Eng. in Electrical Engineering", duration: "4 Years" },
      { courseName: "Master of Computing", duration: "1.5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Incredible campus life at UTown. Academic rigor is extremely high, but the global opportunities are fantastic." }
    ]
  },
  {
    id: "tsinghua",
    name: "Tsinghua University",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Beijing, China",
    rating: 4.8,
    fees: 30000,
    placementRate: 95,
    overview: "Tsinghua University is a major public research university in Beijing, China, and a member of the C9 League. It is consistently ranked as one of the best academic institutions in Asia.",
    courses: [
      { courseName: "B.S. in Computer Science and Technology", duration: "4 Years" },
      { courseName: "B.Eng. in Electronic Engineering", duration: "4 Years" },
      { courseName: "M.S. in Advanced Computing", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Top tier in China and globally. The coding contest culture here (like Tsinghua ICPC) is intensely competitive." }
    ]
  },
  {
    id: "ntu",
    name: "Nanyang Technological University (NTU)",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Singapore",
    rating: 4.7,
    fees: 36500,
    placementRate: 93,
    overview: "Nanyang Technological University is a national public research university in Singapore. It is the second oldest autonomous university in the country and is highly ranked for engineering and technology.",
    courses: [
      { courseName: "B.Eng. in Computer Science", duration: "4 Years" },
      { courseName: "B.Eng. in Materials Engineering", duration: "4 Years" },
      { courseName: "M.S. in Artificial Intelligence", duration: "1 Year" }
    ],
    reviews: [
      { rating: 5, comment: "The Hive building is architectural art. Engineering labs are top-notch with great industry partnerships." }
    ]
  },
  {
    id: "sorbonne",
    name: "Sorbonne University",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Paris, France",
    rating: 4.6,
    fees: 28000,
    placementRate: 89,
    overview: "Sorbonne University is a public research university located in Paris, France, established in 1257 by Robert de Sorbon. It is one of the most prestigious universities in Europe and the French-speaking world.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "3 Years" },
      { courseName: "B.Sc. in Mathematics", duration: "3 Years" },
      { courseName: "M.Sc. in Bioinformatics", duration: "2 Years" }
    ],
    reviews: [
      { rating: 4, comment: "Rich history and incredible architecture in the Latin Quarter. Program is very theoretical." }
    ]
  },
  {
    id: "tokyo",
    name: "University of Tokyo",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Tokyo, Japan",
    rating: 4.8,
    fees: 26000,
    placementRate: 94,
    overview: "The University of Tokyo, abbreviated as Todai, is a public research university located in Bunkyo, Tokyo, Japan. Established in 1877, it is the first imperial university and one of Japan's most prestigious institutions.",
    courses: [
      { courseName: "B.S. in Information Science", duration: "4 Years" },
      { courseName: "B.Eng. in Mechanical Engineering", duration: "4 Years" },
      { courseName: "M.S. in Computer Science", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Todai has an amazing reputation in Japan. The Hongo campus is beautiful, especially during autumn when the ginkgo leaves turn gold." }
    ]
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Melbourne, Australia",
    rating: 4.7,
    fees: 39000,
    placementRate: 90,
    overview: "The University of Melbourne is a public research university located in Melbourne, Australia. Founded in 1853, it is Australia's second oldest university and the oldest in Victoria.",
    courses: [
      { courseName: "Bachelor of Science in Computing and Software Systems", duration: "3 Years" },
      { courseName: "Bachelor of Design", duration: "3 Years" },
      { courseName: "Master of Information Technology", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "The campus is a great mix of historic sandstone and ultra-modern buildings. Melbourne is also a fantastic city to live in." }
    ]
  },
  {
    id: "monash",
    name: "Monash University",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Melbourne, Australia",
    rating: 4.6,
    fees: 38500,
    placementRate: 89,
    overview: "Monash University is a public research university based in Melbourne, Australia. Named after the prominent World War I general Sir John Monash, it is one of the top universities in the country.",
    courses: [
      { courseName: "Bachelor of Computer Science", duration: "3 Years" },
      { courseName: "Bachelor of Business", duration: "3 Years" }
    ],
    reviews: [
      { rating: 4, comment: "Very large student community with great modern facilities and library spaces." }
    ]
  },
  {
    id: "kyoto",
    name: "Kyoto University",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Kyoto, Japan",
    rating: 4.8,
    fees: 25000,
    placementRate: 93,
    overview: "Kyoto University is a public research university located in Kyoto, Japan. Established in 1897, it is the second oldest Japanese university and is famous for its research-focused culture.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "4 Years" },
      { courseName: "M.Sc. in Engineering Science", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Incredible academic freedom and excellent scientific research groups." }
    ]
  },
  {
    id: "snu",
    name: "Seoul National University",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Seoul, South Korea",
    rating: 4.7,
    fees: 24000,
    placementRate: 92,
    overview: "Seoul National University is a national research university located in Seoul, South Korea. Founded in 1946, it is widely considered the most prestigious university in South Korea.",
    courses: [
      { courseName: "B.S. in Computer Science & Engineering", duration: "4 Years" },
      { courseName: "B.A. in Business Administration", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Top university in Korea. The campus is surrounded by mountains, very scenic and great for studying." }
    ]
  },
  {
    id: "kaist",
    name: "KAIST (Korea Advanced Institute of Science & Technology)",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Daejeon, South Korea",
    rating: 4.8,
    fees: 28000,
    placementRate: 95,
    overview: "KAIST is a public research university located in Daejeon, South Korea. It was established by the Korean government in 1971 as the nation's first research-oriented science and engineering institution.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "M.S. in Robotics Engineering", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Highly intensive courses, but amazing research funding and state-of-the-art labs." }
    ]
  },
  {
    id: "pku",
    name: "Peking University",
    image: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1200",
    location: "Beijing, China",
    rating: 4.8,
    fees: 31000,
    placementRate: 94,
    overview: "Peking University is a major research university in Beijing, China, and a member of the elite C9 League. Established in 1898, it is famous for its beautiful traditional Chinese gardens.",
    courses: [
      { courseName: "B.S. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in International Relations", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Outstanding academic reputation and beautiful imperial-style gardens on campus." }
    ]
  },
  {
    id: "hku",
    name: "University of Hong Kong (HKU)",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Hong Kong",
    rating: 4.7,
    fees: 42000,
    placementRate: 91,
    overview: "The University of Hong Kong is a public research university in Hong Kong. Founded in 1911, it is the oldest tertiary institution in Hong Kong and is highly ranked for business and law.",
    courses: [
      { courseName: "Bachelor of Engineering in Computer Science", duration: "4 Years" },
      { courseName: "Bachelor of Business Administration", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Very international student environment with top class lecturers and great career links." }
    ]
  },
  {
    id: "hkust",
    name: "Hong Kong University of Science and Technology (HKUST)",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Hong Kong",
    rating: 4.7,
    fees: 39500,
    placementRate: 92,
    overview: "HKUST is a public research university in Clear Water Bay, Hong Kong. Established in 1991, the university is highly ranked for engineering, business, and science.",
    courses: [
      { courseName: "B.Eng. in Computer Engineering", duration: "4 Years" },
      { courseName: "B.Sc. in Quantitative Finance", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Stunning seaside campus with great engineering and entrepreneurship programs." }
    ]
  },
  {
    id: "cuhk",
    name: "Chinese University of Hong Kong (CUHK)",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Hong Kong",
    rating: 4.6,
    fees: 38000,
    placementRate: 90,
    overview: "The Chinese University of Hong Kong is a public research university in Sha Tin, Hong Kong. It is the territory's second-oldest university and is structured as a collegiate university.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "4 Years" },
      { courseName: "B.A. in Translation", duration: "4 Years" }
    ],
    reviews: [
      { rating: 4, comment: "Very green and large campus with high academic requirements." }
    ]
  },
  {
    id: "lmu",
    name: "LMU Munich",
    image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200",
    location: "Munich, Germany",
    rating: 4.6,
    fees: 18000,
    placementRate: 88,
    overview: "Ludwig Maximilian University of Munich is a public research university located in Munich, Germany. It is the second-largest university in Germany by student population and is highly prestigious.",
    courses: [
      { courseName: "B.Sc. in Informatics", duration: "3 Years" },
      { courseName: "M.Sc. in Software Engineering", duration: "2 Years" }
    ],
    reviews: [
      { rating: 4, comment: "Great location in Munich with very affordable student costs, although admin can be slow." }
    ]
  },
  {
    id: "heidelberg",
    name: "Heidelberg University",
    image: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1200",
    location: "Heidelberg, Germany",
    rating: 4.7,
    fees: 19000,
    placementRate: 89,
    overview: "Heidelberg University is a public research university in Heidelberg, Baden-Württemberg, Germany. Founded in 1386 on instruction of Pope Urban VI, it is Germany's oldest university.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "3 Years" },
      { courseName: "M.Sc. in Scientific Computing", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "A classic university city with incredible history, scenic castle, and superb medical/science programs." }
    ]
  },
  {
    id: "delft",
    name: "Delft University of Technology (TU Delft)",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Delft, Netherlands",
    rating: 4.8,
    fees: 22000,
    placementRate: 93,
    overview: "Delft University of Technology is the oldest and largest Dutch public technological university, located in Delft, Netherlands. It is consistently ranked as one of the best engineering schools in Europe.",
    courses: [
      { courseName: "B.Sc. in Computer Science and Engineering", duration: "3 Years" },
      { courseName: "M.Sc. in Aerospace Engineering", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "World-class engineering labs, great design workspace, and a very active student community." }
    ]
  },
  {
    id: "uva_nl",
    name: "University of Amsterdam",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Amsterdam, Netherlands",
    rating: 4.7,
    fees: 24500,
    placementRate: 91,
    overview: "The University of Amsterdam is a public research university located in Amsterdam, Netherlands. Established in 1632, it is the third-oldest university in the Netherlands.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "3 Years" },
      { courseName: "B.Sc. in Communication Science", duration: "3 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Superb location in the middle of Amsterdam. The courses are modern and highly research-focused." }
    ]
  },
  {
    id: "kth",
    name: "KTH Royal Institute of Technology",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Stockholm, Sweden",
    rating: 4.7,
    fees: 26000,
    placementRate: 91,
    overview: "KTH Royal Institute of Technology is a public research university in Stockholm, Sweden. KTH conducts research and education in engineering and technology, and is Sweden's largest technical university.",
    courses: [
      { courseName: "B.Sc. in Information and Communication Technology", duration: "3 Years" },
      { courseName: "M.Sc. in Machine Learning", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Incredible student union culture and great connections to Stockholm's vibrant tech hub." }
    ]
  },
  {
    id: "psl",
    name: "Université PSL (Paris Sciences & Lettres)",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Paris, France",
    rating: 4.7,
    fees: 27500,
    placementRate: 90,
    overview: "Université PSL is a public research university based in Paris, France. Established in 2010, it is a collegiate university composed of highly prestigious constituent schools (such as ENS and Mines Paris).",
    courses: [
      { courseName: "Bachelor in Computer Science", duration: "3 Years" },
      { courseName: "Master in Applied Mathematics", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Elite French institution with small group sizes and highly customized research paths." }
    ]
  },
  {
    id: "polytechnique",
    name: "École Polytechnique",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Palaiseau, France",
    rating: 4.8,
    fees: 32000,
    placementRate: 94,
    overview: "École Polytechnique, commonly known as l'X, is a public institution of higher education and research in Palaiseau, France. It is the most prestigious engineering school in France.",
    courses: [
      { courseName: "Bachelor of Science in Mathematics and Computer Science", duration: "3 Years" },
      { courseName: "Ingénieur Polytechnicien Program", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Highly rigorous, military-like tradition and an extremely elite network in France." }
    ]
  },
  {
    id: "epfl",
    name: "EPFL (École Polytechnique Fédérale de Lausanne)",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Lausanne, Switzerland",
    rating: 4.8,
    fees: 33000,
    placementRate: 94,
    overview: "EPFL is a public research university located in Lausanne, Switzerland, specializing in natural sciences and engineering. It is one of the two Swiss Federal Institutes of Technology.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "3 Years" },
      { courseName: "M.Sc. in Data Science", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Beautiful campus next to Lake Geneva. The engineering standard is exceptionally high." }
    ]
  },
  {
    id: "hebrew",
    name: "Hebrew University of Jerusalem",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Jerusalem, Israel",
    rating: 4.6,
    fees: 15000,
    placementRate: 88,
    overview: "The Hebrew University of Jerusalem is a public research university in Jerusalem, Israel. Founded in 1918 by prominent scholars including Albert Einstein, it is Israel's second-oldest university.",
    courses: [
      { courseName: "B.Sc. in Computer Science", duration: "3 Years" },
      { courseName: "B.A. in Psychology", duration: "3 Years" }
    ],
    reviews: [
      { rating: 4, comment: "Excellent academic standards with very deep research histories, especially in science." }
    ]
  },
  {
    id: "technion",
    name: "Technion - Israel Institute of Technology",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Haifa, Israel",
    rating: 4.7,
    fees: 17500,
    placementRate: 92,
    overview: "Technion is a public research university in Haifa, Israel. Established in 1912, it is the oldest university in the country and is known as a major driver of the 'Startup Nation' tech ecosystem.",
    courses: [
      { courseName: "B.Sc. in Computer Engineering", duration: "4 Years" },
      { courseName: "M.Sc. in Electrical Engineering", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "The engineering courses are extremely tough, but it pays off completely in terms of job placements." }
    ]
  },
  {
    id: "iitb",
    name: "Indian Institute of Technology Bombay (IITB)",
    image: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1200",
    location: "Mumbai, India",
    rating: 4.8,
    fees: 12000,
    placementRate: 96,
    overview: "IIT Bombay is a public research university located in Powai, Mumbai, India. Established in 1958, it is a premier institute of national importance and highly competitive to get into.",
    courses: [
      { courseName: "B.Tech. in Computer Science & Engineering", duration: "4 Years" },
      { courseName: "B.Tech. in Electrical Engineering", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "The campus life at Powai Lake is amazing. Competitive coding environment and placements are exceptional." }
    ]
  },
  {
    id: "iitd",
    name: "Indian Institute of Technology Delhi (IITD)",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "New Delhi, India",
    rating: 4.8,
    fees: 12000,
    placementRate: 95,
    overview: "IIT Delhi is a public research university located in Hauz Khas, New Delhi, India. Established in 1961, it is consistently ranked among the top engineering colleges in India.",
    courses: [
      { courseName: "B.Tech. in Computer Science & Engineering", duration: "4 Years" },
      { courseName: "M.Tech. in Data Science", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Hauz Khas location is very convenient. Outstanding coding culture and campus tech festivals." }
    ]
  },
  {
    id: "iitm",
    name: "Indian Institute of Technology Madras (IITM)",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Chennai, India",
    rating: 4.8,
    fees: 11800,
    placementRate: 95,
    overview: "IIT Madras is a public research university in Chennai, Tamil Nadu, India. Established in 1959 with technical assistance from the West German government, it holds the top rank in NIRF.",
    courses: [
      { courseName: "B.Tech. in Computer Science", duration: "4 Years" },
      { courseName: "Dual Degree (B.Tech + M.Tech) in Data Science", duration: "5 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Lush green campus with wildlife on campus. Excellent research facilities and outstanding alumni network." }
    ]
  },
  {
    id: "iitkgp",
    name: "Indian Institute of Technology Kharagpur (IITKGP)",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Kharagpur, India",
    rating: 4.7,
    fees: 11500,
    placementRate: 93,
    overview: "IIT Kharagpur is a public research university established by the government of India in 1951. It is the oldest of the IITs and has the largest campus area.",
    courses: [
      { courseName: "B.Tech. in Computer Science & Engineering", duration: "4 Years" },
      { courseName: "B.Tech. in Aerospace Engineering", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Massive campus with a historic background. The college culture (Spring Fest and Kshitij) is outstanding." }
    ]
  },
  {
    id: "iisc",
    name: "Indian Institute of Science (IISc)",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "Bangalore, India",
    rating: 4.9,
    fees: 10000,
    placementRate: 96,
    overview: "Indian Institute of Science is a public, deemed research university for higher education and scientific research in Bangalore, India. Established in 1909 with support from Jamsetji Tata.",
    courses: [
      { courseName: "Bachelor of Science (Research)", duration: "4 Years" },
      { courseName: "M.Tech. in Artificial Intelligence", duration: "2 Years" }
    ],
    reviews: [
      { rating: 5, comment: "The absolute best place in India for scientific research. Green campus and world-renowned professors." }
    ]
  },
  {
    id: "bits",
    name: "BITS Pilani (Birla Institute of Technology and Science)",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    location: "Pilani, India",
    rating: 4.7,
    fees: 26000,
    placementRate: 94,
    overview: "BITS Pilani is a private deemed university in Pilani, Rajasthan, India. It focuses primarily on higher education in engineering and sciences and has a unique 'zero attendance policy'.",
    courses: [
      { courseName: "B.E. in Computer Science", duration: "4 Years" },
      { courseName: "B.E. in Mechanical Engineering", duration: "4 Years" }
    ],
    reviews: [
      { rating: 5, comment: "Zero attendance policy is amazing for self-study and startup incubation. Practice school program gives industry exposure." }
    ]
  },
  {
    id: "delhi",
    name: "University of Delhi",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1200",
    location: "New Delhi, India",
    rating: 4.5,
    fees: 8000,
    placementRate: 85,
    overview: "The University of Delhi, informally known as Delhi University, is a collegiate public central university located in New Delhi, India. It was founded in 1922.",
    courses: [
      { courseName: "B.Sc. (Hons) in Computer Science", duration: "3 Years" },
      { courseName: "B.Com. (Hons)", duration: "3 Years" }
    ],
    reviews: [
      { rating: 4, comment: "North campus has an amazing vibe and highly prestigious colleges like SRCC and St. Stephen's." }
    ]
  },
  {
    id: "manipal",
    name: "Manipal Academy of Higher Education",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    location: "Manipal, India",
    rating: 4.5,
    fees: 24000,
    placementRate: 88,
    overview: "Manipal Academy of Higher Education is a private deemed university located in Manipal, Karnataka, India. The university also has campuses in Mangalore, Bangalore, Jamshedpur, Malacca, and Dubai.",
    courses: [
      { courseName: "B.Tech. in Computer Science & Engineering", duration: "4 Years" },
      { courseName: "B.Tech. in Data Science", duration: "4 Years" }
    ],
    reviews: [
      { rating: 4, comment: "Beautiful student town. Excellent hostel life and modern campus facilities." }
    ]
  },
  {
    id: "vit",
    name: "Vellore Institute of Technology (VIT)",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200",
    location: "Vellore, India",
    rating: 4.5,
    fees: 21000,
    placementRate: 90,
    overview: "Vellore Institute of Technology is a private deemed university located in Vellore, Tamil Nadu, India. Founded in 1984 as Vellore Engineering College, the institute offers 66 undergraduate programs.",
    courses: [
      { courseName: "B.Tech. in Computer Science", duration: "4 Years" },
      { courseName: "B.Tech. in Information Technology", duration: "4 Years" }
    ],
    reviews: [
      { rating: 4, comment: "Massive campus with strict rules, but highly active coding clubs and exceptional placement numbers." }
    ]
  }
];

async function main() {
  console.log("Start database seeding...");

  // Delete existing records to allow re-runs
  await prisma.review.deleteMany({});
  await prisma.savedCollege.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.college.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      name: "Alex Johnson",
      email: "alex@uniscope.com",
      passwordHash: await bcrypt.hash("password123", 10),
    }
  });
  const user2 = await prisma.user.create({
    data: {
      name: "Samantha Lin",
      email: "samantha@uniscope.com",
      passwordHash: await bcrypt.hash("password123", 10),
    }
  });
  const user3 = await prisma.user.create({
    data: {
      name: "Elena Rostova",
      email: "elena@uniscope.com",
      passwordHash: await bcrypt.hash("password123", 10),
    }
  });
  const user4 = await prisma.user.create({
    data: {
      name: "Marcus Aurelius",
      email: "marcus@uniscope.com",
      passwordHash: await bcrypt.hash("password123", 10),
    }
  });
  const user5 = await prisma.user.create({
    data: {
      name: "David Kim",
      email: "david@uniscope.com",
      passwordHash: await bcrypt.hash("password123", 10),
    }
  });
  const users = [user1, user2, user3, user4, user5];

  // Seed Colleges, Courses, and Reviews
  for (const col of MOCK_COLLEGES) {
    await prisma.college.create({
      data: {
        id: col.id,
        name: col.name,
        location: col.location,
        fees: col.fees,
        rating: col.rating,
        overview: col.overview,
        placementRate: col.placementRate,
        image: col.image,
        courses: {
          create: col.courses,
        },
        reviews: {
          create: col.reviews.map((rev, index) => {
            // Distribute reviews amongst seeded users
            const user = users[index % users.length];
            return {
              userId: user.id,
              rating: rev.rating,
              comment: rev.comment,
            };
          }),
        },
      },
    });
    console.log(`Seeded college: ${col.name}`);
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
