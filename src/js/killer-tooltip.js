/**
* Killer Tooltips - ES6/jQuery. (c) 2018 Carlos Aguilar Montoya
* A library to create tooltips with custom settings.
*
* @param {Object} settings - Settings for the tooltips
* @param {Object} settings.tooltipPosition - Tooltip position
*/

const tooltip = function(settings) {
    const tooltips = $('.tooltip');
    const tooltipPosition = settings.tooltipPosition;
    let supportsTouch = false;

    /**
    * Checks if the device supports touch
    */
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

    /**
    * Hides the tooltip
    *
    * @param {Object} elem - Html tag
    */
    const hideTooltip = (elem) => {
      $(elem).children('.tooltip-text').detach();
    };

    /**
    * Shows the tooltip and sets the position
    *
    * @param {Object} currentTooltip - Html tag
    */
    const showTooltip = (currentTooltip) => {
      const tooltipData = getTooltipData(currentTooltip);
      $(currentTooltip).append(`<span class="tooltip-text">${tooltipData}</span>`);

      switch (tooltipPosition) {
        case 'right':
          $(currentTooltip).children('.tooltip-text').addClass('tooltip-text--right');
          break;
        case 'left':
          $(currentTooltip).children('.tooltip-text').addClass('tooltip-text--left');
          break;
        case 'top':
          $(currentTooltip).children('.tooltip-text').addClass('tooltip-text--top');
          break;
        case 'bottom':
          $(currentTooltip).children('.tooltip-text').addClass('tooltip-text--bottom');
          break;
        default:
          $(currentTooltip).children('.tooltip-text').addClass('tooltip-text--right');

      };
    };

    /**
    * Gets the tooltip's data text to show
    *
    * @param {Object} currentTooltip - Html tag
    */
    const getTooltipData = (currentTooltip) => {
      return $(currentTooltip).data('text');
    };

    /**
    * Handles click functionality on touch devices for anchor links
    *
    * @param {Object} currentTooltip - Html tag
    * @param {document#event:click} e - Mouse Click Event
    * @listens document#click
    */
    const clickHandlerForAnchor = (currentTooltip, e) => {
      if (currentTooltip.hasClass('touch-tooltip') && !currentTooltip.hasClass('tooltip--no-more-hover')) {
        hideTooltip(currentTooltip);
        currentTooltip.removeClass('touch-tooltip tooltip--hover');
        currentTooltip.addClass('tooltip--no-more-hover');
        e.preventDefault();

      }else if(!currentTooltip.hasClass('tooltip--no-more-hover')){
        showTooltip(currentTooltip);
        currentTooltip.addClass('touch-tooltip tooltip--hover');
        e.preventDefault();
      };
    };

    /**
    * Handles click functionality on touch devices for non anchor elements
    *
    * @param {Object} currentTooltip - Html tag
    * @param {document#event:click} e - Mouse Click Event
    * @listens document#click
    */
    const clickHandlerForNonAnchor = (currentTooltip, e) => {
      if (currentTooltip.hasClass('touch-tooltip')) {
        hideTooltip(currentTooltip);
        currentTooltip.removeClass('touch-tooltip tooltip--hover');
      }else{
        showTooltip(currentTooltip);
        currentTooltip.addClass('touch-tooltip tooltip--hover');
      };

    };

    /**
    * Adds or removes the tooltip upon click for mobile/touch devices
    */
    const onMouseclick = () => {
      $('.tooltip').click(function(e) {
        const currentTooltip = $(this);
        if (currentTooltip.is('a')){
          clickHandlerForAnchor(currentTooltip, e);
        }else{
          clickHandlerForNonAnchor(currentTooltip, e);
        };
        $('.tooltip').not(currentTooltip).removeClass('touch-tooltip tooltip--hover');
        hideTooltip($('.tooltip').not(currentTooltip));
      });
    };

    /**
    * Removes the tooltip upon mouse leave for pointer devices
    */
    const onMouseLeave = () => {
      $('.tooltip').mouseleave(function() {
        const currentTooltip = $(this);
        hideTooltip(currentTooltip);
      });
    };

    /**
    * Adds the tooltip upon mouse enter for pointer devices
    */
    const onMouseEnter = () => {
      $('.tooltip').mouseenter(function() {
        const currentTooltip = $(this);
        showTooltip(currentTooltip);
      });
    };

    /**
    * Initializes the tooltips, either for touch or pointer devices
    */
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
