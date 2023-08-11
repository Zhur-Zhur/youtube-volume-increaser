const msg_delay = 2000;

const inc_key_input = document.getElementById('inc_key');
const dec_key_input = document.getElementById('dec_key');
const stp_val_input = document.getElementById('stp_val');
const status = document.getElementById('status');

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
	chrome.storage.sync.get(
		{ inc_key: ']', dec_key: '[', stp_val: 0.5 },
		(items) => {
			inc_key_input.value = '';
			inc_key_input.placeholder = items.inc_key;

			dec_key_input.value = '';
			dec_key_input.placeholder = items.dec_key;

			stp_val_input.value = '';
			stp_val_input.placeholder = items.stp_val.toString();
	  
		}
	);
};

document.addEventListener('DOMContentLoaded', restoreOptions);

inc_key_input.addEventListener('input', (e) => {
	if(e.target.value.toLowerCase() == dec_key_input.placeholder){
		status.style.color = 'red';
		status.textContent = 'Keybind is already in use.';
	}
	else{
		chrome.storage.sync.set({inc_key: e.target.value.toLowerCase()}, 
		()=> {
			status.style.color = null;
			status.textContent = 'Keybind saved.';
		});
	}
	restoreOptions();
	
	setTimeout(() => {
		status.textContent = '';
	}, msg_delay);
});

dec_key_input.addEventListener('input', (e) => {
	if(e.target.value.toLowerCase() == inc_key_input.placeholder){
		status.style.color = 'red';
		status.textContent = 'Keybind is already in use.';
	}
	else{
		chrome.storage.sync.set({dec_key: e.target.value.toLowerCase()}, 
		()=> {
			status.style.color = null;
			status.textContent = 'Keybind saved.';
		});
	}
	restoreOptions();
	e.target.value = '';
	setTimeout(() => {
		status.textContent = '';
	}, msg_delay);
});

stp_val_input.addEventListener('change', (e) => {
	if(isNaN(e.target.value)){
		status.style.color = 'red';
		status.textContent = 'Not a number.';
	}
	else{
		chrome.storage.sync.set({stp_val: Math.abs(+e.target.value)}, 
		()=> {
			status.style.color = null;
			status.textContent = 'Step value saved.';
		});
	}
	restoreOptions();
	e.target.value = '';
	setTimeout(() => {
		status.textContent = '';
	}, msg_delay);
});