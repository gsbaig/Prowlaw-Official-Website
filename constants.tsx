
import React from 'react';
import { 
  Scale, 
  Briefcase, 
  ShieldCheck, 
  Gavel, 
  Users, 
  Globe, 
  Building2, 
  Stethoscope, 
  Coins, 
  Zap, 
  Cpu, 
  Factory,
  History,
  Target,
  Award,
  BookOpen,
  Newspaper,
  MessageSquare,
  BriefcaseBusiness,
  UserCheck,
  TrendingUp,
  FileText,
  Handshake,
  UserRoundCheck,
  Copyright,
  Construction,
  Landmark
} from 'lucide-react';

export const TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      sectors: 'Industries',
      team: 'People',
      blog: 'News',
      contact: 'Contact Us',
      careers: 'Join Our Team',
      consult: 'Consult Now',
      request: 'Request Consultation'
    },
    hero: {
      badge: 'Jordan & Saudi Arabia',
      ctaPrimary: 'Request a Consultation',
      ctaSecondary: 'Learn About Prolaw',
      imageAlt: 'Legal Services Jordan KSA',
      slides: [
        {
          title: 'Legal Excellence',
          subtitle: 'At Prolaw we provide trusted legal advisory services in Jordan and the Kingdom of Saudi Arabia, offering strategic, practical, and compliant legal solutions for companies and institutions operating in complex regional markets.',
          image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1920'
        },
        {
          title: 'Corporate & Commercial Strategic Advisory',
          subtitle: 'Comprehensive strategic advisory for corporate and commercial clients, empowering them to achieve sustainable growth and safeguard their interests through company formation, strengthened governance, and contract drafting.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920'
        }
      ]
    },
    common: {
      years: '30+ Years',
      yearsSub: 'Of Local & International Practice',
      footerDesc: 'Delivering strategic, practical, and compliant legal solutions across Jordan and Saudi Arabia.',
      offices: 'Offices',
      amman: 'Amman, Jordan',
      riyadh: 'Riyadh, Saudi Arabia',
      ammanAddress: 'p.o.Box 928245. Amman 1190 Jordan',
      riyadhAddress: 'Olaya Towers, King Fahad Road',
      disclaimerTitle: 'Disclaimer',
      disclaimerText: 'The information provided on this website is for general informational purposes only and does not constitute legal advice.',
      allRights: 'All Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookies Policy',
      whyChoose: 'Why Choose Prolaw Law Firm?',
      whyDesc: 'We bridge local legal frameworks with global business expectations.',
      servicesTitle: 'Core Services',
      servicesSub: 'Our multidisciplinary team offers comprehensive legal coverage across the region.',
      sectorsTitle: 'Industries We Serve',
      sectorsSubtitle: 'Strategic Legal Solutions for Growth',
      regionalPerspectiveTitle: 'Our Regional Expertise',
      regionalPerspectiveDesc1: 'With deep knowledge of Jordanian and Saudi regulations, we manage cross-border operations strategically, maximizing opportunities while ensuring full legal compliance.',
      regionalPerspectiveDesc2: '',
      viewAllSectors: 'View All Industries',
      bookConsult: 'Book a Consultation',
      consultArea: 'Consult on this service',
      needAdvice: 'Need specialized legal advice?',
      teamReady: 'Our team is ready to discuss your unique legal requirements.',
      speakTeam: 'Speak with Our Legal Team',
      relatedPosts: 'Related Posts',
      latestBlog: 'Latest News',
      valuePropTitle: 'Unparalleled Legal Precision',
      valuePropDesc: 'For the modern Middle Eastern enterprise. We turn regional complexity into your competitive advantage.',
    },
    news: {
      header_title: 'News',
      header_subtitle: 'Expert legal analysis, regulatory updates, and firm developments.',
      articles: [
        { id: '1', title: 'New Saudi Civil Transactions Law', date: 'May 15, 2024', category: 'regulations', summary: 'An analysis of how the new Civil Transactions Law in KSA is reshaping contract law.', author: 'Prolaw Research Team' },
        { id: '2', title: 'Jordan’s New Investment Environment Law', date: 'April 28, 2024', category: 'insights', summary: 'Exploring the incentives and streamlined processes introduced to attract FDI.', author: 'Amman Legal Desk' },
        { id: '3', title: 'Fintech Regulations in Jordan', date: 'March 10, 2024', category: 'regulations', summary: 'A guide to the evolving regulatory landscape for financial technology startups.', author: 'Zaid Al-Najjar' }
      ],
      categories: {
        regulations: 'Regulations',
        insights: 'Insights'
      },
      read_more: 'Read More',
      back_to_news: 'Back to News',
      author: 'By'
    },
    services: {
      'header_title': 'Our Services',
      'header_subtitle': 'Strategic, practical, and compliant legal solutions tailored for Jordan, Saudi Arabia, and the wider region.',
      // Note: Detail content is now moved to the GET_SERVICES function to handle rich text structures
    },
    about: {
      title: 'About Prolaw',
      subtitle: 'Your trusted legal partner for success and safeguarding your interests.',
      whoTitle: 'Who We Are',
      whoDesc1: 'At Prolaw, we provide comprehensive and specialized legal services covering all areas of law for both companies and individuals. We are committed to delivering practical and strategic advice that enables our clients to achieve their business and financial goals while ensuring full compliance with local and international laws and regulations.',
      whoDesc2: 'Our team has extensive experience in managing major investments, supporting multinational companies, and handling complex transactions, offering tailored legal solutions that balance legal protection with the promotion of business growth.',
      stats: {
        years: 'Years of Experience',
        clients: 'Corporate Clients',
        hubs: 'Regional Hubs'
      },
      vision: 'Our Vision',
      visionDesc: 'To be the most trusted legal partner for businesses driving the economic transformation of the Middle East.',
      mission: 'Our Mission',
      missionItems: [
        'Deliver uncompromising legal excellence.',
        'Bridge regional laws with global standards.',
        'Protect and empower client interests.'
      ],
      values: 'Core Values',
      vIntegrity: 'Integrity',
      vIntegrityDesc: 'We uphold transparency and honesty in all our legal and professional dealings.',
      vProfessionalism: 'Professionalism',
      vProfessionalismDesc: 'We deliver our services with the highest standards of legal expertise and competence.',
      vCommitment: 'Commitment',
      vCommitmentDesc: 'We are dedicated to fulfilling our promises and safeguarding our clients’ interests with diligence.',
      vExcellence: 'Excellence',
      vExcellenceDesc: 'We continuously strive to provide innovative and exceptional solutions that enhance our clients’ experience.',
      philosophy: "At Prolaw, we believe that legal excellence is built on a foundation of continuous growth and specialized mastery. We invest heavily in our team's professional development, ensuring our lawyers are not only experts in current statutes but also proactive navigators of emerging regional trends. This commitment to expertise allows us to deliver the sophisticated, business-aligned counsel our clients deserve."
    },
    team: {
      header_title: 'Our People',
      header_subtitle: 'Meet the partners and associates shaping the future of legal practice.',
      recent_publications: 'Recent Publications',
      key_cases: 'Key Cases',
      read_more: 'Read More',
      read_less: 'Read Less',
      members: [
        { id: '1', name: 'Zaid Al-Najjar', role: 'Managing Partner', bio: 'Expert in Corporate Governance and Saudi Vision 2030 compliance.', expertise: ['Corporate', 'M&A'] },
        { id: '2', name: 'Lina Haddad', role: 'Partner', bio: 'Specializes in International Arbitration and Commercial Litigation.', expertise: ['Dispute Resolution'] },
        { id: '3', name: 'Omar Mansour', role: 'Senior Associate', bio: 'Highly experienced in Real Estate development laws in Jordan.', expertise: ['Real Estate'] }
      ],
      education_header: 'Education',
      specialization: 'Specialization'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Connect with our regional legal experts in Amman and Riyadh.',
      formTitle: 'Send a Message',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      practice: 'Practice Area',
      message: 'Your Message',
      submit: 'Send Message',
      successTitle: 'Message Sent',
      successMsg: 'We have received your request and will contact you shortly.'
    },
    careers: {
      header_title: 'Join Our Team',
      header_subtitle: 'Build your career with a law firm that values excellence.',
      cultureTitle: 'Our Culture',
      cultureDesc: 'We foster a collaborative environment.',
      benefits: ['Global Reach', 'Regional Expertise', 'Professional Growth', 'Collaborative Culture'],
      positionsTitle: 'Open Positions',
      noPositions: 'Currently, there are no open positions. Please check back later.',
      applyTitle: 'How to Apply',
      applyDesc: 'Send your CV and a cover letter to our recruitment team.',
      email: 'careers@prolawlawfirm.com',
      roles: []
    }
  }
};

export const NAV_LINKS = (t: (key: string) => string) => [
  { 
    name: t('nav.home'), 
    path: '/' 
  },
  { 
    name: t('nav.about'), 
    path: '/about',
    children: [
      { name: 'Who We Are', path: '/about', icon: <History size={16}/> },
      { name: 'Vision & Mission', path: '/about', icon: <Target size={16}/> },
      { name: 'Our People', path: '/about', icon: <Users size={16}/> }
    ]
  },
  { 
    name: t('nav.services'), 
    path: '/services',
    children: GET_SERVICES(t).map(s => ({ name: s.title, path: `/services/${s.id}`, icon: s.icon }))
  },
  { 
    name: t('nav.blog'), 
    path: '/blog',
    children: [
      { name: 'Latest Articles', path: '/blog', icon: <FileText size={16}/> },
      { name: 'Regulatory Updates', path: '/blog', icon: <TrendingUp size={16}/> },
      { name: 'Legal Analysis', path: '/blog', icon: <BookOpen size={16}/> }
    ]
  },
  { 
    name: t('nav.sectors'), 
    path: '/sectors',
    children: SECTORS(t).map(s => ({ name: s.title, path: '/sectors', icon: s.icon }))
  },
  { 
    name: t('nav.contact'), 
    path: '/contact',
    children: [
      { name: 'Amman Office', path: '/contact', icon: <Building2 size={16}/> },
      { name: 'Riyadh Office', path: '/contact', icon: <Building2 size={16}/> },
      { name: t('nav.careers'), path: '/careers', icon: <BriefcaseBusiness size={16}/> }
    ]
  }
];

// Updated GET_SERVICES with rich content based on user request
export const GET_SERVICES = (t: (key: string) => string) => [
  { 
    id: 'arbitration', 
    title: 'Arbitration & Litigation', 
    description: 'Prolaw represents local and regional clients in disputes before Jordanian courts and arbitration bodies, achieving results that protect interests.', 
    icon: <Scale className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'Prolaw represents local and regional clients in disputes before Jordanian courts and arbitration bodies, and also acts as co-counsel in cases and arbitrations involving both Jordanian and non-Jordanian clients.',
    subSectionTitle: 'Core Capabilities',
    fullBody: 'We possess extensive expertise in civil and commercial claims as well as economic criminal cases, alongside defending intellectual property rights on behalf of trademarks. We also provide support in identifying, registering, and protecting intellectual property rights, and in addressing all forms of rights infringement, including the seizure of counterfeit products, to ensure the protection of our clients’ interests and the preservation of their legal rights.',
    keyPoints: [
      'We have represented local and regional companies in various arbitrations, achieving results that satisfy our clients and protect their interests.',
      'We have represented numerous companies in civil and commercial claims involving amounts exceeding hundreds of thousands, securing outcomes that fully safeguard our clients’ rights.'
    ]
  },
  { 
    id: 'banking-finance', 
    title: 'Banking & Finance', 
    description: 'Specialized expertise in Banking and Financial Laws, providing comprehensive advisory on loans, financing, and restructuring.', 
    icon: <Landmark className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'Prolaw Law Firm has a solid legal foundation and specialized expertise in the field of Banking and Financial Laws, supported by a team of qualified lawyers with extensive experience and in-depth knowledge of the nature of banking and financial operations.',
    subSectionTitle: 'Financial Operations Advisory',
    fullBody: 'The Firm provides comprehensive legal advisory services covering a wide range of banking and financial matters, including loans, compensation claims, guarantees, syndicated financing, project finance, asset finance, debt restructuring, and insolvency matters, all in accordance with the highest applicable professional and regulatory standards.',
    keyPoints: [
      'Loans and compensation claims',
      'Guarantees and syndicated financing',
      'Project and asset finance',
      'Debt restructuring and insolvency matters'
    ]
  },
  { 
    id: 'employment', 
    title: 'Employment & Labor Law', 
    description: 'Providing expert legal guidance in all aspects of employment and labor law, representing both employers and employees across Jordan and Saudi Arabia.', 
    icon: <Users className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'Prolaw provides expert legal guidance in all aspects of employment and labor law, representing both employers and employees.',
    subSectionTitle: 'Workforce Management',
    fullBody: 'Serving clients in Jordan and Saudi Arabia, we ensure compliance with local regulations, resolve disputes efficiently, and protect our clients’ rights and interests every step of the way.',
    keyPoints: [
      'Employer and Employee Representation',
      'Regulatory Compliance in Jordan & KSA',
      'Dispute Resolution & Settlements',
      'Contract Drafting & Policy Development'
    ]
  },
  { 
    id: 'healthcare', 
    title: 'Hospitals & Healthcare', 
    description: 'Representing healthcare investors, hospital owners, and developers with specialized legal services in the healthcare sector.', 
    icon: <Stethoscope className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'With specialized experience, Prolaw provides expert legal services in the hospitals and healthcare sector.',
    subSectionTitle: 'Sector Specialization',
    fullBody: 'We represent healthcare investors, hospital owners, construction companies, and real estate developers involved in the development of hospitals, medical centers, and multi-use healthcare complexes. We deliver comprehensive legal advisory throughout all stages of healthcare project development, ensuring regulatory compliance, protection of interests, and the success of projects.',
    keyPoints: [
      'Representation of Hospital Owners & Investors',
      'Legal Advisory for Healthcare Construction',
      'Regulatory Compliance for Medical Centers',
      'Project Development Support'
    ]
  },
  { 
    id: 'ip', 
    title: 'Intellectual Property', 
    description: 'Prolaw Law Firm maintains a distinguished legal practice in all aspects of Intellectual Property (IP) rights in the Kingdom.', 
    icon: <Copyright className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'Prolaw Law Firm maintains a distinguished legal practice in all aspects of Intellectual Property (IP) rights in the Kingdom. Our team comprises a select group of experts with extensive knowledge and experience in providing legal advice across all areas of IP, including licensing and rights management, evaluation and protection, as well as litigation relating to such rights.\n\nThe Firm’s services encompass litigation and specialized legal and commercial advisory tailored to the specific nature of each sector, covering patents, trademarks, copyrights, licensing, brand development, franchising, industrial designs and marks, and other related areas of intellectual property.\n\nAt Prolaw, we safeguard our clients’ innovations in the market through comprehensive strategies that span the full lifecycle of intellectual property rights — from registration to enforcement against any infringements.',
    subSectionTitle: 'Asset Protection',
    fullBody: 'Our unwavering commitment to local laws and best legal practices ensures the protection of valuable intellectual assets and strengthens business strategies in a clear and effective manner, providing our clients with a strong competitive advantage in the market while securing their IP rights at all levels.',
    keyPoints: [
      'Patents, trademarks, and copyrights',
      'Licensing and rights management',
      'Brand development and franchising',
      'IP litigation and enforcement'
    ]
  },
  { 
    id: 'mergers-acquisitions', 
    title: 'Mergers & Acquisitions', 
    description: 'Specialized legal advice on M&A transactions, supporting clients from initial assessment to successful completion.', 
    icon: <Handshake className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'In today’s fast-paced business environment, mergers and acquisitions (M&A) represent a strategic turning point that directly impacts growth and market value. At Prolaw, we provide specialized legal advice on M&A transactions, leveraging extensive experience to support our clients at every stage of the deal, from initial assessment to successful completion with full legal compliance.',
    subSectionTitle: 'Strategic Deal Making',
    fullBody: 'We work closely with local and international companies to deliver comprehensive support. Prolaw experience in handling complex, multi-party deals ensures clients achieve strategic, value-enhancing outcomes while safeguarding their legal and commercial interests.',
    keyPoints: [
      'Legal and strategic analysis of potential transactions',
      'Drafting and review of merger and acquisition agreements',
      'Comprehensive due diligence and risk assessment',
      'Guidance on transaction structuring, financing, and regulatory compliance',
      'Representation before relevant authorities and regulatory bodies to secure approvals'
    ]
  },
  { 
    id: 'real-estate', 
    title: 'Real Estate & Infrastructure', 
    description: 'Supporting major projects in Jordan and Saudi Arabia with specialized advisory in property acquisition, construction, and financing.', 
    icon: <Construction className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'Prolaw provides specialized legal advisory in all aspects of real estate and infrastructure. We support major projects in Jordan and Saudi Arabia, offering clear legal solutions that help developers, investors, and contractors achieve their objectives efficiently and with confidence.',
    subSectionTitle: 'Development & Construction',
    fullBody: 'We ensure full compliance with local laws, while providing clear and comprehensive legal strategies to enhance project success and protect our clients’ interests.',
    keyPoints: [
      'Property acquisition and ownership registration procedures',
      'Construction contracts & compliance',
      'Financing and development of real estate projects',
      'Lease dispute resolution and property conflicts'
    ]
  },
  { 
    id: 'regulatory', 
    title: 'Regulatory & Compliance', 
    description: 'Helping companies build robust compliance frameworks and manage audits with precision in the region.', 
    icon: <ShieldCheck className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'At Prolaw, we bring years of experience in helping companies comply with local and international laws and regulations. We support clients in building robust compliance frameworks, managing audits, and mitigating regulatory risks, ensuring that legal obligations are seamlessly integrated into daily operations.',
    subSectionTitle: 'Risk Mitigation',
    fullBody: 'We stand out for our ability to balance preventive strategy with responsive action, providing guidance before issues arise and representing clients in investigations and proceedings when needed. Trusted by domestic and international companies, we help protect reputations, avoid penalties, and achieve sustainable success.',
    keyPoints: [
      'Compliance Framework Development',
      'Audit Management',
      'Regulatory Risk Mitigation',
      'Investigations & Proceedings Representation'
    ]
  },
  { 
    id: 'tax', 
    title: 'Tax Advisory & Tax Disputes', 
    description: 'Navigating complex tax legislation with expert advice on planning, compliance, and dispute resolution.', 
    icon: <Coins className="w-8 h-8 text-prolaw-gold" />,
    fullDescription: 'Taxation is considered one of the most sensitive areas of business in Jordan, as Jordanian tax legislation is frequently amended, creating ongoing challenges for companies to remain compliant while maintaining their competitiveness. At Prolaw, we possess over thirty years of experience combined with in-depth and precise knowledge of Jordanian tax laws and regulations. We assist our clients in navigating the regulatory framework with confidence and efficiency, ensuring the continuity and sustainability of their businesses.',
    subSectionTitle: 'Tax Planning & Litigation',
    fullBody: `Our services focus on tax planning and compliance. We provide our clients with comprehensive tax legal advice delivered accurately and efficiently, ensuring their continuous compliance with applicable tax laws and regulations, whether related to income tax, sales tax, withholding obligations, or cross-border matters. Our team offers precise legal guidance aimed at mitigating risks and aligning business operations with legal requirements.

We have an extensive and proven track record in tax litigation and negotiations with the relevant authorities. We represent clients in all types of tax disputes, challenge tax assessments, reduce penalties, and achieve favorable settlements. Thanks to our broad courtroom experience, we regularly defend our clients before Jordanian tax courts at all levels, as well as before the relevant regulatory bodies, ensuring the protection and preservation of their rights.

We are distinguished by our ability to update compliance programs and restructure policies when necessary, by balancing preventive legal advisory with strong litigation capabilities. Through this approach, we provide comprehensive legal protection that meets our clients’ needs.`,
    keyPoints: [
      'Income tax & Sales tax compliance',
      'Withholding obligations & cross-border matters',
      'Tax litigation and negotiations',
      'Restructuring tax policies'
    ],
    successStories: [
      'We represented a major international logistics company in tax disputes exceeding 50 million Jordanian Dinars before the Jordanian tax courts and achieved remarkable success by having the imposed taxes canceled.',
      'We represented a regional food industry company in multi-million tax disputes and secured outstanding results by reducing its tax obligations and obtaining exemptions from imposed tax penalties.',
      'We represented a shipping line company in a tax dispute worth hundreds of thousands, resulting in a reduction of the tax and a suitable settlement with the relevant authorities.',
      'We represented local industrial and commercial companies in tax disputes worth millions, achieving impressive outcomes in their favor.',
      'We represented local companies and individual clients in tax disputes (income tax, sales tax) and recorded a strong track record of excellent results, all in favor of our clients.',
      'We represented local companies in the health sector (hospitals) in tax disputes (income tax, sales tax) and achieved remarkable success in reducing and canceling the taxes imposed on them.',
      'We represented local companies in the educational sector (universities) in tax disputes (income tax, sales tax) and achieved exceptional results in reducing and canceling their tax liabilities.',
      'We represented local companies in the telecommunications sector in tax disputes (income tax, sales tax) and secured outstanding results in reducing the taxes imposed on them.'
    ]
  }
];

export const SECTORS = (t: (key: string) => string) => [
  { 
    id: 'construct', 
    title: 'Construction & Infrastructure', 
    description: 'Smart legal frameworks tailored for your major projects', 
    icon: <Building2 className="w-6 h-6 text-prolaw-gold" />,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'health', 
    title: 'Healthcare', 
    description: 'Protecting your medical investments with professional precision', 
    icon: <Stethoscope className="w-6 h-6 text-prolaw-gold" />,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'finance', 
    title: 'Financial Institutions', 
    description: 'Ensuring compliance while supporting financial growth', 
    icon: <Coins className="w-6 h-6 text-prolaw-gold" />,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'energy', 
    title: 'Energy', 
    description: 'Integrated strategies for successful energy ventures', 
    icon: <Zap className="w-6 h-6 text-prolaw-gold" />,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'tech', 
    title: 'Technology', 
    description: 'Driving innovation within a secure legal framework', 
    icon: <Cpu className="w-6 h-6 text-prolaw-gold" />,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'mfg', 
    title: 'Manufacturing', 
    description: 'Strong legal support for industrial operations', 
    icon: <Factory className="w-6 h-6 text-prolaw-gold" />,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
];

export const GET_TEAM_MEMBERS = (t: (key: string) => any) => {
  const members = t('team.members');
  if (!Array.isArray(members)) return [];
  const avatars = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=800',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=800'
  ];
  return members.map((m: any, i: number) => ({
    ...m,
    id: m.id || String(i + 1),
    image: avatars[i % avatars.length],
  }));
};

export const GET_NEWS_ARTICLES = (t: (key: string) => any) => {
  const articles = t('news.articles');
  return Array.isArray(articles) ? articles : [];
};
