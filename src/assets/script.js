function step2(){
  document.getElementsByClassName('step')[1].classList.add('active');
  $(document).ready(function(){
  $('.method').on('click', function() {
    $('.method').removeClass('blue-border');
    $(this).addClass('blue-border');
    
  });
  }
  );
  

  
}


function step3(){
  document.getElementsByClassName('step')[2].classList.add('active');
  $('.next-btn').html('Purchase');
  
}
function step1(){
  document.getElementsByClassName('step')[0].classList.add('active');
  
}

function backstep3(){
  document.getElementsByClassName('step')[2].classList.remove('active');
  $(document).ready(function(){
    $('.method').on('click', function() {
      $('.method').removeClass('blue-border');
      $(this).addClass('blue-border');
      
    });
    });
  $('.next-btn').html('Next Step');
  
}
function backstep2(){
  document.getElementsByClassName('step')[1].classList.remove('active');
  
}
function backstep1(){
  document.getElementsByClassName('step')[0].classList.remove('active');
  
}



