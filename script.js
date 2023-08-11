
    const imageInput = document.getElementById("imageInput");
    const compressButton = document.getElementById("compressButton");
    const compressedImage = document.getElementById("compressedImage");
    const downloadLink = document.getElementById("downloadLink");

    async function handleImageUpload(event) {

        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      
        const options = {
          maxSizeMB: 0.05,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          console.log(typeof (compressedFile))
          console.log(compressedFile)
          const src = URL.createObjectURL(compressedFile)
          compressedImage.src = src

            downloadLink.addEventListener("click", () => {
                window.location.href = src
            })
        } catch (error) {
          console.log(error);
        }
      
      }

    // Animation function for fadeIn effect
    function fadeIn(element) {
        let opacity = 0;
        element.style.display = "block";

        const fadeInInterval = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.05;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 50)};
