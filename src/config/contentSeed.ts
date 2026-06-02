import { TeamMember, ServiceContent, Testimonial } from '../models/index.js'
import { logger } from '../utils/logger.js'

const TEAM_SEED = [
  {
    key: 'lead',
    name: 'Alex Morgan',
    role: 'Founder & AI Strategist',
    bio: 'Leads client strategy and solution design, with a focus on practical AI adoption for UK businesses.',
    initials: 'AM',
    image: '/images/team-alex-morgan.jpg',
    imageAlt: 'Alex Morgan, Founder & AI Strategist',
    sortOrder: 0,
  },
  {
    key: 'ml',
    name: 'Priya Shah',
    role: 'Head of Machine Learning',
    bio: 'Builds production ML pipelines, model training workflows, and performance optimisation at scale.',
    initials: 'PS',
    image: '/images/team-priya-shah.jpg',
    imageAlt: 'Priya Shah, Head of Machine Learning',
    sortOrder: 1,
  },
  {
    key: 'nlp',
    name: 'James Okonkwo',
    role: 'NLP & Automation Lead',
    bio: 'Specialises in conversational AI, document intelligence, and workflow automation systems.',
    initials: 'JO',
    image: '/images/team-james-okonkwo.jpg',
    imageAlt: 'James Okonkwo, NLP & Automation Lead',
    sortOrder: 2,
  },
  {
    key: 'data',
    name: 'Elena Vasquez',
    role: 'Data & Analytics Engineer',
    bio: 'Designs data platforms, dashboards, and predictive analytics that teams actually use every day.',
    initials: 'EV',
    image: '/images/team-elena-vasquez.jpg',
    imageAlt: 'Elena Vasquez, Data & Analytics Engineer',
    sortOrder: 3,
  },
  {
    key: 'delivery',
    name: 'Tom Hughes',
    role: 'Client Delivery Manager',
    bio: 'Keeps projects on track, coordinates timelines, and ensures clear communication from kickoff to launch.',
    initials: 'TH',
    image: '/images/team-tom-hughes.jpg',
    imageAlt: 'Tom Hughes, Client Delivery Manager',
    sortOrder: 4,
  },
  {
    key: 'security',
    name: 'Fatima Rahman',
    role: 'Security & Compliance',
    bio: 'Guides GDPR-aligned practices, secure deployments, and responsible AI governance for every engagement.',
    initials: 'FR',
    image: '/images/team-fatima-rahman.jpg',
    imageAlt: 'Fatima Rahman, Security & Compliance',
    sortOrder: 5,
  },
]

const SERVICES_SEED = [
  {
    key: 'machine-learning',
    title: 'Machine Learning & Deep Learning',
    shortTitle: 'ML & Deep Learning',
    description:
      'Custom ML and deep learning models trained on your data, built for accuracy, scalability, and real-world performance.',
    detail:
      'Whether you need classification, regression, clustering, neural networks, or transformer-based architectures, our models are engineered for production, not prototypes that never leave the lab.',
    overviewImage: {
      src: '/src/assets/services/machine-learning.jpg',
      alt: 'Machine learning models and analytics',
    },
    sortOrder: 0,
  },
  {
    key: 'data-science',
    title: 'Data Science & Data Mining',
    shortTitle: 'Data Science',
    description:
      'Rigorous statistical analysis and data mining to surface patterns, correlations, and insights in your data.',
    detail:
      'Good AI starts with great data science. We work across structured and unstructured sources so you can make smarter, faster decisions.',
    overviewImage: {
      src: '/images/service-data-science.jpg',
      alt: 'Data science and analytics',
    },
    sortOrder: 1,
  },
  {
    key: 'data-quality',
    title: 'Data Accuracy & Quality',
    shortTitle: 'Data Quality',
    description:
      'Clean, consistent, complete data foundations before any model is trained or insight is generated.',
    detail:
      'Deduplication, normalisation, validation, enrichment, and lineage tracking so every AI initiative rests on trustworthy data.',
    overviewImage: {
      src: '/images/service-data-quality.jpg',
      alt: 'Data quality and governance',
    },
    sortOrder: 2,
  },
  {
    key: 'predictive-analytics',
    title: 'Predictive Analytics',
    shortTitle: 'Predictive Analytics',
    description:
      'Forecast demand, detect risks, and optimise decisions before problems arise.',
    detail:
      'Advanced statistical modelling and machine learning give leadership the foresight to act early and allocate resources wisely.',
    overviewImage: {
      src: '/images/service-predictive.jpg',
      alt: 'Predictive analytics dashboards',
    },
    sortOrder: 3,
  },
  {
    key: 'nlp-vision',
    title: 'NLP & Computer Vision',
    shortTitle: 'NLP & Vision',
    description:
      'Unlock intelligence from language and imagery at scale across your organisation.',
    detail:
      'Document automation, sentiment analysis, intelligent search, quality inspection, and visual process automation.',
    overviewImage: {
      src: '/images/service-nlp-vision.jpg',
      alt: 'NLP and computer vision',
    },
    sortOrder: 4,
  },
  {
    key: 'ai-automation',
    title: 'AI Automation & Chatbots',
    shortTitle: 'AI Automation',
    description:
      'Intelligent automation and AI assistants that reduce manual work and run around the clock.',
    detail:
      'Workflow automation, process orchestration, and customer-facing virtual assistants integrated with your existing platforms.',
    overviewImage: {
      src: '/images/service-automation.jpg',
      alt: 'AI automation and chatbots',
    },
    sortOrder: 5,
  },
]

const TESTIMONIALS_SEED = [
  {
    key: 't1',
    quote:
      'Zyntova AI helped us deploy an intelligent automation pipeline in weeks, not months. The impact on our operations was immediate.',
    name: 'Sarah M.',
    role: 'Chief Executive Officer · London',
    avatar: '/images/avatar-1.jpg',
    featured: false,
    sortOrder: 0,
  },
  {
    key: 't2',
    quote:
      'Their NLP solution completely transformed our customer support function. Response times dropped significantly while satisfaction scores continued to rise.',
    name: 'Ali R.',
    role: 'Operations Director · Manchester',
    avatar: '/images/avatar-2.jpg',
    featured: true,
    sortOrder: 1,
  },
  {
    key: 't3',
    quote:
      'Professional, transparent, and technically outstanding. Zyntova AI is exactly the kind of data and AI partner we needed to scale with confidence.',
    name: 'David L.',
    role: 'Founder · Birmingham',
    avatar: '/images/avatar-3.jpg',
    featured: false,
    sortOrder: 2,
  },
]

export async function seedContentIfEmpty(): Promise<void> {
  const teamCount = await TeamMember.countDocuments()
  if (teamCount === 0) {
    await TeamMember.insertMany(TEAM_SEED)
    logger.info(`Seeded ${TEAM_SEED.length} team members`)
  }

  const serviceCount = await ServiceContent.countDocuments()
  if (serviceCount === 0) {
    await ServiceContent.insertMany(SERVICES_SEED)
    logger.info(`Seeded ${SERVICES_SEED.length} services`)
  }

  const testimonialCount = await Testimonial.countDocuments()
  if (testimonialCount === 0) {
    await Testimonial.insertMany(TESTIMONIALS_SEED)
    logger.info(`Seeded ${TESTIMONIALS_SEED.length} testimonials`)
  }
}
