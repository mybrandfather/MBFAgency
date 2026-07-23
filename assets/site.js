// MyBrandFather — site runtime (vanilla, no dependencies)

// 1) style-hover shim — the design uses style-hover="css" attributes.
(function () {
  document.querySelectorAll("[style-hover]").forEach(function (el) {
    var base = el.getAttribute("style") || "";
    var hover = el.getAttribute("style-hover");
    el.addEventListener("mouseenter", function () {
      el.setAttribute("style", base + ";" + hover);
    });
    el.addEventListener("mouseleave", function () {
      el.setAttribute("style", base);
    });
  });
})();

// 2) Hero video rotation — two stacked videos crossfading through four clips.
(function () {
  var a = document.getElementById("hero-v-a");
  var b = document.getElementById("hero-v-b");
  if (!a || !b) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    a.pause();
    return;
  }
  var clips = ["assets/hero-4.mp4", "assets/hero-1.mp4", "assets/hero-2.mp4", "assets/hero-3.mp4"];
  var idx = 0;
  var front = a; // visible
  var back = b;  // hidden, preloaded with the next clip
  a.play().catch(function () {});
  back.src = clips[1];
  back.load();

  setInterval(function () {
    idx = (idx + 1) % clips.length;
    back.currentTime = 0;
    back.play().catch(function () {});
    back.style.opacity = "1";
    front.style.opacity = "0";
    var t = front;
    front = back;
    back = t;
    // after the 2s fade, load the following clip into the now-hidden element
    setTimeout(function () {
      back.pause();
      back.src = clips[(idx + 1) % clips.length];
      back.load();
    }, 2100);
  }, 9000);
})();

// 3) Contact form (only present on contact.html)
(function () {
  var form = document.getElementById("mbf-contact-form");
  if (!form) return;
  var status = document.getElementById("mbf-form-status");
  var btn = document.getElementById("mbf-form-submit");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.querySelector('[name="botcheck"]').value) return; // honeypot
    var data = new FormData(form);
    btn.disabled = true;
    btn.textContent = "Sending…";
    fetch("https://api.web3forms.com/submit", { method: "POST", body: data })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.success) {
          form.style.display = "none";
          status.textContent = "Received. We reply personally within one business day.";
          status.style.display = "block";
        } else {
          throw new Error(res.message || "Submission failed");
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = "Send Message →";
        status.textContent = "Something went wrong. Email us directly at hello@mybrandfather.com.";
        status.style.display = "block";
      });
  });
})();
