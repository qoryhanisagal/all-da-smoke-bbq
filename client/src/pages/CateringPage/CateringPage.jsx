import FAQs from '../../components/FAQs/FAQs';
import { cateringFAQs } from '../../data/faqData';

export default function CateringPage() {
  return (
    <div>
      {/* Catering content */}

      <FAQs faqs={cateringFAQs} title="Catering FAQs" />
    </div>
  );
}
