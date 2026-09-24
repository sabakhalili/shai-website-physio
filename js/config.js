/**
 * Site configuration — the ONLY file that should need editing for day-to-day
 * content updates (contact details, links, services). See README.md for the
 * full list of placeholders that still need her real information before
 * this site goes live.
 *
 * Every value below marked "REPLACE_ME" or "TODO(real-content)" is a
 * placeholder — swap it for real content before sharing the site.
 */
window.SITE_CONFIG = {
  businessName: "Dr. Shaiqua Khalili (PT)",
  tagline: "Movement is Medicine",
  heroSubhead: "Pain free living starts here",

  // TODO(real-content): city served
  city: "Your City",

  // WhatsApp number, digits only, with country code, no +/spaces/dashes.
  whatsappNumber: "919821423419",
  whatsappMessage: "Hi, I'd like to book a home visit.",

  // Phone number for the tel: link, in international format.
  phoneNumber: "+919821423419",
  phoneDisplay: "+91 98214 23419",

  email: "shaiquakhalili@gmail.com",

  serviceHours: "Mon–Sat, 9:00 AM – 7:00 PM",

  // Qualification pills shown in the About credentials strip.
  credentials: [
    "BPT (Jamia Millia Islamia)",
    "MPT (Sports)",
    "Diploma in Nutrition & Dietetics (Jamia Hamdard)",
    "5+ years of experience",
  ],

  // Rendered as separate paragraphs in the About section.
  aboutText: [
    "I am a passionate physiotherapist, a health and wellness " +
      "practitioner, and a nutritionist. I believe in healing, helping, " +
      "and giving back to the community. I also address the social " +
      "problems affecting my patients' well-being and focus on their " +
      "mental health.",
    "I have successfully treated a wide range of musculoskeletal, " +
      "neurological, post-surgical, sports injury, and ergonomics " +
      "conditions in both clinic and home care setups. I also work on " +
      "women's health, geriatrics, and paediatrics.",
  ],

  // TODO(real-content): confirm this final list of services with her.
  // Rendered as a 3-column grid on desktop — any number of cards works.
  services: [
    {
      title: "Pain Management",
      description:
        "I help patients manage pain resulting from underlying " +
        "musculoskeletal pathology, using a thorough assessment process. " +
        "Each treatment plan is tailored to the individual's specific " +
        "condition and activity level, with the goal of restoring " +
        "pain-free movement and preventing recurrence.",
    },
    {
      title: "Post-Surgery Rehab",
      description:
        "I support patients through every stage of post-surgical " +
        "recovery, from early mobilization to full return to activity, " +
        "following procedures such as joint replacements, ligament " +
        "reconstructions, and orthopedic surgeries.",
    },
    {
      title: "Sports Injury",
      description:
        "Recovery plans to help you return to your sport safely, " +
        "strongly, and with confidence, with a focus on injury " +
        "prevention and reduced risk of re-injury.",
    },
    {
      title: "Women's Health",
      description:
        "Safe, effective fitness and physiotherapy programs tailored to " +
        "each stage of a woman's journey, including antenatal, " +
        "pregnancy, and postnatal care, and the musculoskeletal effects " +
        "of hormonal changes.",
    },
    {
      title: "Healthy Ageing",
      description:
        "Helping the geriatric population stay strong, steady, and " +
        "independent by focusing on balance, strength, and functional " +
        "mobility, and reducing the chance of falls and disuse.",
    },
    {
      title: "Ergonomics & Posture",
      description:
        "Postural assessment, targeted exercises, and practical " +
        "ergonomic adjustments to your workspace to reduce pain and " +
        "prevent related long-term issues.",
    },
  ],

  // Testimonials, migrated verbatim (full text, unedited) from her
  // previous Weebly site. `photo` is optional — cards render fine without
  // one.
  testimonials: [
    {
      name: "Arfa Khanum Sherwani",
      title: "Sr. Editor, The Wire",
      quote:
        "Shaiqua is a thorough professional. She has great command over " +
        "her subject and operates from a place of confidence, efficiency " +
        "and empathy. She is sincere and at times goes beyond the line " +
        "of duty to make sure her clients feel instantly better and " +
        "lead a pain free life afterwards. Her passion for her work and " +
        "deep understanding of human body generates confidence and " +
        "reassurance amongst people being treated by her. I wish her " +
        "good luck in her endeavors.",
      photo: "assets/testimonials/arfa-khanum-sherwani.jpg",
    },
    {
      name: "Mr K James",
      title: "",
      quote:
        "We have been using Shaiqua’s services for our daughter " +
        "after being recommended her by a friend. Shaiqua has worked " +
        "very well to address the areas of the body that have needed " +
        "strengthening & stretching. There has been visible improvement " +
        "in our daughters overall physical strength & muscle " +
        "development since commencing our sessions with Shaiqua. She " +
        "works well with our daughter, through her patience & ability " +
        "to motivate and communicate clearly. Overall we have been very " +
        "happy with her & would happily recommend her to others.",
      photo: "assets/testimonials/k-james.jpg",
    },
    {
      name: "Prerna Chatterjee",
      title: "POSH Consultant",
      quote:
        "I consulted Shaiqua for physiotherapy due to severe lower " +
        "back pain that had significantly affected my mobility. During " +
        "our initial session, I was unable to walk comfortably. Shaiqua " +
        "was incredibly patient, attentive, and thorough in " +
        "understanding my condition. She provided ample time to assess " +
        "the issue and ensured the treatment was carried out with great " +
        "care, without rushing the process. After just four sessions, I " +
        "experienced significant improvement in my mobility and overall " +
        "comfort. I highly recommend Shaiqua for her expertise and " +
        "compassionate approach to care.",
      photo: "assets/testimonials/prerna-chatterjee.jpg",
    },
    {
      name: "Nasir Alam",
      title: "Immigration Lawyer, Robert Simmons Solicitors, UK",
      quote:
        "I want to give a huge shoutout to Dr Shaiqua Khalili for " +
        "helping me recover from a hamstring strain I got while playing " +
        "football. Not only was she incredibly professional but the " +
        "level of care and attention she provided throughout the " +
        "process was exceptional. She made sure I was comfortable every " +
        "step of the way and her personalised approach to my treatment " +
        "really put me at ease and return back to sport ! Highly " +
        "recommended",
      photo: "assets/testimonials/nasir-alam.jpg",
    },
    {
      name: "Shazia Bakshi",
      title: "The Commonwealth Alliance of Young Entrepreneurs",
      quote:
        "I have had the privilege of being treated by Dr.Shaiqa Khalili " +
        "and I cannot speak highly enough of her exceptional care and " +
        "expertise as a physiotherapist. Her ability to diagnose and " +
        "explain the root causes of my issues was truly impressive. She " +
        "provided me with a clear understanding of my condition. Her " +
        "hands-on techniques were precise and effective. She " +
        "continuously monitored my progress and adjusted the treatment " +
        "plan accordingly, ensuring that I was on track to a full " +
        "recovery.",
      photo: "",
    },
  ],

  // TODO(real-content): her Google Business review link.
  googleReviewUrl: "https://g.page/r/REPLACE_ME/review",

  // Google Apps Script web app /exec URL, once deployed. See
  // apps-script/Code.gs and README.md for deployment steps.
  // TODO(real-content): replace after deploying the Apps Script web app.
  appsScriptUrl:
    "https://script.google.com/macros/s/AKfycbwR51aurYUVycDu3FltS9wX-BzVTcco0220i5FYEswmiyEyiQNCIqt4kE4iF5ALWm6TEQ/exec",
};
