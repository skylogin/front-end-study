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
      });
      fn(data);
      this.reset();
      this.elements[0].focus();
      $('#strengthValue').html('30').css('color', '#000');
    });
  };

  FormHandler.prototype.addInputHandler = function(fn){
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event){
      var emailAddress = event.target.value;
      var message = '';
      if(fn(emailAddress)){
        event.target.setCustomValidity('');
      } else{
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  };

  FormHandler.prototype.addDecaffeineHandler = function(fn, fn2){
    this.$formElement.on('input', '[name="coffee"]', function(event){
      var order = event.target.value;
      var message = '';

      if(fn(order)){
        event.target.setCustomValidity('');
      } else{
        message = 'Are you sure order to decaffein?';
        event.target.setCustomValidity(message);
      }
    });

    this.$formElement.on('input', '[name="strength"]', function(event){
      var strength = event.target.value;
      var message = '';
      console.log(strength, fn2(strength));

      if(fn2(strength)){
        event.target.setCustomValidity('');
      } else{
        message = 'Are you sure order to decaffein?';
        event.target.setCustomValidity(message);
      }
    });
  };

  FormHandler.prototype.addStrengthHandler = function(fn){
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
    });
  };



  App.FormHandler = FormHandler;
  window.App = App;
})(window);
