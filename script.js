let canvas = document.querySelector('canvas');

let brightnessSlider = document.getElementById('brightness');
let saturationSlider = document.getElementById('saturation');
let contrastSlider = document.getElementById('contrast');
let blurSlider = document.getElementById('blur');
let grayscaleSlider = document.getElementById('grayscale');


//Canvas properties Object
let properties = {
  brightness : 2,
  saturation : 2,
  contrast : 2,
  blur : 5,
  grayscale : 0,
  getProperties : function(){
    this.brightness = brightnessSlider.value;
    this.saturation = saturationSlider.value;
    this.contrast = contrastSlider.value;
    this.blur = blurSlider.value;
    this.grayscale = grayscaleSlider.value;
  },
  resetProperties : function(){
    this.brightness = 1;
    this.saturation = 1;
    this.contrast = 1;
    this.blur = 0;
    this.grayscale = 0;
  }
}



//Handler function for buttons and controls
let handlers = {
  reset : function(){
    properties.resetProperties();
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
      }

      reader.readAsDataURL(input.files[0])
    },false)
    
    
    
    //event listener for URL input tag
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
    
  }
  
};


//function to append canvas with image URL argument
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


handlers.setUpEventListeners();




console.log("The download button works only for low resolution Images");



//Code to put default webclub logo image
appendCanvas("data:image/png;base64,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");