export default function FAQs({ faqs }) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-base-content/70">No FAQs available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          tabIndex={0}
          className="collapse bg-base-100 border-base-300 border"
        >
          <div className="collapse-title font-semibold">
            {faq.question}
          </div>
          <div className="collapse-content text-sm">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
