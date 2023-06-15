import Link from "next/link";

import { Container } from "./Container";
import { Variants, motion } from "framer-motion";
import { sectionInOutFadeVariants } from "./PrimaryFeatures";

const faqs = [
  [
    {
      question:
        "Can I invite my classmates or team members to join my ReQuest projects?",
      answer:
        "Yes! ReQuest is designed to help you collaborate with your classmates and team members. You can invite them to join your projects and work together in real-time.",
    },
    {
      question:
        "How does the AI integration in ReQuest help in managing requirements?",
      answer:
        "ReQuest uses AI to help you with your requirements, such as, helping you generating them. You can also evaluate your abilities to create requirements from a given scenario.",
    },
    {
      question: "Can I track the progress of my requirements within ReQuest?",
      answer:
        "Yes! ReQuest allows you to track the progress of your requirements. You can also set deadlines for your requirements and track them.",
    },
  ],
  [
    {
      question:
        "Can I export or share my requirements from ReQuest with others?",
      answer:
        "Yes! ReQuest allows you to export your requirements in a PDF format. The sharing feature is coming soon.",
    },
    {
      question: "Can I access ReQuest from different devices or platforms?",
      answer:
        "Yes! ReQuest is a web application, which means you can access it from any device or platform.",
    },
    {
      question:
        "Does ReQuest offer any templates or pre-defined requirement structures?",
      answer:
        "No! ReQuest does not offer any templates or pre-defined requirement structures. However, we AI creates the requirements it follows the Ralph Young’s template.",
    },
  ],
  [
    {
      question: "What kind of customer support is available for ReQuest users?",
      answer:
        "ReQuest offers a rich documentation for its users. You can also contact us for any questions or concerns.",
    },
    {
      question:
        "Can ReQuest be integrated with other project management tools or platforms?",
      answer:
        "No! For now, ReQuest does not offer any integration with other project management tools or platforms. However, we are working on it, and plan to ship it very soon.",
    },
    {
      question:
        "Does ReQuest offer any notifications or reminders for upcoming deadlines or task assignments?",
      answer:
        "No! For now, ReQuest does not offer any notifications or reminders for upcoming deadlines or task assignments. However, that functionality is now our priority.",
    },
  ],
];

export function Faqs() {
  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.2 }}
      variants={sectionInOutFadeVariants}
    >
      <section
        id="faqs"
        aria-labelledby="faqs-title"
        className="border-t border-gray-200 py-20 sm:py-32 bg-gray-50"
      >
        <Container>
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <h2 className="font-bold text-3xl tracking-tight text-black sm:text-4xl md:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              If you have anything else you want to ask,{" "}
              <Link
                href="mailto:info@example.com"
                className="text-gray-900 underline"
              >
                reach out to us
              </Link>
              .
            </p>
          </div>

          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
          >
            {faqs.map((column, columnIndex) => (
              <li key={columnIndex}>
                <ul role="list" className="space-y-10">
                  {column.map((faq, faqIndex) => (
                    <li key={faqIndex}>
                      <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        {faq.question}
                      </h3>
                      <p className="mt-4 text-sm text-gray-700 text-justify">
                        {faq.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </motion.div>
  );
}
