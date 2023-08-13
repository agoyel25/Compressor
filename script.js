
    const imageInput = document.getElementById("imageInput");
    const compressedImage = document.getElementById("compressedImage");
    const downloadLink = document.getElementById("downloadLink");

 

  
  
  



    async function handleImageUpload(event) {

        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      
        const options = {
          maxSizeMB: 0.04,
          maxWidthOrHeight: 2100,
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
                const f = new File([compressedFile], compressedFile.name, { type: compressedFile.type });
                const a = document.createElement("a");
                a.download = f.name;
                a.href = URL.createObjectURL(f);
                a.click();
                document.removeChild(a);
            })
          const timeout = setTimeout(() => {
            const section = document.getElementById('results');
            section.removeAttribute('hidden');
            clearTimeout(timeout)
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      
      }

    // Animation function for fadeIn effect
    // function fadeIn(element) {
    //     let opacity = 0;
    //     element.style.display = "block";

    //     const fadeInInterval = setInterval(function () {
    //         if (opacity < 1) {
    //             opacity += 0.05;
    //             element.style.opacity = opacity;
    //         } else {
    //             clearInterval(fadeInInterval);
    //         }
    //     }, 50)};
