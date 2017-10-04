(function(window){
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;


  function CheckList(selector){
    if(!selector){
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if(this.$element.length === 0){
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  var FLAVOR = {
    'caramel': '#f00',
    'almond': '#0f0',
    'mocha': '#00f'
  };
  var CLICKCOUNTER = 0;

  CheckList.prototype.addClickHandler = function(fn){
    this.$element.on('click', 'input', function(event){
      CLICKCOUNTER++;
      var self = this;

      setTimeout(function(){
        if(CLICKCOUNTER === 2){

          //dbl 처리
        } else if(CLICKCOUNTER === 1){
          var email = event.target.value;
          self.removeRow(email);
          fn(email);
        }
        CLICKCOUNTER = 0;
      },350)

    }.bind(this));
  };
  CheckList.prototype.addRow = function(coffeeOrder){
    if(this.checkDupicationRow(coffeeOrder.emailAddress)){
      this.removeRow(coffeeOrder.emailAddress);
    } else{
      this.completeRow(coffeeOrder.emailAddress);
    }

    var rowElement = new Row(coffeeOrder);
    this.$element.append(rowElement.$element);
  };
  CheckList.prototype.checkDupicationRow = function(email){
    var disabledFlag = this.$element.find('[value="' + email + '"]').attr('disabled');
    var usedFlag = this.$element.find('[value="' + email + '"]').attr('data-coffee-used');

    if(disabledFlag === undefined && usedFlag === 'true'){
      return true;
    } else{
      return false;
    }

  };
  CheckList.prototype.completeRow = function(email){
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();

  };
  CheckList.prototype.removeRow = function(email){
    this.$element
      .find('[value="' + email + '"]')
      .attr('disabled', 'disabled')
      .attr('data-coffee-used', 'true')
      .parent()
      .css('text-decoration','line-through')
      .css('color', '#aaa');
  };

  function Row(coffeeOrder){
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress,
      'data-coffee-used': 'false'
    });

    var description = ' [' + coffeeOrder.strength + 'x]';
    description += coffeeOrder.size + ' ';
    if(coffeeOrder.flavor){
      description += coffeeOrder.flavor + ' ';
      $label.css('color', FLAVOR[coffeeOrder.flavor]);
    }
    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
