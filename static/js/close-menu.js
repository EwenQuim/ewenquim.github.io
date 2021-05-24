const anchorLinks = document.querySelectorAll("nav#TableOfContents a");
const detail = document.getElementById("details-toc");

// Add the onclick listeners.
anchorLinks.forEach((anchorLink) => {
  anchorLink.addEventListener("click", () => {
    console.log("click");
    // Close all the details that are not targetDetail.
    detail.removeAttribute("open");
  });
});
