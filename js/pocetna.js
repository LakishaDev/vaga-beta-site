pocetna = true;
var slideIndex = 0;
var slajdInterval = null;
$(document).ready(function () {
    var pockont = document.getElementById("pocKont"); 
    if (pockont) {
        $.getJSON("/js/slike.json").done(function (data) {
            $.each(data, function (i, item) {
                $("#zaSlikeKont").prepend(`
                    <div class="slajdovi anim">
                        <div class="ucitavanje-slike" style="background-image: url(${item.slika}-low.jpg)">
                            <img src="${item.slika}.jpg" loading="lazy">
                        </div>
                        <span class="text">${item.tekst}</span>
                    </div>
                `);
            });
        }).done(function (data) {
            $.each(data, function (i, item) {
                $("#zaSlikeKont").prepend(`
                    <div class="mrtveSlike anim2">
                        <div class="ucitavanje-slike" style="background-image: url(${item.slika}-low.jpg)">
                            <img src="${item.slika}.jpg" loading="lazy">
                        </div>
                        <span class="text">${item.tekst}</span>
                    </div>
                `);
            });
        }).done(function () {
            let mrtveSlike = document.getElementsByClassName("mrtveSlike");
            $("#zaSlikeKont").append(`
              <div class="tackice" id="nekeTackice">
                <ul></ul>
              </div>
            `);
            for (var i = 0; i < mrtveSlike.length; i++) {
                $("#nekeTackice ul").append(`
                <li><div class="tacka"></div></li>
              `);
            }
        }).done(function () {
            $(window).on("load", function () {
                $(".middle").remove();
                if (pockont) pockont.style.display = "block";
                var slidesPage = document.getElementsByClassName("slajdovi");
                if (slidesPage != null && slidesPage.length > 0) showSlides();
                var bluredPics = document.querySelectorAll(".ucitavanje-slike");
                bluredPics.forEach(div => {
                    const img = div.querySelector("img");
    
                    function loaded() {
                        div.classList.add("loaded");
                        if ($("#zaSlikeKont .ucitavanje-slike.loaded").length === $("#zaSlikeKont .ucitavanje-slike").length) {
                            $(".ucitavanje-slike").css({"background-image":""});
                        }
                    }
    
                    if (img.complete) {
                        loaded();
                    }else {
                        img.addEventListener("load", loaded)
                    }
                });
            });
        });
    }
});

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slajdovi");
    var dots = document.getElementsByClassName("tacka");
    var mrtveSlike = document.getElementsByClassName("mrtveSlike");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" aktivna", "");
    }
    dots[slideIndex - 1].className += " aktivna";

    for (var i = 0; i < mrtveSlike.length; i++) {
        mrtveSlike[i].style.display = "none";
        if (slideIndex == 1) {
            mrtveSlike[mrtveSlike.length - 1].style.display = "block";
        } else {
            mrtveSlike[slideIndex - 2].style.display = "block";
        }
    }

    slajdInterval = setTimeout(showSlides, 8000);
}

var bocniMU = false;

$("#provera").on("click", function (e) {
    if (bocniMU) {
        bocniMU = false;
        slajdInterval = setTimeout(showSlides, 1000);
    } else {
        bocniMU = true;
        clearTimeout(slajdInterval);
    }
});