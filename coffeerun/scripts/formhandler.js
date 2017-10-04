(function(window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector){
    if(!selector){
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if(this.$formElement.length === 0){
      throw new Error('Could not find element with selector: ' + selector);
    }
  }


  FormHandler.prototype.addSubmitHandler = function(fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
        // console.log(item.name + ' is ' + item.value);
      });
      // console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
      $('#strengthValue').html('30').css('color', '#000');
    });
  };

  FormHandler.prototype.addStrengthHandler = function(){
    this.$formElement.on('change', function(event){
      var target = $('#strengthValue');
      target.html(this.value);

      if(this.value < 35){
        target.css('color', '#0f0');
      } else if(this.value < 60){
        target.css('color', '#ff0');
      } else{
        target.css('color', '#f00');
      }


    })
  };



  App.FormHandler = FormHandler;
  window.App = App;
})(window);
