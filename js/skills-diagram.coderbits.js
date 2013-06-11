/*
 * Class CBSkillsDiagram
 *
 * Rrenders pure CSS Diagram
 * based on Coderbits.com feed
 *
 **/
var CBSkillsDiagram = function( container ) {
  this.username  = container.data('cb-username');
  this.subject   = container.data('cb-subject') || 'skills';
  this.container = container;
  this.init();
};
CBSkillsDiagram.prototype.init = function() {
  var __self = this;

  // set loader
  __self.container.html('Crunching data.. Please wait');

  $.ajax({
    url: 'https://coderbits.com/' + __self.username + '.json',
    dataType: 'jsonp'
  }).done(function(data) {
    __self.createDom(data);
  });
};
CBSkillsDiagram.prototype.createDom = function(data) {
  var __self = this,
      subj = 'top_' + __self.subject,
      // Sort attributes in descendent order by count (just to be sure)
      attributes = data[subj].sort(function(a,b) {
        return b.count - a.count;
      }),
      items = []
  
  
  skill_level = 10; // begin with biggest skill level
  for (item in attributes) {
    item = attributes[item];
    items.push({name: item.name, count: item.count, level: skill_level});    
    skill_level--;
  }
  
  // Shuffle
  for(var j, x, i = items.length; i; j = parseInt(Math.random() * i), x = items[--i], items[i] = items[j], items[j] = x);
  
  // Clean container contents
  __self.container.html('');
  
  // Render
  for (var i = 0; i < items.length; i++) {
    item = items[i];
    $('<dt class="skill-' + item.level + '">' + item.name + '</dt>').appendTo(__self.container);
    $('<dd>' + item.count + '</dd>').appendTo(__self.container); 
  }
  
};

// Activate all diagrams
$(function() {
  $('.skills-diagram[data-cb-username]').each(function() {
    new CBSkillsDiagram( $(this) );
  });
});