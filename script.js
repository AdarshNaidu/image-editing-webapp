let canvas;
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


let handlers = {
  canvas : document.querySelectorAll('canvas')[0],
  changeBrightness : function(val){
    canvas = document.querySelectorAll('canvas')[0];
    canvas.style.transition = "all 0.3s";
    // canvas.style.filter = "brightness("+properties.brightness+")";
    canvas.style.filter = "grayscale("+val+")";
  },
  changeSaturation : function(val){
    canvas = document.querySelectorAll('canvas')[0];
    canvas.style.transition = "all 0.3s";
    canvas.style.filter = "saturate("+properties.saturation+")";
  },
  changeContrast : function(val){
    canvas = document.querySelectorAll('canvas')[0];
    canvas.style.transition = "all 0.3s";
    canvas.style.filter = "contrast("+properties.contrast+")";
  },
  changeBlur : function(val){
    canvas = document.querySelectorAll('canvas')[0];
    canvas.style.transition = "all 0.3s";
    canvas.style.filter = "blur(+"+properties.blur+"px)";
  },
  changeGrayscale : function(val){
    canvas = document.querySelectorAll('canvas')[0];
    canvas.style.transition = "all 0.3s";
    canvas.style.filter = "grayscale(+"+properties.grayscale+")";
  },
  reset : function(){
    // canvas = document.querySelectorAll('canvas')[0];
    // canvas.style.transition = "all 0.3s";
    // canvas.style.filter = "";
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
  },
  apply : function(val){
    properties.getProperties();
    canvas = document.querySelectorAll('canvas')[0];
    canvas.style.transition = "all 0.3s";
    canvas.style.filter = "brightness("+properties.brightness+") saturate("+properties.saturation+") contrast("+properties.contrast+") blur("+properties.blur+"px) grayscale("+properties.grayscale+")";
  },
  setUpEventListeners : function(){
    let inputs = document.querySelectorAll(".controls input");

    inputs.forEach(input => input.addEventListener('change', handlers.apply));
    
  }
  
};


handlers.setUpEventListeners();