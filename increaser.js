function add_increaser(){

	var video_parent = document.querySelector("div.ytp-left-controls");
	if(video_parent == null){
		window.addEventListener('yt-navigate-start', function(){
			add_increaser()			
		}, { once: true });
	}
	else{
		var button_sibling = document.querySelector("span.ytp-volume-area");

		var slider_container = document.createElement("div");
		var slider_text = document.querySelector("#volume-multi");

		if(slider_text){
			console.log('increaser is already present');
		}
		else{
			var videoElement = document.querySelector("video")

			var audioCtx = new AudioContext()

			var source = audioCtx.createMediaElementSource(videoElement)

			var gainNode = audioCtx.createGain()

			gainNode.gain.value = 1 // double the volume
			source.connect(gainNode)
			gainNode.connect(audioCtx.destination)

			video_parent.insertBefore(slider_container, button_sibling);
			slider_container.innerHTML = '<span id="volume-multi" >1.0</span>';

			slider_text = document.querySelector("#volume-multi");
			slider_text.style.border = "2px solid #E5E5E5";
			slider_text.style.padding = "3px";
			slider_text.style.borderRadius = "5px";
			slider_text.style.color = "#E5E5E5";
			slider_text.style.cursor = "pointer"; 

			slider_text.addEventListener("mouseover", function(e){
				slider_text.borderColor = "white";
				slider_text.style.color = "white";
			});
			
			slider_text.addEventListener("mouseleave", function(e){
				slider_text.borderColor = "#E5E5E5";
				slider_text.style.color = "#E5E5E5";
			});
			
			slider_text.addEventListener("mousedown", function(e){
				console.log(e.which);
				if (e.which == 1){
					e.target.innerHTML = "1.0";
					gainNode.gain.value = 1.0;
				}
			});

			slider_text.addEventListener("wheel", function(e){
				e.preventDefault();
				var new_val = Math.max(0.0, parseFloat(e.target.innerHTML) + Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))*0.5);
				e.target.innerHTML = new_val.toFixed(1);
				gainNode.gain.value = new_val;
			});

			window.addEventListener('yt-navigate-start', function(){
				slider_text.innerHTML = "1.0";
				gainNode.gain.value = 1.0;
			}, true);
		}
	}
}

add_increaser();






