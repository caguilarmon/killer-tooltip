/**
* Killer Tooltips - ES6/jQuery. (c) 2018 Carlos Aguilar Montoya
* A library to create tooltips with custom settings.
*
*
*
*/

const tooltip = function(settings) {
    const tooltips = $(settings.tooltipClass);
    const tooltipPosition = settings.tooltipPosition;
    let supportsTouch = false;

    const checkTouchSupport = () => {
      /*
      * iOS & android
      */
      if ('ontouchstart' in window){
        supportsTouch = true;
      /*
      * Win8
      */
      }else if(window.navigator.msPointerEnabled){
        supportsTouch = true;
      }else if ('ontouchstart' in document.documentElement){
        supportsTouch = true;
      };
      return supportsTouch;
    };

    const hideTooltip = (elem) => {
      $(elem).children('.tooltipText').detach();
    };

    const showTooltip = (currentTooltip) => {
      const tooltipData = getTooltipData(currentTooltip);
      $(currentTooltip).append(`<span class="tooltipText">${tooltipData}</span>`);

      switch (tooltipPosition) {
        case 'right':
          $(currentTooltip).children('.tooltipText').addClass('tooltipText--right');
          break;
        case 'left':
          $(currentTooltip).children('.tooltipText').addClass('tooltipText--left');
          break;
        case 'top':
          $(currentTooltip).children('.tooltipText').addClass('tooltipText--top');
          break;
        case 'bottom':
          $(currentTooltip).children('.tooltipText').addClass('tooltipText--bottom');
          break;
        default:
          $(currentTooltip).children('.tooltipText').addClass('tooltipText--right');

      };
    };

    const getTooltipData = (currentTooltip) => {
      return $(currentTooltip).data('text');
    };

    const onMouseclick = () => {
      $('.tooltip').click(function() {
        let currentTooltip = $(this);
        currentTooltip.attr('tabindex', '0');
        if (currentTooltip.hasClass('touch-tooltip')) {
          hideTooltip(currentTooltip);
          currentTooltip.removeClass('touch-tooltip tooltip--hover');
        }else{
          showTooltip(currentTooltip);
          currentTooltip.addClass('touch-tooltip tooltip--hover');
        };
        $('span.tooltip').not(currentTooltip).removeClass('touch-tooltip tooltip--hover');
        hideTooltip($('span.tooltip').not(currentTooltip));
      });
    };

    const onMouseLeave = () => {
      $('.tooltip').mouseleave(function() {
        let currentTooltip = $(this);
        hideTooltip(currentTooltip);
      });
    };

    const onMouseEnter = () => {
      $('.tooltip').mouseenter(function() {
        let currentTooltip = $(this);
        showTooltip(currentTooltip);
      });
    };

    const init = () => {
      checkTouchSupport();
      if(supportsTouch){
        onMouseclick();
      }else{
        onMouseEnter();
        onMouseLeave();
      }
    };

    init();
};
