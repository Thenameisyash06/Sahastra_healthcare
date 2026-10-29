/**
 * SAHASTRA OCUDENT HEALTHCARE
 * Central Clinic Data & Configuration
 * 
 * Note: Contact numbers, address, and hours are formatted as standard Indian placeholders.
 * When official details are finalized by the clinic, update the fields below in this single file.
 */

const CLINIC_CONFIG = {
  brand: {
    name: "SAHASTRA OCUDENT HEALTHCARE",
    legalNotice: "Single Integrated Clinic Website",
    tagline: "Integrated Eye Care & Dental Care Excellence",
    shortDescription: "SAHASTRA OCUDENT HEALTHCARE brings together comprehensive ophthalmology and advanced dental care under one roof, providing ethical, patient-centered healthcare for your family.",
    logoPath: "assets/icons/sahastra-logo.png",
  },

  contact: {
    // Official clinic contact details
    phone: "+91 90965 32832",
    phoneDisplay: "+91 90965 32832",
    phoneRaw: "+919096532832",
    phoneSecondary: "+91 90965 32832",
    
    // WhatsApp configuration (Numbers with country code, no + or spaces for wa.me)
    whatsappNumber: "918104184829",
    whatsappDisplay: "+91 81041 84829",
    
    email: "contact@sahastraocudent.org",
    emailAppointments: "karansingchavan2582@gmail.com",
    domain: "sahastraocudent.org",
    
    address: {
      line1: "Wakad",
      line2: "Pimpri-Chinchwad",
      city: "Pune",
      postalCode: "411057",
      state: "Maharashtra",
      country: "India",
      displayFull: "Wakad, Pune, Maharashtra - 411057, India",
    },
    
    hours: [
      { days: "Monday – Sunday", time: "9:00 AM – 8:00 PM" },
    ],

    // Google Maps directions link
    mapsUrl: "https://maps.google.com/?q=Wakad+Pune+Maharashtra",
  },

  greenApi: {
    host: "https://7107.api.green-api.com",
    idInstance: "710722781766",
    apiTokenInstance: "35e4d99b93c342f591e581b893d9e4c7f5f54b167b194b10a3",
    recipientPhone: "918104184829",
  },

  departments: {
    eyeCare: {
      id: "eye-care",
      name: "Eye Care & Ophthalmology",
      navLabel: "Eye Care",
      slug: "eye-care",
      badge: "Ophthalmology & Vision Clinic",
      headline: "Comprehensive Eye Care for a Clearer Tomorrow",
      subheadline: "Dedicated ophthalmic services including advanced diagnostic examinations, cataract surgery, retina and glaucoma evaluations, corneal care, and customized optical solutions.",
      ctaPrimary: "Request Eye Appointment",
      ctaSecondary: "Explore Eye Services",
      accentColor: "#0284c7",
      themeClass: "theme-eyecare",
      
      meta: {
        title: "Eye Care & Ophthalmology | SAHASTRA OCUDENT HEALTHCARE",
        description: "Specialized eye examinations, cataract treatments (Phaco & SICS), retina, glaucoma, cornea, and vision care at Sahastra Ocudent Healthcare.",
      },

      heroPills: [
        { label: "Specialty", value: "Ophthalmology" },
        { label: "Surgeries", value: "Cataract & Anterior Segment" },
        { label: "Diagnostics", value: "Digital Vision Screening" },
      ],

      doctor: {
        name: "Dr. Karansing Dhanraj Chavan",
        gender: "male",
        title: "MS Ophthalmologist | Cataract Surgeon",
        degrees: "MBBS, MS (Ophthalmology), Fellowship in Cataract & Phacoemulsification",
        experience: "12+ Years Experience",
        surgeries: "12,000+ Cataract Procedures (7500+ Phaco, 4500+ SICS)",
        rating: "4.9",
        reviewsCount: "2,800+",
        photo: "assets/images/dr-karansing-chavan.jpg",
        bio: "MS Ophthalmologist and cataract surgeon with over 12,000+ successful eye surgeries (7,500+ Phacoemulsification and 4,500+ SICS). Alumnus of B. J. Government Medical College Pune and Dr. Vasantrao Pawar Medical College Nashik, with specialized fellowship training in Cataract & Phacoemulsification."
      },

      services: [
        {
          id: "eye-1",
          name: "Comprehensive Eye Examinations and Diagnostics",
          tag: "Primary Vision",
          shortDescription: "Routine and in-depth eye examinations and diagnostic services to assess visual acuity, refractive state, and evaluate overall eye health.",
          fullDescription: "Our comprehensive ophthalmic assessments utilize modern clinical instrumentation to evaluate refractive errors, ocular pressure, anterior and posterior segment health, and early signs of vision changes.",
          keyPoints: [
            "Visual acuity testing and refraction analysis",
            "Slit-lamp biomicroscopic examination",
            "Intraocular pressure (IOP) screening",
            "Digital retinal evaluation & dilated exams"
          ],
          icon: "eye"
        },
        {
          id: "eye-2",
          name: "Cataract Surgery",
          tag: "Surgical Care",
          shortDescription: "Modern cataract treatment, including phacoemulsification and small-incision cataract surgery (SICS) based on clinical evaluation.",
          fullDescription: "Cataract management designed to restore clear vision using micro-incision surgical techniques, advanced intraocular lens (IOL) options, and rigorous pre- and post-operative clinical protocols.",
          keyPoints: [
            "Phacoemulsification (micro-incision sutureless cataract surgery)",
            "Small-Incision Cataract Surgery (SICS)",
            "Monofocal, Toric & Multifocal IOL assessment",
            "Detailed pre-operative biometry and planning"
          ],
          icon: "lens"
        },
        {
          id: "eye-3",
          name: "Retina and Glaucoma Services",
          tag: "Specialized Care",
          shortDescription: "Clinical services for the thorough evaluation, ongoing monitoring, and medical management of retinal and glaucoma-related conditions.",
          fullDescription: "Early detection and systematic management of chronic sight-threatening conditions, including diabetic retinopathy, macular disorders, and open-angle or closed-angle glaucoma.",
          keyPoints: [
            "Fundus screening and optic nerve evaluation",
            "Glaucoma pressure tracking and visual field assessments",
            "Medical management & drop therapy guidance",
            "Diabetic and hypertensive ocular checks"
          ],
          icon: "activity"
        },
        {
          id: "eye-4",
          name: "Cornea and Refractive Surgery",
          tag: "Cornea Care",
          shortDescription: "Corneal health care and refractive surgery services, subject to diagnostic eligibility and treatments offered by the clinic.",
          fullDescription: "Specialized evaluations of corneal surface disorders, infections, keratoconus screening, and consultation on refractive correction options for spectacle independence.",
          keyPoints: [
            "Dry eye disease assessment & tear film analysis",
            "Corneal infection and dystrophies management",
            "Pterygium assessment and surgical guidance",
            "Refractive error correction evaluations"
          ],
          icon: "layers"
        },
        {
          id: "eye-5",
          name: "Medical and Surgical Treatment of Eye Diseases",
          tag: "Therapeutic Care",
          shortDescription: "Targeted medical and surgical care for various acute and chronic eye diseases based on individual clinical assessment.",
          fullDescription: "From acute ocular emergencies, foreign body removal, and infections to complex ocular surface conditions, our clinic provides evidence-based medical and surgical management.",
          keyPoints: [
            "Management of red eye, conjunctivitis, and ocular allergies",
            "Uveitis and ocular inflammatory condition treatment",
            "Minor surgical procedures & chalazion care",
            "Post-surgical follow-up and monitoring"
          ],
          icon: "shield-plus"
        },
        {
          id: "eye-6",
          name: "Optical and Vision Care",
          tag: "Vision Solutions",
          shortDescription: "Optical services, prescription lenses, and vision care tailored to support each patient's everyday visual and lifestyle needs.",
          fullDescription: "Personalized optical guidance to ensure accurate spectacle prescriptions, computer vision strain relief, pediatric refractive correction, and protective eyewear consultation.",
          keyPoints: [
            "Precision spectacle power verification",
            "Blue-cut and anti-reflective lenses for digital eye strain",
            "Progressive and bifocal lens fitting advice",
            "Low vision support and preventative eye ergonomics"
          ],
          icon: "glasses"
        }
      ],

      whyChooseUs: [
        {
          title: "Comprehensive Eye Evaluations",
          description: "Systematic assessments ensuring no symptom is overlooked, from simple vision checks to intricate anterior segment evaluations."
        },
        {
          title: "Micro-Surgical Precision",
          description: "High clinical standards for surgical interventions such as Phacoemulsification and SICS for cataract restoration."
        },
        {
          title: "Integrated Care Model",
          description: "Benefit from simultaneous access to both specialized eye and dental disciplines in a single visit."
        },
        {
          title: "Convenient Consultation Scheduling",
          description: "Effortlessly request appointments via online form or instant WhatsApp connection with immediate prefilled context."
        }
      ]
    },

    dentalCare: {
      id: "dental-care",
      name: "Dental Care",
      navLabel: "Dental Care",
      slug: "dental-care",
      badge: "Advanced Oral Health Clinic",
      headline: "Complete Dental Care for Healthier, Confident Smiles",
      subheadline: "Personalized dental services covering routine preventive check-ups, root canal therapy, orthodontics, restorative implants, cosmetic smile design, and pediatric dental treatments.",
      ctaPrimary: "Request Dental Appointment",
      ctaSecondary: "Explore Dental Services",
      accentColor: "#0d9488",
      themeClass: "theme-dental",
      
      meta: {
        title: "Dental Care | SAHASTRA OCUDENT HEALTHCARE",
        description: "General dentistry, root canal treatments, braces and aligners, dental implants, cosmetic smile design, and pediatric dental care at Sahastra Ocudent Healthcare.",
      },

      heroPills: [
        { label: "Specialty", value: "Dentistry & Orthodontics" },
        { label: "Restorations", value: "Implants & Endodontics" },
        { label: "Care Model", value: "Preventive & Family Friendly" },
      ],

      doctor: {
        name: "Dr. Aditi Rajesh Pawar",
        gender: "female",
        title: "MDS Orthodontist | Gold Medalist (MUHS 2024)",
        degrees: "BDS, MDS (Orthodontics & Dentofacial Orthopaedics) — Gold Medalist (MUHS)",
        experience: "MDS Orthodontist (Gold Medalist)",
        surgeries: "Gold Medalist (MUHS 2024) | Orthodontics & Dentofacial Orthopaedics",
        rating: "4.9",
        reviewsCount: "Gold Medalist",
        photo: "assets/images/dr-aditi-pawar.jpg",
        bio: "Gold medalist in Master of Dental Surgery (MDS) in Orthodontics and Dentofacial Orthopaedics from Maharashtra University of Health Sciences (MUHS), Nashik. Alumna of Sinhagad Dental College Pune (BDS) and JMF's A.C.P.M Dental College Dhule (MDS), specializing in clear aligners, orthodontic braces, dentofacial growth modification, and patient care."
      },

      services: [
        {
          id: "dental-1",
          name: "General and Preventive Dentistry",
          tag: "Oral Wellness",
          shortDescription: "Routine dental care, ultrasonic scaling, polishings, and preventive services to preserve lasting oral health and prevent decay.",
          fullDescription: "Preventive dentistry is the foundation of a healthy smile. Regular check-ups, tartar removal, cavity diagnostics, and gum evaluations keep oral issues from escalating into painful conditions.",
          keyPoints: [
            "Ultrasonic dental cleaning and plaque removal",
            "Comprehensive dental and periodontal examinations",
            "Digital intraoral diagnostics & cavity detection",
            "Preventive fluoride applications & oral hygiene counseling"
          ],
          icon: "sparkles"
        },
        {
          id: "dental-2",
          name: "Orthodontics and Braces",
          tag: "Teeth Alignment",
          shortDescription: "Orthodontic assessment and modern treatment options for correcting tooth misalignment, spacing, and bite irregularities.",
          fullDescription: "Achieve harmonious facial aesthetics and optimal bite function with customized orthodontic solutions tailored for teenagers, young adults, and mature patients.",
          keyPoints: [
            "Traditional metal and ceramic aesthetic braces",
            "Clear aligner assessment for discreet straightening",
            "Bite correction (overbite, underbite, crossbite)",
            "Post-treatment retention planning"
          ],
          icon: "smile"
        },
        {
          id: "dental-3",
          name: "Root Canal Treatment",
          tag: "Tooth Preservation",
          shortDescription: "Gentle treatment for infected or inflamed tooth pulp when clinically indicated to save the natural tooth from extraction.",
          fullDescription: "Modern endodontic therapy performed with rotary instruments and apex locators, ensuring thorough canal disinfection, relief from acute toothache, and structural restoration.",
          keyPoints: [
            "Single-sitting and multi-visit root canal protocols",
            "Digital apex location and rotary instrumentation",
            "Post & core build-ups for compromised teeth",
            "Custom-milled dental crown restorations"
          ],
          icon: "shield-check"
        },
        {
          id: "dental-4",
          name: "Dental Implants and Restorative Dentistry",
          tag: "Restoration",
          shortDescription: "Dental implant services and restorative treatments to restore chewing function, structural integrity, and natural smile appearance.",
          fullDescription: "Long-lasting tooth replacements and durable restorations that blend seamlessly with natural teeth, restoring both confident chewing ability and facial contours.",
          keyPoints: [
            "Single tooth and multiple teeth implant restorations",
            "Biocompatible composite tooth-colored fillings",
            "Porcelain and zirconia bridges and crowns",
            "Partial and complete denture options"
          ],
          icon: "award"
        },
        {
          id: "dental-5",
          name: "Cosmetic Dentistry and Smile Design",
          tag: "Smile Aesthetics",
          shortDescription: "Cosmetic dental procedures tailored to the patient's individual smile goals, facial symmetry, and overall treatment plan.",
          fullDescription: "Elevate your smile aesthetics through minimally invasive cosmetic enhancements that improve tooth color, shape, alignment, and balance.",
          keyPoints: [
            "In-office and take-home professional teeth whitening",
            "Composite and porcelain aesthetic veneers",
            "Enamel recontouring and gap closures",
            "Comprehensive smile makeover planning"
          ],
          icon: "heart"
        },
        {
          id: "dental-6",
          name: "Pediatric Dental Care",
          tag: "Children's Health",
          shortDescription: "Compassionate, gentle dental care for infants, children, and adolescents in an age-appropriate, encouraging clinical setting.",
          fullDescription: "Creating positive dental experiences early in life. We focus on child-friendly communication, preventative cavity shielding, and healthy developmental milestones.",
          keyPoints: [
            "Preventive pit and fissure sealants",
            "Gentle milk tooth restorations & extractions",
            "Habit-breaking guidance (thumb sucking, tongue thrust)",
            "Nutritional and preventive oral habits education"
          ],
          icon: "baby"
        }
      ],

      whyChooseUs: [
        {
          title: "Painless & Conservative Dentistry",
          description: "Modern techniques and gentle chairside manners to keep dental procedures smooth, anxiety-free, and minimally invasive."
        },
        {
          title: "Rigorous Sterilization Protocols",
          description: "Strict multi-tier autoclave sterilization and hygiene standards for patient safety and infection prevention."
        },
        {
          title: "Integrated Medical Convenience",
          description: "Coordinate both your family's optical check-up and dental appointments conveniently in one visit."
        },
        {
          title: "Transparent Care & Flexible Scheduling",
          description: "Clear explanations of treatment plans with easy booking via website form or direct WhatsApp chat."
        }
      ]
    }
  },

  generalWhyChooseUs: [
    {
      icon: "building",
      title: "Dual-Care Integration",
      description: "Dedicated Eye Care and Dental Care under a unified, trusted clinical management."
    },
    {
      icon: "calendar-check",
      title: "Swift Appointment Requests",
      description: "Submit your request in under 60 seconds with instant prefilled WhatsApp or web transmission."
    },
    {
      icon: "user-heart",
      title: "Patient-First Approach",
      description: "Transparent explanations, honest clinical advice, and no fabricated or exaggerated claims."
    },
    {
      icon: "shield",
      title: "High Hygiene & Safety",
      description: "Strict adherence to sanitization, modern diagnostics, and ethical clinical protocols."
    }
  ]
};

// Export to window object for pure vanilla JS usage
window.CLINIC_CONFIG = CLINIC_CONFIG;
