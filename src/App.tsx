import React, { useState, useEffect } from 'react';
import { TOOLS_CONFIG } from './config/tools';
import { ToolConfig, ToolId } from './types';
import { ToolLayout } from './components/common/ToolLayout';
import { VideoTrimmer } from './components/tools/VideoTrimmer';
import { AudioTrimmer } from './components/tools/AudioTrimmer';
import { SplitPdf } from './components/tools/SplitPdf';
import { SignPdf } from './components/tools/SignPdf';
import { ArticlesHub } from './components/articles/ArticlesHub';
import { ArticleReader } from './components/articles/ArticleReader';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsOfService } from './components/legal/TermsOfService';
import { AboutUs } from './components/legal/AboutUs';
import { ContactUs } from './components/legal/ContactUs';
import { CookiePolicy } from './components/legal/CookiePolicy';
import { CookieConsent } from './components/common/CookieConsent';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { updateHubSEO, updateLegalPageSEO } from './lib/seo';

function resolvePathToTool(pathname: string): ToolConfig {
  const clean = pathname.toLowerCase().replace(/\/$/, '') || '/';
  for (const key of Object.keys(TOOLS_CONFIG) as ToolId[]) {
    const config = TOOLS_CONFIG[key];
    if (config.path === clean) {
      return config;
    }
  }
  return TOOLS_CONFIG['video-trimmer'];
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/\/$/, '') || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.replace(/\/$/, '') || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route: Legal & Company Pages (Crucial for Google AdSense Compliance)
  if (currentPath === '/privacy-policy') {
    updateLegalPageSEO(
      'Privacy Policy | OnlineTrimmer',
      'Learn how OnlineTrimmer protects your privacy with 100% client-side file processing, zero server uploads, and Google AdSense compliance disclosures.',
      '/privacy-policy'
    );
    return (
      <>
        <PrivacyPolicy onNavigate={handleNavigate} />
        <CookieConsent onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPath === '/terms-of-service') {
    updateLegalPageSEO(
      'Terms of Service | OnlineTrimmer',
      'Terms and conditions for using OnlineTrimmer free client-side media and PDF utilities.',
      '/terms-of-service'
    );
    return (
      <>
        <TermsOfService onNavigate={handleNavigate} />
        <CookieConsent onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPath === '/about') {
    updateLegalPageSEO(
      'About Us & Technical Architecture | OnlineTrimmer',
      'The story, privacy philosophy, and WebAssembly technology behind OnlineTrimmer free browser-based media editor.',
      '/about',
      'AboutPage'
    );
    return (
      <>
        <AboutUs onNavigate={handleNavigate} />
        <CookieConsent onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPath === '/contact') {
    updateLegalPageSEO(
      'Contact Support & Inquiries | OnlineTrimmer',
      'Get in touch with the OnlineTrimmer team for technical support, bug reports, DMCA, and partnership questions.',
      '/contact',
      'ContactPage'
    );
    return (
      <>
        <ContactUs onNavigate={handleNavigate} />
        <CookieConsent onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPath === '/cookie-policy') {
    updateLegalPageSEO(
      'Cookie Policy & Preferences | OnlineTrimmer',
      'Information on how OnlineTrimmer uses cookies, local storage, and Google AdSense advertising cookies.',
      '/cookie-policy'
    );
    return (
      <>
        <CookiePolicy onNavigate={handleNavigate} />
        <CookieConsent onNavigate={handleNavigate} />
      </>
    );
  }

  // Route 1: Articles Directory Hub
  if (currentPath === '/articles') {
    updateHubSEO(
      'Media Editing Guides & Tutorials | OnlineTrimmer',
      'Step-by-step guides on lossless video trimming, making iPhone ringtones, audio fading, and client-side PDF document manipulation.',
      '/articles'
    );
    return (
      <>
        <ArticlesHub onNavigate={handleNavigate} />
        <CookieConsent onNavigate={handleNavigate} />
      </>
    );
  }

  // Route 2: Individual Article Reader
  if (currentPath.startsWith('/articles/')) {
    const slug = currentPath.replace('/articles/', '');
    return (
      <>
        <ArticleReader slug={slug} onNavigate={handleNavigate} />
        <CookieConsent onNavigate={handleNavigate} />
      </>
    );
  }

  // Route 3: Interactive Tool Pages
  const activeTool = resolvePathToTool(currentPath);

  // Render appropriate tool based on activeTool.id
  const renderTool = () => {
    switch (activeTool.id) {
      case 'audio-trimmer':
      case 'cut-wav-audio':
      case 'cut-m4a':
      case 'make-iphone-ringtone':
        return <AudioTrimmer toolConfig={activeTool} />;
      case 'split-pdf':
        return <SplitPdf toolConfig={activeTool} />;
      case 'sign-pdf':
        return <SignPdf toolConfig={activeTool} />;
      case 'video-trimmer':
      case 'mp4-trimmer':
      case 'mov-trimmer':
      case 'webm-trimmer':
      case 'avi-trimmer':
      case 'mkv-trimmer':
      case 'tiktok-video-cutter':
      case 'youtube-shorts-cutter':
      case 'instagram-reels-cutter':
      default:
        // Format & social-specific trimmer pages reuse the VideoTrimmer component
        return <VideoTrimmer toolConfig={activeTool} />;
    }
  };

  return (
    <>
      <ToolLayout
        toolConfig={activeTool}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      >
        {renderTool()}
      </ToolLayout>
      <CookieConsent onNavigate={handleNavigate} />
      <OfflineIndicator />
    </>
  );
}
