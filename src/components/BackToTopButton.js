import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = window.pageYOffset;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "40px",
        height: "50px",
        width: "50px",
        fontSize: "22px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
        display: visible ? "inline" : "none",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
      }}
      aria-label="Back to top"
      title="Back to top"
    >
      ↑
    </button>
  );
};

export default BackToTopButton;
