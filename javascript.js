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
  handleSpecialLinks();
});

function handleSpecialLinks() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach((item, index) => {
    const dropdown = item.querySelector('.accordion-item__dropdown');
    const description = dropdown?.querySelector('.accordion-item__description');
    const content = description.innerHTML;
    
    const hasDrawerLink = content.includes('[drawer_link]') && content.includes('#sr-drawer');
    const hasLightboxLink = content.includes('[lightbox_link]') && content.includes('#sr-lightbox');
    
    if (hasDrawerLink || hasLightboxLink) {
      const linkElement = description.querySelector('a');
      let linkUrl = '';
      
      if (linkElement && linkElement.href) {
        const fullUrl = linkElement.href;
        const hashIndex = fullUrl.indexOf('#');
        
        if (hashIndex !== -1) {
          linkUrl = fullUrl.substring(hashIndex);
        } else {
          linkUrl = fullUrl;
        }
      }
      
      if (linkUrl) {
        try {
          const liContent = item.innerHTML;
          const innerAnchor = document.createElement('a');
          innerAnchor.href = linkUrl;
          innerAnchor.className = 'accordion-item__link';
          innerAnchor.style.textDecoration = 'none';
          innerAnchor.style.color = 'inherit';
          innerAnchor.style.display = 'block';
          innerAnchor.innerHTML = liContent;
          item.innerHTML = '';
          item.appendChild(innerAnchor);
        } catch (error) {
          console.error('[SR Accordion Link] Error:', error);
        }
      }
    }
  });
}
