/*==========
  Squarespace Product V2 - Product Accordion Plugin
  Copyright Studio Rêveuse
========== */

document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.querySelector(".accordion-block");
  if (!accordion) return;

  // Layout selectors
  const layouts = [
    '[data-product-detail-layout="wrap"]',
    '[data-product-detail-layout="full"]',
    '[data-product-detail-layout="half"]',
    '[data-product-detail-layout="simple"]'
  ];

  const productDetailSections = document.querySelectorAll(".product-detail-section");
  let productDetailSection = null;

  productDetailSections.forEach(section => {
    if (section.querySelector(layouts.join(", "))) {
      productDetailSection = section;
    }
  });

  if (!productDetailSection) return;

  const addToCart = productDetailSection.querySelector(".product-add-to-cart");
  if (!addToCart) return;

  const accordionPosition = window.productAccordionPosition || "after";

  if (accordionPosition === "before") {
    const variants = productDetailSection.querySelector(".product-variants");
    if (variants && variants.compareDocumentPosition(addToCart) & Node.DOCUMENT_POSITION_FOLLOWING) {
      // .product-variants exists before .product-add-to-cart
      variants.insertAdjacentElement("beforebegin", accordion);
    } else {
      addToCart.insertAdjacentElement("beforebegin", accordion);
    }
  } else {
    addToCart.insertAdjacentElement("afterend", accordion);
  }

  console.log('Product Accordion Plugin Installed. Copyright Studio Reveuse https://studioreveuse.com.au');
});
