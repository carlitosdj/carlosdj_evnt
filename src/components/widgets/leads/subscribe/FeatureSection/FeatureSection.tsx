import React from 'react';

import TitleSubtitle from '@/components/helpers/TitleSubtitle';
import { cn } from '@/lib/utils';

interface FeatureSectionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const FeatureSection = ({
  title,
  subtitle,
  children,
  className,
}: FeatureSectionProps) => {
  return (
    <div className={cn("h-full", className)} id={"features"}>
      <div className="container text-center">
        <TitleSubtitle title={title} subtitle={subtitle} />

        <picture data-aos="zoom-out" data-aos-delay="200">
          <img src={"/imgs/features.svg"} alt="img" />
        </picture>

        {children}
      </div>
    </div>
  );
};
export default FeatureSection;
