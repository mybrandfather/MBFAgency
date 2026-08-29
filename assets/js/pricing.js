// Central editable pricing display for commercial offers.
window.MBF_PRICING = Object.freeze({
  blueprint: "$495–$750",
  brandSprint: "Starting at $2,500",
  leadSystem: "Starting at $4,500",
  completeSystem: "Starting at $8,500"
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-price]").forEach(function (el) {
    var key = el.getAttribute("data-price");
    if (window.MBF_PRICING[key]) el.textContent = window.MBF_PRICING[key];
  });
});
