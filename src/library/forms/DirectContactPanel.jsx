import React from 'react';
import { Mail, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

/**
 * DirectContactPanel
 * Adapted from sankofa-digital-za qualified discovery contact section.
 * Direct action links (mailto + WhatsApp) with zero-data-retention disclosure.
 */
export function DirectContactPanel({
  eyebrow = 'Qualified Discovery Enquiry',
  title = 'Bring one workflow that needs to work better.',
  description = 'A short description of your operating context is enough. Our first response outlines fit, missing information, and the most practical next step.',
  email = 'sankofa.digital.studios@gmail.com',
  emailSubject = 'Discovery Enquiry',
  whatsappNumber = '+27754654865',
  whatsappText = 'Hello Sankofa Digital, I would like to discuss a project enquiry.',
  privacyNote = 'This site does not store submissions or track user data. Communication takes place entirely through your chosen client.',
  className = '',
}) {
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section
      className={`relative overflow-hidden p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 shadow-xl ${className}`}
      aria-label="Direct contact enquiry"
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
          {title}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={mailtoUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-500/20 transition-all active:scale-95"
          >
            <Mail size={15} />
            <span>Prepare an email</span>
            <ArrowRight size={13} />
          </a>

          {whatsappNumber && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-100 transition-all active:scale-95"
            >
              <MessageSquare size={15} className="text-emerald-400" />
              <span>Open WhatsApp</span>
            </a>
          )}
        </div>

        {privacyNote && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p>{privacyNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default DirectContactPanel;
