'use client';
import { useState,useEffect } from "react";

export default function Button() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // This will run after the component is mounted (client-side only)
    if (isMenuOpen) {
      const subMenu = document.getElementById("subMenu");
      if (subMenu) {
        subMenu.classList.add("open-menu");
      }
    } else {
      const subMenu = document.getElementById("subMenu");
      if (subMenu) {
        subMenu.classList.remove("open-menu");
      }
    }
  }, [isMenuOpen]); 
  return {
    toggleMenu,
  };
};