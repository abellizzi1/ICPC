import React from "react";
import PropTypes from "prop-types";

/**
 * Component that allows you to embed a YouTube video on a page. Used in ViewProblemPage.
 * @param param0 
 * The embedId of the YouTube video
 * @returns 
 * Returns the component to be displayed on a page.
 */
const YoutubeEmbed = ({ embedId } : { embedId: string }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;