import { useEffect, useState } from "react";
import useReview from "../hooks/useReview";
import type { ReviewSummary as ReviewSummaryType } from "../utils/types";

type Props = {
  productId: string;
};

const ReviewSummary = ({ productId }: Props) => {
  const { handleGetReviewSummary } = useReview();

  const [summary, setSummary] = useState<ReviewSummaryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await handleGetReviewSummary(productId);

        console.log(response);

        setSummary(response.summary);
      } catch (error) {
        // 404 simply means summary hasn't been generated yet
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [productId]);

  if (loading) {
    return <p>Loading customer insights...</p>;
  }

  if (!summary) {
    return null;
  }

  const { handleRegenerateReviewSummary } = useReview();

  const [regenerating, setRegenerating] = useState(false);

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);

      const response = await handleRegenerateReviewSummary(productId);

      setSummary(response.savedSummary);
    } catch (error) {
      console.error(error);
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">What Customers Say</h2>

        <p className="mt-2 text-sm text-gray-600">{summary.summary} aaa</p>

        <p className="mt-2 text-xs text-gray-500">
          Based on {summary.generatedFromReviewCount} reviews
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Pros</h3>

        <ul className="mt-2 space-y-2">
          {summary.pros.map((pro) => (
            <li key={pro}>✓ {pro}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Cons</h3>

        <ul className="mt-2 space-y-2">
          {summary.cons.map((con) => (
            <li key={con}>× {con}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReviewSummary;
