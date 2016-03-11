(function(){
	'use strict';
	$(document).ready(function(){
	
	    //SpeechSynthesisUtterance remembers state clear it out.
		speechSynthesis.cancel();
	
		/*Starting State*/
		$('#Pause').hide();
		$('#Resume').hide();
		$('#Stop').hide();	
	
		var textToRead = new SpeechSynthesisUtterance($('#TextToRead').val());

		
		var voices = [];
		speechSynthesis.onvoiceschanged = function(){
			voices = speechSynthesis.getVoices();
			
			$.each(voices, function(index, voice){
				$('#voices').append($('<option></option>').attr('value', voice.lang).text(voice.name));
			});
		};			
			

		/* Actions START*/
		
		$('#voices').on('change', function(){
			var newVoiceName = $('#voices :selected').text();
			textToRead.voice = voices.filter(function(voice){ return voice.name == newVoiceName; })[0];
		});
				
		$('#Start').on('click', function(){			
			var utterance = $('#TextToRead').val();
			if(utterance === undefined || utterance === ''){
				$('#btnMessage').text('Please enter some text to speak.');
				return;
			} else{
				$('#btnMessage').text('');
			}
			
			$('#Pause').show();
			$('#Stop').show();
			$('#Start').hide();
			$('#Resume').hide();
			
			textToRead.text = utterance; 
			speechSynthesis.speak(textToRead);
		});
		
		$('#Pause').on('click', function(){
			$('#Stop').show();
			$('#Resume').show();
			$('#Start').hide();
			$('#Pause').hide();
			
			speechSynthesis.pause();
		});
		
		$('#Resume').on('click', function(){
			$('#Start').hide();
			$('#Resume').hide();
			$('#Pause').show();
			$('#Stop').show();
			
			speechSynthesis.resume();
		});
		
		$('#Stop').on('click', function(){
			$('#Start').show();
			$('#Pause').hide();
			$('#Resume').hide();
			$('#Stop').hide();
			
			speechSynthesis.cancel();
		});
		
		/* Actions END*/
			
		
	});
})();