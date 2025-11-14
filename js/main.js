/* 
   Loads supplements.txt and builds the shrinking typography effect.
*/

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("supplement-list");

  try {
    const response = await fetch("data/supplements.txt");
    const text = await response.text();

    const supplements = text
      .split("\n")
      .map((s) => s.trim())
      .map((s) => s + ",")
      .filter(Boolean);

    supplements.forEach((supp, index) => {
      const div = document.createElement("div");
      div.classList.add("supplement-item");

      const scale = 1 - index * (5.2 / supplements.length);

      // Adaptive falloff logic
      const MIN_WIDTH = 550; // screen width where falloff should freeze
      const BASE_FONT = 1.4; // base size all items use when frozen

      let fontSize;

      if (window.innerWidth < MIN_WIDTH) {
        // Freeze typography: all items same size, no falloff
        fontSize = BASE_FONT;
      } else {
        // Normal falloff
        fontSize = Math.max(0.2, scale) * 6;
      }

      div.style.fontSize = `${fontSize}rem`;
      div.textContent = supp;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading supplement list:", err);
    container.innerHTML = "<p>Error loading supplements.</p>";
  }
});
