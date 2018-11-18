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

    const hideTooltip = (currentTooltip) => {
      $(currentTooltip).children('.tooltipText').detach();
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
      onMouseEnter();
      onMouseLeave();
    };

    init();
};
