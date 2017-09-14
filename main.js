  var bluetooth = navigator.bluetooth || navigator.mozBluetooth || navigator.webkitBluetooth;

  var services = ['battery_service','heart_rate'];

  document.querySelector('#find-devices').onclick = function() {
      if (!bluetooth) {
          throw new Error('Bluetooth not supported');
      }

      console.log('requestDevice..');
      // navigator.bluetooth.requestDevice({
      //   acceptAllDevices: true,
      //
      // }).then(onSuccess, onError);
    //   navigator.bluetooth.requestDevice({
  	// 	filters: [{
  	// 		services: [0x180F]
  	// 	}]
  	// }).then(device => {
  	// 	console.log('Got device:', device.name);
  	// 	console.log('id:', device.id);
  	// });
    function anyDeviceFilter() {
            return Array.from('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
                .map(c => ({namePrefix: c}))
                .concat({name: ''});
          }
          navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                // optionalServices: ['generic_access']
              }).then(onSuccess, onError);
            };

  function onSuccess(device) {
      console.log('Connecting to', device, '..');
      document.querySelector('#details').innerHTML="Name :"+device.name;
      device.gatt.connect()
      .then(function(server) {
          return server.getPrimaryService('heart_rate');
      })
      .then(function(service) {
          // Do something with the GATT service
          console.log(service);
      });
  }

  function onError(err) {
      console.log('Error:');
      console.log(err);
  }
