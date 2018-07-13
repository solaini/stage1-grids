self.addEventListener('fetch', function(event){
    console.log("Hello World!");
    console.log(event.request);
});