function vAlignDesc() {
  var descHeight = $('section.desc').height();
  var wrapperHeight = $('section.desc div.wrapper').height();

  $('section.desc div.wrapper').css({
    top: (descHeight/2) - (wrapperHeight/2)
  });
}

$(function() {

  $('section.desc').onScreen({
    tolerance: 200,
    toggleClass: false,
    doIn: function() {
      $(this).addClass('onScreen')
    }
  });
  
  $('section.career').onScreen({
    tolerance: 200,
    toggleClass: false,
    doIn: function() {
      $(this).addClass('onScreen')
    }
  });

  $('section.skills').onScreen({
    tolerance: 200,
    toggleClass: false,
    doIn: function() {
      $(this).addClass('onScreen')
    }
  });

  $('section.etc').onScreen({
    tolerance: 200,
    toggleClass: false,
    doIn: function() {
      $(this).addClass('onScreen')
    }
  });
  
  $('i.scrollHint').click(function(e){
    e.preventDefault();
    $('html,body').animate({
      scrollTop: $('section.career').offset().top
    },500);
  });
  
  vAlignDesc();
  
});

$(window).resize(function(){
  vAlignDesc();
});

$(window).scroll(function(){
  var pos = $(window).scrollTop();

  $('section.desc i.scrollHint').css('opacity',1 - (pos/200));
});

(function($){
  $(function () {
    $('#toolGraph').highcharts({
      colors: ['#2467b1', '#573d7d', '#ffb756', '#f54d27', '#2c99c7', '#000', '#fba919'],
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true
      },
      title: {
        text: 'tools',
        x: -20 //center
      }, 
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
        percentageDecimals: 1
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            color: '#666',
            connectorColor: '#666',
            formatter: function() {
                return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Tools of work',
        data: [
          ['Photoshop', 20.0],
          ['Bootstrap', 20.0],
          ['Sublime Text', 20.0],
          ['Git', 15.0],
          ['Wordpress', 10.0],
          ['Yeoman', 10.0],
          ['Grunt', 5.0]
        ]
      }]
    });
  });
})(jQuery);

(function($){
  $(function () {
    $('#skillGraph').highcharts({
      colors: ['#e44d26', '#0473b7', '#b7e39b', '#c6538c', '#ffda3e', '#5967a4', '#2c99c7'],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: true
        },
        title: {
          text: 'skills',
          x: -20 //center
        },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
        percentageDecimals: 1
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            color: '#666',
            connectorColor: '#666',
            formatter: function() {
                return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Skill set',
        data: [
          ['HTML5', 20.0],
          ['CSS3', 20.0],
          ['Design', 20.0],
          ['Sass', 17.0],
          ['JavaScript', 13.0],
          ['PHP', 5.0],
          ['Wordpress', 5.0]
        ]
      }]
    });
  });
})(jQuery);