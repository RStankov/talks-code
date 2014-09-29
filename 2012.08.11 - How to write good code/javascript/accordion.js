/*
 Sample html code:

  <ul class="accordion-menu">
    <li class="item">
      <a href="#" data-accordion="item">Section 1</a>
      <ul data-accordion="section">
        <li>...</li> 
        <li>...</li>
        <li>...</li>
      </ul>
    </li>
  </ul>
*/

$(document).on('click', '[data-accordion="item"]', function() {
  $(this).next('[data-accordion="section"]').slideToggle();
});
