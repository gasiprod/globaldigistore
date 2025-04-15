import React from 'react';
import './styles.css'; // Assure-toi que le chemin correspond à l'emplacement de ton fichier
import { Menu, ShoppingCart, ArrowRight, Book, Palette, Layout, X, ChevronLeft, ChevronRight ,Eye} from 'lucide-react'; // Retiré Mail
import { useState, useEffect, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import { FaTwitter, FaInstagram, FaTiktok, FaFacebook, FaYoutube } from 'react-icons/fa';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "E-PnNwTaKX0lZR5hO";
const PROTECTED_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "globaldigistore.mdg@gmail.com";

const styles = `.skeleton-loader {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 12px;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Interfaces pour typage
interface Product {
  title: string;
  description: string;
  image: string;
  price: number | string;
  format: string;
  category: string;
  languages?: string[];
  preview: {
    description: string;
    chapters?: string[];
    sample?: string;
    images?: string[];
    features?: string[];
    technologies?: string[];
    demo?: string;
    includes?: string[];
    previewLink?: string;
  };
}

interface BlogPost {
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  content?: string;
  link?: string;
}

// Données statiques
const STATIC_PRODUCTS: Product[] = [
  {
    title: "7 jours hors écran",
    description: "Déconnectez-vous des écrans en 7 jours et retrouvez focus et sérénité. Guide simple et motivant.",
    image: "/assets/7j-hors-ecran-prnpcl.png",
    price: 5,
    format: "PDF",
    category: "ebooks",
    languages: ["Français", "Anglais"],
    preview: {
      description: "Déconnecte-toi des écrans et reconnecte-toi à toi-même en seulement 7 jours ! ...",
      chapters: ["Avant de commencer :Les écrans et nous ",
                "Jour 1 : Matin sans scroll",
                "Jour 2 : Une heure analogique", 
                "Jour 3 : Repas déconnecté",
                "Jour 4 : Pause nature" , 
                "Jour 5 : Mono-tâche" , 
                "Jour 6 : Grand ménage numérique",  
                "Jour 7 : Journée hors écran", 
                ],
      sample: "Tu te réveilles, et bam, ton téléphone est déjà dans ta main. ...",
      images: [
        "/assets/7j-hors-ecran-cover.png",
        "/assets/7j-hors-ecran-content.png",
        "/assets/7j-hors-ecran-goal.png"
      ]
    }
  },
  {
    title: "5 Outils IA Gratuits pour Débutants",
    description: "Boostez vos projets avec ces 5 outils IA gratuits et faciles à prendre en main. Guide pratique pour débutants !",
    image: "/assets/5outils-ia-prnpcl.png",
    price: 3,
    format: "PDF",
    category: "ebooks",
    languages: ["Français", "Anglais"],
    preview: {
      description: "L’IA n’est pas réservée aux experts ! Ce guide vous présente 5 outils gratuits pour automatiser vos tâches, créer du contenu ou analyser vos données, sans aucune compétence technique.",
      chapters: [
        "Introduction : L’IA à portée de main",
        "Outil 1 : ChatGPT – Votre assistant personnel",
        "Outil 2 : Canva IA – Designs en un clic",
        "Outil 3 : Grammarly – Textes parfaits sans effort",
        "Outil 4 : Zapier – Automatisation facile",
        "Outil 5 : Google Trends – Insights gratuits",
        "Conclusion : Lancez-vous dès aujourd’hui !"
      ],
      sample: "Vous rêvez d’un assistant qui rédige vos emails ou d’un outil qui crée des visuels pro en 5 minutes ? Avec ces 5 outils IA gratuits, c’est possible, même sans expérience.",
      images: [
        "/assets/5outils-ia-cover.png",
        "/assets/5outils-ia-content.png",
        "/assets/5outils-ia-goal.png",
      ]
    }
  },
  {
    title: "Maîtriser l’IA pour Booster Votre Business en 2025",
    description: "Apprenez à utiliser l’IA pour automatiser votre business et gagner 5h/semaine. 30 pages pratiques, débutants bienvenus !",
    image: "/assets/master-ia-2025-3d.jpg",
    price: 9,
    format: "PDF",
    category: "ebooks",
    languages: ["Français", "Anglais"],
    preview: {
      description: "En 2025, l’IA est le secret des entreprises qui dominent. ...",
      chapters: [
        "Introduction : L’IA, Votre Ticket pour Dominer 2025",
        "Chapitre 1 : Pourquoi l’IA est Votre Atout Business",
        "Chapitre 2 : Les Outils IA Incontournables pour les Pros",
        "Chapitre 3 : Stratégies IA Gagnantes pour Votre Secteur",
        "Chapitre 4 : Éviter les Pièges de l’IA dans Votre Business",
        "Chapitre 5 : Votre Plan d’Action 2025 avec l’IA",
        "Conclusion : Votre Victoire 2025 Commence Aujourd’hui",
        "Bonus : Vos Outils pour Dominer 2025"
      ],
      sample: "Imaginez : pendant que vos concurrents s’épuisent, vous sirotez un café, ...",
      images: [
        "/assets/cover-master-ia-2025-3d.png",
        "/assets/content-master-ia-2025-3d.png",
        "/assets/goal-master-ia-2025-3d.png"
      ]
    }
  },
  {
    title: "10 Astuces pour Automatiser Votre Vie Quotidienne",
    description: "Gagnez du temps avec ces 10 astuces simples pour automatiser vos tâches quotidiennes. Guide pratique pour débutants, sans compétences tech requises !",
    image: "/assets/cover-automatisation-quotidienne.png",
    price: 4,
    format: "PDF",
    category: "ebooks",
    languages: ["Français", "Anglais"],
    preview: {
      description: "Vous passez trop de temps sur des tâches répétitives ? Ce guide vous montre 10 astuces pour automatiser vos emails, rappels, et même vos réseaux sociaux, sans coder. Parfait pour les débutants ou les pros pressés.",
      chapters: [
        "Introduction : Pourquoi automatiser ?",
        "Astuce 1 : Emails automatiques avec Gmail",
        "Astuce 2 : Rappels automatiques avec Google Calendar",
        "Astuce 3 : Posts sociaux planifiés",
        "Astuce 4 : Sauvegardes automatiques de fichiers",
        "Astuce 5 : Notifications sans effort",
        "Astuce 6 : Automatisation des tâches ménagères",
        "Astuce 7 : Gestion des finances simplifiée",
        "Astuce 8 : Suivi des objectifs sans stress",
        "Astuce 9 : Intégrations avec Zapier",
        "Astuce 10 : Créer des routines IFTTT",
        "Conclusion : Votre vie, automatisée !"
      ],
      sample: "Vous perdez 2 heures par semaine à envoyer des emails ? Avec l’astuce 1, configurez Gmail pour répondre automatiquement. Exemple : ‘Merci pour votre message, je reviens vers vous sous 24h.’ C’est gratuit et prend 5 minutes. Prêt à gagner du temps ?",
      images: [
        "/assets/cover-automatisation-quotidienne.png",
        "/assets/content-automatisation-quotidienne.png",
        "/assets/goal-automatisation-quotidienne.png"
      ]
    }
  },
  {
    title: "Portfolio Site Template",
    description: "Modern and responsive design for your portfolio",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400",
    price: 19,
    format: "HTML/CSS",
    category: "templates",
    preview: {
      description: "An elegant template to showcase your projects with style.",
      features: ["Responsive Design", "Easy Customization", "SEO Optimized"],
      technologies: ["HTML", "CSS", "JavaScript"],
      demo: "https://example.com/portfolio-demo"
    }
  },
  {
    title: "E-commerce Template",
    description: "Complete solution for your online store",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=400",
    price: 29,
    format: "React/Next.js",
    category: "templates",
    preview: {
      description: "Launch your online store with this high-performance template.",
      features: ["Integrated Cart", "Secure Payment", "Modern Design"],
      technologies: ["React", "Next.js", "Tailwind CSS"],
      demo: "https://example.com/ecommerce-demo"
    }
  },
  {
    title: "Business Icons Pack",
    description: "200 vector icons for your projects",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=400",
    price: 12,
    format: "SVG/AI",
    category: "graphics",
    preview: {
      description: "A modern icon pack for your professional designs.",
      includes: ["200 Icons", "SVG and AI Formats", "Commercial License"],
      previewLink: "https://example.com/icons-preview"
    }
  },
  {
    title: "Dashboard UI Kit",
    description: "Modern components for dashboards",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
    price: 24,
    format: "Figma/Sketch",
    category: "graphics",
    preview: {
      description: "Create intuitive dashboards with this UI kit.",
      includes: ["50+ Components", "Responsive Design", "Figma and Sketch Files"],
      previewLink: "https://example.com/dashboard-preview"
    }
  },
  {
    title: "Custom Services",
    description: "Design, development, and more tailored to your needs",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400",
    price: "On Request",
    format: "Customized",
    category: "services",
    preview: {
      description: "We bring your projects to life with custom solutions: graphic design, web design, video editing, and more. Fill out the form to submit your request!"
    }
  }
];

const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    title: "L’IA en 2025 : Les Dernières Avancées qui Vont Changer Votre Vie",
    date: "March 29, 2025",
    category: "Technology",
    description: "Un tour d’horizon des progrès de l’IA en 2025 et leur impact pour vous.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400",
    content: `
      <h2 style="font-weight: bold; font-size: 2rem; margin-bottom: 1.5rem; background: linear-gradient(to right, #9333ea, #f97316); -webkit-background-clip: text; color: transparent;">L’IA en 2025 : Les Dernières Avancées qui Vont Changer Votre Vie</h2>
      
      <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600" alt="Visualisation abstraite de l’intelligence artificielle en 2025" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
      <figcaption style="text-align: center; color: #6b7280; font-size: 0.9rem; margin-bottom: 1rem;">Une vision futuriste de l’IA transformant notre quotidien.</figcaption>

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Introduction</h3>
      <blockquote style="background: #f9fafb; border-left: 4px solid #9333ea; padding: 1rem; margin: 1rem 0; font-style: italic; color: #4b5563;">
        Saviez-vous qu’en mars 2025, une IA a composé une chanson entière en moins de 10 secondes pour un élève de 14 ans ?
      </blockquote>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">L’intelligence artificielle n’est plus une promesse futuriste : elle <strong style="color: #1f2937;">redéfinit notre quotidien</strong>. De la <em style="color: #7e22ce;">création de contenu</em> à l’<u style="text-decoration-color: #f97316;">automatisation des affaires</u>, les avancées de 2025 sont là pour rester. Dans cet article, nous explorons les <strong style="color: #1f2937;">dernières nouvelles</strong> de l’IA et comment elles peuvent transformer <em style="color: #7e22ce;">vos projets</em>.</p>

      <hr style="border: 0; height: 2px; background: linear-gradient(to right, #9333ea, #f97316); margin: 2rem 0;" />

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Les grandes avancées IA en 2025</h3>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;"><strong style="color: #1f2937;">1. Une IA qui pense comme nous</strong><br>
      <strong style="color: #1f2937;">Google</strong> a lancé <em style="color: #7e22ce;">Gemini 2.5</em>, un modèle qui <strong style="color: #1f2937;">raisonne</strong> sur des problèmes complexes, surpassant ses prédécesseurs en <u style="text-decoration-color: #f97316;">mathématiques</u> et <u style="text-decoration-color: #f97316;">sciences</u>. Pendant ce temps, en Chine, <em style="color: #7e22ce;">Zhipu AI</em> rend ses modèles <strong style="color: #1f2937;">open-source</strong>, accélérant l’<em style="color: #7e22ce;">innovation mondiale</em>.</p>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;"><strong style="color: #1f2937;">2. Des puces plus puissantes</strong><br>
      <strong style="color: #1f2937;">NVIDIA Blackwell</strong>, lancé récemment, offre <strong style="color: #1f2937;">40 fois la performance</strong> des anciennes puces <em style="color: #7e22ce;">Hopper</em>. <strong style="color: #1f2937;">TSMC</strong>, de son côté, prépare des <em style="color: #7e22ce;">puces 2nm</em> pour fin 2025, rendant l’IA plus <u style="text-decoration-color: #f97316;">rapide</u> et <u style="text-decoration-color: #f97316;">économe</u>.</p>
      <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" alt="Circuit électronique illustrant les puces IA avancées" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
      <figcaption style="text-align: center; color: #6b7280; font-size: 0.9rem; margin-bottom: 1rem;">Les puces de nouvelle génération au cœur de l’IA 2025.</figcaption>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;"><strong style="color: #1f2937;">3. L’IA dans votre poche</strong><br>
      <strong style="color: #1f2937;">Apple</strong> explore des montres avec <em style="color: #7e22ce;">caméras IA</em> pour des interactions visuelles. <em style="color: #7e22ce;">Imaginez</em> demander à votre montre d’<strong style="color: #1f2937;">analyser une image</strong> en temps réel !</p>

      <hr style="border: 0; height: 2px; background: linear-gradient(to right, #9333ea, #f97316); margin: 2rem 0;" />

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Impact pour les créateurs et entrepreneurs</h3>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Ces avancées ne sont pas juste <em style="color: #7e22ce;">techniques</em> : elles sont <strong style="color: #1f2937;">pour vous</strong>. Une IA générative peut <u style="text-decoration-color: #f97316;">rédiger vos posts</u> ou <u style="text-decoration-color: #f97316;">créer des designs</u> en un instant. Nos eBooks, comme <em style="color: #7e22ce;">Maîtriser l’IA pour Booster Votre Business en 2025</em>, vous guident pour <strong style="color: #1f2937;">tirer parti</strong> de ces outils dès aujourd’hui. Que vous soyez <em style="color: #7e22ce;">entrepreneur</em> ou <em style="color: #7e22ce;">créateur</em>, <strong style="color: #1f2937;">2025</strong> est votre année pour <u style="text-decoration-color: #f97316;">briller</u> avec l’IA.</p>

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Conclusion</h3>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">L’IA en 2025, c’est plus de <strong style="color: #1f2937;">puissance</strong>, d’<em style="color: #7e22ce;">accessibilité</em> et de <u style="text-decoration-color: #f97316;">possibilités</u>. <em style="color: #7e22ce;">Que pensez-vous de ces évolutions ?</em> Dites-le-nous en commentaire ! Et si vous voulez <strong style="color: #1f2937;">dompter cette révolution</strong>, jetez un œil à nos <em style="color: #7e22ce;">eBooks</em>. L’IA n’est pas une menace, c’est votre <strong style="color: #1f2937;">futur allié</strong> !</p>
      <img src="https://images.unsplash.com/photo-1556740738-6bf283d6e9b9?auto=format&fit=crop&q=80&w=600" alt="Humain interagissant avec la technologie IA" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
      <figcaption style="text-align: center; color: #6b7280; font-size: 0.9rem; margin-bottom: 1rem;">L’IA au service des créateurs et entrepreneurs en 2025.</figcaption>
    `
  },
  {
    title: "La Guerre Économique entre la Chine et les États-Unis en 2025 : Une Analyse Approfondie",
    date: "April 13, 2025",
    category: "Économie et Géopolitique",
    description: "Une analyse des tensions économiques entre la Chine et les États-Unis en 2025, des tarifs douaniers aux impacts sur les entrepreneurs et les consommateurs.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400",
    content: `
      <h2 style="font-weight: bold; font-size: 2rem; margin-bottom: 1.5rem; background: linear-gradient(to right, #9333ea, #f97316); -webkit-background-clip: text; color: transparent;">La Guerre Économique entre la Chine et les États-Unis en 2025 : Une Analyse Approfondie</h2>
      
      <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600" alt="Graphique boursier illustrant les tensions économiques" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
      <figcaption style="text-align: center; color: #6b7280; font-size: 0.9rem; margin-bottom: 1rem;">Les marchés financiers sous pression en 2025.</figcaption>

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Introduction</h3>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">En 2025, la guerre économique entre la <em style="color: #7e22ce;">Chine</em> et les <em style="color: #7e22ce;">États-Unis</em> atteint un <strong style="color: #1f2937;">point critique</strong>. Ce qui a commencé comme des <u style="text-decoration-color: #f97316;">désaccords commerciaux</u> s’est transformé en une bataille de <strong style="color: #1f2937;">surtaxes</strong>, de <em style="color: #7e22ce;">restrictions technologiques</em> et de <u style="text-decoration-color: #f97316;">rivalités géopolitiques</u>. Les <strong style="color: #1f2937;">entrepreneurs</strong>, <em style="color: #7e22ce;">créateurs</em> et <em style="color: #7e22ce;">consommateurs</em> du monde entier ressentent les effets de cette lutte entre les <strong style="color: #1f2937;">deux plus grandes économies mondiales</strong>. Dans cet article, nous analysons les <em style="color: #7e22ce;">causes</em>, les <em style="color: #7e22ce;">conséquences</em> et les <u style="text-decoration-color: #f97316;">opportunités</u> de cette crise, avec un regard particulier sur les <strong style="color: #1f2937;">surtaxes</strong> et leur impact sur <em style="color: #7e22ce;">votre quotidien</em>.</p>

      <hr style="border: 0; height: 2px; background: linear-gradient(to right, #9333ea, #f97316); margin: 2rem 0;" />

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Les origines et l’escalade des tensions</h3>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Les tensions économiques entre les <em style="color: #7e22ce;">États-Unis</em> et la <em style="color: #7e22ce;">Chine</em> ne datent pas d’aujourd’hui. Depuis les années <u style="text-decoration-color: #f97316;">2000</u>, les États-Unis ont critiqué le <strong style="color: #1f2937;">déficit commercial</strong> avec la Chine, accusant Pékin de pratiques <em style="color: #7e22ce;">déloyales</em> comme la <strong style="color: #1f2937;">manipulation de sa monnaie</strong> ou les <u style="text-decoration-color: #f97316;">subventions massives</u> à ses industries. En <em style="color: #7e22ce;">2018</em>, sous l’administration <strong style="color: #1f2937;">Trump</strong>, des <strong style="color: #1f2937;">tarifs douaniers</strong> ont été imposés sur des produits chinois, marquant le début d’une <u style="text-decoration-color: #f97316;">guerre commerciale ouverte</u>.</p>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">En <strong style="color: #1f2937;">2025</strong>, la situation s’est <strong style="color: #1f2937;">aggravée</strong>. Les États-Unis ont imposé des tarifs allant jusqu’à <strong style="color: #1f2937;">145 %</strong> sur les importations chinoises, tandis que la Chine a répondu avec des <u style="text-decoration-color: #f97316;">droits de douane de 125 %</u> sur les produits américains, touchant des secteurs comme l’<em style="color: #7e22ce;">agriculture</em> et l’<em style="color: #7e22ce;">automobile</em>. Ces mesures s’inscrivent dans une stratégie plus large : les États-Unis cherchent à <strong style="color: #1f2937;">réduire leur dépendance</strong> aux importations chinoises, tandis que la Chine renforce son <u style="text-decoration-color: #f97316;">autosuffisance technologique</u> et économique, notamment via des initiatives comme <em style="color: #7e22ce;">Made in China 2025</em>.</p>

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Les surtaxes en 2025 : une spirale sans fin ?</h3>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Les surtaxes de <em style="color: #7e22ce;">2025</em> représentent une <strong style="color: #1f2937;">escalade sans précédent</strong>. Voici les faits marquants :</p>
      <ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; color: #4b5563;">
        <li><strong style="color: #1f2937;">Février-mars 2025</strong> : Les États-Unis imposent des tarifs de <u style="text-decoration-color: #f97316;">10 %</u> sur la Chine, suivis d’une hausse à <u style="text-decoration-color: #f97316;">54 %</u> en avril, justifiée par des préoccupations sur le <em style="color: #7e22ce;">fentanyl</em> et des <em style="color: #7e22ce;">barrières commerciales</em> chinoises.</li>
        <li><strong style="color: #1f2937;">Réponse chinoise</strong> : Pékin riposte avec des tarifs de <u style="text-decoration-color: #f97316;">15 %</u> sur les produits agricoles américains (<em style="color: #7e22ce;">blé</em>, <em style="color: #7e22ce;">maïs</em>, <em style="color: #7e22ce;">soja</em>) et de <u style="text-decoration-color: #f97316;">34 %</u> sur tous les biens américains à partir d’avril.</li>
        <li><strong style="color: #1f2937;">Avril 2025</strong> : Les États-Unis portent les tarifs à <strong style="color: #1f2937;">145 %</strong>, tandis que la Chine atteint <strong style="color: #1f2937;">125 %</strong>, rendant le commerce bilatéral <em style="color: #7e22ce;">quasi impossible</em>.</li>
      </ul>
      <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236aa?auto=format&fit=crop&q=80&w=600" alt="Conteneurs maritimes symbolisant le commerce mondial" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
      <figcaption style="text-align: center; color: #6b7280; font-size: 0.9rem; margin-bottom: 1rem;">Les surtaxes bouleversent les chaînes d’approvisionnement mondiales.</figcaption>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Cette spirale a des <strong style="color: #1f2937;">conséquences immédiates</strong> :</p>
      <ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; color: #4b5563;">
        <li><strong style="color: #1f2937;">Hausse des prix</strong> : Les consommateurs américains paient <u style="text-decoration-color: #f97316;">plus cher</u> pour les <em style="color: #7e22ce;">smartphones</em>, <em style="color: #7e22ce;">vêtements</em> et <em style="color: #7e22ce;">appareils électroniques</em>, dont <strong style="color: #1f2937;">73 %</strong> des importations viennent de Chine.</li>
        <li><strong style="color: #1f2937;">Perturbations des chaînes d’approvisionnement</strong> : Les entreprises, des <em style="color: #7e22ce;">PME</em> aux <em style="color: #7e22ce;">multinationales</em>, peinent à trouver des <u style="text-decoration-color: #f97316;">alternatives</u> aux fournisseurs chinois.</li>
        <li><strong style="color: #1f2937;">Marchés financiers</strong> : Les indices boursiers mondiaux <u style="text-decoration-color: #f97316;">chutent</u>, le <em style="color: #7e22ce;">Dow Jones</em> perdant <strong style="color: #1f2937;">2 200 points</strong> début avril à cause des <em style="color: #7e22ce;">incertitudes commerciales</em>.</li>
      </ul>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Mais qui <strong style="color: #1f2937;">gagne</strong> dans cette guerre ? <em style="color: #7e22ce;">Aucun des deux camps</em> pour l’instant. Les États-Unis risquent une <strong style="color: #1f2937;">inflation galopante</strong>, tandis que la Chine fait face à une <u style="text-decoration-color: #f97316;">baisse des exportations</u> vers son deuxième marché. Cependant, la Chine semble <strong style="color: #1f2937;">mieux préparée</strong>, ayant <em style="color: #7e22ce;">diversifié</em> ses partenaires commerciaux (<em style="color: #7e22ce;">UE</em>, <em style="color: #7e22ce;">Asie du Sud-Est</em>) et réduit sa dépendance aux exportations vers les États-Unis (de <strong style="color: #1f2937;">19,2 %</strong> en 2018 à <strong style="color: #1f2937;">14,7 %</strong> en 2024).</p>

      <hr style="border: 0; height: 2px; background: linear-gradient(to right, #9333ea, #f97316); margin: 2rem 0;" />

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Conséquences pour les entrepreneurs et consommateurs</h3>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Cette guerre économique touche <strong style="color: #1f2937;">directement votre réalité</strong> :</p>
      <ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; color: #4b5563;">
        <li><strong style="color: #1f2937;">Pour les entrepreneurs</strong> : Les coûts d’importation <u style="text-decoration-color: #f97316;">explosent</u>, obligeant à <strong style="color: #1f2937;">repenser les chaînes d’approvisionnement</strong>. Par exemple, un créateur de <em style="color: #7e22ce;">gadgets tech</em> pourrait voir ses marges <strong style="color: #1f2937;">s’effondrer</strong> à cause des tarifs sur les composants chinois. Cependant, cela ouvre des <u style="text-decoration-color: #f97316;">opportunités</u> : investir dans des fournisseurs <em style="color: #7e22ce;">locaux</em> ou <em style="color: #7e22ce;">asiatiques</em> (<em style="color: #7e22ce;">Vietnam</em>, <em style="color: #7e22ce;">Inde</em>) peut réduire les risques.</li>
        <li><strong style="color: #1f2937;">Pour les consommateurs</strong> : Les prix des produits de tous les jours (<em style="color: #7e22ce;">électronique</em>, <em style="color: #7e22ce;">vêtements</em>, <em style="color: #7e22ce;">jouets</em>) <u style="text-decoration-color: #f97316;">augmentent</u>. En parallèle, les agriculteurs américains, touchés par les tarifs chinois sur le <em style="color: #7e22ce;">soja</em> et le <em style="color: #7e22ce;">maïs</em>, risquent de <strong style="color: #1f2937;">répercuter leurs pertes</strong> sur les prix alimentaires.</li>
        <li><strong style="color: #1f2937;">Pour les créateurs</strong> : Les outils numériques, souvent fabriqués en Chine, deviennent <u style="text-decoration-color: #f97316;">plus chers</u>. Mais l’<em style="color: #7e22ce;">innovation locale</em> (par exemple, <em style="color: #7e22ce;">logiciels open-source</em> ou fabrication <em style="color: #7e22ce;">européenne</em>) peut devenir un <strong style="color: #1f2937;">atout compétitif</strong>.</li>
      </ul>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Nos eBooks, comme <em style="color: #7e22ce;">Maîtriser l’IA pour Booster Votre Business en 2025</em>, peuvent vous aider à <strong style="color: #1f2937;">naviguer ces défis</strong> en adoptant des outils d’<u style="text-decoration-color: #f97316;">automatisation</u> pour réduire les coûts et rester <em style="color: #7e22ce;">compétitif</em>.</p>

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Perspectives et solutions possibles</h3>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Cette guerre économique semble <em style="color: #7e22ce;">sans issue</em>, mais des <strong style="color: #1f2937;">solutions émergent</strong> :</p>
      <ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; color: #4b5563;">
        <li><strong style="color: #1f2937;">Négociations</strong> : Malgré les tensions, des discussions entre <em style="color: #7e22ce;">Pékin</em> et <em style="color: #7e22ce;">Washington</em> pourraient reprendre si les deux parties réalisent les <u style="text-decoration-color: #f97316;">pertes mutuelles</u>. Un accord, même <em style="color: #7e22ce;">partiel</em>, sur des secteurs comme l’<em style="color: #7e22ce;">agriculture</em> ou la <em style="color: #7e22ce;">tech</em> pourrait désamorcer la crise.</li>
        <li><strong style="color: #1f2937;">Diversification</strong> : La Chine renforce ses liens avec l’<em style="color: #7e22ce;">UE</em> et l’<em style="color: #7e22ce;">Asie</em>, tandis que les États-Unis investissent dans des alliances comme l’<em style="color: #7e22ce;">Indo-Pacifique</em>. Les entrepreneurs doivent suivre cette tendance : <u style="text-decoration-color: #f97316;">explorez des marchés alternatifs</u> pour vos produits ou services.</li>
        <li><strong style="color: #1f2937;">Innovation</strong> : La course à l’<u style="text-decoration-color: #f97316;">autosuffisance technologique</u> (<em style="color: #7e22ce;">puces</em>, <em style="color: #7e22ce;">IA</em>) accélère. En <em style="color: #7e22ce;">2025</em>, investir dans des <strong style="color: #1f2937;">compétences tech locales</strong> ou des <em style="color: #7e22ce;">partenariats internationaux</em> peut faire la <strong style="color: #1f2937;">différence</strong>.</li>
      </ul>
      <img src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600" alt="Tableau stratégique pour les solutions économiques" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
      <figcaption style="text-align: center; color: #6b7280; font-size: 0.9rem; margin-bottom: 1rem;">Planifier l’avenir dans un monde économiquement divisé.</figcaption>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">Pour les <strong style="color: #1f2937;">entrepreneurs</strong>, <em style="color: #7e22ce;">2025</em> est un <strong style="color: #1f2937;">défi</strong> mais aussi une <u style="text-decoration-color: #f97316;">opportunité</u>. Adaptez-vous aux <em style="color: #7e22ce;">nouvelles réalités commerciales</em>, explorez des <em style="color: #7e22ce;">niches</em> moins affectées par les tarifs, et utilisez des <strong style="color: #1f2937;">outils numériques</strong> pour optimiser vos opérations.</p>

      <hr style="border: 0; height: 2px; background: linear-gradient(to right, #9333ea, #f97316); margin: 2rem 0;" />

      <h3 style="font-weight: bold; font-size: 1.5rem; color: #1f2937; margin: 2rem 0 0.75rem;">Conclusion</h3>
      <blockquote style="background: #f9fafb; border-left: 4px solid #9333ea; padding: 1rem; margin: 1rem 0; font-style: italic; color: #4b5563;">
        La guerre économique redessine le paysage mondial, mais les opportunités naissent dans l’adaptation.
      </blockquote>
      <p style="color: #4b5563; line-height: 1.5; margin-bottom: 1rem;">La guerre économique entre la <em style="color: #7e22ce;">Chine</em> et les <em style="color: #7e22ce;">États-Unis</em> en <strong style="color: #1f2937;">2025</strong> redessine le <u style="text-decoration-color: #f97316;">paysage mondial</u>. Les surtaxes massives, bien qu’<em style="color: #7e22ce;">impressionnantes</em>, ne profitent ni à <em style="color: #7e22ce;">Pékin</em> ni à <em style="color: #7e22ce;">Washington</em> à long terme. En tant qu’<em style="color: #7e22ce;">entrepreneur</em> ou <em style="color: #7e22ce;">créateur</em>, votre <strong style="color: #1f2937;">résilience</strong> passe par l’<u style="text-decoration-color: #f97316;">adaptation</u> : <strong style="color: #1f2937;">diversifiez vos sources</strong>, <em style="color: #7e22ce;">innovez</em>, et <strong style="color: #1f2937;">restez informé</strong>. <em style="color: #7e22ce;">Que pensez-vous de cette crise ?</em> Partagez vos idées en commentaire ! Et pour aller plus loin, découvrez nos <em style="color: #7e22ce;">eBooks</em> pour transformer ces défis en <strong style="color: #1f2937;">opportunités</strong>.</p>
    `
  }
];
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [customServiceForm, setCustomServiceForm] = useState({
    taskCategory: '',
    deadline: '',
    budget: '',
    details: '',
    email: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    method: 'skrill',
    fullName: '',
    deliveryEmail: '',
    paymentEmail: ''
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cart, setCart] = useState<Product[]>([]);
  const [lastOrder, setLastOrder] = useState<{ items: Product[]; total: number; paymentDetails: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoadedMap, setImageLoadedMap] = useState<Record<string, boolean>>({});
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [locale, setLocale] = useState<'fr' | 'en'>('fr'); // Typage restrictif
  const translations: Record<string, Record<'fr' | 'en', string>> = {
    addToCart: {
      fr: 'Ajouter au panier',
      en: 'Add to Cart'
    },
    viewPreview: {
      fr: 'Voir la prévisualisation',
      en: 'View Preview'
    },
    clearCart: {
      fr: 'Vider le panier',
      en: 'Clear Cart'
    },
    proceedToPayment: {
      fr: 'Passer au paiement',
      en: 'Proceed to Payment'
    }
  };
  const colorMap: { [key: string]: string } = {
    'all': 'bg-purple-600 text-white',
    'ebooks': 'bg-indigo-500 text-white',
    'templates': 'bg-teal-500 text-white',
    'graphics': 'bg-pink-500 text-white',
    'services': 'bg-orange-500 text-white'
  };
  // Fonction pour dire "l’image est chargée"
  const handleImageLoad = (key: string) => {
    setImageLoadedMap((prev) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log("EmailJS initialized successfully");
    } catch (err) {
      console.error("EmailJS init failed:", err);
      alert("Erreur d’initialisation du service email. Veuillez réessayer plus tard.");
    }
  }, []);

  // Fonction pour masquer l'email en production
  const contactEmail = PROTECTED_EMAIL; // On utilise directement la variable sans transformation

  const stats = [
    { value: '10,000+', label: 'Users' },
    { value: '500+', label: 'Products' },
    { value: '4.9/5', label: 'Average Rating' }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: ShoppingCart, color: 'purple-600' },
    { id: 'ebooks', name: 'eBooks', icon: Book, color: 'indigo-500' },
    { id: 'templates', name: 'Templates', icon: Layout, color: 'teal-500' },
    { id: 'graphics', name: 'Graphics Resources', icon: Palette, color: 'pink-500' },
    { id: 'services', name: 'Custom Services', icon: Layout, color: 'orange-500' }
  ];

  const filteredProducts = useMemo(
    () =>
      activeCategory === 'all'
        ? STATIC_PRODUCTS
        : STATIC_PRODUCTS.filter((product: Product) => product.category === activeCategory),
    [activeCategory]
  );

  const handlePreview = (product: Product) => {
    setSelectedProduct(product);
    setShowPreviewModal(true);
    setImageIndex(0);
  };

  const handleBlogReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setShowBlogModal(true);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert(`${product.title} added to cart! Total items: ${cart.length + 1}`);
  };

  const clearCart = () => {
    setCart([]);
    alert("Cart cleared!");
  };
  const handleCustomServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .send("service_vuymlea", "template_xxzljle", {
        from_name: 'Client - Custom Services',
        from_email: customServiceForm.email,
        to_email: PROTECTED_EMAIL, // Utilise la variable protégée
        message: `Custom Service Request:
          Email: ${customServiceForm.email}
          Category: ${customServiceForm.taskCategory}
          Deadline: ${customServiceForm.deadline}
          Budget: ${customServiceForm.budget}
          Details: ${customServiceForm.details}`
      })
      .then(() => {
        alert("Request sent successfully! We’ll contact you soon.");
        setCustomServiceForm({ taskCategory: '', deadline: '', budget: '', details: '', email: '' });
        setShowPreviewModal(false);
      })
      .catch((err) => {
        console.error("Failed to send custom service request:", err);
        alert("Erreur lors de l’envoi de la demande. Vérifiez votre connexion ou réessayez plus tard.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    emailjs
      .send("service_vuymlea", "template_xxzljle", {
        from_name: formData.get('name') as string,
        from_email: formData.get('email') as string,
        to_email: PROTECTED_EMAIL, // Utilise la variable protégée
        message: `Contact Form Submission:
          Name: ${formData.get('name')}
          Email: ${formData.get('email')}
          Message: ${formData.get('message')}`
      })
      .then(() => {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch((err) => {
        console.error("Failed to send contact message:", err);
        alert("Erreur lors de l’envoi du message. Vérifiez votre connexion ou réessayez plus tard.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const total = cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0);
    const cartDetails = cart.map((item) => `${item.title} - $${item.price}`).join('\n');
    let paymentDetails = '';
    let instructions = '';

    switch (paymentForm.method) {
      case 'neteller':
        paymentDetails = `Method: Neteller
          Client Full Name: ${paymentForm.fullName}
          Client Neteller Email: ${paymentForm.paymentEmail}
          Delivery Email: ${paymentForm.deliveryEmail}`;
        instructions = `Send $${total} to Neteller account: **rabemanantsaina.tiavina@gmail.com**\nInclude your delivery email (${paymentForm.deliveryEmail}) in the payment note for reference.`;
        break;
      case 'skrill':
        paymentDetails = `Method: Skrill
          Client Full Name: ${paymentForm.fullName}
          Client Skrill Email: ${paymentForm.paymentEmail}
          Delivery Email: ${paymentForm.deliveryEmail}`;
        instructions = `Send $${total} to Skrill account: **Rabemanantsaina.tiavina@gmail.com**\nInclude your delivery email (${paymentForm.deliveryEmail}) in the payment note for reference.`;
        break;
      case 'payeer':
        paymentDetails = `Method: Payeer
          Client Full Name: ${paymentForm.fullName}
          Client Payeer Email: ${paymentForm.paymentEmail}
          Delivery Email: ${paymentForm.deliveryEmail}`;
        instructions = `Send $${total} to Payeer account: **P1129706318**\nInclude your delivery email (${paymentForm.deliveryEmail}) in the payment note for reference.`;
        break;
      case 'wise':
        paymentDetails = `Method: Wise
          Client Full Name: ${paymentForm.fullName}
          Delivery Email: ${paymentForm.deliveryEmail}`;
        instructions = `Send $${total} to Wise account: **rabemanantsaina.tiavina@gmail.com**\nInclude your delivery email (${paymentForm.deliveryEmail}) in the payment note for reference.`;
        break;
    }

    setLastOrder({ items: [...cart], total, paymentDetails });
    setShowPaymentInstructions(instructions);
    setShowPaymentForm(false);
    setShowCartModal(false);
    setCart([]);
    setIsLoading(false);
  };

  const handlePaymentConfirmation = () => {
    if (!lastOrder) return;
  
    const total = lastOrder.total;
    const cartDetails = lastOrder.items.map((item) => `${item.title} - $${item.price}`).join('\n');
    const paymentDetails = lastOrder.paymentDetails;
  
    emailjs
      .send("service_vuymlea", "template_xxzljle", {
        from_name: 'Client - Payment',
        from_email: paymentForm.deliveryEmail,
        to_email: PROTECTED_EMAIL,
        message: `New Order Payment:
          Cart Details:
          ${cartDetails} 
          Total: $${total}
          ${paymentDetails}`
      })
      .then(() => {
        alert("Payment confirmation sent! We’ll verify it soon.");
        setShowPaymentInstructions(null);
        setPaymentForm({ method: 'skrill', fullName: '', deliveryEmail: '', paymentEmail: '' });
      })
      .catch((err: unknown) => { // Typage explicite
        console.error("Failed to send payment confirmation:", err);
        alert("Erreur lors de l’envoi de la confirmation de paiement. Vérifiez votre connexion ou réessayez plus tard.");
      });
  };

  const scrollLeft = () => {
    const container = document.getElementById('product-carousel');
    if (container) {
      const newPosition = Math.max(container.scrollLeft - 400, 0);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('product-carousel');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(container.scrollLeft + 400, maxScroll);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const isAtStart = scrollPosition === 0;
  const isAtEnd = () => {
    const container = document.getElementById('product-carousel');
    return container ? scrollPosition >= container.scrollWidth - container.clientWidth - 1 : false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-orange-400 font-[Poppins]">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/*Header Section*/} 
<header className="fixed w-full bg-white bg-opacity-90 shadow-2xl z-50 rounded-b-3xl backdrop-blur-md">
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="/assets/Globaldigistore.png"
          alt="GlobalDigiStore Logo"
          className="h-12 w-12 mr-3 object-contain transition-transform duration-300 hover:scale-110 hover:rotate-12"
          onError={(e) => (e.currentTarget.src = '/assets/placeholder.png')} // Fallback image
        />
        <span className="ml-3 text-2xl font-extrabold text-purple-600 tracking-tight">GlobalDigiStore</span>
      </div>

      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-12">
          {['home', 'products', 'blog', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-gray-700 hover:text-purple-600 text-lg font-semibold transition-all duration-300 relative group px-4 py-2 rounded-xl hover:bg-purple-50"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-purple-600 to-orange-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
            </a>
          ))}
        </nav>
        <button
          onClick={() => setShowCartModal(true)}
          className="relative p-2 rounded-full hover:bg-purple-100 transition-colors duration-300"
          aria-label="Ouvrir le panier"
        >
          <ShoppingCart className="h-7 w-7 text-purple-600" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {cart.length}
            </span>
          )}
        </button>
        <button
          className="md:hidden p-2 rounded-full hover:bg-purple-100 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-7 w-7 text-purple-600 transition-transform duration-300 hover:rotate-90" />
        </button>
      </div>
    </div>

    {isMenuOpen && (
      <div className="md:hidden bg-white shadow-2xl rounded-b-3xl mt-2 p-4 backdrop-blur-md animate-slide-down">
        <div className="space-y-4">
          {['home', 'products', 'blog', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 text-lg font-semibold"
              onClick={() => setIsMenuOpen(false)} // Ferme le menu après clic
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
      </div>
    )}
  </div>
</header>
      {/* Hero Section */}
      
<section id="home" className="pt-32 pb-40 relative overflow-hidden animate-fade-in">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center text-white relative z-10">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-200 to-orange-200 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-xl">
        Discover My Creations
      </h1>
      <p className="text-xl md:text-2xl mb-10 font-light text-white drop-shadow-xl">
        Innovative resources for creators and entrepreneurs
      </p>
      <div className="flex md:flex-row flex-col justify-center gap-6">
        <a
          href="#products"
          className="bg-gradient-to-r from-purple-600 to-orange-400 text-white px-10 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center text-lg"
        >
          Discover Now
          <ArrowRight className="ml-3 h-6 w-6 animate-bounce" />
        </a>
        <a
          href="#contact"
          className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
        >
          Contact Us
        </a>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center bg-white bg-opacity-20 p-6 rounded-2xl shadow-xl backdrop-blur-lg transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-4xl font-bold mb-2 text-white">{stat.value}</div>
            <div className="text-sm text-white opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="absolute inset-0 flex justify-between items-center opacity-10 z-0 pointer-events-none">
    <img
      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
      alt="Code and Technology Illustration"
      className="w-1/3 h-auto object-cover rounded-2xl shadow-2xl transform -rotate-12 animate-fade-in-left"
      onError={(e) => (e.currentTarget.style.display = 'none')} // Cache l'image si elle ne charge pas
    />
    <img
      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
      alt="Abstract Graphic Creation"
      className="w-1/3 h-auto object-cover rounded-2xl shadow-2xl animate-fade-in"
      onError={(e) => (e.currentTarget.style.display = 'none')}
    />
    <img
      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800"
      alt="Digital Collaboration Scene"
      className="w-1/3 h-auto object-cover rounded-2xl shadow-2xl transform rotate-12 animate-fade-in-right"
      onError={(e) => (e.currentTarget.style.display = 'none')}
    />
  </div>
</section>
 {/* Products Section - Carousel Layout */}
<section id="products" className="bg-white py-28">
  <div className="container mx-auto px-6">
    <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent animate-fade-in">
      Our Digital Creations
    </h2>
    <p className="text-center text-gray-600 mb-12 text-lg font-light">Browse our exceptional products</p>

    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
  key={category.id}
  onClick={() => setActiveCategory(category.id)}
  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 backdrop-blur-sm ${
    activeCategory === category.id ? colorMap[category.id] : 'bg-white text-gray-700 hover:bg-gray-100'
  }`}

            aria-label={`Filtrer par ${category.name}`}
          >
            <Icon className="h-6 w-6 mr-2 transition-transform duration-300 group-hover:scale-110" />
            {category.name}
          </button>
        );
      })}
    </div>

    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:bg-purple-100 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isAtStart}
        aria-label="Faire défiler à gauche"
      >
        <ChevronLeft className="h-6 w-6 text-purple-600" />
      </button>

      <div
        id="product-carousel"
        className="flex overflow-x-auto scroll-smooth gap-8 py-4 px-4 snap-x snap-mandatory scroll-px-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-200"
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
      >
        {filteredProducts.map((product: Product, index: number) => {
          const categoryColor = categories.find((cat) => cat.id === product.category)?.color || 'purple-600';
          const imageKey = `product-${index}`;
          return (
            <div
              key={index}
              className={`min-w-[90vw] md:min-w-[350px] bg-white rounded-3xl shadow-2xl overflow-hidden snap-center transform hover:scale-105 transition-all duration-300 border-t-4 border-${categoryColor}`}
            >
                {!imageLoadedMap[imageKey] && <div className="skeleton-loader h-64 w-full" />}
                <img
                  src={product.image}
                  alt={`${product.title} Cover`}
                  className={`w-full h-64 object-cover rounded-t-3xl ${imageLoadedMap[imageKey] ? 'block' : 'hidden'}`}
                  onLoad={() => handleImageLoad(imageKey)}
                  onError={(e) => (e.currentTarget.src = '/assets/placeholder.png')} // Fallback image
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 mb-4 font-light line-clamp-2">{product.description}</p>
                  <div className="text-sm text-gray-500 mb-3">
                    <p>Format: {product.format}</p>
                    {product.languages && <p>Available in: {product.languages.join(', ')}</p>}
                  </div>
                  <div className="flex items-center space-x-3 relative">
  {/* Badge "Coming Soon" pour templates et graphics */}
  {(product.category === 'templates' || product.category === 'graphics') && (
    <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full shadow-md">
      Coming Soon
    </span>
  )}

  {/* Bouton "View Preview" */}
  <button
    onClick={() => product.category !== 'templates' && product.category !== 'graphics' && handlePreview(product)}
    className={`inline-block bg-${categoryColor}/10 text-${categoryColor} font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center ${
      (product.category === 'templates' || product.category === 'graphics')
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:bg-' + categoryColor + '/20'
    }`}
    aria-label={`Prévisualiser ${product.title}`}
    disabled={product.category === 'templates' || product.category === 'graphics'}
  >
    <Eye className="h-5 w-5 mr-2" /> View Preview
  </button>

  {/* Bouton "Add to Cart" */}
  {product.price !== 'On Request' && (
    <button
      onClick={() =>
        product.category !== 'templates' && product.category !== 'graphics' && (
          addToCart(product),
          setAddedProductId(product.title),
          setTimeout(() => setAddedProductId(null), 1000)
        )
      }
      className={`bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm font-semibold py-2 px-4 rounded-full transition-all duration-300 whitespace-nowrap ${
        product.category === 'templates' || product.category === 'graphics'
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:shadow-md hover:scale-105 ' + (addedProductId === product.title ? 'animate-bounce' : '')
      }`}
      aria-label={`${translations.addToCart[locale]} ${product.title}`}
      disabled={product.category === 'templates' || product.category === 'graphics'}
    >
      {translations.addToCart[locale]}
    </button>
  )}
</div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price === 'On Request' ? product.price : `$${product.price}`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:bg-purple-100 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isAtEnd()}
        aria-label="Faire défiler à droite"
      >
        <ChevronRight className="h-6 w-6 text-purple-600" />
      </button>
    </div>
  </div>
</section>
      {/* Blog Section */}
      
<section id="blog" className="bg-gray-50 py-28">
  <div className="container mx-auto px-6">
    <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent animate-fade-in">
      Inspiration & Tips
    </h2>
    <p className="text-center text-gray-600 mb-12 text-lg font-light">Discover our exclusive articles</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {STATIC_BLOG_POSTS.map((post: BlogPost, index: number) => {
        const imageKey = `blog-${index}`;
        return (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            {!imageLoadedMap[imageKey] && <div className="skeleton-loader h-64 w-full" />}
            <img
              src={post.image}
              alt={`${post.title} Image`}
              className={`w-full h-64 object-cover rounded-t-3xl ${imageLoadedMap[imageKey] ? 'block' : 'hidden'}`}
              onLoad={() => handleImageLoad(imageKey)}
              onError={(e) => (e.currentTarget.src = '/assets/placeholder.png')} // Fallback image
            />
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 line-clamp-1">{post.title}</h3>
              <p className="text-gray-600 mb-4 font-light line-clamp-2">{post.description}</p>
              <button
                onClick={() => handleBlogReadMore(post)}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300 flex items-center"
                aria-label={`Lire plus sur ${post.title}`}
              >
                Read More <ArrowRight className="ml-2 h-4 w-4 animate-bounce" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
    <div className="text-center mt-10">
      <a
        href="#more-articles"
        className="inline-block bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition-all duration-300 font-semibold"
      >
        More Articles Coming Soon
      </a>
    </div>
  </div>
</section>

      {/* Contact Section */}
      
<section id="contact" className="bg-white py-28">
  <div className="container mx-auto px-6">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent animate-fade-in">
        Get in Touch
      </h2>
      <p className="text-center text-gray-600 mb-12 text-lg font-light">Turn your ideas into reality</p>
      <form
        onSubmit={handleContactSubmit}
        className="space-y-6 bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl backdrop-blur-md"
      >
        <div>
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
            placeholder="Your name"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
            placeholder="your@email.com"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
            placeholder="Your message"
            required
            aria-required="true"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-lg ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Need more info?</h3>
        <div className="space-y-2 text-gray-600">
          <p>Email: {contactEmail}</p>
        </div>
        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Hours</h3>
        <p className="text-gray-600 font-light">
          Monday - Friday: 9:00 AM - 6:00 PM
          <br />
          Online Support 24/7
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
     
<footer className="bg-gray-900 text-white py-12">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center mb-4">
          <ShoppingCart className="h-10 w-10 text-purple-400 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
          <span className="ml-3 text-2xl font-extrabold">GlobalDigiStore</span>
        </div>
        <p className="text-gray-400 font-light">Your partner for digital innovation.</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
        <ul className="space-y-3">
          {['home', 'products', 'blog', 'contact'].map((item) => (
            <li key={item}>
              <a href={`#${item}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
        <ul className="space-y-3 text-gray-400">
          <li>{contactEmail}</li>
          <li>(+261) 32 21 312 46</li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
        <div className="flex space-x-6 justify-start">
          <a
            href="https://x.com/GlobalDigiStore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-600 transition-transform duration-300 transform hover:scale-110"
            aria-label="Twitter"
          >
            <FaTwitter className="h-8 w-8" />
          </a>
          <a
            href="https://instagram.com/GlobalDigiStore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-600 transition-transform duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram className="h-8 w-8" />
          </a>
          <a
            href="https://tiktok.com/@gbl_digistore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-600 transition-transform duration-300 transform hover:scale-110"
            aria-label="TikTok"
          >
            <FaTiktok className="h-8 w-8" />
          </a>
          <a
            href="https://facebook.com/globaldigistore.mdg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-600 transition-transform duration-300 transform hover:scale-110"
            aria-label="Facebook"
          >
            <FaFacebook className="h-8 w-8" />
          </a>
          <a
            href="https://youtube.com/@globaldigitech-mdg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-600 transition-transform duration-300 transform hover:scale-110"
            aria-label="YouTube"
          >
            <FaYoutube className="h-8 w-8" />
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400">
  <div className="mb-4">
    <label htmlFor="language-select" className="mr-2 text-white font-semibold">Langue :</label>
    <select
  id="language-select"
  value={locale}
  onChange={(e) => setLocale(e.target.value as 'fr' | 'en')} // Forcer le type
  className="bg-gray-800 text-white rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
>
  <option value="fr">Français</option>
  <option value="en">English</option>
</select>
  </div>
  <p>© 2024 GlobalDigiStore. All rights reserved.</p>
</div>
  </div>
</footer>

      {/* Preview Modal */}
      {showPreviewModal && selectedProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{selectedProduct.title}</h3>
        <button
  onClick={() => setShowPreviewModal(false)}
  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
  aria-label="Fermer la prévisualisation"
>
  <X className="h-6 w-6" />
</button>
      </div>
      {!imageLoadedMap[`preview-${selectedProduct.title}`] && <div className="skeleton-loader h-64 w-full" />}
      <img
        src={selectedProduct.image}
        alt={`${selectedProduct.title} Preview`}
        className={`w-full h-64 object-cover rounded-xl mb-6 shadow-md ${imageLoadedMap[`preview-${selectedProduct.title}`] ? 'block' : 'hidden'}`}
        onLoad={() => handleImageLoad(`preview-${selectedProduct.title}`)}
        onError={(e) => (e.currentTarget.src = '/assets/placeholder.png')} // Fallback si l'image ne charge pas
      />
            <div className="space-y-6">
              {/* Détails pour les ebooks */}
              {selectedProduct.category === 'ebooks' && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Detailed Description</h4>
                    <p className="text-gray-600 font-light">{selectedProduct.preview.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Chapters</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedProduct.preview.chapters?.map((chapter, index) => (
                        <li key={index}>{chapter}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Excerpt</h4>
                    <div className="bg-gray-50 p-4 rounded-xl text-gray-600 whitespace-pre-wrap shadow-inner">
                      {selectedProduct.preview.sample}
                    </div>
                  </div>
                </>
              )}

              {/* Carrousel d’images */}
              {selectedProduct.preview.images && (
  <div>
    <h4 className="font-semibold mb-2 text-gray-800">Preview Images</h4>
    <div className="relative">
      {selectedProduct.preview.images.length > 0 ? (
        <>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${imageIndex * 100}%)` }}
            >
              {selectedProduct.preview.images.map((img, idx) => {
                const imageKey = `carousel-preview-${selectedProduct.title}-${idx}`;
                return (
                  <div key={idx} className="min-w-full">
                    <p className="text-sm text-gray-600 mb-1 text-center">Image {idx + 1}</p>
                    {!imageLoadedMap[imageKey] && <div className="skeleton-loader h-48 w-full rounded-lg" />}
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className={`w-full h-48 object-cover rounded-lg shadow-md ${imageLoadedMap[imageKey] ? 'block' : 'hidden'}`}
                      onLoad={() => handleImageLoad(imageKey)}
                      onError={(e) => (e.currentTarget.src = '/assets/placeholder.png')}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setImageIndex((prev) => Math.max(prev - 1, 0))}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
            disabled={imageIndex === 0}
          >
            <ChevronLeft className="h-5 w-5 text-purple-600" />
          </button>
          <button
            onClick={() =>
              setImageIndex((prev) => Math.min(prev + 1, selectedProduct.preview.images!.length - 1))
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
            disabled={imageIndex === selectedProduct.preview.images!.length - 1}
          >
            <ChevronRight className="h-5 w-5 text-purple-600" />
          </button>
          <div className="flex justify-center mt-2 space-x-2">
            {selectedProduct.preview.images.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full ${imageIndex === idx ? 'bg-purple-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600">No preview images available.</p>
      )}
    </div>
  </div>
)}
              {selectedProduct.category === 'templates' && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Detailed Description</h4>
                    <p className="text-gray-600 font-light">{selectedProduct.preview.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedProduct.preview.features?.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.preview.technologies?.map((tech, index) => (
                        <span key={index} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Live Demo</h4>
                    <a
                      href={selectedProduct.preview.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                    >
                      View Demo →
                    </a>
                  </div>
                </>
              )}

              {selectedProduct.category === 'graphics' && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Detailed Description</h4>
                    <p className="text-gray-600 font-light">{selectedProduct.preview.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Included in the Pack</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedProduct.preview.includes?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Preview</h4>
                    <a
                      href={selectedProduct.preview.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                    >
                      View Full Preview →
                    </a>
                  </div>
                </>
              )}

              {selectedProduct.category === 'services' && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Detailed Description</h4>
                    <p className="text-gray-600 font-light">{selectedProduct.preview.description}</p>
                    <p className="text-gray-600 font-light mt-2">Fill the form below to get a personalized quote!</p>
                  </div>
                  <form onSubmit={handleCustomServiceSubmit} className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-inner">
                    <div>
                      <label className="block text-gray-700 mb le" htmlFor="email">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={customServiceForm.email}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="taskCategory">
                        Task Category
                      </label>
                      <select
                        id="taskCategory"
                        value={customServiceForm.taskCategory}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, taskCategory: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        required
                      >
                        <option value="">Choose a category</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Audio Editing">Audio Editing</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="deadline">
                        Deadline
                      </label>
                      <select
                        id="deadline"
                        value={customServiceForm.deadline}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, deadline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        required
                      >
                        <option value="">Choose a deadline</option>
                        <option value="3 days">3 days</option>
                        <option value="1 week">1 week</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="To be discussed">To be discussed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="budget">
                        Budget
                      </label>
                      <select
                        id="budget"
                        value={customServiceForm.budget}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, budget: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        required
                      >
                        <option value="">Choose a budget</option>
                        <option value="Less than $50">Less than $50</option>
                        <option value="$50 - $100">$50 - $100</option>
                        <option value="$100 - $200">$100 - $200</option>
                        <option value="More than $200">More than $200</option>
                        <option value="To be discussed">To be discussed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="details">
                        Project Details
                      </label>
                      <textarea
                        id="details"
                        value={customServiceForm.details}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, details: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        placeholder="Describe your project in detail..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-500 font-semibold text-lg ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? 'Sending...' : 'Send Request'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Your Cart ({cart.length} items)</h3>
              <button
  onClick={() => setShowCartModal(false)}
  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
  aria-label="Fermer le panier"
>
  <X className="h-6 w-6" />
</button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-2">
                      <span>{item.title}</span>
                      <span>{item.price === 'On Request' ? item.price : `$${item.price}`}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <p className="text-xl font-semibold text-gray-800">
                    Total: ${cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)}
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={clearCart}
                      className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-all duration-300 font-semibold"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => setShowPaymentForm(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Complete Your Payment</h3>
              <button
  onClick={() => setShowPaymentForm(false)}
  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
  aria-label="Fermer le formulaire de paiement"
>
  <X className="h-6 w-6" />
</button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  value={paymentForm.fullName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email for Product Delivery</label>
                <input
                  type="email"
                  value={paymentForm.deliveryEmail}
                  onChange={(e) => setPaymentForm({ ...paymentForm, deliveryEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
                <p className="mt-1 text-gray-500 text-sm">
                  We’ll send your products to this email after payment confirmation.
                </p>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Payment Method</label>
                <select
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                >
                  <option value="skrill">Skrill</option>
                  <option value="neteller">Neteller</option>
                  <option value="payeer">Payeer</option>
                  <option value="wise">Wise</option>
                </select>
              </div>

              {(paymentForm.method === 'skrill' || paymentForm.method === 'neteller' || paymentForm.method === 'payeer') && (
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Your {paymentForm.method.charAt(0).toUpperCase() + paymentForm.method.slice(1)} Email
                  </label>
                  <input
                    type="email"
                    value={paymentForm.paymentEmail}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                    placeholder={`your@${paymentForm.method}.com`}
                    required
                  />
                  <p className="mt-2 text-gray-600 font-light">
                    Send ${cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)} to:{' '}
                    {paymentForm.method === 'skrill' && <strong>Rabemanantsaina.tiavina@gmail.com</strong>}
                    {paymentForm.method === 'neteller' && <strong>rabemanantsaina.tiavina@gmail.com</strong>}
                    {paymentForm.method === 'payeer' && <strong>P1129706318</strong>}
                    {' '}via {paymentForm.method.charAt(0).toUpperCase() + paymentForm.method.slice(1)}. Include your delivery
                    email in the payment note.
                  </p>
                </div>
              )}

              {paymentForm.method === 'wise' && (
                <div>
                  <p className="mt-2 text-gray-600 font-light">
                    Send ${cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)} to{' '}
                    <strong>rabemanantsaina.tiavina@gmail.com</strong> via Wise. Include your delivery email (
                    {paymentForm.deliveryEmail}) in the payment note.
                  </p>
                  <p className="mt-2 text-gray-500 text-sm">
                    After payment, your products will be sent to your delivery email.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-500 font-semibold text-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Submitting...' : 'Submit Payment'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Instructions Modal */}
      {showPaymentInstructions && lastOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[65vh] overflow-y-auto shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Payment Instructions</h3>
              <button
  onClick={() => setShowPaymentInstructions(null)}
  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
  aria-label="Fermer les instructions de paiement"
>
  <X className="h-6 w-6" />
</button>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
              <div className="text-center mb-4">
                <h4 className="text-xl font-semibold text-purple-600">GlobalDigiStore Invoice</h4>
                <p className="text-gray-600 mt-1">Thank you for your order!</p>
              </div>
              <div className="border-t border-b border-gray-300 py-3 mb-4">
                <p className="text-base text-gray-800 font-medium">Order Summary:</p>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  {lastOrder.items.map((item, index) => (
                    <li key={index}>
                      {item.title} - ${item.price}
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-bold text-gray-800 mt-2">Total: ${lastOrder.total}</p>
              </div>
              <div>
                <p className="text-base font-medium text-gray-800 mb-1">Payment Instructions:</p>
                <p className="text-gray-700 whitespace-pre-wrap bg-white p-3 rounded-lg shadow-sm markdown text-sm">
                  {showPaymentInstructions.split('**').map((part, index) =>
                    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  After sending the payment, your products will be delivered to {paymentForm.deliveryEmail} within 24-48 hours
                  upon confirmation.
                </p>
                <p className="text-xs text-red-600 font-semibold mt-1">
                  Important: Click "I’ve Paid" ONLY if you have already completed the payment as instructed above. If you
                  haven’t paid yet, click "Cancel" to close this window.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => setShowPaymentInstructions(null)}
                className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentConfirmation}
                className="bg-gradient-to-r from-purple-600 to-orange-400 text-white py-2 px-6 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
              >
                I’ve Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {showBlogModal && selectedPost && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{selectedPost.title}</h3>
        <button
  onClick={() => setShowBlogModal(false)}
  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
  aria-label="Fermer l’article du blog"
>
  <X className="h-6 w-6" />
</button>
      </div>
      {!imageLoadedMap[`blog-modal-${selectedPost.title}`] && <div className="skeleton-loader h-64 w-full" />}
      <img
        src={selectedPost.image}
        alt={`${selectedPost.title} Image`}
        className={`w-full h-64 object-cover rounded-xl mb-6 shadow-md ${imageLoadedMap[`blog-modal-${selectedPost.title}`] ? 'block' : 'hidden'}`}
        onLoad={() => handleImageLoad(`blog-modal-${selectedPost.title}`)}
        onError={(e) => (e.currentTarget.src = '/assets/placeholder.png')} // Fallback si l'image ne charge pas
      />
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span>{selectedPost.date}</span>
              <span className="mx-2">•</span>
              <span>{selectedPost.category}</span>
              <span className="mx-2">•</span>
              <span>5 min de lecture</span>
              <span className="mx-2">•</span>
              <span>Par GlobalDigiStore</span>
            </div>
            <div className="text-gray-600 font-light" dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }} />
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Envie de dompter l’IA ? Découvrez notre eBook{' '}
                <button
                  onClick={() => {
                    setShowBlogModal(false);
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-purple-600 hover:underline focus:outline-none"
                >
                  Maîtriser l’IA 2025
                </button>{' '}
                !
              </p>
              <button
                onClick={() => setShowBlogModal(false)}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300 flex items-center mx-auto"
              >
                Retour au blog <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;