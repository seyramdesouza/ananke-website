import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Field names here must match public/admin/config.yml so the CMS and the site agree.

const link = z.object({ label: z.string(), url: z.url() });

const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    label: z.string(), // e.g. "Issue I, 2026"
    numeral: z.string(), // shown on the cover, e.g. "I"
    number: z.number().int(),
    year: z.number().int(),
    status: z.enum(['published', 'forthcoming']),
    summary: z.string().optional(),
    standfirst: z.string().optional(), // second line under the summary
    cover: z.string().optional(),
    coverAlt: z.string().optional(), // describes the cover image for screen readers
    publisher: z.string().optional(),
    place: z.string().optional(), // e.g. "Accra, Ghana"
    issn: z.string().optional(),
    readUrl: z.string().optional(),
    pdf: z.string().optional(), // downloadable PDF of the issue, e.g. /downloads/interstice-issue-I-2026.pdf
    pdfSize: z.string().optional(), // shown next to the download button, e.g. "6.2 MB"
    editors: z.array(reference('people')).default([]),
    // Section names in reading order, e.g. ["First Impulses", "Fragments of Seeing"]
    sections: z.array(z.string()).default([]),
    // Masthead credits, e.g. { role: "Cover Image Credit", name: "Tebo Pixels" }
    credits: z.array(z.object({ role: z.string(), name: z.string() })).default([]),
    copyright: z.string().optional(),
    acknowledgements: z.array(z.string()).default([]),
    // Short excerpts from the foreword, special reflection, etc.
    excerpts: z
      .array(
        z.object({
          heading: z.string(), // e.g. "Foreword"
          title: z.string().optional(), // e.g. "In Praise of the Unfinished"
          text: z.string(),
          author: z.string(),
          affiliation: z.string().optional(),
        }),
      )
      .default([]),
    closingQuote: z.string().optional(),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    roles: z.array(z.enum(['Contributor', 'Editor', 'Founder'])),
    roleTitle: z.string().optional(),
    country: z.string().optional(),
    practice: z.string().optional(),
    photo: z.string().optional(),
    order: z.number().default(100),
    links: z.array(link).default([]),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    titleTranslation: z.string().optional(), // English title when the original is in another language
    issue: reference('issues'),
    section: z.string().optional(), // must match one of the issue's `sections`
    page: z.number().int().optional(), // page number in the printed issue
    contributors: z.array(reference('people')).default([]),
    form: z.string(),
    order: z.number().default(100),
    image: z.string().optional(),
  }),
});

const exhibitions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/exhibitions' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['current', 'upcoming', 'past']),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    venue: z.string().optional(),
    artists: z.array(z.string()).default([]),
    image: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['ongoing', 'complete']),
    summary: z.string().optional(),
    collaborators: z.array(z.string()).default([]),
    file: z.string().optional(),
  }),
});

const community = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/community' }),
  schema: z.object({
    title: z.string(),
    partners: z.array(z.string()).default([]),
    location: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    image: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { issues, people, works, exhibitions, research, community };
