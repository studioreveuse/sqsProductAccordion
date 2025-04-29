document.addEventListener("DOMContentLoaded", function () {
  const position = window.productAccordionPosition || "after";

  const productItem = document.querySelector(".ProductItem");
  const pdpLayout = document.querySelector(".pdp-layout");
  const accordionBlock = document.querySelector(".accordion-block");

  if (!accordionBlock) return;

  if (productItem) {
    const positionWrapper = document.querySelector(".ProductItem-quantity-add-to-cart");
    if (position === "before") {
      positionWrapper?.insertAdjacentElement("beforebegin", accordionBlock);
    } else {
      positionWrapper?.insertAdjacentElement("afterend", accordionBlock);
    }
  } else if (pdpLayout) {
    const wrappers = document.querySelectorAll(".sqs-add-to-cart-button-wrapper:not(.add-on-add-to-cart-wrapper)");

    wrappers.forEach(wrapper => {
      const qtyInput = wrapper.querySelector(".product-quantity-input");

      if (position === "before") {
        if (qtyInput) {
          qtyInput.insertAdjacentElement("beforebegin", accordionBlock.cloneNode(true));
        } else {
          wrapper.insertAdjacentElement("beforebegin", accordionBlock.cloneNode(true));
        }
      } else {
        wrapper.insertAdjacentElement("afterend", accordionBlock.cloneNode(true));
      }
    });
    accordionBlock.remove();
  }
});
