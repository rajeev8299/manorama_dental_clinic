export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  icon?: string;
}

export const servicesData: Service[] = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    shortDescription: "Comprehensive dental check-ups, cleanings, and preventive care to maintain optimal oral health.",
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    shortDescription: "Enhance your smile with our premium cosmetic procedures including teeth whitening and veneers.",
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    shortDescription: "Straighten your teeth and correct your bite with modern orthodontic solutions.",
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    shortDescription: "Restore missing teeth with permanent, natural-looking dental implants.",
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    shortDescription: "Painless endodontic therapy to save infected teeth and relieve severe tooth pain.",
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    shortDescription: "Gentle and specialized dental care tailored specifically for children and young adults.",
  }
];
