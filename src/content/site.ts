export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "article" | "poster" | "talk";
  abstract: string;
  link?: string;
  doi?: string;
};

export const publications: Publication[] = [
  {
    id: "m6a-motifs-2025",
    title: "Identification of Key Sequence Motifs Essential for the Recognition of m6A Modification in RNA",
    authors: "Aftab Mollah, et al.",
    venue: "Biomolecules (MDPI), Vol. 16, Issue 1, Article 97",
    year: 2025,
    type: "article",
    abstract:
      "N6-methyladenosine (m6A) is the most prevalent internal modification in eukaryotic mRNA, regulated by writers, erasers, and reader proteins that recognize DRACH sequence contexts. This study identifies a conserved peptide motif within hnRNP A1 that selectively recognizes m6A within DRACH motifs, expanding our understanding of how readers decode the epitranscriptome and reshape the mRNA interactome.",
    link: "https://www.mdpi.com/2218-273X/16/1/97",
    doi: "10.3390/biom16010097",
  },
  {
    id: "m6a-biophysj-2024",
    title: "Unveiling the Molecular Mechanisms of N6-methyladenosine (m6A) Recognition by RNA-Binding Proteins",
    authors: "Aftab Mollah, et al.",
    venue: "Biophysical Journal, Vol. 123, Issue 3, Suppl. 1",
    year: 2024,
    type: "article",
    abstract:
      "We characterize the biophysical and structural determinants by which candidate m6A reader proteins discriminate methylated from unmethylated RNA. Combining isothermal titration calorimetry, fluorescence spectroscopy, and binding assays, the work resolves how subtle methylation marks reshape RNA–protein affinity and selectivity.",
    link: "https://www.cell.com/biophysj/fulltext/S0006-3495(24)03636-1",
    doi: "10.1016/j.bpj.2023.11.3636",
  },
  {
    id: "bps-philly-2024",
    title: "Biophysical Characterization of m6A Reader Proteins Recognizing DRACH Motifs",
    authors: "Aftab Mollah",
    venue: "Biophysical Society Annual Meeting, Philadelphia",
    year: 2024,
    type: "poster",
    abstract:
      "Poster presentation describing thermodynamic signatures and binding selectivity of candidate m6A reader proteins toward methylated DRACH sequences using ITC and fluorescence anisotropy.",
  },
  {
    id: "bps-la-2025",
    title: "RNA–Protein Recognition in the m6A Epitranscriptome",
    authors: "Aftab Mollah",
    venue: "Biophysical Society Annual Meeting, Los Angeles",
    year: 2025,
    type: "poster",
    abstract:
      "Extends earlier biophysical work with new structural and thermodynamic data on RNA–protein recognition driven by N6-methyladenosine modifications.",
  },
  {
    id: "rustbelt-rna",
    title: "Decoding m6A Readers: Sequence Specificity and Thermodynamics",
    authors: "Aftab Mollah",
    venue: "Rustbelt RNA Meeting",
    year: 2024,
    type: "talk",
    abstract:
      "Talk presenting hnRNP A1 as a candidate m6A reader and dissecting the contribution of DRACH context to binding selectivity.",
  },
  {
    id: "msno-2026",
    title: "Visualizing RNA–Protein Complexes by Confocal Fluorescence Microscopy",
    authors: "Aftab Mollah",
    venue: "Microscopy Society of Northeastern Ohio (MSNO), May Conference",
    year: 2026,
    type: "poster",
    abstract:
      "Best Graduate Poster, MSNO 2026. Combines confocal microscopy with fluorescence-based binding assays to visualize RNA–protein complex formation in living cells.",
  },
];

export const updates = [
  { id: "u-msno", year: "2026", tag: "Award", title: "Best Graduate Poster — MSNO May Conference", body: "Awarded Best Graduate Poster at the Microscopy Society of Northeastern Ohio May Conference for confocal-microscopy work on RNA–protein complex visualization.", size: "lg" },
  { id: "u-honors-2026", year: "2026", tag: "Award", title: "Best Graduate Poster — ACS Honors Week", body: "Best Graduate Poster at the annual Honors Week Poster Session by the Student Affiliates of the ACS group, Kent State University.", size: "md" },
  { id: "u-mentee-honors-2026", year: "2026", tag: "Mentorship", title: "Mentee — Best Undergraduate Poster, ACS Honors Week", body: "An undergraduate I mentor took home Best Undergraduate Poster at the Kent State ACS Honors Week Poster Session.", size: "md" },
  { id: "u-macdonald", year: "2025", tag: "Award", title: "MacDonald Divisional Award — Biochemistry", body: "Received the MacDonald Divisional Award for research excellence in Biochemistry at Kent State University.", size: "md" },
  { id: "u-papiska", year: "2025", tag: "Scholarship", title: "Dr. Harold R. Papiska Graduate Scholarship", body: "Selected for the Dr. Harold R. Papiska Graduate Scholarship in Chemistry, Kent State University.", size: "md" },
  { id: "u-mentee-ohio", year: "2025", tag: "Mentorship", title: "Mentee — Best Undergraduate Poster, Ohio Academy of Science", body: "An undergraduate researcher I mentor won Best Undergraduate Poster at the Ohio Academy of Science annual meeting.", size: "lg" },
  { id: "u-symposium-judge", year: "2025", tag: "Service", title: "Judge — Annual Undergraduate Research Symposium", body: "Served as a judge at the Annual Undergraduate Research Symposium 2025 at Kent State University — a highlight of mentoring the next generation of scientists.", size: "md" },
  { id: "u-bps-la", year: "2025", tag: "Conference", title: "Presented at Biophysical Society, Los Angeles", body: "Presented research on RNA–protein recognition in the m6A epitranscriptome at the Biophysical Society Annual Meeting in Los Angeles.", size: "md" },
  { id: "u-pub-biomolecules", year: "2025", tag: "Publication", title: "Paper out in Biomolecules — m6A Recognition Motifs", body: "First-author study on key sequence motifs essential for m6A recognition by reader proteins, published in MDPI Biomolecules.", size: "lg" },
  { id: "u-iit", year: "2019", tag: "Origin", title: "Best Master's Project — IIT Patna", body: "Awarded Best Master's Project by the Department of Chemistry, Indian Institute of Technology (IIT) Patna — the start of an RNA-centric research journey.", size: "md" },
  { id: "u-bps-philly", year: "2024", tag: "Conference", title: "Presented at Biophysical Society, Philadelphia", body: "Poster on biophysical characterization of m6A reader proteins recognizing DRACH motifs at BPS Philadelphia.", size: "md" },
  { id: "u-rustbelt", year: "2024", tag: "Conference", title: "Talk at Rustbelt RNA Meeting", body: "Talk on decoding m6A readers — sequence specificity and thermodynamics — at the Rustbelt RNA Meeting.", size: "md" },
];

// Per-id image map. Drive view URLs as requested by content owner.
// `null` = render a "photo coming soon" placeholder card instead of an <img>.
export const updateImages: Record<string, string | null> = {
  "u-msno": "https://lh3.googleusercontent.com/d/1tJAUhFhc7HcVcFgp_fcrLsojvk5PrrNW",
  "u-honors-2026": "https://lh3.googleusercontent.com/d/15rxNjiBYqd0kFTbbXdLBSsjp838qpMVT",
  "u-mentee-honors-2026": null,
  "u-macdonald": "https://lh3.googleusercontent.com/d/1n4ZHNAN6dDCIIfqd5U-GcIzDKMU8Z0_9",
  "u-papiska": "https://lh3.googleusercontent.com/d/179toVZVQK6qlKaeO21Yry-rId5j09mn8",
  "u-mentee-ohio": null,
  "u-symposium-judge": "https://lh3.googleusercontent.com/d/14v0wqLhuKWHnKDU3ebIGwPAreoy5Hed8",
  "u-bps-la": "https://lh3.googleusercontent.com/d/10kYF0_n39AkgaKGwSGmB3651nQDc6659",
  "u-pub-biomolecules": "https://lh3.googleusercontent.com/d/1wRfcaXLw7fHLm7_o2BPdEU7hNm7GIof9",
  "u-iit": null,
  "u-bps-philly": "https://lh3.googleusercontent.com/d/1nXwjl-PoD6PgnSsv5yGp3iU9kHTiyNG4",
  "u-rustbelt": null,
};
export const updatePlaceholders: Record<string, string> = {
  "u-mentee-honors-2026": "📷 Mentee with award — ACS Honors Week 2026",
  "u-mentee-ohio": "📷 Mentee — Ohio Academy of Science 2025",
  "u-iit": "📷 Photo coming soon",
  "u-rustbelt": "📷 Photo coming soon",
};

export const linkedinUrl = "https://www.linkedin.com/in/aftabmollah/";
export const scholarUrl = "https://scholar.google.com/citations?user=V5A0-tkAAAAJ&hl=en";
export const orcidUrl = "https://orcid.org/0009-0006-8601-5984";
export const researchgateUrl = "https://www.researchgate.net/profile/Aftab-Mollah-2";
export const cvUrl = "https://drive.google.com/uc?export=download&id=1Ig6O1EOzxBcMdurvCGSdWV3v1Q2kpR5k";
export const portraitUrl = "https://lh3.googleusercontent.com/d/1-AJQC0CEmZNl7P-iXd6wSlCbfdu_FGsE";
export const portraitAlt = "Aftab Mollah — PhD Candidate, Kent State University";
export const email = "amollah@kent.edu";
