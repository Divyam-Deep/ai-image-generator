import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Components/Assets/default_image.svg";

export const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const[loading,setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
        body: JSON.stringify({
          inputs: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    const result = await response.blob();
    const imageURL = window.URL.createObjectURL(result);
    setImage_url(imageURL);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="" />
        </div>
        <div className="loading">
          <div className= {loading?"loading-bar-full":"loading-bar"}></div>
          <div className={loading?"loading-text":"display-none"}>Loading....</div>
        </div>
      </div>
      <div className="searchbox">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You Want To See"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};
