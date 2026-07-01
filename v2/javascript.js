/*==========
  Squarespace Product V2.2.0 - Product Accordion Plugin
  Copyright Studio Rêveuse
========== */
document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.querySelector(".ProductItem-additional .accordion-block, #accordion-section .other-block");
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
      variants.insertAdjacentElement("beforebegin", accordion);
    } else {
      addToCart.insertAdjacentElement("beforebegin", accordion);
    }
  } else {
    addToCart.insertAdjacentElement("afterend", accordion);
  }

  // Inject style into head
  const style = document.createElement("style");
  style.textContent = `body:not(.sqs-edit-mode-active) .page-section--additional-empty { display: none; }`;
  document.head.appendChild(style);

  // Add class to parent section if ProductItem-additional is empty
  const productItemAdditional = document.querySelector(".ProductItem-additional, #accordion-section");
  if (productItemAdditional) {
    const contentBlocks = productItemAdditional.querySelectorAll(".sqs-col-12, .fe-block");
    const allEmpty = contentBlocks.length > 0 && [...contentBlocks].every(block => block.children.length === 0);
    if (allEmpty) {
      const pageSection = productItemAdditional.closest(".page-section");
      if (pageSection) {
        pageSection.classList.add("page-section--additional-empty");
      }
    }
  }

  console.log('[Product Accordion] Plugin Installed. Copyright Studio Reveuse https://studioreveuse.com.au');
});
