import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

function TitleSubtitle({ title, subtitle }: Props) {
  return (
    <div>
      <h1
        className="pt-20 mb-2 font-extrabold text-4xl sm:text-4xl lg:text-4xl tracking-tight text-primary dark:text-primary-50"
        data-aos="zoom-out"
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className="text-1xl max-w-3xl mb-16 mx-auto text-slate-900 dark:text-primary-50/70"
          data-aos="zoom-out"
          data-aos-delay="100"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default TitleSubtitle;
