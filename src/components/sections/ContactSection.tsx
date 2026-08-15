"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { contactChannels, site } from "@/data/content";
import ArrowIcon from "../ArrowIcon";
import { useReveal } from "@/hooks/useReveal";

const FORMSPREE = site.formspree;

export default function ContactSection() {
  const listRef = useReveal<HTMLDivElement>(".contact-item");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    setSending(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`formspree ${res.status}`);
      setSent(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="home-contact layout-block">
      <div className="common-info">
        <div className="common-info__title" role="heading" aria-level={2}>
          <div className="common-info__title--line h2-fluid theme-contrast">
            <span>06</span>
          </div>
          <div className="common-info__title--line has-label h2-fluid" data-section="Sec-06">
            <span>Contact</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">Open to questions, collabs &amp; coffee</h2>
            </div>
          </div>
          <div className="home-contact__split">
            <div className="home-contact__left">
              <div className="home-contact__channels" ref={listRef}>
                {contactChannels.map((channel, i) => (
                  <a
                    className="contact-item a-div"
                    style={{ transitionDelay: `${i * 100}ms` }}
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <span className="label">{channel.label}</span>
                    <span className="contact-item__note h3">{channel.note}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="home-contact__form">
              <div className="label">Direct message</div>
              {sent ? (
                <div className="home-contact__status">
                  <div className="h3">Message sent</div>
                  <p className="p">Thanks — I read everything, and I reply to most things.</p>
                  <button className="a-div cta" onClick={() => setSent(false)}>
                    <span className="label">Send another</span>
                    <ArrowIcon />
                  </button>
                </div>
              ) : (
                <form className="home-contact__form--fields" onSubmit={onSubmit}>
                  <label className="field">
                    <span className="label">Name</span>
                    <input name="name" type="text" required autoComplete="name" />
                  </label>
                  <label className="field">
                    <span className="label">Email</span>
                    <input name="email" type="email" required autoComplete="email" />
                  </label>
                  <label className="field">
                    <span className="label">Message</span>
                    <textarea name="message" rows={5} required />
                  </label>
<button className="a-div cta" type="submit" disabled={sending}>
                    <span className="label">{sending ? "Sending…" : "Send message"}</span>
                  </button>
                  {error ? <p className="p">Something went wrong — try email instead.</p> : null}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}