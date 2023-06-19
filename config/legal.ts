import { siteConfig } from "./site";

type Legal = {
  termsOfService: {
    title: string;
    body: string;
  }[];
  privacyPolicy: {
    title: string;
    body: string;
  }[];
};

export const legal: Legal = {
  termsOfService: [
    {
      title: "Introduction",
      body: `Welcome to ${siteConfig.name} ('we', 'us', 'our'). We offer ${siteConfig.description} to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.`,
    },
    {
      title: "Acceptance of Terms",
      body: "By using our website, you engage in our 'Service' and agree to be bound by the following terms and conditions ('Terms of Service', 'Terms'), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.",
    },
    {
      title: "Privacy Policy",
      body: "Our Privacy Policy, which outlines how we handle your personal data, is incorporated into these Terms. By using our site, you acknowledge that you have read and understand our Privacy Policy.",
    },
    {
      title: "Modifications to the Service and Prices",
      body: "We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.",
    },
    {
      title: "User Conduct",
      body: "As a condition of your access and use, you agree that you may use the Website only for lawful purposes and in accordance with these Terms.",
    },
    {
      title: "Intellectual Property Rights",
      body: "Unless otherwise indicated, the Website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website (collectively, the 'Content') and the trademarks, service marks, and logos contained therein (the 'Marks') are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.",
    },
    {
      title: "Third-Party Links",
      body: "Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.",
    },
    {
      title: "Indemnification",
      body: `You agree to indemnify, defend and hold harmless ${siteConfig.name} and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.`,
    },
    {
      title: "Severability",
      body: "In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any remaining provisions.",
    },
  ],

  privacyPolicy: [
    {
      title: "Introduction",
      body: `Welcome to ${siteConfig.name}. This Privacy Policy outlines the types of information that we gather about you while you are using ${siteConfig.name}, as well as the ways in which we use and disclose this information.`,
    },
    {
      title: "Information We Collect",
      body: "We collect two types of information about our users:\n\n- Personal Information: This includes any information that identifies you personally, such as your name, email address, and other personally identifiable information that you voluntarily provide to us.\n\n- Non-Personal Information: This refers to information that does not by itself identify a specific individual. We gather this information when you interact with our website.",
    },
    {
      title: "How We Use Information",
      body: "We use the information we collect from you for various purposes, including:\n\n- To personalize your experience\n- To improve our website\n- To send periodic emails\n- To administer a contest, promotion, survey or other site feature",
    },
    {
      title: "Information Protection",
      body: "We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.",
    },
    {
      title: "Information Disclosure",
      body: "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.",
    },
    {
      title: "Third Party Links",
      body: "Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.",
    },
    {
      title: "Cookie Policy",
      body: `${siteConfig.name} uses cookies to store information about visitor's preferences, to record user-specific information on which pages the user accesses or visits, and to personalize or customize our web page content based upon visitors' browser type or other information that the visitor sends via their browser.`,
    },
    {
      title: "Changes to This Privacy Policy",
      body: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
    },
  ],
};
