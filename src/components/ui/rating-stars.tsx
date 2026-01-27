import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
}

export function RatingStars({
  rating,
  onRatingChange,
  interactive = false,
  size = "md",
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = interactive ? hoverRating || rating : rating;
        const isActive = star <= isFilled;

        return (
          <button
            key={star}
            onClick={() => onRatingChange?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
            className={cn(
              sizeClasses[size],
              "transition-all duration-200",
              interactive
                ? "cursor-pointer hover:scale-110"
                : "cursor-default"
            )}
          >
            <Star
              className={cn(
                "w-full h-full transition-colors duration-200",
                isActive
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export function AverageRating({ reviews }: { reviews: Array<{ rating: number }> }) {
  if (reviews.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No reviews yet
      </div>
    );
  }

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="flex items-center gap-2">
      <RatingStars rating={Math.round(average)} />
      <span className="text-sm text-muted-foreground">
        {average.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}
