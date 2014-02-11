var gridster;

    function init(){

      gridster = $(".gridster > ul").gridster({
          widget_margins: [5, 5],
          widget_base_dimensions: [100, 55]
      }).data('gridster');

      gridster.disable();


      $(".gridster ul li").click(function(){
          $.magnificPopup.open({
            items: {
              src: '#feedback',
              type: 'inline',
              mainClass: 'mfp-fade'
            }
          });
      });

      $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true,
        mainClass: 'mfp-fade'
      });

    };