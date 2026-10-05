import { useId, type ReactNode, type Ref } from "react";
import "../styles/ResultStep.css";

type ResultStepProps = {
  marker: ReactNode;
  heading: string;
  description: string;
  headingRef?: Ref<HTMLHeadingElement>;
  children?: ReactNode;
};

function ResultStep({
  marker,
  heading,
  description,
  headingRef,
  children,
}: ResultStepProps) {
  const headingId = useId();

  return (
    <section className="result-step" aria-labelledby={headingId}>
      <span className="result-step-marker" aria-hidden="true">
        {marker}
      </span>
      <div className="result-step-body">
        <h2
          id={headingId}
          ref={headingRef}
          tabIndex={headingRef ? -1 : undefined}
          className="result-step-heading"
        >
          {heading}
        </h2>
        <p className="result-step-description">{description}</p>
        {children}
      </div>
    </section>
  );
}

export default ResultStep;
