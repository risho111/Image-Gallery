const images = [
  {
    title: "Mountain View",
    category: "nature",
    src: "https://picsum.photos/id/1015/800/600"
  },
  {
    title: "Forest Path",
    category: "nature",
    src: "https://picsum.photos/id/1018/800/600"
  },
  {
    title: "City Lights",
    category: "city",
    src: "https://picsum.photos/id/1011/800/600"
  },
  {
    title: "Urban Street",
    category: "city",
    src: "https://picsum.photos/id/1016/800/600"
  },
  {
    title: "Wild Animal",
    category: "animals",
    src: "https://picsum.photos/id/1024/800/600"
  },
  {
    title: "Cute Dog",
    category: "animals",
    src: "https://picsum.photos/id/237/800/600"
  },
  {
    title: "Travel Road",
    category: "travel",
    src: "https://picsum.photos/id/1036/800/600"
  },
  {
    title: "Adventure Trip",
    category: "travel",
    src: "https://picsum.photos/id/1043/800/600"
  }
];

const gallery = document.getElementById("gallery");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = images;
let currentIndex = 0;

function displayImages(category = "all") {
  if (category === "all") {
    currentImages = images;
  } else {
    currentImages = images.filter(function(image) {
      return image.category === category;
    });
  }

  gallery.innerHTML = "";

  currentImages.forEach(function(image, index) {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    galleryItem.setAttribute("data-index", index);

    galleryItem.innerHTML = `
      <img src="${image.src}" alt="${image.title}">
      <div class="image-info">
        <h3>${image.title}</h3>
        <p>${image.category}</p>
      </div>
    `;

    gallery.appendChild(galleryItem);
  });
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

function updateLightbox() {
  const selectedImage = currentImages[currentIndex];

  lightboxImage.src = selectedImage.src;
  lightboxTitle.textContent = selectedImage.title;
  lightboxCategory.textContent = selectedImage.category;
}

function showNextImage() {
  currentIndex++;

  if (currentIndex >= currentImages.length) {
    currentIndex = 0;
  }

  updateLightbox();
}

function showPreviousImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = currentImages.length - 1;
  }

  updateLightbox();
}

gallery.addEventListener("click", function(event) {
  const clickedItem = event.target.closest(".gallery-item");

  if (clickedItem) {
    const index = Number(clickedItem.getAttribute("data-index"));
    openLightbox(index);
  }
});

filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    filterButtons.forEach(function(btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.getAttribute("data-category");
    displayImages(category);
  });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPreviousImage);

lightbox.addEventListener("click", function(event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function(event) {
  if (!lightbox.classList.contains("show")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowRight") {
    showNextImage();
  } else if (event.key === "ArrowLeft") {
    showPreviousImage();
  }
});

displayImages();