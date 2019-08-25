let canvas;

//Taking input from the input button
// const input = document.querySelector('input[type="file"]')
// input.addEventListener('change', function(e){
//   canvas = document.querySelectorAll('canvas')[0];
//   if(canvas){
//     handlers.reset();
//     canvas.parentNode.removeChild(canvas);
//   }
//   console.log(input.files)
//   const reader = new FileReader()
//   reader.onload = function(){
//     const img = new Image()
//     img.onload = function(){
//       const canvas = document.createElement('canvas')
//       const context = canvas.getContext('2d')
//       canvas.width = img.width
//       canvas.height = img.height
//       context.drawImage(img, 0, 0)
      
//       const imageData = context.getImageData( 0, 0, canvas.width, canvas.height)
//       const data = imageData.data
      
//       if(canvas.width > document.documentElement.clientWidth){
//         if(canvas.height > document.documentElement.clientHeight){
//           canvas.style.height = "80vh";
//         }else{
//           canvas.style.width = "90vw";
//         } 
//       }
      
//       document.body.appendChild(canvas)
//     }
//     img.src = reader.result
    
//     // document.body.appendChild(img)
//   }
  
//   reader.readAsDataURL(input.files[0])
// },false)



//taking input from url
// let urlInput = document.querySelector('input[name = "url"]');
// urlInput.addEventListener('keydown', function(event){
//       if(event.keyCode===13){
//         canvas = document.querySelectorAll('canvas')[0];
//         if(canvas){
//           handlers.reset();
//           canvas.parentNode.removeChild(canvas);
//         }
//         appendCanvas(urlInput.value);
//         urlInput.value = "";
//       }
//     });


// function appendCanvas(url){
//   let img = document.createElement('img');
//   img.src = url;
//   console.log(url);
//   img.onload = function(){
//       const canvas = document.createElement('canvas')
//       const context = canvas.getContext('2d')
//       canvas.width = img.width
//       canvas.height = img.height
//       context.drawImage(img, 0, 0)
      
//       // const imageData = context.getImageData( 0, 0, canvas.width, canvas.height)
//       // const data = imageData.data
      
//       if(canvas.width > document.documentElement.clientWidth){
//         if(canvas.height > document.documentElement.clientHeight){
//           canvas.style.height = "80vh";
//         }else{
//           canvas.style.width = "90vw";
//         } 
//       }
      
//       document.body.appendChild(canvas)
//     }
// }



//properties object
let properties = {
  brightness : 2,
  saturation : 2,
  contrast : 2,
  blur : 5,
  grayscale : 0,
  getProperties : function(){
    let brightnessSlider = document.getElementById('brightness');
    this.brightness = brightnessSlider.value;
    
    let saturationSlider = document.getElementById('saturation');
    this.saturation = saturationSlider.value;
    
    let contrastSlider = document.getElementById('contrast');
    this.contrast = contrastSlider.value;
    
    let blurSlider = document.getElementById('blur');
    this.blur = blurSlider.value;
    
    let grayscaleSlider = document.getElementById('grayscale');
    this.grayscale = grayscaleSlider.value;
  }
}



//handlers
let handlers = {
  reset : function(){
    properties.brightness = 1;
    properties.saturation = 1;
    properties.contrast = 1;
    properties.blur = 0;
    properties.grayscale = 0;
    let brightnessSlider = document.getElementById('brightness');
    let saturationSlider = document.getElementById('saturation');
    let contrastSlider = document.getElementById('contrast');
    let blurSlider = document.getElementById('blur');
    let grayscaleSlider = document.getElementById('grayscale');
    brightnessSlider.value = 1;
    saturationSlider.value = 1;
    contrastSlider.value = 1;
    blurSlider.value = 0;
    grayscaleSlider.value = 0;
    this.apply();
  },
  apply : function(val){
    properties.getProperties();
    canvas = document.querySelectorAll('canvas')[0];
    canvas.style.transition = "all 0.3s";
    canvas.style.filter = "brightness("+properties.brightness+") saturate("+properties.saturation+") contrast("+properties.contrast+") blur("+properties.blur+"px) grayscale("+properties.grayscale+")";
    let inputs = document.querySelectorAll(".controls input");
    inputs.forEach(function(input){
      let value = document.createElement('span');
      value.innerHTML = input.value;
      let elem = input.nextSibling;
      elem.parentNode.removeChild(elem)
      input.parentNode.insertBefore(value, input.nextSibling);
    })
  },
  download : function(){
    // canvas = document.querySelectorAll('canvas')[0];
    // const a = document.createElement("a");
    // document.body.appendChild(a);
    // a.href = canvas.toDataURL();
    // a.download = "canvas-image.png";
    // a.click();
    // document.body.removeChild(a);
    var canvas = document.querySelector("canvas");
    let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
  },
  setUpEventListeners : function(){
    //event listeners for controls
    let inputs = document.querySelectorAll(".controls input");

    inputs.forEach(input => input.addEventListener('change', handlers.apply));
    
    inputs.forEach(function(input){
      let value = document.createElement('span');
      value.innerHTML = input.value;
      input.parentNode.insertBefore(value, input.nextSibling);
    })
    
    
    
    //event listeners for file input
    const input = document.querySelector('input[type="file"]')
    input.addEventListener('change', function(e){
      canvas = document.querySelectorAll('canvas')[0];
      if(canvas){
        handlers.reset();
        canvas.parentNode.removeChild(canvas);
      }
      console.log(input.files)
      const reader = new FileReader()
      reader.onload = function(){
        const img = new Image()
        img.onload = function(){
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)

          const imageData = context.getImageData( 0, 0, canvas.width, canvas.height)
          const data = imageData.data

          if(canvas.width > document.documentElement.clientWidth){
            if(canvas.height > document.documentElement.clientHeight){
              canvas.style.height = "80vh";
            }else{
              canvas.style.width = "90vw";
            } 
          }

          document.body.appendChild(canvas)
        }
        img.src = reader.result

        // document.body.appendChild(img)
      }

      reader.readAsDataURL(input.files[0])
    },false)
    
    
    
    //event listener for url input
    let urlInput = document.querySelector('input[name = "url"]');
    urlInput.addEventListener('keydown', function(event){
          if(event.keyCode===13){
            canvas = document.querySelectorAll('canvas')[0];
            if(canvas){
              handlers.reset();
              canvas.parentNode.removeChild(canvas);
            }
            appendCanvas(urlInput.value);
            urlInput.value = "";
          }
        });


    function appendCanvas(url){
      let img = document.createElement('img');
      img.src = url;
      console.log(url);
      img.onload = function(){
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)

          // const imageData = context.getImageData( 0, 0, canvas.width, canvas.height)
          // const data = imageData.data

          if(canvas.width > document.documentElement.clientWidth){
            if(canvas.height > document.documentElement.clientHeight){
              canvas.style.height = "80vh";
            }else{
              canvas.style.width = "90vw";
            } 
          }

          document.body.appendChild(canvas)
        }
    }

    
  }
  
};


handlers.setUpEventListeners();




//Code to put default downloadable image

let appendCanvas = function(url){
  let img = document.createElement('img');
      img.src = url;
      console.log(url);
      img.onload = function(){
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)

          // const imageData = context.getImageData( 0, 0, canvas.width, canvas.height)
          // const data = imageData.data

          if(canvas.width > document.documentElement.clientWidth){
            if(canvas.height > document.documentElement.clientHeight){
              canvas.style.height = "80vh";
            }else{
              canvas.style.width = "90vw";
            } 
          }

          document.body.appendChild(canvas)
        }
};
console.log("The download button works for low resolution image", "data:image/jpeg;base64,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");
appendCanvas("data:image/jpeg;base64,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");