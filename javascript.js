document.addEventListener("DOMContentLoaded", function () {
  const position = window.productAccordionPosition || "after";

  const productItem = document.querySelector(".ProductItem");
  const pdpLayout = document.querySelector(".pdp-layout");
  const accordionBlock = document.querySelector(".accordion-block");

  if (!accordionBlock) return;

  if (productItem) {
    accordionBlock.style.order = "5";
    const positionWrapper = document.querySelector(".ProductItem-quantity-add-to-cart");
    if (position === "before") {
      positionWrapper?.insertAdjacentElement("beforebegin", accordionBlock);
    } else {
      positionWrapper?.insertAdjacentElement("afterend", accordionBlock);
    }
  } else if (pdpLayout) {
    const wrappers = document.querySelectorAll(".sqs-add-to-cart-button-wrapper");

    wrappers.forEach(wrapper => {
      const qtyInput = wrapper.previousElementSibling?.classList.contains("product-quantity-input")
        ? wrapper.previousElementSibling
        : null;

      const clone = accordionBlock.cloneNode(true);

      if (qtyInput) {
        qtyInput.insertAdjacentElement("beforebegin", clone);
      } else if (position === "before") {
        wrapper.insertAdjacentElement("beforebegin", clone);
      } else {
        wrapper.insertAdjacentElement("afterend", clone);
      }
    });

    accordionBlock.remove();
  }
});
