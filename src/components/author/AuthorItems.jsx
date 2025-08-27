import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const AuthorItems = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(data);
        setItems(data.nftCollection || []);
      } catch (err) {
        console.error("Error Fetching Items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [id]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            <>
              {new Array(8).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6 col-sx-12"
                >
                  <div className="card placeholder-glow">
                    <div
                      className="card-img-top placeholder"
                      style={{ height: "200px" }}
                    ></div>
                    <div className="card-body">
                      <h5 className="card-title">
                        <span className="placeholder col-6"></span>
                      </h5>
                      <p className="card-text">
                        <span className="placeholder col-4"></span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {items.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id || index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
