"use client";
import { ApplicationState } from "@/store";
import { loadWppgroupavailableRequest } from "@/store/ducks/wppcamp/actions";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";

interface Props {
  //children: ReactNode;
}

const Viawhats = () => {
  const params = useParams();
  const wppcamp = useSelector((state: ApplicationState) => state.wppcamp);
  const dispatch = useDispatch();
  const { id } = params;

  useEffect(() => {
    dispatch(loadWppgroupavailableRequest(id.toString()));

    //   if (typeof window !== "undefined") {
    //     if (window.track != null) {
    //         window.track("Lead");
    //     }
    //   }
  }, [id, dispatch]);
  console.log("GROUP AVAILABLE", wppcamp);

  const redi = (url: any) => {
    window.location.href = url;
  };

  if (!wppcamp.loading) {
    if (wppcamp.groupavailable) {
      if (wppcamp.groupavailable.url) {
        redi(wppcamp.groupavailable.url);
      }
    }
  }

  if (wppcamp.error) {
    return <div>Ops!</div>;
  }

  return (
    <>
      <div id="layoutDefault">
        <div id="layoutDefault_content">
          <main>
            <div>
              <div className="full" style={{ minHeight: "100vh" }}>
                <div className="page-header-content pt-5">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-6 col-lg-6 order-lg-last order-md-first order-sm-first pb-2">
                        {/* <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src="https://player.vimeo.com/video/498061339?autoplay=1&autopause=0" width={640} height={564} frameBorder={0} allow="autoplay; fullscreen" allowFullScreen />
                          </div> */}
                      </div>
                      <div className="col-lg-6">
                        <div
                          className="card rounded-lg text-dark"
                          style={{
                            backgroundColor: "rgb(0 0 0 / 78%)",
                            opacity: 1,
                          }}
                        >
                          <div
                            className="card-body"
                            style={{ color: "rgba(255, 255, 255, 1)" }}
                          >
                            <h1 className="page-header-title">
                              Buscando um grupo disponível...
                            </h1>
                            <br />
                            {wppcamp.loading || !wppcamp.data ? (
                              <>
                                <Loading />
                                Um instante...
                              </>
                            ) : (
                              <div>
                                Redirecionando para: <br />
                                {wppcamp.groupavailable.name} <br />
                                {wppcamp.groupavailable.url}
                                {/* redi(wppcamp.groupavailable.url) */}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Viawhats;
