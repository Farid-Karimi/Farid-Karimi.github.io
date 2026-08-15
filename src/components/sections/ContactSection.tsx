"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { contactChannels, site } from "@/data/content";
import ArrowIcon from "../ArrowIcon";
import { useReveal } from "@/hooks/useReveal";

const FORMSPREE = site.formspree;

export default function ContactSection() {
  const listRef = useReveal<HTMLDivElement>(".career-item");
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
        <div className="common-info__title">
          <div className="common-info__title--line has-label">
            <span>05 — Contact</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">Open to questions, collabs &amp; coffee</h2>
            </div>
          </div>
          <div className="home-careers__list layout-grid" ref={listRef}>
            {contactChannels.map((channel, i) => (
              <div className="career-item" style={{ transitionDelay: `${i * 100}ms` }} key={channel.label}>
                <div className="label">{channel.label}</div>
                <div className="content">
                  <div className="content--title h3">
                    <span>{channel.note}</span>
                  </div>
                </div>
                <a
                  className="a-div"
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >
                  <span className="label">Open</span>
                  <span className="ui-icon">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            ))}
          </div>
          <div className="home-contact__form">
            <div className="layout-grid">
              <div className="info">
                <div className="label">Direct message</div>
                <p className="p description-text">
                  Prefer email? Write to {site.email} — or use this form, which lands in the same inbox.
                </p>
              </div>
            </div>
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
                  <textarea name="message" rows={4} required />
                </label>
                <button className="a-div cta" type="submit" disabled={sending}>
                  <span className="label">{sending ? "Sending…" : "Send message"}</span>
                  <ArrowIcon />
                </button>
                {error ? <p className="p">Something went wrong — try email instead.</p> : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}