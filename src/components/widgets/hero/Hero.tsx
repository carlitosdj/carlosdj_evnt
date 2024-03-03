import { Badge } from "@/components/ui/badge";
import TitleSubtitle from "@/components/helpers/TitleSubtitle";
import Link from "next/link";
import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  badge?: string;
  video?: string;
  eventStartDate?: string;
  eventEndDate?: string;
}

const Hero = ({
  title,
  subtitle,
  badge,
  children,
  video,
  eventStartDate,
  eventEndDate,
}: HeroProps) => {
  const transformDate = (stringDate: string) => {
    const [day, month, year] = stringDate.split("/");
    let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date;
  };

  return (
    <div className="bg-transparent">
      <div className="bg-transparent">
        <div className="container">
          {eventStartDate && eventEndDate && (
            <div
              className="text-primary-950 right-0 left-0 bg-primary-200 p-3 font-extrabold text-center rounded-md shadow-lg m-4 md:container text-md"
              style={{ position: "absolute", zIndex: "99" }}
            >
            
              {new Date(transformDate(eventStartDate)).toLocaleDateString(
                "pt-BR",
                {
                  timeZone: "UTC",
                  day: "numeric",
                  month: "numeric",
                  // year: "numeric",
                }
              )}
              {" A "}
              {new Date(transformDate(eventEndDate)).toLocaleDateString(
                "pt-BR",
                {
                  timeZone: "UTC",
                  day: "numeric",
                  month: "numeric",
                  // year: "numeric",
                }
              )}
              <br/>
              ONLINE E GRATUITO
            </div>
          )}

          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8 pt-32 pb-6">
            <div className="">
              {badge && (
                <Badge
                  className="bg-primary-800 text-white hover:text-white hover:bg-primary-800 px-2 py-1 mb-4"
                  //data-aos="zoom-out"
                >
                  {badge}
                </Badge>
              )}

              <h1
                className="font-extrabold text-3xl md:text-3xl lg:text-4xl tracking-tight text-primary-50 "
                //data-aos="zoom-out"
              >
                {title}
              </h1>
              <p
                className="my-4 text-1xl max-w-3xl mx-auto text-primary-50/70 "
                //data-aos="zoom-out"
                //data-aos-delay="100"
              >
                {subtitle}
              </p>

              <div
                className="pt-2"
                //data-aos="zoom-out"
                //data-aos-delay="300"
              >
                {children}
              </div>
            </div>
            {video && (
              <>
                <div
                  className="flex justify-center items-center "
                  // data-aos="zoom-out"
                  // data-aos-delay="100"
                >
                  <div className="embed-responsive embed-responsive-16by9 rounded-lg overflow-hidden">
                    <div>
                      <iframe
                        title="video"
                        className="embed-responsive-item rounded"
                        //src={'https://www.youtube.com/embed/VNBfCMYkd6k?si=1NCdqc6HpuMrfV2e'}
                        src={video}
                        width={640}
                        height={564}
                        frameBorder={0}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* <iframe
                    className="rounded-lg overflow-hidden w-full h-48 md:h-80"
                    //style={{  }}
                    title="2"
                    allowTransparency={true}
                    // width='100%'
                    // height='300px'
                    src={video}
                    frameBorder={0}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  /> */}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className="flex justify-center mt-8"
          // data-aos="zoom-out"
          // data-aos-delay="400"
        >
          <Link href={"#features"}>
            <div className="animate-bounce bg-primary-950 p-2 w-10 h-10 ring-2 ring-primary-100/50 shadow-lg rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
