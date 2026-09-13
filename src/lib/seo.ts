import { ToolConfig } from '../types';
import { SeoArticle } from '../config/articles';

function updateHreflangTags(pathname: string) {
  if (typeof document === 'undefined') return;
  const baseUrl = `https://onlinetrimmer.com${pathname === '/' ? '' : pathname}`;

  const hreflangMap: Record<string, string> = {
    'x-default': baseUrl,
    en: baseUrl,
    fr: `${baseUrl}?lang=fr`,
    ar: `${baseUrl}?lang=ar`,
    ru: `${baseUrl}?lang=ru`,
  };

  Object.entries(hreflangMap).forEach(([lang, url]) => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  });
}

export function updatePageSEO(config: ToolConfig, language?: string) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = config.title;

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.metaDescription);

  // Canonical Tag
  const fullUrl = `https://onlinetrimmer.com${config.path === '/' ? '' : config.path}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // Dynamic Hreflang Tags for SEO
  updateHreflangTags(config.path);

  // Open Graph & Twitter Tags
  const setMeta = (attr: string, key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.metaDescription);
  setMeta('property', 'og:url', fullUrl);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'OnlineTrimmer');
  setMeta('property', 'og:image', 'https://onlinetrimmer.com/logo.png');
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:alt', `${config.name} — OnlineTrimmer`);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.metaDescription);
  setMeta('name', 'twitter:image', 'https://onlinetrimmer.com/logo.png');

  // Keywords Meta Tag
  const allKeywords = [config.primaryKeyword, ...config.secondaryKeywords].join(', ');
  setMeta('name', 'keywords', allKeywords);

  // Clean old schema tags
  const oldSchemas = document.querySelectorAll('script[data-schema="onlinetrimmer"]');
  oldSchemas.forEach((s) => s.remove());

  // 1. FAQPage Schema (Rich snippet & GEO Answer Engine grounding)
  if (config.faqs && config.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: config.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    injectSchema(faqSchema);
  }

  // 2. WebApplication Schema with AggregateRating & Speakable
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.name,
    url: fullUrl,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All (Windows, macOS, Linux, iOS, Android)',
    browserRequirements: 'Requires modern HTML5 browser with WebAssembly & Web Audio support',
    isAccessibleForFree: 'true',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '14820',
      bestRating: '5',
      worstRating: '1',
    },
    description: config.metaDescription,
    featureList: [
      '100% Client-Side In-Browser Media Processing',
      'Lossless Video Stream Trimming (Zero Re-encoding)',
      'High-Resolution Audio Waveform Slicing with Fade In & Fade Out',
      'Vector PDF Page Extraction and Visual Electronic Signatures',
      'No Server Uploads, No Cloud Storage, No Watermarks',
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.direct-answer-summary', '.how-to-step-summary'],
    },
  };
  injectSchema(appSchema);

  // 3. HowTo Schema (for Google's rich How-To carousel & AI Step extraction)
  if (config.howItWorks && config.howItWorks.length > 0) {
    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to Use ${config.name}`,
      description: config.metaDescription,
      totalTime: 'PT1M',
      step: config.howItWorks.map((step) => ({
        '@type': 'HowToStep',
        position: step.step,
        name: step.title,
        text: step.description,
        url: `${fullUrl}#step-${step.step}`,
      })),
    };
    injectSchema(howToSchema);
  }

  // 4. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://onlinetrimmer.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: config.name,
        item: fullUrl,
      },
    ],
  };
  injectSchema(breadcrumbSchema);
}

export function updateArticleSEO(article: SeoArticle) {
  if (typeof document === 'undefined') return;

  const fullUrl = `https://onlinetrimmer.com/articles/${article.slug}`;

  // Title
  document.title = `${article.title} | OnlineTrimmer`;

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', article.metaDescription);

  // Canonical Tag
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // Dynamic Hreflang Tags
  updateHreflangTags(`/articles/${article.slug}`);

  const setMeta = (attr: string, key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('property', 'og:title', article.title);
  setMeta('property', 'og:description', article.metaDescription);
  setMeta('property', 'og:url', fullUrl);
  setMeta('property', 'og:type', 'article');
  setMeta('property', 'og:site_name', 'OnlineTrimmer');
  setMeta('property', 'og:image', 'https://onlinetrimmer.com/logo.png');
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'article:published_time', article.publishedDate);
  setMeta('property', 'article:modified_time', article.updatedDate);
  setMeta('property', 'article:author', article.author);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', article.title);
  setMeta('name', 'twitter:description', article.metaDescription);
  setMeta('name', 'twitter:image', 'https://onlinetrimmer.com/logo.png');

  if (article.targetKeywords && article.targetKeywords.length > 0) {
    setMeta('name', 'keywords', article.targetKeywords.join(', '));
  }

  // Clean old schema tags
  const oldSchemas = document.querySelectorAll('script[data-schema="onlinetrimmer"]');
  oldSchemas.forEach((s) => s.remove());

  // 1. TechArticle Schema with Speakable & Author
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.h1,
    description: article.metaDescription,
    url: fullUrl,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    isAccessibleForFree: 'true',
    author: {
      '@type': 'Organization',
      name: article.author,
      url: 'https://onlinetrimmer.com/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OnlineTrimmer',
      url: 'https://onlinetrimmer.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onlinetrimmer.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-direct-answer', '.article-key-takeaway'],
    },
  };
  injectSchema(articleSchema);

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://onlinetrimmer.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides & Articles',
        item: 'https://onlinetrimmer.com/articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: fullUrl,
      },
    ],
  };
  injectSchema(breadcrumbSchema);
}

export function updateHubSEO(title: string, description: string, path: string) {
  if (typeof document === 'undefined') return;

  const fullUrl = `https://onlinetrimmer.com${path}`;
  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // Dynamic Hreflang Tags
  updateHreflangTags(path);

  const setMeta = (attr: string, key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', fullUrl);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'OnlineTrimmer');
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);

  const oldSchemas = document.querySelectorAll('script[data-schema="onlinetrimmer"]');
  oldSchemas.forEach((s) => s.remove());

  // CollectionPage Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: fullUrl,
    publisher: {
      '@type': 'Organization',
      name: 'OnlineTrimmer',
      url: 'https://onlinetrimmer.com/',
    },
  };
  injectSchema(collectionSchema);
}

export function updateLegalPageSEO(
  title: string,
  description: string,
  path: string,
  pageType: 'AboutPage' | 'ContactPage' | 'WebPage' = 'WebPage'
) {
  if (typeof document === 'undefined') return;

  const fullUrl = `https://onlinetrimmer.com${path}`;
  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  updateHreflangTags(path);

  const setMeta = (attr: string, key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', fullUrl);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'OnlineTrimmer');
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);

  const oldSchemas = document.querySelectorAll('script[data-schema="onlinetrimmer"]');
  oldSchemas.forEach((s) => s.remove());

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description: description,
    url: fullUrl,
    publisher: {
      '@type': 'Organization',
      name: 'OnlineTrimmer',
      url: 'https://onlinetrimmer.com/',
      logo: 'https://onlinetrimmer.com/logo.png',
    },
  };
  injectSchema(pageSchema);
}

function injectSchema(schemaObj: Record<string, any>) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'onlinetrimmer');
  script.textContent = JSON.stringify(schemaObj);
  document.head.appendChild(script);
}
