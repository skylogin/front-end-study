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
          //dbl클릭 처리
          var data = event.target.nextSibling.data;
          var tempData = data.split(',');
          var orderData = tempData[0].split(' ');
          var userData = tempData[1].split(' ');

          var ratingData = orderData[0].split('[');
          var rating = ratingData[1].split(']')[0];
          var size = orderData[1];
          var flavor = orderData[2] || '';
          var order = userData[0];
          var email = event.target.value;

          modifyOrder(order, email, size, flavor, rating);
        } else if(CLICKCOUNTER === 1){
          //기존 one클릭 처리
          var email = event.target.value;
          self.removeRow(email);
          fn(email);
        }
        CLICKCOUNTER = 0;
      },350);

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

    var description = '[' + coffeeOrder.strength + '] ';
    description += coffeeOrder.size;
    if(coffeeOrder.flavor){
      description += ' ' + coffeeOrder.flavor;
      $label.css('color', FLAVOR[coffeeOrder.flavor]);
    }
    description += ',' + coffeeOrder.coffee;
    description += ' (' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  function modifyOrder(order, email, size, flavor, rating){
    $('#coffeeOrder').val(order);
    $('#emailAddress').val(email);
    $('input:radio[name="size"][value="' + size + '"]').prop('checked', true);
    $('#flavorShot').val(flavor);
    $('#strengthLevel').val(rating);
    $('#strengthValue').html(rating);

  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
