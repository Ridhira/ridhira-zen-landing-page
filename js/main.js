(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500, "ease");
    return false;
  });

  let scrollToTopBtn = document.getElementById("back-top");
  let rootElement = document.documentElement;
  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  scrollToTopBtn.addEventListener("click", scrollToTop);

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  //! Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1000,
    loop: true,
    nav: false,
    dots: false,
    items: 1,
  });

  //! Testimonials carousel
  $(".lifestyle-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 500,
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    dotsData: false,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

  //! Facilities carousel
  $(".facilities-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 500,
    loop: true,
    nav: true,
    margin: 50,
    dots: false,
    items: 4,
    dotsData: false,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      768: {
        items: 3,
        margin: 20,
      },
      1200: {
        items: 4,
      },
    },
  });

  //! functionality carousel
  $(".functionality-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 500,
    loop: true,
    nav: true,
    margin: 50,
    dots: false,
    items: 4,
    dotsData: false,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      768: {
        items: 3,
        margin: 20,
      },
      1200: {
        items: 4,
      },
    },
  });
})(jQuery);

//! SIDE BAR CONTACT US
$(document).ready(function () {
  $(".toggle").click(function () {
    $(".sidebar-contact").toggleClass("active");
    $(".toggle").toggleClass("active");
  });
});

const controlNavbar = () => {
  let elem = document.getElementById("sidebar");
  if (window.scrollY > 400) {
    elem.classList.remove("hide-sidebar"); // Remove class
  } else {
    elem.classList.add("hide-sidebar"); // Add class
  }
};

window.addEventListener("scroll", controlNavbar);

// ! FORM SUBMISSION FOOTER

let loginForm = document.getElementById("user-details");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let message = document.getElementById("description");
  let plot = document.getElementById("plot");
  let villa = document.getElementById("villa");
  let error = document.getElementById("error-message");

  console.log(plot.checked, villa.checked);

  if (phone.value.length !== 10) {
    error.innerHTML = "*Valid phone number is required ";
  } else if (plot.checked === false && villa.checked === false) {
    error.innerHTML = "*At least one value is required in checkbox";
  } else {
    let checkboxVal;
    let leadStatus = "New Lead";
    if (plot.checked && villa.checked) {
      checkboxVal = "Plot and Villa";
    } else if (plot.checked === false && villa.checked === true) {
      checkboxVal = "Villa";
    } else if (plot.checked === true && villa.checked === false) {
      checkboxVal = "Plot";
    }

    console.log(
      `${firstName.value}, ${lastName.value}, ${email.value}, ${phone.value}, ${message.value}, ${checkboxVal}`
    );

    fetch(
      `https://ridhirazen.com/zohocrmleadcreate.php?phone_number=${phone.value}&first_name=${firstName.value}&last_name=${lastName.value}&email=${email.value}&product=${checkboxVal}&lead_status=${leadStatus}&description=${message.value}&mobile=${phone.value}`,
      {
        method: "get",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data--->", data);
        if (data.data[0].status === "success") {
          error.innerHTML =
            "Your form details submitted successfully. Thankyou!! ";

          firstName.value = "";
          lastName.value = "";
          email.value = "";
          phone.value = "";
          message.value = "";
          plot.checked = false;
          villa.checked = false;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

// ! FORM SUBMISSION SIDE BAR
let getInTouchForm = document.getElementById("get-in-touch");

getInTouchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("userEmail");
  let phone = document.getElementById("userPhone");
  let message = document.getElementById("message");
  let plot = document.getElementById("plot-1");
  let villa = document.getElementById("villa-1");
  let error = document.getElementById("errorMessage");

  console.log(plot.checked, villa.checked);

  if (phone.value.length !== 10) {
    error.innerHTML = "*Valid phone number is required ";
  } else if (plot.checked === false && villa.checked === false) {
    error.innerHTML = "*At least one value is required in checkbox";
  } else {
    let checkboxVal;
    let leadStatus = "New Lead";
    if (plot.checked && villa.checked) {
      checkboxVal = "Plot and Villa";
    } else if (plot.checked === false && villa.checked === true) {
      checkboxVal = "Villa";
    } else if (plot.checked === true && villa.checked === false) {
      checkboxVal = "Plot";
    }

    console.log(
      `${firstName.value}, ${lastName.value}, ${email.value}, ${phone.value}, ${message.value}, ${checkboxVal}`
    );

    fetch(
      `https://ridhirazen.com/zohocrmleadcreate.php?phone_number=${phone.value}&first_name=${firstName.value}&last_name=${lastName.value}&email=${email.value}&product=${checkboxVal}&lead_status=${leadStatus}&description=${message.value}&mobile=${phone.value}`,
      {
        method: "get",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data--->", data);
        if (data.data[0].status === "success") {
          error.innerHTML =
            "Your form details submitted successfully. Thankyou!! ";

          firstName.value = "";
          lastName.value = "";
          email.value = "";
          phone.value = "";
          message.value = "";
          plot.checked = false;
          villa.checked = false;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
