import Image from "next/image";
import { ReactNode } from "react";

interface SessionContentProps {
  description?: string;
  image?: string;
  title?: string;
  video?: string;
  children?: ReactNode;
  delay?: string;
}
export const SessionContent = ({
  description,
  image,
  title,
  video,
  children,
  delay,
}: SessionContentProps) => {
  // return (
  //   <div style={{ backgroundColor: "red" }} className="text-center">
  //     Hey
  //   </div>
  // );
  return (
    // <div className="p-10 rounded bg-gradient-to-r from-slate-900 to-slate-800 mb-20">
    <div 
      //data-aos="zoom-out" data-aos-delay={delay || 0}
      >
      <div className="relative mx-auto justify-center">
        {image && (
          <picture>
            <div className="flex justify-center items-center">
              <picture>
                <img
                  src={image}
                  alt="img"
                  //style={{ height: 150 }}
                  className="mx-auto rounded-sm neon-primary"
                />
              </picture>
            </div>
          </picture>
        )}
        <h1 className="font-extrabold text-3xl sm:text-1xl lg:text-2xl tracking-tight text-primary dark:text-primary-50 pt-10">
          {title}
        </h1>
        <p className="mt-2 text-md text-slate-100  max-w-3xl mx-auto dark:text-slate-400 text-center">
          {description}
        </p>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};
