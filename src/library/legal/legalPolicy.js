import React from 'react';
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react';

export const LEGAL_PROJECT_TYPES = {
  informational: { label: 'Informational website', commerce: false },
  ecommerce: { label: 'E-commerce website', commerce: true },
  saas: { label: 'SaaS or digital service', commerce: false },
  internal: { label: 'Business-internal portal', commerce: false },
  education: { label: 'Education or student application', commerce: false },
};

export const DEFAULT_POLICY_LINKS = [
  { id: 'privacy', slug: 'privacy-policy', label: 'Privacy Policy', order: 10 },
  { id: 'terms', slug: 'terms-and-conditions', label: 'Terms and Conditions', order: 20 },
  { id: 'cookies', slug: 'cookie-policy', label: 'Cookie Policy', order: 30 },
  { id: 'disclaimer', slug: 'disclaimer', label: 'Disclaimer', order: 40 },
  { id: 'accessibility', slug: 'accessibility', label: 'Accessibility', order: 50 },
  { id: 'contact', slug: 'contact-and-complaints', label: 'Contact and complaints', order: 60 },
  { id: 'paia', slug: 'paia-information', label: 'PAIA information', order: 70 },
];

const requiredFields = [
  'projectName', 'websiteUrl', 'legalEntityName', 'contactEmail', 'address',
  'effectiveDate', 'version', 'governingLaw', 'privacyContact',
];

export function validateLegalConfig(config = {}) {
  const missing = requiredFields.filter((field) => !String(config[field] || '').trim());
  const validType = Boolean(LEGAL_PROJECT_TYPES[config.projectType || 'informational']);
  if (!validType) missing.push('projectType');
  return { valid: missing.length === 0, missing };
}

export function resolvePolicyLinks(config = {}) {
  const type = config.projectType || 'informational';
  const overrides = config.footerLinks || {};
  return DEFAULT_POLICY_LINKS
    .filter((link) => overrides[link.id]?.visible !== false)
    .map((link) => ({
      ...link,
      ...overrides[link.id],
      href: overrides[link.id]?.href || `/${link.slug}`,
      projectType: type,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function createPolicySections(config = {}) {
  const type = config.projectType || 'informational';
  const entity = config.legalEntityName || '[LEGAL ENTITY NAME]';
  const project = config.projectName || '[PROJECT NAME]';
  const email = config.contactEmail || '[CONTACT EMAIL]';
  const address = config.address || '[BUSINESS ADDRESS]';
  const privacyContact = config.privacyContact || email;
  const analytics = config.analytics || [];
  const cookies = config.cookies || [];
  const sections = [
    {
      id: 'privacy', title: 'Privacy Policy and POPIA Notice',
      summary: `This draft explains how ${entity} may collect, use, retain, secure, and disclose personal information through ${project}.`,
      paragraphs: [
        `Responsible party: ${entity}. Privacy contact: ${privacyContact}. Address: ${address}.`,
        'The final notice must be reviewed against the actual information flows, lawful processing grounds, retention schedule, operators, cross-border transfers, direct-marketing practices, and data-subject request process used by the project.',
        `Information may include identity, contact, account, transaction, device, usage, support, and preference information where necessary for stated purposes. The project should collect only information that is adequate, relevant, and not excessive for those purposes.`,
        `Requests, objections, corrections, and complaints may be directed to ${privacyContact}. A responsible party should maintain appropriate technical and organisational safeguards and document any security incident response process.`,
        `Configured analytics or measurement services: ${analytics.length ? analytics.join(', ') : '[LIST ANALYTICS OR STATE NONE]'}.`,
      ],
    },
    {
      id: 'terms', title: 'Terms and Conditions',
      summary: `These draft terms govern access to and use of ${project}.`,
      paragraphs: [
        `By using the website, users agree to use it lawfully, respectfully, and without attempting to interfere with its operation or security. ${entity} may update content, suspend features, or amend these terms where reasonably necessary, subject to applicable law.`,
        'The final version should identify the service scope, account rules, intellectual-property ownership, acceptable use restrictions, availability commitments, dispute process, limitation wording, and any sector-specific obligations.',
        `Questions about these terms may be sent to ${email}. Governing law: ${config.governingLaw || '[GOVERNING LAW]'}.`,
      ],
    },
    {
      id: 'cookies', title: 'Cookie Policy',
      summary: 'This draft describes browser storage and similar technologies used by the website.',
      paragraphs: [
        `Cookies and similar technologies may be used for essential operation, preferences, security, measurement, and marketing only where applicable. The live site should publish a current inventory with provider, purpose, duration, category, and consent status.`,
        `Configured cookie categories: ${cookies.length ? cookies.join(', ') : '[LIST COOKIE CATEGORIES OR STATE NONE]'}. Users should be given an understandable choice where consent is required and should be told how browser controls affect functionality.`,
      ],
    },
    {
      id: 'disclaimer', title: 'Website Disclaimer',
      summary: `Information on ${project} is provided for general information and should not be treated as professional legal, medical, financial, or other regulated advice unless expressly stated and appropriately qualified.`,
      paragraphs: [
        `${entity} aims to keep published information accurate and useful but does not warrant that every page is complete, current, uninterrupted, or suitable for a particular purpose. Users should obtain advice appropriate to their circumstances before acting on material that could have legal, financial, health, safety, or academic consequences.`,
        'No draft disclaimer should be used to exclude rights that cannot lawfully be excluded.',
      ],
    },
    {
      id: 'accessibility', title: 'Accessibility Statement',
      summary: `${entity} aims to make ${project} usable by people with diverse access needs across supported devices and browsers.`,
      paragraphs: [
        'The implementation should be tested with keyboard navigation, zoom, contrast, semantic headings, labels, focus states, screen readers, and reduced-motion preferences. Some third-party content may not be fully controlled by the project.',
        `Please report an accessibility barrier to ${email}, including the page, device or assistive technology, and a description of the difficulty.`,
      ],
    },
    {
      id: 'contact', title: 'Contact and Complaints',
      summary: `Users can contact ${entity} about the website, these policies, privacy matters, or complaints.`,
      paragraphs: [
        `General contact: ${email}. Postal or physical address: ${address}. The final policy should include a practical acknowledgement and escalation process, service hours, and any sector regulator or alternative dispute-resolution route that applies.`,
        'Privacy complaints should first be directed to the responsible party or information officer where appropriate, with escalation to the Information Regulator or another competent authority where the law permits or requires it.',
      ],
    },
    {
      id: 'paia', title: 'PAIA Information Access',
      summary: 'This placeholder identifies the need for a PAIA manual or information-access process where applicable.',
      paragraphs: [
        `${entity} should assess whether it must maintain and publish a PAIA manual, identify the information officer, describe available records, and provide the request route and applicable fees or forms. Replace this placeholder with the organisation-specific manual and regulator-approved information before publication.`,
      ],
    },
  ];

  if (type === 'ecommerce') {
    sections.splice(2, 0, {
      id: 'commerce', title: 'E-commerce, Payments, Delivery, Returns and Refunds',
      summary: 'This conditional section is for online consumer transactions and must be completed against the actual checkout flow.',
      paragraphs: [
        `${entity} should clearly disclose supplier identity, product or service descriptions, total prices, delivery arrangements, payment methods, transaction records, cancellation or cooling-off rights, returns, refunds, defective goods remedies, and complaint routes required by applicable South African consumer and electronic-transactions law.`,
        'Insert the project-specific delivery regions, lead times, exclusions, payment provider terms, promotional conditions, refund timing, and customer support process before publication.',
      ],
    });
  }
  return sections;
}

export function ComplianceDisclaimer() {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
      <strong>Legal review required.</strong> This is a customizable South African policy template, not legal advice or a guarantee of compliance. Confirm the final wording, data flows, sector rules, and business practices with qualified counsel before publication.
    </div>
  );
}

export function PolicyDocumentIndex({ sections = [] }) {
  return (
    <nav aria-label="Policy contents" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-400">Contents</p>
      <ol className="grid gap-2 sm:grid-cols-2">
        {sections.map((section, index) => <li key={section.id}><a className="text-sm text-slate-300 hover:text-amber-300" href={`#${section.id}`}>{index + 1}. {section.title}</a></li>)}
      </ol>
    </nav>
  );
}

export function LegalFooterLinks({ config = {}, className = '' }) {
  const links = resolvePolicyLinks(config);
  return (
    <nav aria-label="Legal policies" className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
      {links.map((link) => <a key={link.id} href={link.href} className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-amber-300"><FileText size={13} />{link.label}{link.external && <ExternalLink size={11} aria-label="External link" />}</a>)}
    </nav>
  );
}

export function LegalPolicyPage({ config = {}, policyId, className = '' }) {
  const sections = createPolicySections(config);
  const selected = policyId ? sections.filter((section) => section.id === policyId) : sections;
  const validation = validateLegalConfig(config);
  return (
    <article className={`space-y-6 rounded-3xl border border-slate-800 bg-slate-950 p-5 text-slate-100 sm:p-8 ${className}`}>
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400"><ShieldCheck size={15} /> South African legal policy kit</div>
        <h2 className="text-2xl font-serif font-bold text-white">{config.projectName || 'Project legal policies'}</h2>
        <p className="text-sm text-slate-400">Version {config.version || '[VERSION]'} · Effective {config.effectiveDate || '[EFFECTIVE DATE]'}</p>
        {!validation.valid && <p className="text-xs text-rose-300">Complete required configuration fields before publishing: {validation.missing.join(', ')}.</p>}
      </header>
      <ComplianceDisclaimer />
      {!policyId && <PolicyDocumentIndex sections={selected} />}
      <div className="space-y-8">
        {selected.map((section) => <section id={section.id} key={section.id} className="scroll-mt-24 space-y-3"><h3 className="text-xl font-serif font-semibold text-white">{section.title}</h3><p className="text-sm font-medium text-slate-200">{section.summary}</p>{section.paragraphs.map((paragraph, index) => <p key={index} className="text-sm leading-7 text-slate-300">{paragraph}</p>)}</section>)}
      </div>
      <LegalFooterLinks config={config} className="border-t border-slate-800 pt-5" />
    </article>
  );
}

export function PolicyCustomizer({ config = {}, onChange = () => {} }) {
  const update = (field) => (event) => onChange({ ...config, [field]: event.target.value });
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:grid-cols-2">
      <label className="text-xs text-slate-300">Project type<select value={config.projectType || 'informational'} onChange={update('projectType')} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm text-white">{Object.entries(LEGAL_PROJECT_TYPES).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}</select></label>
      <label className="text-xs text-slate-300">Project name<input value={config.projectName || ''} onChange={update('projectName')} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm text-white" placeholder="Example project" /></label>
      <label className="text-xs text-slate-300">Legal entity<input value={config.legalEntityName || ''} onChange={update('legalEntityName')} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm text-white" placeholder="Example (Pty) Ltd" /></label>
      <label className="text-xs text-slate-300">Contact email<input type="email" value={config.contactEmail || ''} onChange={update('contactEmail')} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm text-white" placeholder="legal@example.co.za" /></label>
    </div>
  );
}

