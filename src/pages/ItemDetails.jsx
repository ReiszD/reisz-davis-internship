import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        setDetails(data);
      } catch (err) {
        console.error("Error fetching Item Details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                new Array(1).fill(0).map((_, index) => (
                  <div key={index} className="d-flex">
                    <div
                      className="item-img placeholder"
                      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
                    ></div>

                    <div className="item-body col-md-6">
                      <div className="placeholder-glow">
                        <h2 className="item-title">
                          <span className="placeholder" style={{ height: "50px", width: "300px" }}></span>
                        </h2>
                        <div className="d-flex mb-3">
                          <span className="placeholder col-2 me-3"></span>
                          <span className="placeholder col-2"></span>
                        </div>
                        <p className="item-description">
                          <span className="placeholder col-12"></span>
                          <span className="placeholder col-10"></span>
                          <span className="placeholder col-6"></span>
                        </p>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div className="placeholder" style={{ height: "50px", width: "50px", borderRadius: "50%" }}></div>
                          <div className="ms-3">
                            <span className="placeholder col-6"></span>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <div className="placeholder" style={{ height: "50px", width: "50px", borderRadius: "50%" }}></div>
                          <div className="ms-3">
                            <span className="placeholder col-6"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{details.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {details.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {details.likes}
                        </div>
                      </div>
                      <p>{details.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={details.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.ownerId}`}>
                                {details.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={details.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.creatorId}`}>
                                {details.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{details.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
