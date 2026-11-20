import localFont from "next/font/local";

/**
 * Zelf gehoste lettertypen (geen externe font-CDN): sneller en AVG-vriendelijk.
 * Beide families worden als variabele font geladen, dus elk gewicht in één bestand.
 *
 * Staat hier en niet in het root-layout omdat er twee root-layouts zijn: de
 * publieke site (met per taal `lang` en `dir`) en het beheerpaneel.
 */
const playfair = localFont({
  src: [
    { path: "./playfair-display-400_600-latin.woff2", weight: "400 600", style: "normal" },
    { path: "./playfair-display-400_600-latin-ext.woff2", weight: "400 600", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  preload: true,
});

const dmSans = localFont({
  src: [
    { path: "./dm-sans-400_600-latin.woff2", weight: "400 600", style: "normal" },
    { path: "./dm-sans-400_600-latin-ext.woff2", weight: "400 600", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  preload: true,
});

/** Beide fontvariabelen; op `<html>` zetten. */
export const fontClassName = `${playfair.variable} ${dmSans.variable}`;
